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
        List<GetFcstRiskResponse.WeatherRiskDto> weatherRiskDtos = getRemovedOverLappingDTO(weatherRisks);

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

    private List<GetFcstRiskResponse.WeatherRiskDto> getRemovedOverLappingDTO(List<WeatherRisk> weatherRisks){
        class LinePoint implements Comparable<LinePoint> {
            int time;
            boolean isStart;
            WeatherRisk risk;
            LinePoint(int time, boolean isStart, WeatherRisk risk) {
                this.time = time;
                this.isStart = isStart;
                this.risk = risk;
            }
            @Override
            public int compareTo(LinePoint o) {
                if (this.time != o.time) return Integer.compare(this.time, o.time);
                return Boolean.compare(!this.isStart, !o.isStart); // start(true) 우선
            }
        }

        //각 구간의 시작점, 끝점을 List로 저장
        List<LinePoint> linePoints = new ArrayList<>();
        for (WeatherRisk r : weatherRisks) {
            linePoints.add(new LinePoint(r.getStartTime(), true, r));
            linePoints.add(new LinePoint(r.getEndTime(), false, r));
        }
        Collections.sort(linePoints);

        //우선순위 Comparator (enum클래스의 ordinal이 높을수록 우선순위 높음)
        Comparator<WeatherRisk> prioComp = Comparator
                .comparingInt((WeatherRisk r) -> r.getType().ordinal())
                .reversed();
        TreeSet<WeatherRisk> actives = new TreeSet<>(prioComp.thenComparingLong(WeatherRisk::getWeatherRiskId));

        List<GetFcstRiskResponse.WeatherRiskDto> result = new ArrayList<>();
        int lastTime = -1;
        WeatherRisk currentShow = null;

        //TreeSet에 하나씩 넣으면서 우선순위에 따른 구간 계산
        for (LinePoint lp : linePoints) {
            if (lastTime != -1 && lastTime < lp.time && currentShow != null) {
                if (!result.isEmpty()) {
                    GetFcstRiskResponse.WeatherRiskDto prev = result.get(result.size() - 1);
                    // 위험 종류가 같고, 시간 끊김 없이 연속되면 합침
                    if (prev.category().equals(currentShow.getType().getDescription())
                            && prev.endTime().equals(String.valueOf(lastTime))) {
                        GetFcstRiskResponse.WeatherRiskDto merged =
                                new GetFcstRiskResponse.WeatherRiskDto(prev.category(), prev.startTime(), String.valueOf(lp.time));
                        result.set(result.size() - 1, merged);
                    } else {
                        result.add(new GetFcstRiskResponse.WeatherRiskDto(currentShow.getType().getDescription(),
                                String.valueOf(lastTime), String.valueOf(lp.time)));
                    }
                } else {
                    result.add(new GetFcstRiskResponse.WeatherRiskDto(currentShow.getType().getDescription(),
                            String.valueOf(lastTime), String.valueOf(lp.time)));
                }
            }
            if (lp.isStart) {
                actives.add(lp.risk);
            } else {
                actives.remove(lp.risk);
            }
            currentShow = actives.isEmpty() ? null : actives.first();
            lastTime = lp.time;
        }

        return result;
    }
}
