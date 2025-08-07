package com.imsnacks.Nyeoreumnagi.common.response;

import org.springframework.http.HttpStatus;

public enum StatusCode {

    SUCCESS(HttpStatus.OK, "요청이 성공적으로 처리되었습니다."),
    FAIL(HttpStatus.BAD_REQUEST, "요청이 처리되지 않았습니다.");

    private final HttpStatus status;
    private final String message;

    StatusCode(HttpStatus status, String message) {
        this.status = status;
        this.message = message;
    }

    public HttpStatus getStatus() {
        return status;
    }

    public int getCode() {
        return status.value();
    }

    public String getMessage() {
        return message;
    }
}