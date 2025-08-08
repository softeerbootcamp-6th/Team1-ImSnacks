package com.imsnacks.Nyeoreumnagi.member.exception;

public class MemberException extends RuntimeException{
    private MemberResponseStatus status;

    public MemberException(MemberResponseStatus status) {
        this.status = status;
    }

    public MemberResponseStatus getStatus() {
        return status;
    }
}
