package com.imsnacks.Nyeoreumnagi.common.auth.service;

import com.imsnacks.Nyeoreumnagi.common.auth.dto.request.LoginRequest;
import com.imsnacks.Nyeoreumnagi.common.auth.dto.response.LoginResponse;
import com.imsnacks.Nyeoreumnagi.common.auth.jwt.AuthTokens;
import com.imsnacks.Nyeoreumnagi.common.auth.jwt.JwtProvider;
import com.imsnacks.Nyeoreumnagi.member.entity.Member;
import com.imsnacks.Nyeoreumnagi.member.repository.MemberRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private MemberRepository memberRepository;

    @Mock
    private JwtProvider jwtProvider;

    @InjectMocks
    private AuthService authService;

    @Test
    void login_성공_시_토큰_저장_후_응답을_반환한다() {
        // Given (준비)
        LoginRequest request = new LoginRequest("test_user", "password123");
        Member mockMember = new Member(1L, "test_user", "password123", "테스트유저", "010-1234-5678", null, null);
        AuthTokens mockTokens = new AuthTokens("mock_access_token", UUID.randomUUID());

        when(memberRepository.findOneByIdentifier(request.identifier())).thenReturn(Optional.of(mockMember));
        when(jwtProvider.createToken(mockMember.getId())).thenReturn(mockTokens);

        // When (실행)
        LoginResponse response = authService.login(request);

        // Then (검증)
        assertThat(response.loginAccessTokenResponse().nickname()).isEqualTo("테스트유저");
        assertThat(response.loginAccessTokenResponse().accessToken()).isEqualTo("mock_access_token");
        assertThat(response.refreshToken()).isEqualTo(mockTokens.getRefreshToken());
    }

    @Test
    void refreshToken_재발급_성공_시_새로운_토큰을_반환한다() {
        // Given (준비)
        UUID oldRefreshToken = UUID.randomUUID();
        Member mockMember = new Member(1L, "test_user", "password123", "테스트유저", "010-1234-5678", oldRefreshToken, null);
        AuthTokens newMockTokens = new AuthTokens("new_access_token", UUID.randomUUID());

        when(memberRepository.findByRefreshToken(oldRefreshToken)).thenReturn(Optional.of(mockMember));
        when(jwtProvider.createToken(mockMember.getId())).thenReturn(newMockTokens);

        // When (실행)
        LoginResponse response = authService.refreshToken(oldRefreshToken);

        // Then (검증)
        assertThat(response.loginAccessTokenResponse().nickname()).isEqualTo("테스트유저");
        assertThat(response.loginAccessTokenResponse().accessToken()).isEqualTo("new_access_token");
        assertThat(response.refreshToken()).isEqualTo(newMockTokens.getRefreshToken());
    }
}