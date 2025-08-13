package com.imsnacks.Nyeoreumnagi.weather.controller;

import com.imsnacks.Nyeoreumnagi.common.enums.WeatherMetric;
import com.imsnacks.Nyeoreumnagi.common.response.CustomResponseBody;
import com.imsnacks.Nyeoreumnagi.common.auth.annotation.PreAuthorize;
import com.imsnacks.Nyeoreumnagi.common.response.ResponseUtil;
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

@RestController
@RequiredArgsConstructor
@RequestMapping("/weather")
@Tag(name = "날씨 관련 API", description = "날씨 관련 API에 대한 설명입니다.")
public class WeatherController {

    private final WeatherService weatherService;

    @SecurityRequirement(name = "BearerAuth")
    @Operation(summary = "날씨 그래프 조회")
    @ApiResponse(responseCode = "200", description = "날씨 그래프 조회 성공")
    @ApiResponse(responseCode = "400", description = "날씨 그래프 조회 실패")
    @GetMapping()
    public ResponseEntity<CustomResponseBody<com.imsnacks.Nyeoreumnagi.weather.dto.response.GetWeatherGraph>> getWeatherGraph(@PreAuthorize Long memberId, @RequestParam WeatherMetric weatherMetric){
        return ResponseUtil.success(weatherService.getWeatherGraph(memberId, weatherMetric));
    }

    @SecurityRequirement(name = "BearerAuth")
    @Operation(summary = "날씨 리스크 조회")
    @ApiResponse(responseCode = "200", description = "날씨 리스크 조회 성공")
    @ApiResponse(responseCode = "400", description = "날씨 리스크 조회 실패")
    @GetMapping("/fcstRisk")
    public ResponseEntity<CustomResponseBody<com.imsnacks.Nyeoreumnagi.weather.dto.response.GetFcstRisk>> getFcstRiskResponse(@PreAuthorize Long memberId){
        return ResponseUtil.success(weatherService.getWeatherRisk(memberId));
    }

    @SecurityRequirement(name = "BearerAuth")
    @Operation(summary = "날씨 브리핑 조회")
    @ApiResponse(responseCode = "200", description = "날씨 브리핑 조회 성공")
    @ApiResponse(responseCode = "400", description = "날씨 브리핑 조회 실패")
    @GetMapping("/briefing")
    public ResponseEntity<CustomResponseBody<com.imsnacks.Nyeoreumnagi.weather.dto.response.GetWeatherBriefing>> getWeatherBriefingResponse(@PreAuthorize Long memberId) {
        return ResponseUtil.success(weatherService.getWeatherBriefing(memberId));
    }
  
    @SecurityRequirement(name = "BearerAuth")
    @Operation(summary = "날씨 요약 조회")
    @ApiResponse(responseCode = "200", description = "날씨 요약 조회 성공")
    @ApiResponse(responseCode = "400", description = "날씨 요약 조회 실패")
    @GetMapping("/now")
    public ResponseEntity<CustomResponseBody<com.imsnacks.Nyeoreumnagi.weather.dto.response.GetWeatherCondition>> getWeatherCondition(@PreAuthorize Long memberId){
        return ResponseUtil.success(weatherService.getWeatherCondition(memberId));
    }
}
