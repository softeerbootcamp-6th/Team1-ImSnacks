package com.ImSnacks.NyeoreumnagiBatch.ultraviolet.processor;

import com.ImSnacks.NyeoreumnagiBatch.ultraviolet.exception.UVProcessorException;
import com.ImSnacks.NyeoreumnagiBatch.ultraviolet.processor.dto.UVProcessorResponseDto;
import com.ImSnacks.NyeoreumnagiBatch.ultraviolet.reader.dto.UVReaderResponseDto;
import com.ImSnacks.NyeoreumnagiBatch.ultraviolet.reader.dto.UVReaderResponseDtoWithNxNy;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.stereotype.Component;

import java.time.LocalTime;

@Slf4j
@Component
public class UVProcessor implements ItemProcessor<UVReaderResponseDtoWithNxNy, UVProcessorResponseDto> {

    @Override
    public UVProcessorResponseDto process(UVReaderResponseDtoWithNxNy item) throws Exception {
        log.info("Processing UV Processor");
        UVReaderResponseDto.Item uvInfos = item.getDto().getItems();
        int nx = item.getNx();
        int ny = item.getNy();

        return getMaxValue(uvInfos, nx, ny);
    }

    private UVProcessorResponseDto getMaxValue(UVReaderResponseDto.Item unInfos, int nx, int ny) throws UVProcessorException {
        int maxValue = 0;
        LocalTime startTime = null;
        LocalTime endTime = null;
        for(UVApiField field : UVApiField.values()){
            Integer value = getValue(field, unInfos);
            if(value > maxValue){
                maxValue = value;
                startTime = field.getStartTime();
                endTime = field.getEndTime();
            }
            else if(value == maxValue && endTime == field.getStartTime()){
                endTime = field.getEndTime();
            }
        }
        if(startTime == null || endTime == null){
            throw new UVProcessorException("자외선의 최대값을 걔산할 수 없습니다.");
        }

        return new UVProcessorResponseDto(nx, ny, maxValue, startTime, endTime);
    }

    private Integer getValue(UVApiField field, UVReaderResponseDto.Item unInfos){
        try{
            return Integer.parseInt(field.getValue(unInfos));
        }catch(NumberFormatException e){
            return 0;
        }
    }
}
