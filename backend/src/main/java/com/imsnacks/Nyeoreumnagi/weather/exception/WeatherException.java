package com.imsnacks.Nyeoreumnagi.weather.exception;

public class WeatherException extends RuntimeException{
    private final WeatherResponseStatus status;

    public WeatherException(WeatherResponseStatus status){
        this.status = status;
    }

    public WeatherResponseStatus getStatus(){
        return status;
    }
}
