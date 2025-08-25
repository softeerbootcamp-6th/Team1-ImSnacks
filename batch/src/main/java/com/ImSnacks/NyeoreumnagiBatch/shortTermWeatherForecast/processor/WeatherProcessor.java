package com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast.processor;

import com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast.processor.utils.ForecastTimeUtils;
import com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast.processor.dto.VilageFcstItemsDto;
import com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast.reader.dto.VilageFcstResponseDto;
import com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast.processor.utils.weatherRiskFilter.WeatherRiskFilter;
import com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast.writer.dto.ShortTermWeatherDto;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.LinkedHashMap;

@Slf4j
@Component
@RequiredArgsConstructor
public class WeatherProcessor implements ItemProcessor<VilageFcstResponseDto, ShortTermWeatherDto> {
    private static final Set<String> targetCategories = Set.of("PCP", "TMP", "REH", "WSD", "SNO", "SKY", "VEC");

    private final List<WeatherRiskFilter> weatherRiskFilters;

    @Override
    public ShortTermWeatherDto process(VilageFcstResponseDto response) throws Exception {
        log.info("processing vilage fcst response...");
        //48시간 이내 정보만 filtering
        List<VilageFcstItemsDto> within24HoursWeatherInfo = response.getWeatherInfo().stream()
                .filter(ForecastTimeUtils::isWithin24Hours)
                .map(item -> {
                    return new VilageFcstItemsDto(
                            item.getCategory(),
                            LocalDateTime.parse(item.getFcstDate() + item.getFcstTime(), DateTimeFormatter.ofPattern("yyyyMMddHHmm")),
                            item.getFcstValue(),
                            item.getNx(),
                            item.getNy()
                    );
                }).toList();

        //필요한 metric만 뽑아서 시간별로 그룹핑
        Map<LocalDateTime, List<VilageFcstItemsDto>> map = within24HoursWeatherInfo.stream()
                .filter(item -> targetCategories.contains(item.getCategory()))
                .collect(Collectors.groupingBy(
                        VilageFcstItemsDto::getFcstDateTime,
                        LinkedHashMap::new,
                        Collectors.toList()
                ));

        //DTO mapping
        List<ShortTermWeatherDto.WeatherForecastByTimeDto> weatherEntities = new ArrayList<>();
        map.forEach((time, itemList) -> {
            ShortTermWeatherDto.WeatherForecastByTimeDto weatherEntity = extractInfo(time, itemList);
            weatherEntities.add(weatherEntity);
        });

        //기상 특보 판단 로직 작성
        List<ShortTermWeatherDto.WeatherRiskDto> weatherRiskDtos = new ArrayList<>();
        weatherRiskFilters.forEach(filter -> {
            weatherRiskDtos.addAll(filter.filtering(map));
        });

        return ShortTermWeatherDto.builder()
                .nx(response.getWeatherInfo().get(0).getNx())
                .ny(response.getWeatherInfo().get(0).getNy())
                .weatherForecastByTimeList(weatherEntities)
                .weatherRiskList(weatherRiskDtos)
                .build();
    }

    private ShortTermWeatherDto.WeatherForecastByTimeDto extractInfo(LocalDateTime fcstDateTime, List<VilageFcstItemsDto> weatherInfos) {
        double precipitation = 0;
        double windSpeed = 0;
        int temperature = 0;
        int humidity = 0;
        double snow = 0;
        int skyStatus = 0;
        int windDirection = 0;

        for (VilageFcstItemsDto item : weatherInfos) {
            String category = item.getCategory();
            String value = item.getFcstValue();

            switch (category) {
                case "PCP":
                    precipitation = parseDoubleOrDefault(value);
                    break;
                case "TMP":
                    temperature = parseIntOrDefault(value);
                    break;
                case "REH":
                    humidity = parseIntOrDefault(value);
                    break;
                case "WSD":
                    windSpeed = parseDoubleOrDefault(value);
                    break;
                case "SNO":
                    snow = parseSnowDoubleOrDefault(value);
                    break;
                case "SKY":
                    skyStatus = parseSkyStatusOrDefault(value);
                    break;
                case "VEC":
                    windDirection = parseIntOrDefault(value);
                    break;
            }
        }

        return new ShortTermWeatherDto.WeatherForecastByTimeDto(fcstDateTime, precipitation, temperature, humidity, windSpeed, snow, skyStatus, windDirection);
    }

    private double parseDoubleOrDefault(String value) {
        try {
            if (value.equals("강수없음"))
                return 0;
            if (value.equals("30.0~50.0mm"))
                return 40;
            if (value.equals("50.0mm 이상"))
                return 50;
            if (value.contains("mm")) {
                String valueWithoutUnit = value.substring(0, value.indexOf("mm"));
                return Double.parseDouble(valueWithoutUnit);
            }
            return Double.parseDouble(value);
        } catch (NumberFormatException e) {
            return 0;
        }
    }

    private int parseIntOrDefault(String value) {
        try {
            return Integer.parseInt(value);
        } catch (NumberFormatException e) {
            return 0;
        }
    }

    private double parseSnowDoubleOrDefault(String value) {
        try {
            if (value.equals("적설없음"))
                return 0;
            if (value.equals("5.0cm 이상"))
                return 5;
            if (value.contains("cm")) {
                String valueWithoutUnit = value.substring(0, value.indexOf("cm"));
                return Double.parseDouble(valueWithoutUnit);
            }
            return Double.parseDouble(value);
        } catch (NumberFormatException e) {
            return 0;
        }
    }

    private int parseSkyStatusOrDefault(String value) {
        try {
            return Integer.parseInt(value);
        } catch (NumberFormatException e) {
            return 1;
        }
    }
}
