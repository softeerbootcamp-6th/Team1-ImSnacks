package com.ImSnacks.NyeoreumnagiBatch.ultraviolet.reader.dto;

import lombok.Getter;

@Getter
public class UVReaderResponseDtoWithNxNy {
    private final int nx;
    private final int ny;
    private final UVReaderResponseDto dto;

    public UVReaderResponseDtoWithNxNy(int nx, int ny, UVReaderResponseDto dto) {
        this.nx = nx;
        this.ny = ny;
        this.dto = dto;
    }
}
