package com.imsnacks.Nyeoreumnagi.common.auth.exception;

public enum AuthResponseStatus {
    NO_MEMBERID(1001, "access token에 memberId가 없습니다."),
    TOKEN_NOT_FOUND(1002, "access token이 없습니다."),
    UNSUPPORTED_TOKEN_TYPE(1003, "지원하지 않는 token type입니다."),
    EXPIRED_TOKEN(1004, "만료된 token입니다."),
    ;

    private int code;
    private String message;

    AuthResponseStatus(int code, String message) {
        this.code = code;
        this.message = message;
    }

    public int getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }
}
