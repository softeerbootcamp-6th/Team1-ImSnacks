package com.imsnacks.Nyeoreumnagi.authTest;

import com.imsnacks.Nyeoreumnagi.common.auth.exception.AuthResponseStatus;
import com.imsnacks.Nyeoreumnagi.common.auth.exception.JwtException;
import com.imsnacks.Nyeoreumnagi.common.auth.interceptor.JwtAuthInterceptor;
import com.imsnacks.Nyeoreumnagi.common.auth.jwt.JwtProvider;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;

class JwtAuthInterceptorTest {

    private JwtProvider jwtProvider;
    private JwtAuthInterceptor interceptor;
    private HttpServletRequest request;
    private HttpServletResponse response;

    @BeforeEach
    void setUp() {
        jwtProvider = mock(JwtProvider.class);
        interceptor = new JwtAuthInterceptor(jwtProvider);
        request = mock(HttpServletRequest.class);
        response = mock(HttpServletResponse.class);
    }

    @Test
    void OPTIONS_요청_통과_성공() {
        //given
        when(request.getMethod()).thenReturn(HttpMethod.OPTIONS.name());

        //when
        boolean result = interceptor.preHandle(request, response, new Object());

        //then
        assertThat(result).isTrue();
    }

    @Test
    void 토큰_없는_경우_예외() {
        //given
        when(request.getMethod()).thenReturn("GET");
        when(request.getHeader(HttpHeaders.AUTHORIZATION)).thenReturn(null);

        //when
        //then
        assertThatThrownBy(() -> interceptor.preHandle(request, response, new Object()))
                .isInstanceOf(JwtException.class)
                .extracting("status").isEqualTo(AuthResponseStatus.TOKEN_NOT_FOUND);
    }

    @Test
    void 토큰_타입_불일치_예외() {
        //given
        when(request.getMethod()).thenReturn("GET");
        when(request.getHeader(HttpHeaders.AUTHORIZATION)).thenReturn("FOO token");

        //when
        //then
        assertThatThrownBy(() -> interceptor.preHandle(request, response, new Object()))
                .isInstanceOf(JwtException.class)
                .extracting("status").isEqualTo(AuthResponseStatus.UNSUPPORTED_TOKEN_TYPE);
    }

    @Test
    void 만료된_토큰_예외() {
        //given
        when(request.getMethod()).thenReturn("GET");
        when(request.getHeader(HttpHeaders.AUTHORIZATION)).thenReturn("Bearer xxxx");
        when(jwtProvider.isExpiredToken("xxxx")).thenReturn(true);

        //when
        //then
        assertThatThrownBy(() -> interceptor.preHandle(request, response, new Object()))
                .isInstanceOf(JwtException.class)
                .extracting("status").isEqualTo(AuthResponseStatus.EXPIRED_TOKEN);
    }

    @Test
    void 멤버_ID_없으면_예외() {
        //given
        when(request.getMethod()).thenReturn("GET");
        when(request.getHeader(HttpHeaders.AUTHORIZATION)).thenReturn("Bearer xxxx");
        when(jwtProvider.isExpiredToken("xxxx")).thenReturn(false);
        when(jwtProvider.getMemberId("xxxx")).thenReturn(null);

        //when
        //then
        assertThatThrownBy(() -> interceptor.preHandle(request, response, new Object()))
                .isInstanceOf(JwtException.class)
                .extracting("status").isEqualTo(AuthResponseStatus.NO_MEMBERID);
    }

    @Test
    void 정상토큰_멤버ID_속성설정() {
        //given
        when(request.getMethod()).thenReturn("GET");
        when(request.getHeader(HttpHeaders.AUTHORIZATION)).thenReturn("Bearer testtoken");
        when(jwtProvider.isExpiredToken("testtoken")).thenReturn(false);
        when(jwtProvider.getMemberId("testtoken")).thenReturn(123L);

        //when
        boolean result = interceptor.preHandle(request, response, new Object());

        //then
        assertThat(result).isTrue();
        verify(request).setAttribute("memberId", 123L);
    }
}
