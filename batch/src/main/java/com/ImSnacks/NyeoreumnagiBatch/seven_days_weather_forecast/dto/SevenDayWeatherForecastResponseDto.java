package com.ImSnacks.NyeoreumnagiBatch.seven_days_weather_forecast.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record SevenDayWeatherForecastResponseDto(

        Response response
) {
    public record Response(
            Header header,
            Body body
    ) {}

    public SevenDayWeatherForecastResponseDto.Item getSevenDayWeatherInfo(){
        return response.body.items.item.get(0);
    }

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
            java.util.List<Item> item
    ) {}

    public record Item(
            String regId,
            int rnSt4Am,
            int rnSt4Pm,
            int rnSt5Am,
            int rnSt5Pm,
            int rnSt6Am,
            int rnSt6Pm,
            int rnSt7Am,
            int rnSt7Pm,
            int rnSt8,
            int rnSt9,
            int rnSt10,
            String wf4Am,
            String wf4Pm,
            String wf5Am,
            String wf5Pm,
            String wf6Am,
            String wf6Pm,
            String wf7Am,
            String wf7Pm,
            String wf8,
            String wf9,
            String wf10
    ) {
        public String getNextDayWeatherStatus(int n){
            switch (n){
                case 4: return wf4Am;
                case 5: return wf5Am;
                case 6: return wf6Am;
                case 7: return wf7Am;
                case 8: return wf8;
                case 9: return wf9;
                case 10: return wf10;
            }
            return null;
        }
    }
}
