package com.imsnacks.Nyeoreumnagi.work.controller;

import com.imsnacks.Nyeoreumnagi.common.auth.annotation.PreAuthorize;
import com.imsnacks.Nyeoreumnagi.common.response.CustomResponseBody;
import com.imsnacks.Nyeoreumnagi.common.response.ResponseUtil;
import com.imsnacks.Nyeoreumnagi.work.dto.response.RecommendWorksResponse;
import com.imsnacks.Nyeoreumnagi.work.service.RecommendedWorkService;
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
@RequestMapping("/work")
@RequiredArgsConstructor
@Tag(name = "추천 농작업 관련 API", description = "추천 농작업 관련 API에 대한 설명입니다.")
public class RecommendedWorkController {
    private final RecommendedWorkService recommendedWorkService;

    @SecurityRequirement(name = "BearerAuth")
    @Operation(summary = "내 작물의 생육 단계와 날씨를 고려한 농작업 추천 목록 조회")
    @ApiResponse(responseCode = "200", description = "농작업 추천 목록 조회 성공")
    @ApiResponse(responseCode = "400", description = "농작업 추천 목록 조회 실패")
    @GetMapping("/today")
    public ResponseEntity<CustomResponseBody<RecommendWorksResponse>> recommendWorks(@RequestParam(required = false) Long myCropId, @PreAuthorize Long memberId) {
        RecommendWorksResponse responses = recommendedWorkService.recommendWorks(myCropId, memberId);
        return ResponseUtil.success(responses);
    }
}
