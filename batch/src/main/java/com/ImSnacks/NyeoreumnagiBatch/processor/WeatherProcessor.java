package com.ImSnacks.NyeoreumnagiBatch.processor;

import com.ImSnacks.NyeoreumnagiBatch.reader.dto.VilageFcstResponseDto;
import com.ImSnacks.NyeoreumnagiBatch.utils.ForecastTimeUtils;
import com.ImSnacks.NyeoreumnagiBatch.utils.weatherRiskFilter.WeatherRiskFilter;
import com.ImSnacks.NyeoreumnagiBatch.writer.dto.ShortTermWeatherDto;
import lombok.RequiredArgsConstructor;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.LinkedHashMap;

@Component
@RequiredArgsConstructor
public class WeatherProcessor implements ItemProcessor<VilageFcstResponseDto, ShortTermWeatherDto> {
    private static final Set<String> targetCategories = Set.of("PCP", "TMP", "REH", "WSD");

    private final List<WeatherRiskFilter> weatherRiskFilters;

    @Override
    public ShortTermWeatherDto process(VilageFcstResponseDto response) throws Exception {
        //24시간 이내 정보만 filtering
        List<VilageFcstResponseDto.Item> within24HoursWeatherInfo = response.getWeatherInfo().stream()
                .filter(ForecastTimeUtils::isWithin24Hours)
                .toList();

        //필요한 metric만 뽑아서 시간별로 그룹핑
        Map<String, List<VilageFcstResponseDto.Item>> map = within24HoursWeatherInfo.stream()
                .filter(item -> targetCategories.contains(item.getCategory()))
                .collect(Collectors.groupingBy(
                        VilageFcstResponseDto.Item::getFcstTime,
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

    private ShortTermWeatherDto.WeatherForecastByTimeDto extractInfo(String fcstTimeStr, List<VilageFcstResponseDto.Item> weatherInfos) {
        int fcstTime = ForecastTimeUtils.getIntegerFromAPITime(fcstTimeStr);

        double precipitation = 0;
        double windSpeed = 0;
        int temperature = 0;
        int humidity = 0;

        for (VilageFcstResponseDto.Item item : weatherInfos) {
            String category = item.getCategory();
            String value = item.getFcstValue();

            switch (category) {
                case "PCP":
                    precipitation = parseDoubleOrDefault(value, 0);
                    break;
                case "TMP":
                    temperature = parseIntOrDefault(value, 0);
                    break;
                case "REH":
                    humidity = parseIntOrDefault(value, 0);
                    break;
                case "WSD":
                    windSpeed = parseDoubleOrDefault(value, 0);
                    break;
            }
        }

        return new ShortTermWeatherDto.WeatherForecastByTimeDto(fcstTime, precipitation, temperature, humidity, windSpeed);
    }

    private double parseDoubleOrDefault(String value, double defaultValue) {
        try {
            if (value.equals("강수없음"))
                return defaultValue;
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
            return defaultValue;
        }
    }

    private int parseIntOrDefault(String value, int defaultValue) {
        try {
            return Integer.parseInt(value);
        } catch (NumberFormatException e) {
            return defaultValue;
        }
    }
}
