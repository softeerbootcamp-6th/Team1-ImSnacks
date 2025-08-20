package com.imsnacks.Nyeoreumnagi.work.service;

import com.imsnacks.Nyeoreumnagi.common.util.GeoUtil;
import com.imsnacks.Nyeoreumnagi.member.repository.FarmRepository;
import com.imsnacks.Nyeoreumnagi.work.repository.WorkActivityFactRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class NearbyAggregationService {

    private final WorkActivityFactRepository factRepo;
    private final FarmRepository farmLocRepo;

    // KST 오늘/어제/그제
    private static LocalDate todayKst() { return LocalDate.now(ZoneId.of("Asia/Seoul")); }

    public long countNeighborsWithin5kmUsingFact(long workId, long currentMemberId,
                                                 double centerLat, double centerLon,
                                                 boolean applyKAnonymity, int k) {

        LocalDate d0 = todayKst();
        LocalDate d1 = d0.minusDays(1);
        LocalDate d2 = d0.minusDays(2);

        // 1) 반경 5km를 커버하는 geohash-6 타일 목록 계산
        Set<String> tiles = GeoUtil.tilesForRadiusKm(centerLat, centerLon, 5.0);

        // 2) 팩트에서 후보 멤버 ID 가져오기
        List<Long> candidateIds = factRepo.findCandidateMemberIds(workId, currentMemberId, d0, d1, d2, tiles);
        if (candidateIds.isEmpty()) return 0;

        // 3) 후보들의 실제 좌표 조회
        var locRows = farmLocRepo.findMemberLocations(candidateIds);

        // 4) 최종: 정확한 5km 판정(Haversine) + 유니크 카운트
        long count = locRows.stream()
                .map(r -> new MemberLoc(((Number) r[0]).longValue(),
                        ((Number) r[2]).doubleValue(), // lat
                        ((Number) r[1]).doubleValue()  // lon
                ))
                .filter(loc -> haversineMeters(centerLat, centerLon, loc.lat(), loc.lon()) <= 5000.0)
                .map(MemberLoc::memberId)
                .distinct()
                .count();

        if (applyKAnonymity && count < k) return 0;
        return count;
    }

    private record MemberLoc(long memberId, double lat, double lon) {}

    // 정확 거리(m)
    private static double haversineMeters(double lat1, double lon1, double lat2, double lon2) {
        double R = 6371008.8;
        double dLat = Math.toRadians(lat2 - lat1);
        double dLon = Math.toRadians(lon2 - lon1);
        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2)) *
                        Math.sin(dLon / 2) * Math.sin(dLon / 2);
        return 2 * R * Math.asin(Math.sqrt(a));
    }
}