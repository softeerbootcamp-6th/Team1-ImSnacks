package com.imsnacks.Nyeoreumnagi.work.event;

import ch.hsr.geohash.GeoHash;
import com.imsnacks.Nyeoreumnagi.work.repository.WorkActivityFactRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class MyWorkCompletedEventListener {
    private final WorkActivityFactRepository workActivityFactRepository;

    @EventListener
    public void handle(MyWorkCompletedEvent event) {
        String geohash = GeoHash.withCharacterPrecision(
                event.latitude(),
                event.longitude(),
                5 // geohash-5 for ~5km precision
        ).toBase32();

        workActivityFactRepository.insertIgnore(
                event.date(),
                event.workId(),
                geohash,
                event.workStatus().toString(),
                event.memberId()
        );
    }
}
