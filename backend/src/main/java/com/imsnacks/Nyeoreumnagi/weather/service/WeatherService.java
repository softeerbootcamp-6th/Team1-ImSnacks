package com.imsnacks.Nyeoreumnagi.weather.service;

import com.imsnacks.Nyeoreumnagi.common.enums.WeatherCondition;
import com.imsnacks.Nyeoreumnagi.common.enums.WeatherMetric;
import com.imsnacks.Nyeoreumnagi.member.entity.Farm;
import com.imsnacks.Nyeoreumnagi.member.entity.Member;
import com.imsnacks.Nyeoreumnagi.member.exception.MemberException;
import com.imsnacks.Nyeoreumnagi.member.repository.MemberRepository;
import com.imsnacks.Nyeoreumnagi.weather.dto.response.*;
import com.imsnacks.Nyeoreumnagi.weather.entity.DashboardTodayWeather;
import com.imsnacks.Nyeoreumnagi.weather.entity.ShortTermWeatherForecast;
import com.imsnacks.Nyeoreumnagi.weather.entity.WeatherRisk;
import com.imsnacks.Nyeoreumnagi.weather.exception.WeatherException;
import com.imsnacks.Nyeoreumnagi.weather.repository.DashboardTodayWeatherRepository;
import com.imsnacks.Nyeoreumnagi.weather.repository.ShortTermWeatherForecastRepository;
import com.imsnacks.Nyeoreumnagi.weather.repository.WeatherRiskRepository;
import com.imsnacks.Nyeoreumnagi.weather.util.WeatherRiskIntervalMerger;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Comparator;
import java.util.List;

import static com.imsnacks.Nyeoreumnagi.member.exception.MemberResponseStatus.*;
import static com.imsnacks.Nyeoreumnagi.weather.exception.WeatherResponseStatus.*;

@Service
@RequiredArgsConstructor
public class WeatherService {

    private final MemberRepository memberRepository;
    private final ShortTermWeatherForecastRepository shortTermWeatherForecastRepository;
    private final WeatherRiskRepository weatherRiskRepository;
    private final DashboardTodayWeatherRepository dashboardTodayWeatherRepository;

    public GetWeatherGraphResponse getWeatherGraph(Long memberId, WeatherMetric weatherMetric) {
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new MemberException(MEMBER_NOT_FOUND));
        Farm farm = member.getFarm();

        if (farm == null) {
            throw new MemberException(NO_FARM_INFO);
        }

        int nx = farm.getNx();
        int ny = farm.getNy();

        List<ShortTermWeatherForecast> weatherInfos = shortTermWeatherForecastRepository.findAllByNxAndNy(nx, ny);
        if (weatherInfos.isEmpty()) {
            throw new WeatherException(NO_WEATHER_LOCATION);
        }

        int maxValue = getMaxValue(weatherInfos, weatherMetric);
        int minValue = getMinValue(weatherInfos, weatherMetric);
        List<GetWeatherGraphResponse.ValuePerTime> valuePerTimes = extractWeatherGraphInfos(weatherInfos, weatherMetric, LocalDateTime.now().getHour() + 1);

        int maxLimit = getUpperLimit(maxValue);
        int minLimit = getLowerLimit(minValue, weatherMetric);

        return new GetWeatherGraphResponse(maxLimit, minLimit, weatherMetric, valuePerTimes);
    }

    public GetFcstRiskResponse getWeatherRisk(Long memberId) {
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new MemberException(MEMBER_NOT_FOUND));
        Farm farm = member.getFarm();

        if (farm == null) {
            throw new MemberException(NO_FARM_INFO);
        }

        int nx = farm.getNx();
        int ny = farm.getNy();

        List<WeatherRisk> weatherRisks = weatherRiskRepository.findByNxAndNyWithMaxJobExecutionId(nx, ny);
        List<GetFcstRiskResponse.WeatherRiskDto> weatherRiskDtos = WeatherRiskIntervalMerger.merge(weatherRisks);

        return new GetFcstRiskResponse(weatherRiskDtos);
    }

    public GetWeatherConditionResponse getWeatherCondition(Long memberId) {
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new MemberException(INVALID_MEMBER_ID));
        Farm farm = member.getFarm();

        if (farm == null) {
            throw new MemberException(NO_FARM_INFO);
        }

        int nx = farm.getNx();
        int ny = farm.getNy();

        int nowTime = LocalDateTime.now().getHour();
        ShortTermWeatherForecast weatherInfoNearest = shortTermWeatherForecastRepository.findAllByNxAndNy(nx, ny)
                .stream()
                .filter(weather -> weather.getFcstTime() <= nowTime)
                .max(Comparator.comparingInt(ShortTermWeatherForecast::getFcstTime))
                .orElseThrow(() -> new WeatherException(NO_WEATHER_VALUE));

        SunriseSunSetTime sunriseSunSetTime = dashboardTodayWeatherRepository.findSunRiseSetByNxAndNy(nx, ny);
        WeatherCondition weatherCondition = weatherInfoNearest.getWeatherCondition(sunriseSunSetTime);
        int temperature = weatherInfoNearest.getTemperature();

        return new GetWeatherConditionResponse(weatherCondition.toString(), weatherCondition.getKeyword(), temperature);
    }

    public GetWeatherBriefingResponse getWeatherBriefing(final Long memberId) {
        assert(memberId != null);
        final Member member = memberRepository.findById(memberId).orElseThrow(() -> new MemberException(MEMBER_NOT_FOUND));
        final Farm farm = member.getFarm();
        if (farm == null) {
            throw new MemberException(NO_FARM_INFO);
        }

        final int nx = farm.getNx();
        final int ny = farm.getNy();

        final List<WeatherRisk> allRisks = weatherRiskRepository.findByNxAndNyWithMaxJobExecutionId(nx, ny);
        if (allRisks.isEmpty()) { // 기상 특이 사항이 없는 것이니 exception이 아닌 false 응답을 보낸다.
            return new GetWeatherBriefingResponse(false, "");
        }

        final LocalDateTime now = LocalDateTime.now(ZoneId.of(Briefing.KST));
        final List<WeatherRisk> filteredRisk = allRisks.stream()
                .filter(r -> r.getEndTime().isAfter(now))
                .sorted(Briefing.RISK_COMPARATOR) // 우선 순위가 가장 앞서는 것이 맨 앞에 오도록 정렬한다.
                .toList();
        if (filteredRisk.isEmpty()) { // 기상 특이 사항이 없는 것이니 exception이 아닌 false 응답을 보낸다.
            return new GetWeatherBriefingResponse(false, "");
        }
        final String msg = Briefing.buildMsg(filteredRisk.get(0));

        return new GetWeatherBriefingResponse(true, msg);
    }

    public GetSunRiseSetTimeResponse getSunRiseSetTime(final Long memberId) {
        assert(memberId != null);
        final Member member = memberRepository.findById(memberId).orElseThrow(() -> new MemberException(MEMBER_NOT_FOUND));
        final Farm farm = member.getFarm();
        if (farm == null) {
            throw new MemberException(NO_FARM_INFO);
        }

        final int nx = farm.getNx();
        final int ny = farm.getNy();

        SunriseSunSetTime sunriseSunSetTime = dashboardTodayWeatherRepository.findSunRiseSetByNxAndNy(nx, ny);

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm");
        String startTime = sunriseSunSetTime.getSunriseTime().format(formatter);
        String endTime = sunriseSunSetTime.getSunSetTime().format(formatter);

        return new GetSunRiseSetTimeResponse(startTime, endTime);
    }

    private List<GetWeatherGraphResponse.ValuePerTime> extractWeatherGraphInfos(List<ShortTermWeatherForecast> forecasts, WeatherMetric metric, int currentHour24) {
        return forecasts.stream()
                .map(f -> {
                    String name = String.format("%02d", f.getFcstTime());
                    double value = getValue(f, metric);
                    return new GetWeatherGraphResponse.ValuePerTime(name, value);
                })
                .sorted(Comparator.comparingInt(v -> {
                    int hour = Integer.parseInt(v.name());
                    return (hour - currentHour24 + 24) % 24;
                }))
                .toList();
    }

    private int getMaxValue(List<ShortTermWeatherForecast> forecasts, WeatherMetric metric) {
        return forecasts.stream()
                .mapToInt(f -> (int) getValue(f, metric))
                .max()
                .orElseThrow(() -> new WeatherException(NO_WEATHER_VALUE));
    }

    private int getMinValue(List<ShortTermWeatherForecast> forecasts, WeatherMetric metric) {
        return forecasts.stream()
                .mapToInt(f -> (int) getValue(f, metric))
                .min()
                .orElseThrow(() -> new WeatherException(NO_WEATHER_VALUE));
    }

    private double getValue(ShortTermWeatherForecast forecast, WeatherMetric metric) {
        switch (metric) {
            case PERCIPITATION:
                return forecast.getPrecipitation();
            case TEMPERATURE:
                return forecast.getTemperature();
            case HUMIDITY:
                return forecast.getHumidity();
            case WIND_SPEED:
                return forecast.getWindSpeed();
            default:
                throw new WeatherException(INVALID_WEATHER_METRIC);
        }
    }

    private int getLowerLimit(int value, WeatherMetric metric) {
        if (metric.equals(WeatherMetric.TEMPERATURE)) {
            return ((value - 1) / 5) * 5;
        }
        return (value == 0) ? 0 : ((value - 1) / 5) * 5;
    }

    private int getUpperLimit(int value) {
        return ((value / 5) + 1) * 5;
    }
}
