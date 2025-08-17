package com.imsnacks.Nyeoreumnagi.farm.service;

import com.imsnacks.Nyeoreumnagi.farm.GeoApiClient;
import com.imsnacks.Nyeoreumnagi.farm.XyConverter;
import com.imsnacks.Nyeoreumnagi.farm.entity.Farm;
import com.imsnacks.Nyeoreumnagi.farm.entity.MidTempRegionCode;
import com.imsnacks.Nyeoreumnagi.farm.repository.MidTempRegionCodeRepository;
import com.imsnacks.Nyeoreumnagi.member.dto.SignupRequest.RegisterFarmRequest;
import com.imsnacks.Nyeoreumnagi.member.entity.Member;
import com.imsnacks.Nyeoreumnagi.member.exception.MemberException;
import com.imsnacks.Nyeoreumnagi.member.repository.FarmRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

import static com.imsnacks.Nyeoreumnagi.member.exception.MemberResponseStatus.*;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class FarmService {
    private final GeoApiClient geoApiClient;
    private final MidTempRegionCodeRepository midTempRegionCodeRepository;
    private final FarmRepository farmRepository;

    @Transactional
    public Farm createFarm(RegisterFarmRequest farmRequest, Member member){
        Pair<Double, Double> coordinates = geoApiClient.getCoordinates(farmRequest.state() + " " + farmRequest.city() + " " + farmRequest.town() + " " + farmRequest.address());
        String city = farmRequest.city().substring(0, farmRequest.city().length() - 1);
        MidTempRegionCode midTempRegionCode = findMidTempRegionCode(city);
        Map<String, Integer> nxNy = XyConverter.toXY(coordinates.getFirst(), coordinates.getSecond());
        Farm farm = Farm.createFarm(
                farmRequest.state(),
                farmRequest.city(),
                farmRequest.town(),
                farmRequest.address(),
                coordinates.getFirst(),
                coordinates.getSecond(),
                nxNy.get("nx"),
                nxNy.get("ny"),
                midTempRegionCode.getRegionCode(),
                member
        );

        Farm savedFarm = farmRepository.save(farm);
        return savedFarm;


    }

    private MidTempRegionCode findMidTempRegionCode(String city){
        MidTempRegionCode midTempRegionCode = midTempRegionCodeRepository.findOneByRegionNameContaining(city)
                .orElseThrow(() -> new MemberException(NO_FARM_INFO));

        return midTempRegionCode;
    }

}
