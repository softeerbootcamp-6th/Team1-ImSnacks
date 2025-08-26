package com.imsnacks.Nyeoreumnagi.common.response;

import lombok.Getter;

@Getter
public class CustomResponseBody<T> {
    private int code;
    private String msg;
    private T data;

    public CustomResponseBody(int statusCode, String msg, T data) {
        this.code = statusCode;
        this.msg = msg;
        this.data = data;
    }

    public CustomResponseBody(int statusCode, String msg) {
        this.code = statusCode;
        this.msg = msg;
    }
}