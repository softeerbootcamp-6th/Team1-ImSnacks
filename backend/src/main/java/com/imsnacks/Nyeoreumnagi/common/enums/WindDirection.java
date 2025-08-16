package com.imsnacks.Nyeoreumnagi.common.enums;

import com.imsnacks.Nyeoreumnagi.weather.exception.WeatherException;

import static com.imsnacks.Nyeoreumnagi.weather.exception.WeatherResponseStatus.NO_WIND_INFO;

public enum WindDirection {
    N("북풍"),
    NE("북동풍"),
    E("동풍"),
    SE("남동풍"),
    S("남풍"),
    SW("남서풍"),
    W("서풍"),
    NW("북서풍"),
    ;
    private final String direction;
    WindDirection(String direction) {
        this.direction = direction;
    }

    public String getDirection() {
        return direction;
    }

    public static String getDirectionStringFromDegree(Integer degree){
        if(degree < 0) throw new WeatherException(NO_WIND_INFO);
        if(degree < 22.5 || (degree > 337.5 && degree <= 360)) return N.getDirection();
        if(degree < 67.5) return NE.getDirection();
        if(degree < 112.5) return E.getDirection();
        if(degree < 157.5) return SE.getDirection();
        if(degree < 202.5) return S.getDirection();
        if(degree < 247.5) return SW.getDirection();
        if(degree < 292.5) return W.getDirection();
        if(degree < 337.5) return NW.getDirection();
        throw new WeatherException(NO_WIND_INFO);
    }
}
