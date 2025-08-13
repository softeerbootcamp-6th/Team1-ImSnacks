package com.imsnacks.Nyeoreumnagi.lifecycle;

import com.imsnacks.Nyeoreumnagi.lifecycle.entity.LifeCycle;
import com.imsnacks.Nyeoreumnagi.work.entity.MyCrop;
import com.imsnacks.Nyeoreumnagi.work.exception.WorkException;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static com.imsnacks.Nyeoreumnagi.work.exception.WorkResponseStatus.LIFE_CYCLE_NOT_FOUND;

@Component
public class LifeCycleResolver {
    public long calculateLifeCycle(MyCrop myCrop, List<LifeCycle> lifeCyclesOrderByStep, LocalDateTime requestDateTime) {
        long nowLifeCycleId = 0;

        long myCropAge = ChronoUnit.DAYS.between(myCrop.getGerminationTime(), requestDateTime);
        for (LifeCycle lifeCycle : lifeCyclesOrderByStep) {
            myCropAge -= lifeCycle.getDuration();
            nowLifeCycleId = lifeCycle.getId();
            if (myCropAge <= 0) {
                return nowLifeCycleId;
            }
        }

        if (nowLifeCycleId == 0) {
            throw new WorkException(LIFE_CYCLE_NOT_FOUND);
        }
        return nowLifeCycleId;
    }
}
