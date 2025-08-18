package com.imsnacks.Nyeoreumnagi.damage.controller;

import com.imsnacks.Nyeoreumnagi.common.auth.annotation.PreAuthorize;
import com.imsnacks.Nyeoreumnagi.common.response.CustomResponseBody;
import com.imsnacks.Nyeoreumnagi.common.response.ResponseUtil;
import com.imsnacks.Nyeoreumnagi.damage.pest.dto.response.GetPestCardListResponse;
import com.imsnacks.Nyeoreumnagi.damage.pest.service.PestService;
import com.imsnacks.Nyeoreumnagi.damage.weatherRisk.WeatherRiskService;
import com.imsnacks.Nyeoreumnagi.damage.weatherRisk.dto.response.GetWeatherRiskCardListResponse;
import com.imsnacks.Nyeoreumnagi.weather.service.WeatherService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "농작물 피해 양상 관련 API", description = "농작물 피해 양상 관련 API입니다.")
@RequiredArgsConstructor
@RequestMapping("/damage")
@RestController
public class DamageController {
    private final PestService pestService;
    private final WeatherRiskService weatherRiskService;

    @SecurityRequirement(name = "BearerAuth")
    @Operation(summary = "병해충 피해 목록 조회")
    @ApiResponse(responseCode = "200", description = "병해충 피해 목록 조회 성공")
    @ApiResponse(responseCode = "400", description = "병해충 피해 목록 조회 실패")
    @GetMapping("/pest")
    public ResponseEntity<CustomResponseBody<GetPestCardListResponse>> getPestCardList(@PreAuthorize Long memberId, @RequestParam(required = false) Long myCropId) {
        return ResponseUtil.success(pestService.getPestCardList(memberId, myCropId));
    }

    @SecurityRequirement(name = "BearerAuth")
    @Operation(summary = "기상 리스크별 피해 목록 조회")
    @ApiResponse(responseCode = "200", description = "기상 리스크별 피해 목록 조회 성공")
    @ApiResponse(responseCode = "400", description = "기상 리스크별 피해 목록 조회 실패")
    @GetMapping("/weather")
    public ResponseEntity<CustomResponseBody<GetWeatherRiskCardListResponse>> getWeatherRiskCardList(@PreAuthorize Long memberId) {
        return ResponseUtil.success(weatherRiskService.getWeatherRiskCardList(memberId));
    }
}
