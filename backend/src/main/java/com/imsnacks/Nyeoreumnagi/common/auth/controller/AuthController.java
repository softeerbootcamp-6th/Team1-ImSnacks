package com.imsnacks.Nyeoreumnagi.common.auth.controller;

import com.imsnacks.Nyeoreumnagi.common.auth.dto.request.LoginRequest;
import com.imsnacks.Nyeoreumnagi.common.auth.dto.response.LoginResponse;
import com.imsnacks.Nyeoreumnagi.common.auth.dto.response.LoginResponse.LoginAccessTokenResponse;
import com.imsnacks.Nyeoreumnagi.common.auth.service.AuthService;
import com.imsnacks.Nyeoreumnagi.common.response.CustomResponseBody;
import com.imsnacks.Nyeoreumnagi.common.response.ResponseUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Tag(name = "사용자 인증/인가(Auth) API", description = "사용자 인증/인가(Auth) 관련 API에 대한 설명입니다.")
public class AuthController {
    private final AuthService authService;

    @PostMapping("/login")
    @Operation(summary = "로그인")
    @ApiResponse(responseCode = "200", description = "로그인 성공")
    @ApiResponse(responseCode = "400", description = "로그인 실패")
    public ResponseEntity<CustomResponseBody<LoginAccessTokenResponse>> login(@RequestBody LoginRequest request){
        request.validate();
        LoginResponse response = authService.login(request);

        return ResponseUtil.success(response.loginAccessTokenResponse(), response.refreshToken());
    }

    @GetMapping("/refresh")
    @Operation(summary = "accessToken 재발급")
    @ApiResponse(responseCode = "200", description = "accessToken 재발급 성공")
    @ApiResponse(responseCode = "400", description = "accessToken 재발급 실패")
    public ResponseEntity<CustomResponseBody<LoginAccessTokenResponse>> refreshToken(@CookieValue(name = "refreshToken") UUID refreshToken){
        LoginResponse response = authService.refreshToken(refreshToken);
        return ResponseUtil.success(response.loginAccessTokenResponse(), response.refreshToken());
    }


}
