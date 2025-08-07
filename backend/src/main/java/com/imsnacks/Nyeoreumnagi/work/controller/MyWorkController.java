package com.imsnacks.Nyeoreumnagi.work.controller;

import com.imsnacks.Nyeoreumnagi.common.CustomResponseBody;
import com.imsnacks.Nyeoreumnagi.common.ResponseUtil;
import com.imsnacks.Nyeoreumnagi.common.auth.annotation.PreAuthorize;
import com.imsnacks.Nyeoreumnagi.common.auth.jwt.AuthTokens;
import com.imsnacks.Nyeoreumnagi.common.auth.jwt.JwtProvider;
import com.imsnacks.Nyeoreumnagi.work.dto.request.ResisterMyWorkRequest;
import com.imsnacks.Nyeoreumnagi.work.dto.response.ResisterMyWorkResponse;
import com.imsnacks.Nyeoreumnagi.work.service.MyWorkService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/myWork")
@RequiredArgsConstructor
public class MyWorkController {
    private final MyWorkService myWorkService;

    @PostMapping("")
    public ResponseEntity<CustomResponseBody<ResisterMyWorkResponse>> registerMyWork(@RequestBody ResisterMyWorkRequest request, @PreAuthorize Long memberId) {
        ResisterMyWorkResponse dto = myWorkService.registerMyWork(request, memberId);
        return ResponseUtil.success(dto);

    }

    @GetMapping("")
    public ResponseEntity<CustomResponseBody<AuthTokens>> getMyWork(){
        JwtProvider jwtProvider = new JwtProvider();
        AuthTokens token = jwtProvider.createToken(1L);

        return ResponseUtil.success(token);


    }
}
