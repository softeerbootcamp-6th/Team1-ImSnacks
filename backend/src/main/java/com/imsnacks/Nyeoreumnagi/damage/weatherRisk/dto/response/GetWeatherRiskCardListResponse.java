package com.imsnacks.Nyeoreumnagi.damage.weatherRisk.dto.response;

import java.util.List;

public record GetWeatherRiskCardListResponse(
        String riskName,
        List<Risk> risks,
        List<MyCropDto> myCropList
) {
    public record Risk(
            String name,
            String description,
            String damageType
    ){}

    public record MyCropDto(
            String myCropName
    ){}
}
