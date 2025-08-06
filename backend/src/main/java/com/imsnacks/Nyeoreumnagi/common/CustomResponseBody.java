package com.imsnacks.Nyeoreumnagi.common;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class CustomResponseBody<T> {
    private int code;
    private String msg;
    private T data;

    public CustomResponseBody(StatusCode statusCode, String msg, T data) {
        this.code = statusCode.getCode();
        this.msg = msg;
        this.data = data;
    }

    public CustomResponseBody(StatusCode statusCode, String msg) {
        this.code = statusCode.getCode();
        this.msg = msg;
    }
}