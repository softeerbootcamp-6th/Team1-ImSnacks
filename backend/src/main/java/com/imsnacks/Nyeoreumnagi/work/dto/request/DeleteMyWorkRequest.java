package com.imsnacks.Nyeoreumnagi.work.dto.request;

import jakarta.validation.constraints.NotBlank;

public record DeleteMyWorkRequest (@NotBlank long myWorkId){}