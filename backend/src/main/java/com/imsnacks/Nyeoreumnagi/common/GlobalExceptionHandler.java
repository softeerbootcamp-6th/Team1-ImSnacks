package com.imsnacks.Nyeoreumnagi.common;

import com.imsnacks.Nyeoreumnagi.common.auth.exception.AuthResponseStatus;
import com.imsnacks.Nyeoreumnagi.common.auth.exception.JwtException;
import com.imsnacks.Nyeoreumnagi.member.exception.MemberException;
import com.imsnacks.Nyeoreumnagi.member.exception.MemberResponseStatus;
import com.imsnacks.Nyeoreumnagi.work.exception.WorkException;
import com.imsnacks.Nyeoreumnagi.work.exception.WorkResponseStatus;
import jakarta.validation.UnexpectedTypeException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(WorkException.class)
    public ResponseEntity<CustomResponseBody<Void>> handleWorkException(WorkException ex) {
        WorkResponseStatus status = ex.getStatus();
        return ResponseUtil.error(status.getCode(), status.getMessage());
    }

    @ExceptionHandler(MemberException.class)
    public ResponseEntity<CustomResponseBody<Void>> handleMemberException(MemberException ex) {
        MemberResponseStatus status = ex.getStatus();
        return ResponseUtil.error(status.getCode(), status.getMessage());
    }

    @ExceptionHandler(JwtException.class)
    public ResponseEntity<CustomResponseBody<Void>> handleJwtException(JwtException ex) {
        AuthResponseStatus status = ex.getStatus();
        return ResponseUtil.error(status.getCode(), status.getMessage());
    }

    @ExceptionHandler(UnexpectedTypeException.class)
    public ResponseEntity<CustomResponseBody<Void>> handleValidationException(UnexpectedTypeException ex) {
        return ResponseUtil.error(400, ex.getMessage());
    }
}
