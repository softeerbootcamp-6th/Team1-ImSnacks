package com.imsnacks.Nyeoreumnagi.member.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private String identifier;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String nickname;

    @Column(nullable = false)
    private int phoneNumber;

    private UUID refreshToken;
}
