package com.imsnacks.Nyeoreumnagi.farm.entity;

import com.imsnacks.Nyeoreumnagi.member.entity.Member;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
import org.locationtech.jts.geom.PrecisionModel;

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

    @Column(columnDefinition = "POINT SRID 4326")
    private Point location;

    @Column(nullable = false)
    private Integer nx;

    @Column(nullable = false)
    private Integer ny;

    private String midTempRegionCode;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    Member member;

    public static Farm createFarm(
        String state,
        String city,
        String town,
        String address,
        Double longitude,
        Double latitude,
        Integer nx,
        Integer ny,
        String midTempRegionCode,
        Member member
    ){
        GeometryFactory geometryFactory = new GeometryFactory(new PrecisionModel(), 4326); // SRID 4326
        Point point = geometryFactory.createPoint(new Coordinate(longitude, latitude));

        return new Farm(
                null,
                state,
                city,
                town,
                address,
                point,
                nx,
                ny,
                midTempRegionCode,
                member
        );
    }

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
