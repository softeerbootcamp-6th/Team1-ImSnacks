package com.ImSnacks.NyeoreumnagiBatch.processor;

import com.ImSnacks.NyeoreumnagiBatch.dto.VilageFcstResponse;
import com.ImSnacks.NyeoreumnagiBatch.utils.ForecastTimeUtils;
import com.ImSnacks.NyeoreumnagiBatch.writer.dto.ShortTermWeatherDto;
import org.springframework.batch.item.ItemProcessor;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

public class WeatherProcessor implements ItemProcessor<VilageFcstResponse, ShortTermWeatherDto> {
    @Override
    public ShortTermWeatherDto process(VilageFcstResponse response) throws Exception {
        List<VilageFcstResponse.Item> within24HoursWeatherInfo = response.getWeatherInfo().stream()
                .filter(ForecastTimeUtils::isWithin24Hours)
                .toList();

        Set<String> targetCategories = Set.of("PCP", "TMP", "REH", "WSD");
        Map<String, List<VilageFcstResponse.Item>> map = within24HoursWeatherInfo.stream()
                .filter(item -> targetCategories.contains(item.getCategory()))
                .collect(Collectors.groupingBy(VilageFcstResponse.Item::getFcstTime));

        List<ShortTermWeatherDto.WeatherForecastByTime> weatherEntities = new ArrayList<>();
        map.forEach((time, itemList) -> {
            ShortTermWeatherDto.WeatherForecastByTime weatherEntity = extractInfo(time, itemList);
            weatherEntities.add(weatherEntity);
        });

        //TODO: WeatherRisk DTO 생성
        //전략 패턴으로 기상 특보 판단 로직 작성

        return null;
    }

    private ShortTermWeatherDto.WeatherForecastByTime extractInfo(String fcstTimeStr, List<VilageFcstResponse.Item> weatherInfos) {
        int fcstTime = ForecastTimeUtils.getIntegerFromAPITime(fcstTimeStr);

        double precipitation = 0;
        double windSpeed = 0;
        int temperature = 0;
        int humidity = 0;

        for (VilageFcstResponse.Item item : weatherInfos) {
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

        return new ShortTermWeatherDto.WeatherForecastByTime(fcstTime, precipitation, temperature, humidity, windSpeed);
    }

    private double parseDoubleOrDefault(String value, double defaultValue) {
        try {
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
