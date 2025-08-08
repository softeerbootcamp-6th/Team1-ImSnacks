package com.imsnacks.Nyeoreumnagi.common.auth.jwt;

import lombok.*;

import java.util.UUID;

@Getter
@AllArgsConstructor
public class AuthTokens {

    private String accessToken;
    private UUID refreshToken;

    public static AuthTokens of(String accessToken, UUID refreshToken) {
        return new AuthTokens(accessToken, refreshToken);
    }
}
