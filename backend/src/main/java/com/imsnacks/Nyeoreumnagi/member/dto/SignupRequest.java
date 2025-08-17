package com.imsnacks.Nyeoreumnagi.member.dto;

import com.imsnacks.Nyeoreumnagi.member.exception.MemberException;

import java.util.regex.Pattern;

import static com.imsnacks.Nyeoreumnagi.member.exception.MemberResponseStatus.*;

public record SignupRequest(
        RegisterMemberRequest member,
        RegisterFarmRequest farm
) {
    public record RegisterMemberRequest(
            String nickname,
            String identifier,
            String phoneNumber,
            String password
    ){
        public void validate(){
            if(nickname.isBlank()){
                throw new MemberException(BLANK_NICKNAME);
            }
            if(identifier.isBlank()){
                throw new MemberException(BLANK_IDENTIFIER);
            }
            if(Pattern.matches("^\\\\d{3}-\\\\d{3,4}-\\\\d{4}$", phoneNumber)){
                throw new MemberException(INVALID_PHONE_NUMBER_FORMAT);
            }
            if (password.isBlank()){
                throw new MemberException(BLANK_PASSWORD);
            }
        }
    }

    public record RegisterFarmRequest(
            String state,
            String city,
            String town,
            String address
    ){
        public void validate(){
            if(state.isBlank()){
                throw new MemberException(BLANK_FARM_STATE);
            }
            if(city.isBlank()){
                throw new MemberException(BLANK_FARM_CITY);
            }
            if(town.isBlank()){
                throw new MemberException(BLANK_FARM_TOWN);
            }
            if(address.isBlank()){
                throw new MemberException(BLANK_FARM_ADDRESS);
            }
        }
    }

    public void validate(){
        member.validate();
        farm.validate();

    }

}
