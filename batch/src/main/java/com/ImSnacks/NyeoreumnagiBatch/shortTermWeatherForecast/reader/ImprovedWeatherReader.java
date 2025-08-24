package com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast.reader;

import com.ImSnacks.NyeoreumnagiBatch.common.entity.UniqueNxNy;
import com.ImSnacks.NyeoreumnagiBatch.common.repository.UniqueNxNyRepository;
import jakarta.annotation.Nullable;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.configuration.annotation.StepScope;
import org.springframework.batch.item.ItemReader;
import org.springframework.batch.item.NonTransientResourceException;
import org.springframework.batch.item.ParseException;
import org.springframework.batch.item.UnexpectedInputException;
import org.springframework.stereotype.Component;

import java.util.List;

@Slf4j
@Component
@StepScope
// TODO DB구간 나눠서 구간별로 나누어 읽어오기
public class ImprovedWeatherReader implements ItemReader<UniqueNxNy> {
    private List<UniqueNxNy> locations;
    private int cursor;

    public ImprovedWeatherReader(UniqueNxNyRepository uniqueNxNyRepository) {
        this.cursor = 0;
        this.locations = uniqueNxNyRepository.findAll();
    }

    @Nullable
    @Override
    public UniqueNxNy read() throws Exception, UnexpectedInputException, ParseException, NonTransientResourceException {
        if (cursor == locations.size()) {
            return null;
        }
        UniqueNxNy loc = locations.get(cursor);
        cursor++;
        log.info("Reading nx={} ny={}", loc.getId().getNx(), loc.getId().getNy());
        return loc;
    }
}
