package com.imsnacks.Nyeoreumnagi.work.service;

import com.imsnacks.Nyeoreumnagi.lifecycle.LifeCycleResolver;
import com.imsnacks.Nyeoreumnagi.lifecycle.entity.LifeCycle;
import com.imsnacks.Nyeoreumnagi.lifecycle.repository.LifeCycleAndRecommendedWorkRepository;
import com.imsnacks.Nyeoreumnagi.lifecycle.repository.LifeCycleRepository;
import com.imsnacks.Nyeoreumnagi.member.entity.Farm;
import com.imsnacks.Nyeoreumnagi.member.exception.MemberException;
import com.imsnacks.Nyeoreumnagi.member.repository.FarmRepository;
import com.imsnacks.Nyeoreumnagi.weather.entity.ShortTermWeatherForecast;
import com.imsnacks.Nyeoreumnagi.weather.repository.ShortTermWeatherForecastRepository;
import com.imsnacks.Nyeoreumnagi.work.dto.response.RecommendWorksResponse;
import com.imsnacks.Nyeoreumnagi.work.dto.response.RecommendWorksResponse.RecommendedWorksResponse;
import com.imsnacks.Nyeoreumnagi.work.entity.LifeCycleAndRecommendedWork;
import com.imsnacks.Nyeoreumnagi.work.entity.MyCrop;
import com.imsnacks.Nyeoreumnagi.work.entity.RecommendedWork;
import com.imsnacks.Nyeoreumnagi.work.exception.CropException;
import com.imsnacks.Nyeoreumnagi.work.exception.WorkException;
import com.imsnacks.Nyeoreumnagi.work.exception.WorkResponseStatus;
import com.imsnacks.Nyeoreumnagi.work.repository.MyCropRepository;
import com.imsnacks.Nyeoreumnagi.work.util.WorkScheduleCalculator;
import lombok.RequiredArgsConstructor;
import org.locationtech.jts.geom.Point;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;

import static com.imsnacks.Nyeoreumnagi.member.exception.MemberResponseStatus.NO_FARM_INFO;
import static com.imsnacks.Nyeoreumnagi.work.exception.CropResponseStatus.MY_CROP_NOT_FOUND;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RecommendedWorkService {
    private static final ZoneId ZONE = ZoneId.of("Asia/Seoul");

    private final MyCropRepository myCropRepository;
    private final LifeCycleRepository lifeCycleRepository;
    private final LifeCycleAndRecommendedWorkRepository lifeCycleAndRecommendedWorkRepository;
    private final ShortTermWeatherForecastRepository shortTermWeatherForecastRepository;
    private final FarmRepository farmRepository;
    private final LifeCycleResolver lifeCycleResolver;
    private final WorkScheduleCalculator workScheduleCalculator;

    private final NearbyAggregationService nearbyService;

    public RecommendWorksResponse recommendWorks(Long myCropId, Long memberId) {
        LocalDateTime now = LocalDateTime.now(ZONE);

        List<MyCrop> myCropList = new ArrayList<>();
        if (myCropId == null) {
            myCropList = myCropRepository.findAllByMember_IdOrderById(memberId);
            if(myCropList.isEmpty()){
                throw new WorkException(WorkResponseStatus.MY_CROP_NOT_FOUND);
            }
            myCropId = myCropList.get(0).getId();
        }
        MyCrop myCrop = myCropRepository.findById(myCropId).orElseThrow(() -> new CropException(MY_CROP_NOT_FOUND));
        List<LifeCycle> lifeCyclesOrderByStep = lifeCycleRepository.findAllByCrop_IdOrderByStep(myCrop.getCrop().getId());

        long nowLifeCycleId = lifeCycleResolver.calculateLifeCycle(myCrop, lifeCyclesOrderByStep, now).getId();


        Farm farm = farmRepository.findByMember_Id(memberId).orElseThrow(() -> new MemberException(NO_FARM_INFO));
        List<ShortTermWeatherForecast> forecasts = shortTermWeatherForecastRepository.findAllByNxAndNy(farm.getNx(), farm.getNy());

        List<RecommendedWorksResponse> recommendedWorksResponse = new ArrayList<>();

        List<RecommendedWork> limitedWorks = lifeCycleAndRecommendedWorkRepository.findAllByLifeCycle_Id(nowLifeCycleId)
                .stream()
                .map(LifeCycleAndRecommendedWork::getRecommendedWork)
                .limit(5)
                .toList();

        for (RecommendedWork recommendedWork : limitedWorks) {
            int neighborCount = (int) getNeighborCountForWork(memberId, recommendedWork.getId());
            recommendedWorksResponse.addAll(workScheduleCalculator.windowsForWork(recommendedWork, forecasts, neighborCount, now));
        }
        List<RecommendWorksResponse.MyCropResponse> myCropResponses = myCropList.stream().map(my -> new RecommendWorksResponse.MyCropResponse(my.getId(), my.getCrop().getName())).toList();
        return new RecommendWorksResponse(recommendedWorksResponse, myCropResponses);
    }

    private long getNeighborCountForWork(long currentMemberId, long workId) {
        Point loc = farmRepository.findByMember_Id(currentMemberId)
                .orElseThrow()
                .getLocation();

        double centerLat = loc.getY();
        double centerLon = loc.getX();

        return nearbyService.countNeighborsWithin5kmUsingFact(
                workId, currentMemberId, centerLat, centerLon, true, 3
        );
    }

}
