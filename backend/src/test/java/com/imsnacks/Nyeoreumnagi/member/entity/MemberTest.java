package com.imsnacks.Nyeoreumnagi.member.entity;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class MemberTest {

    @Test
    void Member_생성에_성공한다() {
        String identifier = "testIdentifier";
        String password = "testPassword1234";
        String nickname = "닉네임%&13sfd";
        String phoneNumber = "010-1234-5678";

        Member member = Member.createMember(
                identifier,
                password,
                nickname,
                phoneNumber
        );

        assertThat(member.getIdentifier()).isEqualTo(identifier);
        assertThat(member.getPassword()).isEqualTo(password);
        assertThat(member.getNickname()).isEqualTo(nickname);
        assertThat(member.getPhoneNumber()).isEqualTo(phoneNumber);
    }
}
