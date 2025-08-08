package com.imsnacks.Nyeoreumnagi.work.dto.request;

import jakarta.validation.constraints.NotBlank;

public record ResisterMyWorkRequest(@NotBlank long recommendedWorkId, @NotBlank long myCropId, @NotBlank String startTime, @NotBlank String endTime) {
}
