package com.imsnacks.Nyeoreumnagi.work.dto.request;

import com.imsnacks.Nyeoreumnagi.work.exception.WorkException;
import jakarta.validation.constraints.NotNull;

import static com.imsnacks.Nyeoreumnagi.work.exception.WorkResponseStatus.NULL_MY_WORK_ID;

public record DeleteMyWorkRequest (@NotNull Long myWorkId){
    public void validate(){
        if(myWorkId == null){
            throw new WorkException(NULL_MY_WORK_ID);
        }
    }
}
