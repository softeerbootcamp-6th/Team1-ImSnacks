package com.imsnacks.Nyeoreumnagi.authTest;

import com.imsnacks.Nyeoreumnagi.common.auth.jwt.AuthTokens;
import com.imsnacks.Nyeoreumnagi.common.auth.jwt.JwtProvider;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.lang.reflect.Field;
import java.util.Date;
import java.util.UUID;

import static org.assertj.core.api.Assertions.*;

class JwtProviderTest {

    JwtProvider provider;
    private static final String testSecretKey = "0123456789012345678901234567890101234567890123456789012345678901";

    @BeforeEach
    void setUp() throws Exception {
        provider = new JwtProvider();

        Field key = provider.getClass().getDeclaredField("JWT_SECRET_KEY");
        key.setAccessible(true);
        key.set(provider, testSecretKey);
        Field expired = provider.getClass().getDeclaredField("JWT_EXPIRED_IN");
        expired.setAccessible(true);
        expired.set(provider, 60000L);
    }

    @Test
    void 토큰_생성_성공() {
        //given
        //when
        AuthTokens tokens = provider.createToken(77L);
        Long memberId = provider.getMemberId(tokens.getAccessToken());

        //then
        assertThat(tokens.getAccessToken()).isNotNull();
        assertThat(tokens.getRefreshToken()).isInstanceOf(UUID.class);
        assertThat(memberId).isEqualTo(77L);
    }

    @Test
    void 토큰_만료기간_판단_성공() {
        //given
        AuthTokens tokens = provider.createToken(1L);

        //when
        boolean expired = provider.isExpiredToken(tokens.getAccessToken());

        //then
        assertThat(expired).isFalse();
    }

    @Test
    void 토큰_만료기간_지나면_false_반환_성공() throws Exception {
        //given
        Claims claims = Jwts.claims().setSubject("10").setIssuer("nyeoreumnagi");
        Date now = new Date();
        Date old = new Date(now.getTime() - 60000);
        String token = Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(old)
                .signWith(io.jsonwebtoken.SignatureAlgorithm.HS256, testSecretKey)
                .compact();

        //when
        boolean expired = provider.isExpiredToken(token);

        //then
        assertThat(expired).isTrue();
    }

    @Test
    void 유효하지_않은_멤버_id_거르기_성공() {
        //given
        String token = Jwts.builder()
                .setSubject("hello")
                .setIssuedAt(new java.util.Date())
                .setExpiration(new java.util.Date(System.currentTimeMillis() + 10000))
                .setIssuer("test")
                .signWith(io.jsonwebtoken.SignatureAlgorithm.HS256, testSecretKey)
                .compact();

        //when
        //then
        assertThatThrownBy(() -> provider.getMemberId(token))
                .isInstanceOf(NumberFormatException.class);
    }
}