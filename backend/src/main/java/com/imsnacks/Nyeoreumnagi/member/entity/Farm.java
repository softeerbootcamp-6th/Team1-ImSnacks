package com.imsnacks.Nyeoreumnagi.member.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Getter
public class Farm {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private String state;

    @Column(nullable = false)
    private String city;

    @Column(nullable = false)
    private String town;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private Double latitude;

    @Column(nullable = false)
    private Double longitude;

    @Column(nullable = false)
    private Integer nx;

    @Column(nullable = false)
    private Integer ny;

    private String midTempRegionCode;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    Member member;

    public String engraftAddress(){
        StringBuilder builder = new StringBuilder();
        builder.append(state);
        builder.append(" ");
        builder.append(city);
        builder.append(" ");
        builder.append(town);
        builder.append(" ");
        builder.append(address);
        return builder.toString();
    }
}
