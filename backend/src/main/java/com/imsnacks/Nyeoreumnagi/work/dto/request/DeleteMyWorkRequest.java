package com.imsnacks.Nyeoreumnagi.work.dto.request;

import jakarta.validation.constraints.NotNull;

public record DeleteMyWorkRequest (@NotNull Long myWorkId){}
