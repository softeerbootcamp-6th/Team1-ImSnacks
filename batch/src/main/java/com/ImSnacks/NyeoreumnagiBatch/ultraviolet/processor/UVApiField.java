package com.ImSnacks.NyeoreumnagiBatch.ultraviolet.processor;

import com.ImSnacks.NyeoreumnagiBatch.ultraviolet.reader.dto.UVReaderResponseDto;

import java.time.LocalTime;
import java.util.function.Function;

public enum UVApiField {
    H0("h0", UVReaderResponseDto.Item::h0, LocalTime.of(0,0), LocalTime.of(3,0)),
    H3("h3", UVReaderResponseDto.Item::h3, LocalTime.of(3,0), LocalTime.of(6,0)),
    H6("h6", UVReaderResponseDto.Item::h6, LocalTime.of(6,0), LocalTime.of(9,0)),
    H9("h9", UVReaderResponseDto.Item::h9, LocalTime.of(9,0), LocalTime.of(12,0)),
    H12("h12", UVReaderResponseDto.Item::h12, LocalTime.of(12,0), LocalTime.of(15,0)),
    H15("h15", UVReaderResponseDto.Item::h15, LocalTime.of(15,0), LocalTime.of(18,0)),
    H18("h18", UVReaderResponseDto.Item::h18, LocalTime.of(18,0), LocalTime.of(21,0)),
    H21("h21", UVReaderResponseDto.Item::h21, LocalTime.of(21,0), LocalTime.of(0,0)),
    ;

    private final String key;
    private final Function<UVReaderResponseDto.Item, String> gettingValueMethod;
    private final LocalTime startTime;
    private final LocalTime endTime;

    UVApiField(String key, Function<UVReaderResponseDto.Item, String> gettingValueMethod, LocalTime startTime, LocalTime endTime) {
        this.key = key;
        this.gettingValueMethod = gettingValueMethod;
        this.startTime = startTime;
        this.endTime = endTime;
    }

    public String getValue(UVReaderResponseDto.Item item){
        return gettingValueMethod.apply(item);
    }

    public LocalTime getStartTime() {
        return startTime;
    }

    public LocalTime getEndTime() {
        return endTime;
    }
}
