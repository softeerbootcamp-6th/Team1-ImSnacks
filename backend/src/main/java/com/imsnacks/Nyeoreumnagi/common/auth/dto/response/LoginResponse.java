package com.imsnacks.Nyeoreumnagi.common.auth.dto.response;

import java.util.UUID;

public record LoginResponse(
        String nickname,
        String accessToken,
        UUID refreshToken
) {
}
