package com.imsnacks.Nyeoreumnagi.weather.service;

import com.imsnacks.Nyeoreumnagi.common.enums.WeatherCondition;
import com.imsnacks.Nyeoreumnagi.common.enums.WeatherMetric;
import com.imsnacks.Nyeoreumnagi.farm.entity.Farm;
import com.imsnacks.Nyeoreumnagi.member.exception.MemberException;
import com.imsnacks.Nyeoreumnagi.member.repository.FarmRepository;
import com.imsnacks.Nyeoreumnagi.weather.dto.response.*;
import com.imsnacks.Nyeoreumnagi.weather.entity.DashboardWeatherForecast;
import com.imsnacks.Nyeoreumnagi.weather.entity.SevenDayWeatherForecast;
import com.imsnacks.Nyeoreumnagi.weather.entity.ShortTermWeatherForecast;
import com.imsnacks.Nyeoreumnagi.weather.entity.WeatherRisk;
import com.imsnacks.Nyeoreumnagi.weather.exception.WeatherException;
import com.imsnacks.Nyeoreumnagi.weather.repository.*;
import com.imsnacks.Nyeoreumnagi.weather.service.projection_entity.*;
import com.imsnacks.Nyeoreumnagi.weather.util.WeatherRiskIntervalMerger;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

import static com.imsnacks.Nyeoreumnagi.common.enums.WeatherMetric.*;
import static com.imsnacks.Nyeoreumnagi.common.enums.WindDirection.getDirectionStringFromDegree;
import static com.imsnacks.Nyeoreumnagi.member.exception.MemberResponseStatus.NO_FARM_INFO;
import static com.imsnacks.Nyeoreumnagi.weather.exception.WeatherResponseStatus.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class WeatherService {

    private final FarmRepository farmRepository;
    private final ShortTermWeatherForecastRepository shortTermWeatherForecastRepository;
    private final WeatherRiskRepository weatherRiskRepository;
    private final DashboardTodayWeatherRepository dashboardTodayWeatherRepository;
    private final DashboardWeatherForecastRepository dashboardWeatherForecastRepository;
    private final SevenDayWeatherForecastRepository sevenDayWeatherForecastRepository;

    public GetWeatherGraphResponse getWeatherGraph(Long memberId, WeatherMetric weatherMetric) {
        assert(memberId != null);
        Farm farm = farmRepository.findByMember_Id(memberId).orElseThrow(() -> new MemberException(NO_FARM_INFO));

        int nx = farm.getNx();
        int ny = farm.getNy();

        List<ShortTermWeatherForecast> weatherInfos = shortTermWeatherForecastRepository.findAllByNxAndNy(nx, ny);
        if (weatherInfos.isEmpty()) {
            throw new WeatherException(NO_WEATHER_LOCATION);
        }

        int maxValue = getMaxValue(weatherInfos, weatherMetric);
        int minValue = getMinValue(weatherInfos, weatherMetric);
        List<GetWeatherGraphResponse.ValuePerTime> valuePerTimes = extractWeatherGraphInfos(weatherInfos, weatherMetric, LocalDateTime.now().getHour());

        int maxLimit = getUpperLimit(maxValue);
        int minLimit = getLowerLimit(minValue, weatherMetric);

        LocalDateTime lastUpdatedTime = weatherInfos.get(0).getUpdateAt();
        boolean isUpdated = weatherInfos.get(0).isUpdated();

        return new GetWeatherGraphResponse(maxLimit, minLimit, weatherMetric, isUpdated, lastUpdatedTime, valuePerTimes);
    }

    public GetFcstRiskResponse getWeatherRisk(Long memberId) {
        assert(memberId != null);
        Farm farm = farmRepository.findByMember_Id(memberId).orElseThrow(() -> new MemberException(NO_FARM_INFO));

        int nx = farm.getNx();
        int ny = farm.getNy();

        List<WeatherRisk> weatherRisks = weatherRiskRepository.findByNxAndNyWithMaxJobExecutionId(nx, ny);
        List<GetFcstRiskResponse.WeatherRiskDto> weatherRiskDtos = WeatherRiskIntervalMerger.merge(weatherRisks);

        return new GetFcstRiskResponse(weatherRiskDtos);
    }

    public GetWeatherConditionResponse getWeatherCondition(Long memberId) {
        assert(memberId != null);
        Farm farm = farmRepository.findByMember_Id(memberId).orElseThrow(() -> new MemberException(NO_FARM_INFO));

        int nx = farm.getNx();
        int ny = farm.getNy();

        int nowTime = LocalDateTime.now().getHour();
        ShortTermWeatherForecast weatherInfoNearest = shortTermWeatherForecastRepository.findAllByNxAndNy(nx, ny)
                .stream()
                .filter(weather -> weather.getFcstTime() <= nowTime)
                .max(Comparator.comparingInt(ShortTermWeatherForecast::getFcstTime))
                .orElseThrow(() -> new WeatherException(NO_WEATHER_VALUE));

        SunriseSunSetTime sunriseSunSetTime = dashboardTodayWeatherRepository.findSunRiseSetByNxAndNy(nx, ny).orElseThrow(() -> new WeatherException(NO_SUNRISE_SET));
        WeatherCondition weatherCondition = weatherInfoNearest.getWeatherCondition(sunriseSunSetTime);
        int temperature = weatherInfoNearest.getTemperature();

        return new GetWeatherConditionResponse(weatherCondition.toString(), weatherCondition.getKeyword(), temperature);
    }

    public GetWeatherBriefingResponse getWeatherBriefing(final Long memberId) {
        assert(memberId != null);
        Farm farm = farmRepository.findByMember_Id(memberId).orElseThrow(() -> new MemberException(NO_FARM_INFO));

        final int nx = farm.getNx();
        final int ny = farm.getNy();

        final LocalDateTime now = LocalDateTime.now();

        final List<WeatherRisk> allRisks = weatherRiskRepository.findByNxAndNyWithMaxJobExecutionId(nx, ny);
        if (allRisks.isEmpty()) { // 기상 특이 사항이 없는 것이니 exception이 아닌 false 응답을 보낸다.
            return new GetWeatherBriefingResponse(false, Briefing.buildGreetingMsg(now));
        }

        final List<WeatherRisk> filteredRisk = allRisks.stream()
                .filter(r -> r.getEndTime().isAfter(now))
                .sorted(Briefing.RISK_COMPARATOR) // 우선 순위가 가장 앞서는 것이 맨 앞에 오도록 정렬한다.
                .toList();
        if (filteredRisk.isEmpty()) { // 기상 특이 사항이 없는 것이니 exception이 아닌 false 응답을 보낸다.
            return new GetWeatherBriefingResponse(false, Briefing.buildGreetingMsg(now));
        }
        final String weatherRiskmsg = Briefing.buildWeatherRiskMsg(filteredRisk.get(0));

        return new GetWeatherBriefingResponse(true, weatherRiskmsg);
    }

    public GetSunRiseSetTimeResponse getSunRiseSetTime(final Long memberId) {
        assert(memberId != null);
        Farm farm = farmRepository.findByMember_Id(memberId).orElseThrow(() -> new MemberException(NO_FARM_INFO));

        final int nx = farm.getNx();
        final int ny = farm.getNy();

        SunriseSunSetTime sunriseSunSetTime = dashboardTodayWeatherRepository.findSunRiseSetByNxAndNy(nx, ny).orElseThrow(() -> new WeatherException(NO_SUNRISE_SET));
        validateSunriseSetTime(sunriseSunSetTime);

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm");
        String startTime = sunriseSunSetTime.getSunriseTime().format(formatter);
        String endTime = sunriseSunSetTime.getSunSetTime().format(formatter);

        return new GetSunRiseSetTimeResponse(startTime, endTime);
    }

    public GetUVInfoResponse getUVInfo(final Long memberId) {
        assert(memberId != null);
        Farm farm = farmRepository.findByMember_Id(memberId).orElseThrow(() -> new MemberException(NO_FARM_INFO));

        final int nx = farm.getNx();
        final int ny = farm.getNy();

        UVInfo uvInfo = dashboardTodayWeatherRepository.findUVByNxAndNy(nx, ny).orElseThrow(() -> new WeatherException(NO_UV_INFO));
        validateUVInfo(uvInfo);

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm");
        String startTime = uvInfo.getMaxUVStart().format(formatter);
        String endTime = uvInfo.getMaxUVEnd().format(formatter);

        return new GetUVInfoResponse(startTime, endTime, uvInfo.getMaxUVIndex());
    }

    public List<GetSevenDaysForecastResponse> getSevenDaysForecast(Long memberId) {
        Farm farm = farmRepository.findByMember_Id(memberId).orElseThrow(() -> new MemberException(NO_FARM_INFO));
        String regionCode = farm.getMidTempRegionCode();
        List<SevenDayWeatherForecast> sevenDayWeatherForecasts = sevenDayWeatherForecastRepository.findByRegionCodeAndDateBetween(regionCode, LocalDate.now(), LocalDate.now().plusDays(6));

        if (sevenDayWeatherForecasts.size() != 7) {
            throw new WeatherException(INVALID_SEVEN_DAY_FORECAST_COUNT);
        }
        return sevenDayWeatherForecasts.stream().map(forecast -> new GetSevenDaysForecastResponse(
                forecast.getDayOfWeek(LocalDate.now()),
                forecast.getWeatherCondition(),
                forecast.getMaxTemperature(),
                forecast.getMinTemperature()
        )).toList();
    }

    public GetWindInfoResponse getWindInfo(final Long memberId) {
        assert(memberId != null);
        Farm farm = farmRepository.findByMember_Id(memberId).orElseThrow(() -> new MemberException(NO_FARM_INFO));

        final int nx = farm.getNx();
        final int ny = farm.getNy();

        WindInfo windInfo = dashboardTodayWeatherRepository.findWindByNxAndNy(nx, ny).orElseThrow(()-> new WeatherException(NO_WIND_INFO));
        validateWindInfo(windInfo);

        Integer windSpeed = windInfo.getMaxWindSpeed();
        Integer degree = windInfo.getWindDirection();
        String windDirection = getDirectionStringFromDegree(degree);

        return new GetWindInfoResponse(windDirection, degree, windSpeed);
    }

    public GetHumidityResponse getHumidity(final Long memberId) {
        assert(memberId != null);
        Farm farm = farmRepository.findByMember_Id(memberId).orElseThrow(() -> new MemberException(NO_FARM_INFO));

        final int nx = farm.getNx();
        final int ny = farm.getNy();

        HumidityInfo humidityInfo = dashboardTodayWeatherRepository.findHumidityByNxAndNy(nx, ny).orElseThrow(() -> new WeatherException(NO_HUMIDITY_INFO));
        validateHumidityInfo(humidityInfo);

        return new GetHumidityResponse(humidityInfo.getMaxHumidity());
    }

    public GetDailyMaxPrecipitationResponse getDailyMaxPrecipitation(final Long memberId) {
        assert(memberId != null);
        Farm farm = farmRepository.findByMember_Id(memberId).orElseThrow(() -> new MemberException(NO_FARM_INFO));

        final int nx = farm.getNx();
        final int ny = farm.getNy();

        PrecipitationInfo precipitationInfo = dashboardTodayWeatherRepository.findPrecipitationByNxAndNy(nx,ny).orElseThrow(()-> new WeatherException(NO_PRECIPITATION));
        validatePrecipitationInfo(precipitationInfo);

        return new GetDailyMaxPrecipitationResponse(precipitationInfo.getMaxPrecipitation());
    }

    public GetAirQualityResponse getAirQuality(final Long memberId) {
        assert(memberId != null);
        Farm farm = farmRepository.findByMember_Id(memberId).orElseThrow(() -> new MemberException(NO_FARM_INFO));

        final int nx = farm.getNx();
        final int ny = farm.getNy();

        AirQualityInfo airQualityInfo = dashboardTodayWeatherRepository.findAirQualityByNxAndNy(nx, ny).orElseThrow(() -> new WeatherException(NO_PRECIPITATION));
        validateAirQualityInfo(airQualityInfo);

        return new GetAirQualityResponse(airQualityInfo.getPm10Value(), airQualityInfo.getPm10Grade(), airQualityInfo.getPm25Value(), airQualityInfo.getPm25Grade());
    }


    public GetTemperatureResponse getTemperature(final Long memberId) {
        assert(memberId != null);
        Farm farm = farmRepository.findByMember_Id(memberId).orElseThrow(() -> new MemberException(NO_FARM_INFO));

        final int nx = farm.getNx();
        final int ny = farm.getNy();

        List<Integer> valid3HourIntervals = List.of(2,5,8,11,14,17,20,23);
        List<DashboardWeatherForecast> weathers =
                dashboardWeatherForecastRepository.findByNxAndNyAndFcstTimeInOrderByFcstTime(nx, ny, valid3HourIntervals);

        validateWeatherInfos(weathers);

        Integer maxTemperature = weathers.stream()
                .map(DashboardWeatherForecast::getTemperature)
                .max(Comparator.comparingInt(Integer::intValue))
                .orElseThrow(() -> new WeatherException(NO_TEMPERATURE_INFO));
        Integer minTemperature = weathers.stream()
                .map(DashboardWeatherForecast::getTemperature)
                .min(Comparator.comparingInt(Integer::intValue))
                .orElseThrow(() -> new WeatherException(NO_TEMPERATURE_INFO));

        List<GetTemperatureResponse.TemperaturePerTime> temperaturePerTimes = weathers.stream()
                .map(GetTemperatureResponse.TemperaturePerTime::from)
                .toList();

        return new GetTemperatureResponse(maxTemperature, minTemperature, temperaturePerTimes);
    }

    public List<GetWeatherStatusResponse> getWeatherStatus(final Long memberId) {
        assert(memberId != null);
        Farm farm = farmRepository.findByMember_Id(memberId).orElseThrow(() -> new MemberException(NO_FARM_INFO));

        final int nx = farm.getNx();
        final int ny = farm.getNy();

        ShortTermWeatherForecast weatherInfo = shortTermWeatherForecastRepository.findTopByNxAndNyAndFcstTimeLessThanEqualOrderByFcstTimeDesc(nx, ny, LocalDateTime.now().getHour())
                .orElseThrow(() -> new WeatherException(NO_WEATHER_VALUE));

        List<GetWeatherStatusResponse> weatherStatus = new ArrayList<>();
        weatherStatus.add(new GetWeatherStatusResponse(PRECIPITATION.getMetricName(), (int)weatherInfo.getPrecipitation(), PRECIPITATION.toString()));
        weatherStatus.add(new GetWeatherStatusResponse(TEMPERATURE.getMetricName(), weatherInfo.getTemperature(), TEMPERATURE.toString()));
        weatherStatus.add(new GetWeatherStatusResponse(HUMIDITY.getMetricName(), weatherInfo.getHumidity(), HUMIDITY.toString()));
        weatherStatus.add(new GetWeatherStatusResponse(WIND_SPEED.getMetricName(), (int)weatherInfo.getWindSpeed(), WIND_SPEED.toString()));

        return weatherStatus;
    }

    private void validateWeatherInfos(List<DashboardWeatherForecast> weathers) {
        if(weathers.size() != 8) {
            throw new WeatherException(NO_TEMPERATURE_INFO);
        }
        for(DashboardWeatherForecast dashboardWeatherForecast : weathers) {
            if(dashboardWeatherForecast.getTemperature() == null){
                throw new WeatherException(NO_TEMPERATURE_INFO);
            }
        }
    }

    private void validatePrecipitationInfo(PrecipitationInfo precipitationInfo) {
        if(precipitationInfo.getMaxPrecipitation() == null){
            throw new WeatherException(NO_PRECIPITATION);
        }
    }

    private void validateAirQualityInfo(AirQualityInfo airQualityInfo) {
        if(airQualityInfo.getPm10Grade() == null || airQualityInfo.getPm10Grade() == null
                || airQualityInfo.getPm10Grade() == null  || airQualityInfo.getPm10Grade() == null
        ){
            throw new WeatherException(NO_AIR_QUALITY_INFO);
        }
    }

    private void validateHumidityInfo(HumidityInfo humidityInfo) {
        if(humidityInfo.getMaxHumidity() == null){
            throw new WeatherException(NO_HUMIDITY_INFO);
        }
    }

    private void validateWindInfo(WindInfo windInfo) {
        if(windInfo.getWindDirection() == null || windInfo.getMaxWindSpeed() == null) {
            throw new WeatherException(NO_WIND_INFO);
        }
    }

    private void validateUVInfo(UVInfo uvInfo) {
        if (uvInfo.getMaxUVStart() == null || uvInfo.getMaxUVEnd() == null) {
            throw new WeatherException(NO_UV_INFO);
        }
    }

    private void validateSunriseSetTime(final SunriseSunSetTime sunriseSunSetTime) {
        if (sunriseSunSetTime == null || sunriseSunSetTime.getSunriseTime() == null || sunriseSunSetTime.getSunSetTime() == null) {
            throw new WeatherException(NO_SUNRISE_SET);
        }
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
            case PRECIPITATION:
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
