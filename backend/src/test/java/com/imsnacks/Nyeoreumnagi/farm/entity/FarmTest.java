package com.imsnacks.Nyeoreumnagi.farm.entity;

import com.imsnacks.Nyeoreumnagi.member.entity.Member;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import static org.assertj.core.api.Assertions.*;

class FarmTest {

    @Test
    void Farm_생성에_성공한다() {
        String state = "경상북도";
        String city = "의성군";
        String town = "다인면";
        String address = "삼분리 1554-4";
        double latitude = 127.234423;
        double longitude = 64.23192;
        int nx = 68;
        int ny = 128;
        String midTempRegionCode = "1B23943";
        Member member = Mockito.mock(Member.class);

        Farm farm = Farm.createFarm(
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

        assertThat(farm.getState()).isEqualTo(state);
        assertThat(farm.getCity()).isEqualTo(city);
        assertThat(farm.getTown()).isEqualTo(town);
        assertThat(farm.getAddress()).isEqualTo(address);
        assertThat(farm.getLatitude()).isEqualTo(latitude);
        assertThat(farm.getLongitude()).isEqualTo(longitude);
        assertThat(farm.getNx()).isEqualTo(nx);
        assertThat(farm.getNy()).isEqualTo(ny);
        assertThat(farm.getMidTempRegionCode()).isEqualTo(midTempRegionCode);
    }
}
