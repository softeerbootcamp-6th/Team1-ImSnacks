package com.ImSnacks.NyeoreumnagiBatch.sunRiseSet.reader.dto;

import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlElementWrapper;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;

import java.util.List;

public record SunRiseSetReaderResponseDto (
        Script[] script,
        Header header,
        Body body
){
    public record Script() {} // <script/> 빈 태그

    public record Header(
            @JacksonXmlProperty(localName = "resultCode")
            String resultCode,
            @JacksonXmlProperty(localName = "resultMsg")
            String resultMsg
    ) {}

    public record Body(
            Items items,
            @JacksonXmlProperty(localName = "numOfRows")
            int numOfRows,
            @JacksonXmlProperty(localName = "pageNo")
            int pageNo,
            @JacksonXmlProperty(localName = "totalCount")
            int totalCount
    ) {}

    public record Items(
            @JacksonXmlElementWrapper(useWrapping = false)
            @JacksonXmlProperty(localName = "item")
            List<Item> item
    ) {}

    public record Item(
            String aste,
            String astm,
            String civile,
            String civilm,
            String latitude,
            String latitudeNum,
            String location,
            String locdate,
            String longitude,
            String longitudeNum,
            String moonrise,
            String moonset,
            String moontransit,
            String naute,
            String nautm,
            String sunrise,
            String sunset,
            String suntransit
    ) {}

    public String getSunRise(){
        return body.items.item.get(0).sunrise;
    }

    public String getSunset(){
        return body.items.item.get(0).sunset;
    }
}