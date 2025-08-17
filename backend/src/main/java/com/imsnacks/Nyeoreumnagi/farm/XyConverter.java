package com.imsnacks.Nyeoreumnagi.farm;

import java.util.HashMap;
import java.util.Map;

import static java.lang.Math.*;

public class XyConverter {
    private static final double RE = 6371.00877; // 지구 반경(km)
    private static final double GRID = 5.0;     // 격자 간격(km)
    private static final double SLAT1 = 30.0;   // 투영 위도1(degree)
    private static final double SLAT2 = 60.0;   // 투영 위도2(degree)
    private static final double OLON = 126.0;   // 기준점 경도(degree)
    private static final double OLAT = 38.0;    // 기준점 위도(degree)
    private static final double XO = 43;        // 기준점 X좌표(GRID)
    private static final double YO = 136;       // 기준점 Y좌표(GRID)

    private static final double DEGRAD = PI / 180.0;

    private static final double re = RE / GRID;
    private static final double slat1 = SLAT1 * DEGRAD;
    private static final double slat2 = SLAT2 * DEGRAD;
    private static final double olon = OLON * DEGRAD;
    private static final double olat = OLAT * DEGRAD;

    private static final double sn;
    private static final double sf;
    private static final double ro;

    static {
        double tempSn = tan(PI * 0.25 + slat2 * 0.5) / tan(PI * 0.25 + slat1 * 0.5);
        sn = log(cos(slat1) / cos(slat2)) / log(tempSn);

        double tempSf = tan(PI * 0.25 + slat1 * 0.5);
        sf = pow(tempSf, sn) * cos(slat1) / sn;

        double tempRo = tan(PI * 0.25 + olat * 0.5);
        ro = re * sf / pow(tempRo, sn);
    }

    /**
     * 위경도(longitude, latitude)를 nx, ny 좌표로 변환합니다.
     *
     * @param latitude 위도
     * @param longitude 경도
     * @return nx, ny 좌표를 담은 Map
     */
    public static Map<String, Integer> toXY(double latitude, double longitude) {
        Map<String, Integer> result = new HashMap<>();

        double ra = tan(PI * 0.25 + (latitude) * DEGRAD * 0.5);
        ra = re * sf / pow(ra, sn);
        double theta = longitude * DEGRAD - olon;
        if (theta > PI) theta -= 2.0 * PI;
        if (theta < -PI) theta += 2.0 * PI;
        theta *= sn;

        int x = (int) floor(ra * sin(theta) + XO + 0.5);
        int y = (int) floor(ro - ra * cos(theta) + YO + 0.5);


        result.put("nx", x);
        result.put("ny", y);
        return result;
    }
}
