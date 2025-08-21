package com.imsnacks.Nyeoreumnagi.damage.pest.dto.response;

import com.imsnacks.Nyeoreumnagi.damage.pest.enums.DamageType;

import java.util.List;

public record GetPestCardListResponse(
        List<PestCard> pestRisks,
        List<MyCropCard> myCrops
) {
    public record PestCard(
            long pestRiskId,
            DamageType damageType,
            String name,
            String description
    ) {
    }

    public record MyCropCard(
            long myCropId,
            String myCropName
    ) {
    }
}
