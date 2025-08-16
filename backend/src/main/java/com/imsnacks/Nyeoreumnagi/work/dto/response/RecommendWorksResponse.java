package com.imsnacks.Nyeoreumnagi.work.dto.response;

import java.util.List;

public record RecommendWorksResponse(List<RecommendedWorksResponse> recommendedWorks, List<MyCropResponse> myCrops) {
    public record RecommendedWorksResponse(String workName, long workId, int neighborCount, List<RecommendationDurations> recommendationDurations) {
    }

    public record MyCropResponse(long myCropId, String myCropName) {
    }

    public record RecommendationDurations(String startTime, String endTime, String recommendation) {
    }
}
