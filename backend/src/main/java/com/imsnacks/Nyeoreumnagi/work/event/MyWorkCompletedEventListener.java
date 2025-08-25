package com.imsnacks.Nyeoreumnagi.work.event;

import ch.hsr.geohash.GeoHash;
import com.imsnacks.Nyeoreumnagi.work.repository.WorkActivityFactRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

@Component
@RequiredArgsConstructor
public class MyWorkCompletedEventListener {
    private final WorkActivityFactRepository workActivityFactRepository;

    @Async
    @TransactionalEventListener(
            classes = MyWorkCompletedEvent.class,
            phase = TransactionPhase.AFTER_COMMIT
    )
    @Transactional(propagation = Propagation.REQUIRES_NEW)
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
