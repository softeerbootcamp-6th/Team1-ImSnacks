package com.ImSnacks.NyeoreumnagiBatch.air_quality.reader.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Setter;

import java.util.List;

public record AirQualityApiResponseDto(
        Response response
) {

    public record Response(
            Body body,
            Header header
    ) {}

    public record Header(
            String resultMsg,
            String resultCode
    ) {}

    public record Body(
            int totalCount,
            List<Item> items,
            int pageNo,
            int numOfRows
    ) {}

    public record Item(
            @JsonIgnore
            @Setter
            String so2Grade,
            String coFlag,
            String khaiValue,
            String so2Value,
            String coValue,
            String pm25Flag,
            String pm10Flag,
            String pm10Value,
            String o3Grade,
            String khaiGrade,
            String pm25Value,
            String no2Flag,
            String no2Grade,
            String o3Flag,
            String pm25Grade,
            String so2Flag,
            String dataTime,
            String coGrade,
            String no2Value,
            String pm10Grade,
            String o3Value
    ) {}

    public Item getFirstItem() {
        return response.body.items.get(0);
    }
}