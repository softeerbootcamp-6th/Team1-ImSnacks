package com.imsnacks.Nyeoreumnagi.common.auth.jwt;

import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.UUID;

@Component
public class JwtProvider {

    @Value("${secret.jwt-secret-key}")
    private String JWT_SECRET_KEY;

    @Value("${secret.jwt-expired-in.access-token}")
    private long JWT_EXPIRED_IN;

    public AuthTokens createToken(long memberId) {
        Claims claims = Jwts.claims()
                .setSubject(String.valueOf(memberId))
                .setIssuer("nyeoreumnagi");

        Date now = new Date();
        Date accessTokenExpiredAt = new Date(now.getTime() + JWT_EXPIRED_IN);

        String accessToken = Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(accessTokenExpiredAt)
                .signWith(SignatureAlgorithm.HS256, JWT_SECRET_KEY)
                .compact();

        UUID refreshToken = UUID.randomUUID();

        return AuthTokens.of(accessToken, refreshToken);
    }

    public boolean isExpiredToken(String token){
        try {
            Jws<Claims> claims = Jwts.parserBuilder()
                    .setSigningKey(JWT_SECRET_KEY).build()
                    .parseClaimsJws(token);
            return claims.getBody().getExpiration().before(new Date());
        } catch (ExpiredJwtException | UnsupportedJwtException | MalformedJwtException | IllegalArgumentException e) {
            return true;
        }
    }

    public Long getMemberId(String token) {
        String rawMemberId=  Jwts.parserBuilder()
                .setSigningKey(JWT_SECRET_KEY).build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();

        return Long.parseLong(rawMemberId);
    }
}
