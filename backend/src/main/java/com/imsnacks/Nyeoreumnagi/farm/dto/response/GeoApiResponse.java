package com.imsnacks.Nyeoreumnagi.farm.dto.response;


import org.springframework.data.util.Pair;

public record GeoApiResponse(Response response) {

    public record Response(Service service, String status, Result result) {
    }

    public record Service(String name, String version, String operation, String time) {
    }

    public record Result(String crs, Point point) {
    }

    public record Point(String x, String y) {
    }

    public Pair<String, String> getNxNy(){
        Point point = response.result.point;
        return Pair.of(point.y, point.x);
    }
}
