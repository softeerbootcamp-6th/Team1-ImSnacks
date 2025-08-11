package com.imsnacks.Nyeoreumnagi.work.exception;

public enum CropResponseStatus {
    MY_CROP_NOT_FOUND(6001, "내 작물이 존재하지 않습니다.")
    ;
    private int code;
    private String message;

    CropResponseStatus(int code, String message) {
        this.code = code;
        this.message = message;
    }

    public int getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }
}
