package com.imsnacks.Nyeoreumnagi.common;

import lombok.Getter;

@Getter
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