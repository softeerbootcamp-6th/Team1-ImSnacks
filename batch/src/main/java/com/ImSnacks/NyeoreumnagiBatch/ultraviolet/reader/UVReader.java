package com.ImSnacks.NyeoreumnagiBatch.ultraviolet.reader;

import com.ImSnacks.NyeoreumnagiBatch.ultraviolet.reader.dto.UVReaderResponseDto;
import com.ImSnacks.NyeoreumnagiBatch.common.repository.UniqueNxNyRepository;
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
public class UVReader implements ItemReader<UVReaderResponseDto> {

    @Autowired
    private final UVApiCaller apiCaller;
    @Autowired
    private final UniqueNxNyRepository uniqueNxNyRepository;
    private final String baseDateTime;

    private static List<String> areaCodes = null;
    private static int areaCodesIndex = 0;

    UVReader(@Value("#{jobParameters['base_date_time']}") String baseDateTime,
             UVApiCaller apiCaller,
             UniqueNxNyRepository uniqueNxNyRepository)
    {
        this.apiCaller = apiCaller;
        this.baseDateTime = baseDateTime;
        this.uniqueNxNyRepository = uniqueNxNyRepository;
    }

    @Override
    public UVReaderResponseDto read() throws Exception, UnexpectedInputException, ParseException, NonTransientResourceException {
        log.info("Reading UV API response");
        setAreaCodes();
        String areaCode = getNextAreaCode();

        try {
            UVReaderResponseDto dto = apiCaller.call(areaCode, baseDateTime);
            return dto;
        } catch (Exception e) {
            log.error("API 호출 중 오류!", e);
            throw e;
        }
    }

    private void setAreaCodes(){
        if(areaCodes == null) {
            areaCodes = uniqueNxNyRepository.findAreaCodes();
        }
    }

    private String getNextAreaCode(){
        if (areaCodesIndex >= areaCodes.size()) {
            log.info("areaCodes size: " + areaCodes.size());
            return null;
        }
        String areaCode = areaCodes.get(areaCodesIndex);
        areaCodesIndex++;

        return areaCode;
    }
}
