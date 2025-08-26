package com.imsnacks.Nyeoreumnagi.common.auth.service;

import com.imsnacks.Nyeoreumnagi.common.auth.dto.request.LoginRequest;
import com.imsnacks.Nyeoreumnagi.common.auth.dto.response.LoginResponse;
import com.imsnacks.Nyeoreumnagi.common.auth.jwt.AuthTokens;
import com.imsnacks.Nyeoreumnagi.common.auth.jwt.JwtProvider;
import com.imsnacks.Nyeoreumnagi.member.entity.Member;
import com.imsnacks.Nyeoreumnagi.member.exception.MemberException;
import com.imsnacks.Nyeoreumnagi.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

import static com.imsnacks.Nyeoreumnagi.member.exception.MemberResponseStatus.*;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AuthService {
    private final MemberRepository memberRepository;
    private final JwtProvider jwtProvider;

    @Transactional
    public LoginResponse login(LoginRequest request){
        Member member = memberRepository.findOneByIdentifier(request.identifier()).orElseThrow(() -> new MemberException(MEMBER_NOT_FOUND));

        if (!member.getPassword().equals(request.password())){
            throw new MemberException(INCORRECT_PASSWORD);
        }

        AuthTokens token = jwtProvider.createToken(member.getId());
        member.setRefreshToken(token.getRefreshToken());

        return new LoginResponse(token.getRefreshToken(), new LoginResponse.LoginAccessTokenResponse(member.getNickname(), token.getAccessToken()));
    }

    @Transactional
    public LoginResponse refreshToken(UUID refreshToken){
        Member member = memberRepository.findByRefreshToken(refreshToken).orElseThrow(() -> new MemberException(MEMBER_NOT_FOUND));

        AuthTokens token = jwtProvider.createToken(member.getId());
        member.setRefreshToken(token.getRefreshToken());
        log.info("token : {}", member.getRefreshToken());

        return new LoginResponse(member.getRefreshToken(), new LoginResponse.LoginAccessTokenResponse(member.getNickname(), token.getAccessToken()));
    }
}
