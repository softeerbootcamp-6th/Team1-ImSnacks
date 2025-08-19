package com.imsnacks.Nyeoreumnagi.common.auth.controller;

import com.imsnacks.Nyeoreumnagi.common.auth.dto.request.LoginRequest;
import com.imsnacks.Nyeoreumnagi.common.auth.dto.response.LoginResponse;
import com.imsnacks.Nyeoreumnagi.common.auth.jwt.AuthTokens;
import com.imsnacks.Nyeoreumnagi.common.auth.jwt.JwtProvider;
import com.imsnacks.Nyeoreumnagi.common.auth.service.AuthService;
import com.imsnacks.Nyeoreumnagi.member.entity.Farm;
import com.imsnacks.Nyeoreumnagi.member.entity.Member;
import com.imsnacks.Nyeoreumnagi.member.exception.MemberException;
import com.imsnacks.Nyeoreumnagi.member.repository.MemberRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthControllerTest {
    @Mock
    private MemberRepository memberRepository;

    @Mock
    private JwtProvider jwtProvider;

    @InjectMocks
    private AuthService authService;

    @Test
    void 올바른_ID_PASSWORD를_입력하면_성공한다() {
        Farm farm = new Farm();
        String identifier = "testUser";
        String password = "1234";

        Member member = new Member(1L, identifier, password, "testUser", "01012345678", null, farm); // refreshToken = null
        when(memberRepository.findOneByIdentifier("testUser"))
                .thenReturn(Optional.of(member));

        when(memberRepository.findOneByIdentifier("testUser"))
                .thenReturn(Optional.of(member));

        UUID refreshToken = UUID.randomUUID();
        String accessToken = "sdfdffsfsfs-2dfedfse-fsefsef";
        AuthTokens fakeTokens = new AuthTokens(accessToken, refreshToken);
        when(jwtProvider.createToken(anyLong())).thenReturn(fakeTokens);

        LoginRequest request = new LoginRequest("testUser", "1234");

        LoginResponse response = authService.login(request);

        assertThat(response.loginAccessTokenResponse().accessToken()).isEqualTo(accessToken);
        assertThat(response.refreshToken()).isEqualTo(refreshToken);

        verify(memberRepository, times(1)).findOneByIdentifier(identifier);
        verify(jwtProvider, times(1)).createToken(1L);
    }

    @Test
    void 존재하지_않는_ID면_예외() {
        when(memberRepository.findOneByIdentifier("unknown"))
                .thenReturn(Optional.empty());

        LoginRequest request = new LoginRequest("unknown", "1234");

        assertThatThrownBy(() -> authService.login(request))
                .isInstanceOf(MemberException.class);
    }

    @Test
    void 비밀번호_틀리면_예외() {
        Farm farm = new Farm();
        String identifier = "testUser";
        String password = "1234";
        Member member = new Member(1L, identifier, password, "testUser", "01012345678", null, farm); // refreshToken = null


        when(memberRepository.findOneByIdentifier(identifier))
                .thenReturn(Optional.of(member));

        LoginRequest request = new LoginRequest(identifier, "wrong");

        assertThatThrownBy(() -> authService.login(request))
                .isInstanceOf(MemberException.class);
    }
}
