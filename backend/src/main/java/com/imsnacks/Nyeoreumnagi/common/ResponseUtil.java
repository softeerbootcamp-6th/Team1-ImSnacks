package com.imsnacks.Nyeoreumnagi.common;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class ResponseUtil {

    public static <T> ResponseEntity<CustomResponseBody<T>> success(T data) {
        return ResponseEntity.ok(new CustomResponseBody<>(StatusCode.SUCCESS,StatusCode.SUCCESS.getMessage(), data));
    }

    public static <T> ResponseEntity<CustomResponseBody<T>> success() {
        return ResponseEntity.ok(new CustomResponseBody<>(StatusCode.SUCCESS ,StatusCode.SUCCESS.getMessage()));
    }

    public static ResponseEntity<CustomResponseBody<Void>> error(HttpStatus httpStatus, String message) {
        return ResponseEntity.status(httpStatus).body(new CustomResponseBody<>(StatusCode.FAIL, message, null));
    }

    public static ResponseEntity<CustomResponseBody<Void>> error(HttpStatus httpStatus) {
        return ResponseEntity.status(httpStatus).body(new CustomResponseBody<>(StatusCode.FAIL, StatusCode.FAIL.getMessage(), null));
    }
}