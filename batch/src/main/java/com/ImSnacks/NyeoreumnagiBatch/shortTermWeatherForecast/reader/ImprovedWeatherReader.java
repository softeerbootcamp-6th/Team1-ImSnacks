package com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast.reader;

import com.ImSnacks.NyeoreumnagiBatch.common.entity.NxNy;
import com.ImSnacks.NyeoreumnagiBatch.common.entity.UniqueNxNy;
import com.ImSnacks.NyeoreumnagiBatch.common.repository.UniqueNxNyRepository;
import jakarta.annotation.Nullable;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.configuration.annotation.StepScope;
import org.springframework.batch.item.ItemReader;
import org.springframework.batch.item.NonTransientResourceException;
import org.springframework.batch.item.ParseException;
import org.springframework.batch.item.UnexpectedInputException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.List;

@Slf4j
@Component
@StepScope
public class ImprovedWeatherReader implements ItemReader<UniqueNxNy> {
    private final UniqueNxNyRepository uniqueNxNyRepository;
    private List<UniqueNxNy> locations=null;
    private int cursor;

    public ImprovedWeatherReader(UniqueNxNyRepository uniqueNxNyRepository) {
        this.uniqueNxNyRepository = uniqueNxNyRepository;
        this.cursor = 0;
    }

    @Nullable
    @Override
    public UniqueNxNy read() throws Exception, UnexpectedInputException, ParseException, NonTransientResourceException {
        if (locations == null) {
            locations = uniqueNxNyRepository.findAll().stream().toList();
        }
        if (cursor >= locations.size()) {
            return null;
        }
        UniqueNxNy loc = locations.get(cursor);
        cursor++;
        log.info("Reading NX: {} NY: {}", loc.getId().getNx(), loc.getId().getNy());
        return loc;
    }
}
