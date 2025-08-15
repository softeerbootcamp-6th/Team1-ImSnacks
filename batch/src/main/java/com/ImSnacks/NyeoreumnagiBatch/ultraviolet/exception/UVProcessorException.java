package com.ImSnacks.NyeoreumnagiBatch.ultraviolet.exception;

public class UVProcessorException extends RuntimeException {
    private final String message;
    public UVProcessorException(String message) {
        this.message = message;
    }
}
