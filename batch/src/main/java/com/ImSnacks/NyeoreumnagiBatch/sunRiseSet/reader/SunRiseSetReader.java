package com.ImSnacks.NyeoreumnagiBatch.sunRiseSet.reader;

import com.ImSnacks.NyeoreumnagiBatch.common.entity.UniqueNxNy;
import com.ImSnacks.NyeoreumnagiBatch.common.repository.UniqueNxNyRepository;
import com.ImSnacks.NyeoreumnagiBatch.sunRiseSet.reader.dto.SunRiseSetReaderResponseDto;
import com.ImSnacks.NyeoreumnagiBatch.sunRiseSet.reader.dto.SunRiseSetReaderResponseDtoWithNxNy;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.configuration.annotation.StepScope;
import org.springframework.batch.item.ItemReader;
import org.springframework.batch.item.NonTransientResourceException;
import org.springframework.batch.item.ParseException;
import org.springframework.batch.item.UnexpectedInputException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.List;

@Slf4j
@Component
@StepScope
public class SunRiseSetReader implements ItemReader<SunRiseSetReaderResponseDtoWithNxNy> {
    @Autowired
    private final SunRiseSetApiCaller apiCaller;
    @Autowired
    private final UniqueNxNyRepository uniqueNxNyRepository;
    private final String locdate;

    private static List<UniqueNxNy> location = null;
    private int locationIndex = 0;

    public SunRiseSetReader(@Value("#{jobParameters['locdate']}") String locdate,
                    SunRiseSetApiCaller apiCaller,
                    UniqueNxNyRepository uniqueNxNyRepository)
    {
        this.apiCaller = apiCaller;
        this.locdate = locdate;
        this.uniqueNxNyRepository = uniqueNxNyRepository;
    }

    @Override
    public SunRiseSetReaderResponseDtoWithNxNy read() throws Exception, UnexpectedInputException, ParseException, NonTransientResourceException {
        log.info("Reading SunRiseSet API response");

        setLocation();
        if (locationIndex >= location.size()) {
            log.info("location size: " + location.size());
            return null;
        }

        UniqueNxNy uniqueNxNy = location.get(locationIndex);
        int nx = uniqueNxNy.getId().getNx();
        int ny = uniqueNxNy.getId().getNy();
        double longitude = uniqueNxNy.getLatitude();
        double latitude = uniqueNxNy.getLongitude();
        locationIndex++;

        try {
            SunRiseSetReaderResponseDto dto = apiCaller.call(locdate, latitude, longitude);
            return new SunRiseSetReaderResponseDtoWithNxNy(nx, ny, dto);
        } catch (Exception e) {
            log.error("API 호출 중 오류!", e);
            throw e;
        }
    }

    private void setLocation(){
        if(location == null) {
            location = uniqueNxNyRepository.findAll();
        }
    }
}
