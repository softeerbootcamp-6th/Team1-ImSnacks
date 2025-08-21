package com.imsnacks.Nyeoreumnagi.common.util;

import com.github.davidmoten.geo.GeoHash;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@NoArgsConstructor
public final class GeoUtil {

    public static BBox bbox(double lat, double lon, double rKm) {
        double R = 6371.0088; // km
        double dLat = Math.toDegrees(rKm / R);
        double dLon = Math.toDegrees(rKm / (R * Math.cos(Math.toRadians(lat))));
        return new BBox(lat - dLat, lat + dLat, lon - dLon, lon + dLon);
    }

    public static Set<String> tilesForRadiusKm(double lat, double lon, double rKm) {
        BBox b = bbox(lat, lon, rKm);

        return new HashSet<>(GeoHash.coverBoundingBox(
                b.maxLat,
                b.minLon,
                b.minLat,
                b.maxLon,
                5
        ).getHashes());
    }

    public record BBox(double minLat, double maxLat, double minLon, double maxLon) {}
}