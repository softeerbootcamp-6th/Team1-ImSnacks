package com.imsnacks.Nyeoreumnagi.work.exception;

public enum CropResponseStatus {
    MY_CROP_NOT_FOUND(6001, "내 작물이 존재하지 않습니다."),
    MY_CROP_NOT_YOURS(6002, "사용자에게 등록된 내 작물이 아닙니다.")
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
