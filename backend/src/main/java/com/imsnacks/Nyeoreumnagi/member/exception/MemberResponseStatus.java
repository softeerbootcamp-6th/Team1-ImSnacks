package com.imsnacks.Nyeoreumnagi.member.exception;

public enum MemberResponseStatus {
    MEMBER_NOT_FOUND(2001, "회원 정보가 존재하지 않습니다."),
    INVALID_MEMBER_ID(2002, "memberId에 일치하는 member가 존재하지 않습니다."),
    NO_FARM_INFO(2003, "해당 멤버는 농장 정보가 없습니다."),
    INCORRECT_PASSWORD(2004, "비밀번호가 옳지 않습니다."),
    BLANK_IDENTIFIER(2005, "identifer가 비어있습니다."),
    BLANK_PASSWORD(2005, "password가 비어있습니다.")
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
