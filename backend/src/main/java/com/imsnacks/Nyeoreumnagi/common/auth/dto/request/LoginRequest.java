package com.imsnacks.Nyeoreumnagi.common.auth.dto.request;


import com.imsnacks.Nyeoreumnagi.member.exception.MemberException;

import static com.imsnacks.Nyeoreumnagi.member.exception.MemberResponseStatus.BLANK_IDENTIFIER;
import static com.imsnacks.Nyeoreumnagi.member.exception.MemberResponseStatus.BLANK_PASSWORD;

public record LoginRequest(
        String identifier,
        String password
) {
    public void validate(){
        if(identifier.isBlank()){
            throw new MemberException(BLANK_IDENTIFIER);
        }
        if(password.isBlank()){
            throw new MemberException(BLANK_PASSWORD);
        }
    }
}
