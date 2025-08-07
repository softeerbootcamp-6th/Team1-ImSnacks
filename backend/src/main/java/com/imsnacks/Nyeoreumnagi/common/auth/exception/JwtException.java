package com.imsnacks.Nyeoreumnagi.common.auth.exception;

import com.imsnacks.Nyeoreumnagi.common.auth.AuthResponseStatus;

public class JwtException extends RuntimeException{
    private AuthResponseStatus status;

    public JwtException(AuthResponseStatus status) {
        this.status = status;
    }

    public AuthResponseStatus getStatus() {
        return status;
    }
}
