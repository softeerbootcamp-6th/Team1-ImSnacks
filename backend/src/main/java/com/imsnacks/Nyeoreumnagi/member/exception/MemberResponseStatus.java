package com.imsnacks.Nyeoreumnagi.member.exception;

public enum MemberResponseStatus {
    MEMBER_NOT_FOUND(2001, "회원 정보가 존재하지 않습니다."),
    ;

    private int code;
    private String message;

    MemberResponseStatus(int code, String message) {
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
