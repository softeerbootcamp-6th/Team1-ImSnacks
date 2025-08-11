package com.imsnacks.Nyeoreumnagi.work.dto.response;

import java.util.List;

public record RecommendWorksResponse(List<RecommendedWorksResponse> recommendedWorks, List<MyCropResponse> myCrops) {
    public record RecommendedWorksResponse(long workId, String startTime, String endTime, String recommendation, int neighborCount){
        public static RecommendedWorksResponse of(
                long workId,
                String startTime,
                String endTime,
                String recommendation,
                int neighborCount
        ) {
            return new RecommendedWorksResponse(workId, startTime, endTime, recommendation, neighborCount);
        }
    }
    public record MyCropResponse(long myCropId, String myCropName){
        public static MyCropResponse of(
                long myCropId,
                String myCropName
        ) {
            return new MyCropResponse(myCropId, myCropName);
        }
    }
}


