package com.imsnacks.Nyeoreumnagi.common.auth.interceptor;

import com.imsnacks.Nyeoreumnagi.common.auth.exception.JwtException;
import com.imsnacks.Nyeoreumnagi.common.auth.jwt.JwtProvider;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import static com.imsnacks.Nyeoreumnagi.common.auth.exception.AuthResponseStatus.*;

@Component
@RequiredArgsConstructor
public class JwtAuthInterceptor implements HandlerInterceptor {

    private static final String JWT_TOKEN_PREFIX = "Bearer ";
    private final JwtProvider jwtProvider;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        String method = request.getMethod();
        String url = request.getRequestURI();
        String accessToken = request.getHeader(HttpHeaders.AUTHORIZATION);

        if(method.equals(HttpMethod.OPTIONS.name())){
            return true;
        }

        accessToken = resolveAccessToken(accessToken);
        validateAccessToken(accessToken);

        Long memberId = jwtProvider.getMemberId(accessToken);
        validatePayload(memberId);

        request.setAttribute("memberId", memberId);
        return true;
    }

    private String resolveAccessToken(String token) {
        validateToken(token);
        return token.substring(JWT_TOKEN_PREFIX.length());
    }

    private void validateToken(String token) {
        if (token == null) {
            throw new JwtException(TOKEN_NOT_FOUND);
        }
        if (!token.startsWith(JWT_TOKEN_PREFIX)) {
            throw new JwtException(UNSUPPORTED_TOKEN_TYPE);
        }
    }

    private void validateAccessToken(String accessToken) {
        if (jwtProvider.isExpiredToken(accessToken)) {
            throw new JwtException(EXPIRED_TOKEN);
        }
    }

    private void validatePayload(Long memberId) {
        if (memberId == null) {
            throw new JwtException(NO_MEMBERID);
        }
    }
}
