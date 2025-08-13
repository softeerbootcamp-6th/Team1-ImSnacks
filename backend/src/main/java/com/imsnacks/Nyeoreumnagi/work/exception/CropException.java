package com.imsnacks.Nyeoreumnagi.work.exception;

public class CropException extends RuntimeException {
  private CropResponseStatus status;

  public CropException(CropResponseStatus status) {
    this.status = status;
  }

  public CropResponseStatus getStatus() {
    return status;
  }
}
