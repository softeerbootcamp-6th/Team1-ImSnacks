package com.imsnacks.Nyeoreumnagi.damage.weatherRisk;

import com.imsnacks.Nyeoreumnagi.common.enums.WeatherRiskType;
import com.imsnacks.Nyeoreumnagi.damage.weatherRisk.dto.response.GetWeatherRiskCardListResponse;
import com.imsnacks.Nyeoreumnagi.damage.weatherRisk.enums.WeatherRiskCard;
import com.imsnacks.Nyeoreumnagi.member.entity.Farm;
import com.imsnacks.Nyeoreumnagi.member.exception.MemberException;
import com.imsnacks.Nyeoreumnagi.member.repository.FarmRepository;
import com.imsnacks.Nyeoreumnagi.weather.entity.WeatherRisk;
import com.imsnacks.Nyeoreumnagi.weather.repository.WeatherRiskRepository;
import com.imsnacks.Nyeoreumnagi.work.entity.MyCrop;
import com.imsnacks.Nyeoreumnagi.work.repository.MyCropRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

import static com.imsnacks.Nyeoreumnagi.common.enums.WeatherRiskType.*;
import static com.imsnacks.Nyeoreumnagi.member.exception.MemberResponseStatus.NO_FARM_INFO;

@Service
@RequiredArgsConstructor
public class WeatherRiskService {

    private final WeatherRiskRepository weatherRiskRepository;
    private final MyCropRepository myCropRepository;
    private final FarmRepository farmRepository;

    public GetWeatherRiskCardListResponse getWeatherRiskCardList(final Long memberId){
        assert (memberId != null);
        Farm farm = farmRepository.findByMember_Id(memberId).orElseThrow(() -> new MemberException(NO_FARM_INFO));

        final int nx = farm.getNx();
        final int ny = farm.getNy();

        WeatherRisk targetWeatherRisk = weatherRiskRepository.findByNxAndNyWithMaxJobExecutionId(nx, ny)
                .stream()
                .filter(this::isRainOrHeat).min(Comparator.comparing(WeatherRisk::getStartTime))
                .orElse(null);

        if(targetWeatherRisk == null){
            return null;
        }

        List<GetWeatherRiskCardListResponse.Risk> risks = WeatherRiskCard.getCardFromRisk(targetWeatherRisk.getName())
                .stream()
                .map(card -> new GetWeatherRiskCardListResponse.Risk(card.getTitle(), card.getDescription(), card.toString()))
                .toList();

        List<GetWeatherRiskCardListResponse.MyCropDto> myCropNames = myCropRepository.findAllByMember_IdOrderByCrop_Id(memberId)
                .stream()
                .map(myCrop -> {return new GetWeatherRiskCardListResponse.MyCropDto(myCrop.getCrop().getName());})
                .limit(6)
                .toList();

        return new GetWeatherRiskCardListResponse(targetWeatherRisk.getName().getDescription(), risks, myCropNames);
    }

    private boolean isRainOrHeat(WeatherRisk weatherRisk){
        WeatherRiskType type = weatherRisk.getName();
        return type == RAIN ||
                type == HEAVY_RAIN ||
                type == TORRENTIAL_RAIN ||
                type == ABNORMAL_HEAT;
    }
}
