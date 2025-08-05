package com.ImSnacks.NyeoreumnagiBatch.reader.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Setter
@Getter
@ToString
public class VilageFcstResponseDto {
    // getters, setters
    private Response response;

    @Setter
    @Getter
    @ToString
    public static class Response {
        private Header header;
        private Body body;
    }

    @Setter
    @Getter
    @ToString
    public static class Header {
        private String resultCode;
        private String resultMsg;
    }

    @Setter
    @Getter
    @ToString
    public static class Body {
        private String dataType;
        private Items items;
    }

    @Setter
    @Getter
    @ToString
    public static class Items {
        private List<Item> item;
    }

    @Setter
    @Getter
    @ToString
    public static class Item {
        // getters and setters
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