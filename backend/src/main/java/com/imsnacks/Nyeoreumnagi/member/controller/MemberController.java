package com.imsnacks.Nyeoreumnagi.member.controller;

import com.imsnacks.Nyeoreumnagi.common.auth.annotation.PreAuthorize;
import com.imsnacks.Nyeoreumnagi.common.response.CustomResponseBody;
import com.imsnacks.Nyeoreumnagi.common.response.ResponseUtil;
import com.imsnacks.Nyeoreumnagi.member.MemberService;
import com.imsnacks.Nyeoreumnagi.member.dto.SignupRequest;
import com.imsnacks.Nyeoreumnagi.member.dto.response.GetMemberAddressResponse;
import com.imsnacks.Nyeoreumnagi.member.dto.response.GetMyCropsResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
@Tag(name = "유저 관련 API", description = "유저 관련 API에 대한 설명입니다.")
public class MemberController {

    private final MemberService memberService;

    @SecurityRequirement(name = "BearerAuth")
    @Operation(summary = "유저 지번 주소 조회")
    @ApiResponse(responseCode = "200", description = "유저 지번 주소 조회 성공")
    @ApiResponse(responseCode = "400", description = "유저 지번 주소 조회 실패")
    @GetMapping("/address")
    public ResponseEntity<CustomResponseBody<GetMemberAddressResponse>> getMemberAddress(@PreAuthorize Long memberId){
        return ResponseUtil.success(memberService.getMemberAddress(memberId));
    }

    @Operation(summary = "회원 가입")
    @ApiResponse(responseCode = "200", description = "회원 가입 성공")
    @ApiResponse(responseCode = "400", description = "회원 가입 실패")
    @PostMapping("/registration")
    public ResponseEntity<CustomResponseBody<Void>> registerMember(@RequestBody SignupRequest request){
        request.validate();
        memberService.registerMember(request);
        return ResponseUtil.success();
    }

    @SecurityRequirement(name = "BearerAuth")
    @Operation(summary = "내 작물 조회")
    @ApiResponse(responseCode = "200", description = "내 작물 조회 성공")
    @ApiResponse(responseCode = "400", description = "내 작물 조회 실패")
    @GetMapping("/myCrops")
    public ResponseEntity<CustomResponseBody<GetMyCropsResponse>> getMyCrops(@PreAuthorize Long memberId){
        return ResponseUtil.success(memberService.getMyCrops(memberId));
    }
}
