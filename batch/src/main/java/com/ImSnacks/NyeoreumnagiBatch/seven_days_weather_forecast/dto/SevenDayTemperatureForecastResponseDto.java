package com.ImSnacks.NyeoreumnagiBatch.seven_days_weather_forecast.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.util.Pair;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public record SevenDayTemperatureForecastResponseDto(
        Response response
) {
    public SevenDayTemperatureForecastResponseDto.Item getSevenDayTemperatureInfo(){
        return response.body.items.item.get(0);
    }

    public record Response(
            Header header,
            Body body
    ) {}

    public record Header(
            String resultCode,
            String resultMsg
    ) {}

    public record Body(
            String dataType,
            Items items,
            int pageNo,
            int numOfRows,
            int totalCount
    ) {}

    public record Items(
            List<Item> item
    ) {}

    public record Item(
            String regId,
            int taMin4,
            int taMin4Low,
            int taMin4High,
            int taMax4,
            int taMax4Low,
            int taMax4High,
            int taMin5,
            int taMin5Low,
            int taMin5High,
            int taMax5,
            int taMax5Low,
            int taMax5High,
            int taMin6,
            int taMin6Low,
            int taMin6High,
            int taMax6,
            int taMax6Low,
            int taMax6High,
            int taMin7,
            int taMin7Low,
            int taMin7High,
            int taMax7,
            int taMax7Low,
            int taMax7High,
            int taMin8,
            int taMin8Low,
            int taMin8High,
            int taMax8,
            int taMax8Low,
            int taMax8High,
            int taMin9,
            int taMin9Low,
            int taMin9High,
            int taMax9,
            int taMax9Low,
            int taMax9High,
            int taMin10,
            int taMin10Low,
            int taMin10High,
            int taMax10,
            int taMax10Low,
            int taMax10High
    ) {
        public Pair<Integer, Integer> getNextDayTemperatureStatus(int n){
            switch (n){
                case 4: return Pair.of(taMin4, taMax4);
                case 5: return Pair.of(taMin5, taMax5);
                case 6: return Pair.of(taMin6, taMax6);
                case 7: return Pair.of(taMin7, taMax7);
                case 8: return Pair.of(taMin8, taMax8);
                case 9: return Pair.of(taMin9, taMax9);
                case 10:return Pair.of(taMin10, taMax10);
            }
            return null;
        }
    }
}
