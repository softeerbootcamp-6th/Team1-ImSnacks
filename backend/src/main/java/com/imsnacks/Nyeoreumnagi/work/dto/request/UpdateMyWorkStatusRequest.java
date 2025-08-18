package com.imsnacks.Nyeoreumnagi.work.dto.request;

import com.imsnacks.Nyeoreumnagi.work.entity.WorkStatus;
import com.imsnacks.Nyeoreumnagi.work.exception.WorkException;

import static com.imsnacks.Nyeoreumnagi.work.exception.WorkResponseStatus.NULL_MY_CROP_ID;
import static com.imsnacks.Nyeoreumnagi.work.exception.WorkResponseStatus.NULL_WORK_STATUS;

public record UpdateMyWorkStatusRequest(
        Long myWorkId,
        WorkStatus status
) {
    public void validate(){
        if(myWorkId == null){
            throw new WorkException(NULL_MY_CROP_ID);
        }
        if(status == null){
            throw new WorkException(NULL_WORK_STATUS);
        }
    }
}
