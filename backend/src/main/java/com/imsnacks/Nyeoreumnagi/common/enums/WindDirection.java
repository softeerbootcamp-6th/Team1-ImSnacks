package com.imsnacks.Nyeoreumnagi.common.enums;

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
}
