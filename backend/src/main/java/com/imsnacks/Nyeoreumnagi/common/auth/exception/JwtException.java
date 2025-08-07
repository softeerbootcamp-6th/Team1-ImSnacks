package com.imsnacks.Nyeoreumnagi.common.auth.exception;

public class JwtException extends RuntimeException{
    private AuthResponseStatus status;

    public JwtException(AuthResponseStatus status) {
        this.status = status;
    }

    public AuthResponseStatus getStatus() {
        return status;
    }
}
