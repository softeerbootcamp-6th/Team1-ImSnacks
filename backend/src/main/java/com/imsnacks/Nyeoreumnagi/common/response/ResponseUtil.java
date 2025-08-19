package com.imsnacks.Nyeoreumnagi.common.response;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;

import java.util.UUID;

public class ResponseUtil {

    public static <T> ResponseEntity<CustomResponseBody<T>> success(T data) {
        return ResponseEntity.ok(new CustomResponseBody<>(StatusCode.SUCCESS.getCode(),StatusCode.SUCCESS.getMessage(), data));
    }

    public static <T> ResponseEntity<CustomResponseBody<T>> success(T data, UUID refreshToken) {
        ResponseCookie cookie = ResponseCookie.from("refreshToken", refreshToken.toString())
                .path("/")
                .maxAge(86400 * 3)
                .httpOnly(true)
                .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(new CustomResponseBody<>(StatusCode.SUCCESS.getCode(),StatusCode.SUCCESS.getMessage(), data));
    }

    public static <T> ResponseEntity<CustomResponseBody<T>> success() {
        return ResponseEntity.ok(new CustomResponseBody<>(StatusCode.SUCCESS.getCode() ,StatusCode.SUCCESS.getMessage()));
    }

    public static ResponseEntity<CustomResponseBody<Void>> error(int code, String msg) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new CustomResponseBody<>(code, msg));
    }
}