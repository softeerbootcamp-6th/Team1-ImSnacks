package com.imsnacks.Nyeoreumnagi.work.service;

import com.imsnacks.Nyeoreumnagi.member.entity.Farm;
import com.imsnacks.Nyeoreumnagi.member.exception.MemberException;
import com.imsnacks.Nyeoreumnagi.member.repository.FarmRepository;
import com.imsnacks.Nyeoreumnagi.weather.entity.ShortTermWeatherForecast;
import com.imsnacks.Nyeoreumnagi.weather.repository.ShortTermWeatherForecastRepository;
import com.imsnacks.Nyeoreumnagi.work.dto.response.RecommendWorksResponse;
import com.imsnacks.Nyeoreumnagi.work.dto.response.RecommendWorksResponse.RecommendedWorksResponse;
import com.imsnacks.Nyeoreumnagi.work.entity.LifeCycle;
import com.imsnacks.Nyeoreumnagi.work.entity.LifeCycleAndRecommendedWork;
import com.imsnacks.Nyeoreumnagi.work.entity.MyCrop;
import com.imsnacks.Nyeoreumnagi.work.entity.RecommendedWork;
import com.imsnacks.Nyeoreumnagi.work.exception.CropException;
import com.imsnacks.Nyeoreumnagi.work.exception.WorkException;
import com.imsnacks.Nyeoreumnagi.work.repository.LifeCycleAndRecommendedWorkRepository;
import com.imsnacks.Nyeoreumnagi.work.repository.LifeCycleRepository;
import com.imsnacks.Nyeoreumnagi.work.repository.MyCropRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

import static com.imsnacks.Nyeoreumnagi.member.exception.MemberResponseStatus.NO_FARM_INFO;
import static com.imsnacks.Nyeoreumnagi.work.exception.CropResponseStatus.MY_CROP_NOT_FOUND;
import static com.imsnacks.Nyeoreumnagi.work.exception.WorkResponseStatus.LIFE_CYCLE_NOT_FOUND;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RecommendedWorkService {
    private final MyCropRepository myCropRepository;
    private final LifeCycleRepository lifeCycleRepository;
    private final LifeCycleAndRecommendedWorkRepository lifeCycleAndRecommendedWorkRepository;
    private final ShortTermWeatherForecastRepository shortTermWeatherForecastRepository;
    private final FarmRepository farmRepository;

    static final int HIGH_TEMP = 30;
    static final int LOW_TEMP = 5;
    static final int HIGH_HUMIDITY = 80;
    static final int LOW_HUMIDITY = 30;
    static final double STRONG_WIND = 14.0;
    static final double RAIN_MM = 0.1;


    public RecommendWorksResponse recommendWorks(Long myCropId, Long memberId) {
        List<MyCrop> myCropList = new ArrayList<>();
        if (myCropId == null) {
            myCropList = myCropRepository.findAllByOrderByCrop_Id();
            myCropId = myCropList.get(0).getId();
        }
        MyCrop myCrop = myCropRepository.findById(myCropId).orElseThrow(() -> new CropException(MY_CROP_NOT_FOUND));
        List<LifeCycle> lifeCyclesOrderByStep = lifeCycleRepository.findAllByCrop_IdOrderByStep(myCrop.getCrop().getId());

        long nowLifeCycleId = 0;
        long myCropAge = ChronoUnit.DAYS.between(myCrop.getGerminationTime(), LocalDateTime.now());
        for (LifeCycle lifeCycle : lifeCyclesOrderByStep) {
            if (myCropAge - lifeCycle.getDuration() <= 0) {
                nowLifeCycleId = lifeCycle.getId();
                break;
            }
        }

        if (nowLifeCycleId == 0) {
            throw new WorkException(LIFE_CYCLE_NOT_FOUND);
        }
        Farm farm = farmRepository.findByMember_Id(memberId).orElseThrow(() -> new MemberException(NO_FARM_INFO));
        List<ShortTermWeatherForecast> forecasts = shortTermWeatherForecastRepository.findAllByNxAndNy(farm.getNx(), farm.getNy());

        List<RecommendedWorksResponse> recommendedWorksResponse = new ArrayList<>();

        lifeCycleAndRecommendedWorkRepository.findAllByLifeCycle_Id(nowLifeCycleId)
                .stream().map(LifeCycleAndRecommendedWork::getRecommendedWork)
                .forEach(recommendedWork -> recommendedWorksResponse.addAll(windowsForWork(recommendedWork, forecasts)));

        List<RecommendWorksResponse.MyCropResponse> myCropResponses = myCropList.stream().map(my -> RecommendWorksResponse.MyCropResponse.of(my.getId(), my.getCrop().getName())).toList();
        return new RecommendWorksResponse(recommendedWorksResponse, myCropResponses);
    }

    private boolean meets(RecommendedWork w, ShortTermWeatherForecast f) {
        boolean rain = f.getPrecipitation() >= RAIN_MM;
        boolean snow = rain && f.getTemperature() <= 0;
        boolean highT = f.getTemperature() >= HIGH_TEMP;
        boolean lowT = f.getTemperature() <= LOW_TEMP;
        boolean highH = f.getHumidity() >= HIGH_HUMIDITY;
        boolean lowH = f.getHumidity() <= LOW_HUMIDITY;
        boolean wind = f.getWindSpeed() >= STRONG_WIND;

        if (w.isRain() && rain) return false;
        if (w.isSnow() && snow) return false;
        if (w.isHighTemperature() && highT) return false;
        if (w.isLowTemperature() && lowT) return false;
        if (w.isHighHumidity() && highH) return false;
        if (w.isLowHumidity() && lowH) return false;
        if (w.isStrongWind() && wind) return false;

        return true;
    }

    private LocalDateTime toDateTime(ShortTermWeatherForecast f) {
        return LocalDateTime.of(LocalDate.now(), LocalTime.of(f.getFcstTime(), 0));
    }


    public List<RecommendedWorksResponse> windowsForWork(RecommendedWork work,
                                                          List<ShortTermWeatherForecast> forecasts,
                                                          int minHours) {
        List<ShortTermWeatherForecast> sorted = forecasts.stream()
                .sorted(Comparator.comparingInt(ShortTermWeatherForecast::getFcstTime))
                .toList();

        List<RecommendedWorksResponse> result = new ArrayList<>();

        LocalDateTime winStart = null;
        LocalDateTime prevOk = null;
        for (ShortTermWeatherForecast f : sorted) {
            boolean ok = meets(work, f);
            LocalDateTime curr = toDateTime(f);

            if (ok) {
                if (winStart == null) {
                    winStart = curr;
                } else {
                    if (!prevOk.plusHours(1).equals(curr)) {
                        // 연속이 끊김 → 이전 구간 종료 처리
                        int hours = (int) java.time.Duration.between(winStart, prevOk.plusHours(1)).toHours();
                        if (hours >= minHours) {
                            result.add(RecommendedWorksResponse.of(
                                    work.getId(),
                                    winStart.toString(),
                                    prevOk.plusHours(1).toString(),
                                    work.getRecommendation(),
                                    0
                            ));
                        }
                        winStart = curr;
                    }
                }
                prevOk = curr;
            } else {
                if (winStart != null) {
                    int hours = (int) java.time.Duration.between(winStart, prevOk.plusHours(1)).toHours();
                    if (hours >= minHours) {
                        result.add(RecommendedWorksResponse.of(
                                work.getId(),
                                winStart.toString(),
                                prevOk.plusHours(1).toString(),
                                work.getRecommendation(),
                                0
                        ));
                    }
                    winStart = null;
                    prevOk = null;
                }
            }
        }

        if (winStart != null) {
            int hours = (int) java.time.Duration.between(winStart, prevOk.plusHours(1)).toHours();
            if (hours >= minHours) {
                result.add(RecommendedWorksResponse.of(
                        work.getId(),
                        winStart.toString(),
                        prevOk.plusHours(1).toString(),
                        work.getRecommendation(),
                        0
                ));
            }
        }

        return result;
    }

    private List<RecommendedWorksResponse> windowsForWork(RecommendedWork work,
                                                          List<ShortTermWeatherForecast> forecasts) {
        return windowsForWork(work, forecasts, 1);
    }
}
