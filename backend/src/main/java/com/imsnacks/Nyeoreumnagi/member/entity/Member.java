package com.imsnacks.Nyeoreumnagi.member.entity;

import com.imsnacks.Nyeoreumnagi.farm.entity.Farm;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Getter
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String identifier;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String nickname;

    @Column(nullable = false)
    private String phoneNumber;

    @JdbcTypeCode(SqlTypes.VARCHAR)
    @Column(columnDefinition = "VARCHAR(36)")
    @Setter
    private UUID refreshToken;

    @Setter
    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    Farm farm;

    public Member(String identifier, String password, String nickname, String phoneNumber) {
        this.identifier = identifier;
        this.password = password;
        this.nickname = nickname;
        this.phoneNumber = phoneNumber;
    }

    public static Member createMember(
            String identifier,
            String password,
            String nickname,
            String phoneNumber
    ){
        return new Member(
                identifier,
                password,
                nickname,
                phoneNumber
        );
    }
}
