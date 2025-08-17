package com.imsnacks.Nyeoreumnagi.pest.service;

import com.imsnacks.Nyeoreumnagi.member.entity.Farm;
import com.imsnacks.Nyeoreumnagi.member.exception.MemberException;
import com.imsnacks.Nyeoreumnagi.member.exception.MemberResponseStatus;
import com.imsnacks.Nyeoreumnagi.member.repository.FarmRepository;
import com.imsnacks.Nyeoreumnagi.pest.dto.response.GetPestCardListResponse;
import com.imsnacks.Nyeoreumnagi.pest.dto.response.GetPestCardListResponse.MyCropCard;
import com.imsnacks.Nyeoreumnagi.pest.dto.response.GetPestCardListResponse.PestCard;
import com.imsnacks.Nyeoreumnagi.pest.entity.PestCondition;
import com.imsnacks.Nyeoreumnagi.pest.entity.PestRisk;
import com.imsnacks.Nyeoreumnagi.pest.service.WeatherConditionCode.HumidityLevel;
import com.imsnacks.Nyeoreumnagi.pest.service.WeatherConditionCode.RainLevel;
import com.imsnacks.Nyeoreumnagi.pest.service.WeatherConditionCode.TemperatureLevel;
import com.imsnacks.Nyeoreumnagi.weather.entity.ShortTermWeatherForecast;
import com.imsnacks.Nyeoreumnagi.weather.exception.WeatherException;
import com.imsnacks.Nyeoreumnagi.weather.exception.WeatherResponseStatus;
import com.imsnacks.Nyeoreumnagi.weather.repository.ShortTermWeatherForecastRepository;
import com.imsnacks.Nyeoreumnagi.work.entity.Crop;
import com.imsnacks.Nyeoreumnagi.work.entity.MyCrop;
import com.imsnacks.Nyeoreumnagi.work.exception.CropException;
import com.imsnacks.Nyeoreumnagi.work.exception.CropResponseStatus;
import com.imsnacks.Nyeoreumnagi.work.repository.MyCropRepository;
import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class PestService {
    private final FarmRepository farmRepo;
    private final ShortTermWeatherForecastRepository fcstRepo;
    private final MyCropRepository myCropRepo;

    private static final int MAX_PEST_CARD_LIST_SIZE = 6;

    public GetPestCardListResponse getPestCardList(final Long memberId, @Nullable final Long myCropId) {
        final Farm farm = farmRepo.findByMember_Id(memberId).orElseThrow(() -> new MemberException(MemberResponseStatus.NO_FARM_INFO));
        final Crop target = (myCropId == null) ? findDefaultCrop(memberId) : findCropBy(myCropId);
        final List<PestCard> pestCards = getPestCardsFor(target, farm.getNx(), farm.getNy());
        final List<MyCropCard> myCropCards = (myCropId == null) ? getMyCropCards(memberId) : new ArrayList<>();

        return new GetPestCardListResponse(pestCards, myCropCards);
    }

    private List<MyCropCard> getMyCropCards(long memberId) {
        List<MyCrop> myCrops = this.myCropRepo.findAllByMember_IdOrderById(memberId);
        return myCrops.stream()
                .map(x -> new MyCropCard(x.getId(), x.getCrop().getName()))
                .toList();
    }

    private Crop findDefaultCrop(long memberId) {
        List<MyCrop> myCrops = myCropRepo.findAllByMember_IdOrderByCrop_Id(memberId);
        if (myCrops.isEmpty()) {
            //TODO 빈 리스트를 보내야 할까, 아니면 예외를 던져야 할까?
            throw new CropException(CropResponseStatus.MY_CROP_NOT_FOUND);
        }
        Crop crop = myCrops.get(0).getCrop();
        if (crop == null) {
            throw new CropException(CropResponseStatus.MY_CROP_NOT_FOUND);
        }
        return crop;
    }

    private Crop findCropBy(@NotNull long myCropId) {
        final MyCrop myCrop = myCropRepo.findById(myCropId).orElseThrow(() -> new CropException(CropResponseStatus.MY_CROP_NOT_FOUND));
        final Crop crop = myCrop.getCrop();
        if (crop == null) {
            throw new CropException(CropResponseStatus.MY_CROP_NOT_FOUND);
        }
        return crop;
    }

    private List<PestCard> getPestCardsFor(Crop target, int nx, int ny) {
        List<ShortTermWeatherForecast> forecastList = fcstRepo.findAllByNxAndNy(nx, ny);
        if (forecastList.isEmpty()) {
            throw new WeatherException(WeatherResponseStatus.NO_WEATHER_LOCATION);
        }
        WeatherConditionCode forecast = WeatherConditionCode.of(forecastList);
        LocalDateTime now = LocalDateTime.now();
        List<PestRisk> relatedPests = target.getPestRisks();
        return relatedPests.stream()
                .filter(x -> meetsCondition(x.getConditions(), forecast, now))
                .limit(MAX_PEST_CARD_LIST_SIZE)
                .map(x -> x.toCard())
                .toList();
    }

    private boolean meetsCondition(final List<PestCondition> pestConditions, final WeatherConditionCode weatherConditionCode, final LocalDateTime now) {
        for (var condition : pestConditions) {
            if (meetsTimeCondition(condition, now) && meetsWeatherCondition(condition, weatherConditionCode))
                return true;
        }
        return false;
    }

    private boolean meetsTimeCondition(PestCondition condition, LocalDateTime now) {
        int nowMonth = now.getMonth().getValue();
        int nowDayOfMonth = now.getDayOfMonth();

        int startMonth = condition.getStartMonth().getValue();
        int startDayOfMonth = getDayOfMonthFromStartPhase(condition.getStartMonthPhase());
        int endMonth = condition.getEndMonth().getValue();
        int endDayOfMonth = getDayOfMonthFromEndPhase(condition.getEndMonthPhase());

        boolean meetsStart = (startMonth == nowMonth && startDayOfMonth <= nowDayOfMonth) || (startMonth < nowMonth);
        boolean meetsEnd = (endMonth == nowMonth && nowDayOfMonth <= endDayOfMonth) || (endMonth > nowMonth);

        return meetsStart && meetsEnd;
    }

    private boolean meetsWeatherCondition(PestCondition condition, WeatherConditionCode currentWeather) {
        return meetsHumidityCondition(condition.getHumidityLevel(), currentWeather.humidityLevel())
                && meetsTemperatureCondition(condition.getTemperatureLevel(), currentWeather.temperatureLevel())
                && meetsRainCondition(condition.getRainLevel(), currentWeather.rainLevel());
    }

    private boolean meetsHumidityCondition(HumidityLevel condition, HumidityLevel current) {
        return (condition == HumidityLevel.DONT_CARE || condition == current);
    }

    private boolean meetsTemperatureCondition(TemperatureLevel condition, TemperatureLevel current) {
        return (condition == TemperatureLevel.DONT_CARE || condition == current);
    }

    private boolean meetsRainCondition(RainLevel condition, RainLevel current) {
        return (condition == RainLevel.DONT_CARE || condition == current);
    }

    private int getDayOfMonthFromStartPhase(PestCondition.MonthPhase phase) {
        return switch (phase) {
            case EARLY -> 1;
            case MID -> 10;
            case LATE -> 20;
        };
    }

    private int getDayOfMonthFromEndPhase(PestCondition.MonthPhase phase) {
        return switch (phase) {
            case EARLY -> 10;
            case MID -> 20;
            case LATE -> 31;
        };
    }

    @NotNull
    private List<ShortTermWeatherForecast> getForecastList(final int nx, final int ny) {
        List<ShortTermWeatherForecast> ret = fcstRepo.findAllByNxAndNy(nx, ny);
        if (ret.isEmpty()) {
            throw new WeatherException(WeatherResponseStatus.NO_WEATHER_VALUE);
        }
        return ret;
    }
}
