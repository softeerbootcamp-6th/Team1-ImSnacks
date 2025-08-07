package com.imsnacks.Nyeoreumnagi.work.exception;

public class WorkException extends RuntimeException{
    private WorkResponseStatus status;

    public WorkException(WorkResponseStatus status) {
        this.status = status;
    }

    public WorkResponseStatus getStatus() {
        return status;
    }
}
