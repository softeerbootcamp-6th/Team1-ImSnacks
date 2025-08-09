package com.imsnacks.Nyeoreumnagi.work.controller;

import com.imsnacks.Nyeoreumnagi.common.response.CustomResponseBody;
import com.imsnacks.Nyeoreumnagi.common.response.ResponseUtil;
import com.imsnacks.Nyeoreumnagi.common.auth.annotation.PreAuthorize;
import com.imsnacks.Nyeoreumnagi.work.dto.request.DeleteMyWorkRequest;
import com.imsnacks.Nyeoreumnagi.work.dto.request.RegisterMyWorkRequest;
import com.imsnacks.Nyeoreumnagi.work.dto.response.ResgisterMyWorkResponse;
import com.imsnacks.Nyeoreumnagi.work.service.MyWorkService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<CustomResponseBody<ResgisterMyWorkResponse>> registerMyWork(@Validated @RequestBody RegisterMyWorkRequest request, @PreAuthorize Long memberId) {
        ResgisterMyWorkResponse dto = myWorkService.registerMyWork(request, memberId);
        return ResponseUtil.success(dto);
    }

    @SecurityRequirement(name = "BearerAuth")
    @Operation(summary = "농작업 삭제")
    @ApiResponse(responseCode = "200", description = "농작업 삭제 성공")
    @ApiResponse(responseCode = "400", description = "농작업 삭제 실패")
    @DeleteMapping("")
    public ResponseEntity<CustomResponseBody<Void>> deleteMyWork(@Validated @RequestBody DeleteMyWorkRequest request, @PreAuthorize Long memberId) {
        myWorkService.deleteMyWork(request, memberId);
        return ResponseUtil.success();
    }
}
