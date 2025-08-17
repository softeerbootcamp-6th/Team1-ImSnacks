package com.imsnacks.Nyeoreumnagi.farm.entity;

import com.imsnacks.Nyeoreumnagi.member.entity.Member;
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
    private Long id;

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

//    public Farm(String state, String city, String town, String address, Double latitude, Double longitude, Integer nx, Integer ny, String midTempRegionCode) {
//        this.state = state;
//        this.city = city;
//        this.town = town;
//        this.address = address;
//        this.latitude = latitude;
//        this.longitude = longitude;
//        this.nx = nx;
//        this.ny = ny;
//        this.midTempRegionCode = midTempRegionCode;
//    }

    public static Farm createFarm(
        String state,
        String city,
        String town,
        String address,
        Double latitude,
        Double longitude,
        Integer nx,
        Integer ny,
        String midTempRegionCode,
        Member member
    ){
        return new Farm(
                null,
                state,
                city,
                town,
                address,
                latitude,
                longitude,
                nx,
                ny,
                midTempRegionCode,
                member
        );
    }
}
