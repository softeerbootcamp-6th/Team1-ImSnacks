package com.imsnacks.Nyeoreumnagi.weather.service;

import com.imsnacks.Nyeoreumnagi.common.enums.WeatherMetric;
import com.imsnacks.Nyeoreumnagi.member.entity.Farm;
import com.imsnacks.Nyeoreumnagi.member.entity.Member;
import com.imsnacks.Nyeoreumnagi.member.exception.MemberException;
import com.imsnacks.Nyeoreumnagi.member.repository.MemberRepository;
import com.imsnacks.Nyeoreumnagi.weather.dto.response.GetFcstRiskResponse;
import com.imsnacks.Nyeoreumnagi.weather.dto.response.GetWeatherGraphResponse;
import com.imsnacks.Nyeoreumnagi.weather.entity.ShortTermWeatherForecast;
import com.imsnacks.Nyeoreumnagi.weather.entity.WeatherRisk;
import com.imsnacks.Nyeoreumnagi.weather.exception.WeatherException;
import com.imsnacks.Nyeoreumnagi.weather.repository.ShortTermWeatherForecastRepository;
import com.imsnacks.Nyeoreumnagi.weather.repository.WeatherRiskRepository;
import com.imsnacks.Nyeoreumnagi.weather.util.WeatherRiskIntervalMerger;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

import static com.imsnacks.Nyeoreumnagi.member.exception.MemberResponseStatus.INVALID_MEMBER_ID;
import static com.imsnacks.Nyeoreumnagi.member.exception.MemberResponseStatus.NO_FARM_INFO;
import static com.imsnacks.Nyeoreumnagi.weather.exception.WeatherResponseStatus.*;

@Service
@RequiredArgsConstructor
public class WeatherService {

    private final MemberRepository memberRepository;
    private final ShortTermWeatherForecastRepository shortTermWeatherForecastRepository;
    private final WeatherRiskRepository weatherRiskRepository;

    public GetWeatherGraphResponse getWeatherGraph(Long memberId, WeatherMetric weatherMetric){
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new MemberException(INVALID_MEMBER_ID));
        Farm farm = member.getFarm();

        if(farm == null){
            throw new MemberException(NO_FARM_INFO);
        }

        int nx = farm.getNx();
        int ny = farm.getNy();

        List<ShortTermWeatherForecast> weatherInfos = shortTermWeatherForecastRepository.findAllByNxAndNy(nx, ny);
        if(weatherInfos.isEmpty()){
            throw new WeatherException(NO_WEATHER_LOCATION);
        }

        int maxValue = getMaxValue(weatherInfos, weatherMetric);
        int minValue = getMinValue(weatherInfos, weatherMetric);
        List<GetWeatherGraphResponse.ValuePerTime> valuePerTimes = extractWeatherGraphInfos(weatherInfos, weatherMetric, LocalDateTime.now().getHour()+1);

        int maxLimit = getUpperLimit(maxValue);
        int minLimit = getLowerLimit(minValue, weatherMetric);

        return new GetWeatherGraphResponse(maxLimit, minLimit, weatherMetric, valuePerTimes);
    }

    public GetFcstRiskResponse getWeatherRisk(Long memberId){
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new MemberException(INVALID_MEMBER_ID));
        Farm farm = member.getFarm();

        if(farm == null){
            throw new MemberException(NO_FARM_INFO);
        }

        int nx = farm.getNx();
        int ny = farm.getNy();

        List<WeatherRisk> weatherRisks = weatherRiskRepository.findByNxAndNyWithMaxJobExecutionId(nx, ny);
        List<GetFcstRiskResponse.WeatherRiskDto> weatherRiskDtos = WeatherRiskIntervalMerger.merge(weatherRisks);

        return new GetFcstRiskResponse(weatherRiskDtos);
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
            case PERCIPITATION: return forecast.getPrecipitation();
            case TEMPERATURE: return forecast.getTemperature();
            case HUMIDITY: return forecast.getHumidity();
            case WIND_SPEED: return forecast.getWindSpeed();
            default: throw new WeatherException(INVALID_WEATHER_METRIC);
        }
    }

    private int getLowerLimit(int value, WeatherMetric metric){
        if(metric.equals(WeatherMetric.TEMPERATURE)){
            return ((value - 1) / 5) * 5;
        }
        return (value == 0) ? 0 : ((value - 1) / 5) * 5;
    }

    private int getUpperLimit(int value){
        return ((value / 5) + 1) * 5;
    }
}
