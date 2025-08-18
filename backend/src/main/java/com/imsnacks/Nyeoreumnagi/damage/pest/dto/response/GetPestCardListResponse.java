package com.imsnacks.Nyeoreumnagi.damage.pest.dto.response;

import java.util.List;

public record GetPestCardListResponse(
        List<PestCard> pestRisks,
        List<MyCropCard> myCrops
) {
    public record PestCard(
            long pestRiskId,
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
