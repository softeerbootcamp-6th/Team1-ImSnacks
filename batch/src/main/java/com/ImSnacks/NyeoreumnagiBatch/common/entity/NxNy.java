package com.ImSnacks.NyeoreumnagiBatch.common.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Objects;

@Getter
@AllArgsConstructor
public class NxNy {
    private int nx;
    private int ny;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        NxNy nxNy = (NxNy) o;
        return nx == nxNy.nx && ny == nxNy.ny;
    }

    @Override
    public int hashCode() {
        return Objects.hash(nx, ny);
    }
}
