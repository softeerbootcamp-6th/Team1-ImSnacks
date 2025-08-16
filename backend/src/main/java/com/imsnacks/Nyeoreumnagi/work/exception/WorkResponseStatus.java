package com.imsnacks.Nyeoreumnagi.work.exception;

public enum WorkResponseStatus {
    RECOMMENDED_WORK_NOT_FOUND(7001, "해당 추천 농작업이 존재하지 않습니다."),
    MY_CROP_NOT_FOUND(7002, "내 작물이 존재하지 않습니다."),
    INVALID_MY_WORK_TIME(7003, "농작업 시간이 유효하지 않습니다."),
    MY_WORK_NOT_FOUND(7004, "해당 작업이 존재하지 않습니다."),
    MY_WORK_NOT_COMPLETED(7005, "해당 작업이 완료되지 않았습니다."),
    LIFE_CYCLE_NOT_FOUND(7006, "일치하는 생육 단계가 존재하지 않습니다."),
    START_TIME_IS_FUTURE(7011, "요청 시작 시간이 미래입니다.")
    ;

    private int code;
    private String message;

    WorkResponseStatus(int code, String message) {
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
