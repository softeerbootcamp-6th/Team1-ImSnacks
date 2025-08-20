package com.imsnacks.Nyeoreumnagi.common.util;

import com.github.davidmoten.geo.GeoHash;

import java.util.Set;
import java.util.stream.Collectors;

public final class GeoUtil {
    private GeoUtil() {}

    // geohash-6 (대략 0.6~1.2km 셀)
    public static String geohash6(double lat, double lon) {
        return GeoHash.encodeHash(lat, lon, 6); // (lat, lon) 순서
    }

    public static BBox bbox(double lat, double lon, double rKm) {
        double R = 6371.0088; // km
        double dLat = Math.toDegrees(rKm / R);
        double dLon = Math.toDegrees(rKm / (R * Math.cos(Math.toRadians(lat))));
        return new BBox(lat - dLat, lat + dLat, lon - dLon, lon + dLon);
    }

    // 반경 rKm를 커버하는 geohash-6 타일 목록
    public static Set<String> tilesForRadiusKm(double lat, double lon, double rKm) {
        BBox b = bbox(lat, lon, rKm);

        // coverBoundingBox(북쪽, 남쪽, 서쪽, 동쪽, 정밀도)
        return GeoHash.coverBoundingBox(
                b.maxLat, // top
                b.maxLon, // bottom
                b.minLat, // left
                b.minLon, // right
                6
        ).getHashes().stream().collect(Collectors.toSet());
    }

    public record BBox(double minLat, double maxLat, double minLon, double maxLon) {}
}