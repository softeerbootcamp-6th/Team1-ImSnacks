package com.imsnacks.Nyeoreumnagi.common;

import com.imsnacks.Nyeoreumnagi.work.exception.WorkException;
import com.imsnacks.Nyeoreumnagi.work.exception.WorkResponseStatus;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(WorkException.class)
    public ResponseEntity<CustomResponseBody<Void>> handleWorkException(WorkException ex) {
        WorkResponseStatus status = ex.getStatus();
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(new CustomResponseBody<>(status.getCode(), status.getMessage(), null));
    }
}
