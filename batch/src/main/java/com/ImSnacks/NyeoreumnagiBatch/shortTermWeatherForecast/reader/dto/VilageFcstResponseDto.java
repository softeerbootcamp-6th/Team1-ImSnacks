package com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast.reader.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
public class VilageFcstResponseDto {
    private Response response;

    public List<Item> getWeatherInfo(){
        if(response != null && response.getBody() != null && response.getBody().getItems() != null && response.getBody().getItems().getItem() != null){
            return response.getBody().getItems().getItem();
        }
        return null;
    }

    @Setter
    @Getter
    public static class Response {
        private Header header;
        private Body body;

    }

    @Setter
    @Getter
    public static class Header {
        private String resultCode;
        private String resultMsg;

    }

    @Setter
    @Getter
    public static class Body {
        private String dataType;
        private Items items;

    }

    @Setter
    @Getter
    public static class Items {
        private List<Item> item;

    }

    @Setter
    @Getter
    public static class Item {
        private String baseDate;
        private String baseTime;
        private String category;
        private String fcstDate;
        private String fcstTime;
        private String fcstValue;
        private int nx;
        private int ny;

    }
}