package com.ImSnacks.NyeoreumnagiBatch.ultraviolet.reader.dto;

import java.util.List;

public record UVReaderResponseDto(
    Response response
) {
    public record Response(
        Header header,
        Body body
    ){}

    public record Header(
            String resultCode,
            String resultMsg
    ){}

    public record Body(
            String dataType,
            List<Item> items,
            int pageNo,
            int numOfRows,
            int totalCount
    ){}

    public record Item(
            String code,
            String areaNo,
            String date,
            String h0,
            String h3,
            String h6,
            String h9,
            String h12,
            String h15,
            String h18,
            String h21,
            String h24,
            String h27,
            String h30,
            String h33,
            String h36,
            String h39,
            String h42,
            String h45,
            String h48,
            String h51,
            String h54,
            String h57,
            String h60,
            String h63,
            String h66,
            String h69,
            String h72,
            String h75
    ){}
}
