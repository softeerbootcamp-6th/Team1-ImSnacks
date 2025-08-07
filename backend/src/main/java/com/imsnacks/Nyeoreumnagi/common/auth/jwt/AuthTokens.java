package com.imsnacks.Nyeoreumnagi.common.auth.jwt;

import lombok.*;

import java.util.UUID;

@Getter
public class AuthTokens {

    private String accessToken;
    private UUID refreshToken;
    private Long expiresIn;

    public static AuthTokens of(String accessToken, UUID refreshToken, Long expiresIn) {
        return new AuthTokens(accessToken, refreshToken, expiresIn);
    }
}
