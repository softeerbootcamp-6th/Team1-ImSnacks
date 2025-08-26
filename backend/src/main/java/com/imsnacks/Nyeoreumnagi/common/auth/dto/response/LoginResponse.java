package com.imsnacks.Nyeoreumnagi.common.auth.dto.response;


import java.util.UUID;

public record LoginResponse(
        UUID refreshToken,
        LoginAccessTokenResponse loginAccessTokenResponse
) {
    public record LoginAccessTokenResponse(
            String nickname,
            String accessToken
    ){}
}
