package com.imsnacks.Nyeoreumnagi.common.auth.dto.request;

import jakarta.validation.constraints.NotBlank;

public record LoginRequest(
        @NotBlank
        String identifier,
        @NotBlank
        String password
) {
}
