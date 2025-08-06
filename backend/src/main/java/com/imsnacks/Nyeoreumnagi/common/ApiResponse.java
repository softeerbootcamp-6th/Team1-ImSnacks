package com.imsnacks.Nyeoreumnagi.common;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ApiResponse<T> {

    private int code;
    private String msg;
    private T data;

    public static <T> ApiResponse<T> success(int code, String msg, T data) {
        return new ApiResponse<>(code, msg, data);
    }

    public static <T> ApiResponse<T> fail(int code, String msg) {
        return new ApiResponse<>(code, msg, null);
    }
}