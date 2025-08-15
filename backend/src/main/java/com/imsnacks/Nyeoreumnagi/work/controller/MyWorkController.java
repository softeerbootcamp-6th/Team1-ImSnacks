package com.imsnacks.Nyeoreumnagi.work.controller;

import com.imsnacks.Nyeoreumnagi.common.response.CustomResponseBody;
import com.imsnacks.Nyeoreumnagi.common.response.ResponseUtil;
import com.imsnacks.Nyeoreumnagi.common.auth.annotation.PreAuthorize;
import com.imsnacks.Nyeoreumnagi.work.dto.request.DeleteMyWorkRequest;
import com.imsnacks.Nyeoreumnagi.work.dto.request.ModifyMyWorkRequest;
import com.imsnacks.Nyeoreumnagi.work.dto.request.RegisterMyWorkRequest;
import com.imsnacks.Nyeoreumnagi.work.dto.response.GetMyWorksOfTodayResponse;
import com.imsnacks.Nyeoreumnagi.work.dto.response.GetMyWorksOfWeeklyResponse;
import com.imsnacks.Nyeoreumnagi.work.dto.response.ModifyMyWorkResponse;
import com.imsnacks.Nyeoreumnagi.work.dto.response.RegisterMyWorkResponse;
import com.imsnacks.Nyeoreumnagi.work.service.MyWorkService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/myWork")
@RequiredArgsConstructor
@Tag(name = "농작업 관련 API", description = "농작업 관련 API에 대한 설명입니다.")
public class MyWorkController {
    private final MyWorkService myWorkService;

    @SecurityRequirement(name = "BearerAuth")
    @Operation(summary = "농작업 등록")
    @ApiResponse(responseCode = "200", description = "농작업 등록 성공")
    @ApiResponse(responseCode = "400", description = "농작업 등록 실패")
    @PostMapping("")
    public ResponseEntity<CustomResponseBody<RegisterMyWorkResponse>> registerMyWork(@RequestBody RegisterMyWorkRequest request, @PreAuthorize Long memberId) {
        request.validate();
        RegisterMyWorkResponse dto = myWorkService.registerMyWork(request, memberId);
        return ResponseUtil.success(dto);
    }

    @SecurityRequirement(name = "BearerAuth")
    @Operation(summary = "농작업 삭제")
    @ApiResponse(responseCode = "200", description = "농작업 삭제 성공")
    @ApiResponse(responseCode = "400", description = "농작업 삭제 실패")
    @DeleteMapping("")
    public ResponseEntity<CustomResponseBody<Void>> deleteMyWork(@RequestBody DeleteMyWorkRequest request, @PreAuthorize Long memberId) {
        request.validate();
        myWorkService.deleteMyWork(request, memberId);
        return ResponseUtil.success();
    }

    @SecurityRequirement(name = "BearerAuth")
    @Operation(summary = "농작업 수정")
    @ApiResponse(responseCode = "200", description = "농작업 수정 성공")
    @ApiResponse(responseCode = "400", description = "농작업 수정 실패")
    @PatchMapping("")
    public ResponseEntity<CustomResponseBody<ModifyMyWorkResponse>> modifyMyWork(@RequestBody ModifyMyWorkRequest request, @PreAuthorize Long memberId) {
        request.validate();
        ModifyMyWorkResponse modifyMyWorkResponse = myWorkService.modifyMyWork(request, memberId);
        return ResponseUtil.success(modifyMyWorkResponse);
    }

    @SecurityRequirement(name = "BearerAuth")
    @Operation(summary = "오늘의 내 농작업 목록 조회")
    @ApiResponse(responseCode = "200", description = "오늘의 내 농작업 목록 조회 성공")
    @ApiResponse(responseCode = "400", description = "오늘의 내 농작업 목록 조회 실패")
    @GetMapping("/today")
    public ResponseEntity<CustomResponseBody<List<GetMyWorksOfTodayResponse>>> getMyWorksOfToday(@PreAuthorize Long memberId) {
        List<GetMyWorksOfTodayResponse> myWorksOfToday = myWorkService.getMyWorksOfToday(memberId);
        return ResponseUtil.success(myWorksOfToday);
    }

    @SecurityRequirement(name = "BearerAuth")
    @Operation(summary = "주간 내 농작업 목록 조회")
    @ApiResponse(responseCode = "200", description = "주간 내 농작업 목록 조회 성공")
    @ApiResponse(responseCode = "400", description = "주간 내 농작업 목록 조회 실패")
    @Parameters({
            @Parameter(name = "startDate", description = "조회 시작 기준이 되는 날짜 (yyyy-MM-dd)"),
    })
    @GetMapping("/weekly")
    public ResponseEntity<CustomResponseBody<List<GetMyWorksOfWeeklyResponse>>> getMyWorksOfWeek(@RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate, @PreAuthorize Long memberId) {
        List<GetMyWorksOfWeeklyResponse> myWorksOfToday = myWorkService.getMyWorksOfWeekly(startDate, memberId);
        return ResponseUtil.success(myWorksOfToday);
    }
}
