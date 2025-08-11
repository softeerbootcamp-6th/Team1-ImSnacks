package com.imsnacks.Nyeoreumnagi.work.dto.response;

import java.util.List;

public record RecommendWorksResponse(List<RecommendedWorksResponse> recommendedWorks, List<MyCropResponse> myCrops) {
    public record RecommendedWorksResponse(long workId, String startTime, String endTime, String recommendation,
                                           int neighborCount) {
    }

    public record MyCropResponse(long myCropId, String myCropName) {
    }
}
