package com.imsnacks.Nyeoreumnagi.weather.entity;

import com.imsnacks.Nyeoreumnagi.common.enums.WeatherCondition;
import com.imsnacks.Nyeoreumnagi.weather.exception.WeatherException;
import com.imsnacks.Nyeoreumnagi.weather.service.projection_entity.SunriseSunSetTime;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Builder;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

import static com.imsnacks.Nyeoreumnagi.weather.exception.WeatherResponseStatus.CANNOT_CALCULATE_WEATHER_CONDITION;

@Entity
@Table(name = "ShortTermWeatherForecast")
@IdClass(ShortTermWeatherForecastId.class)
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EntityListeners(AuditingEntityListener.class)
public class ShortTermWeatherForecast {
    @Id
    private int nx;

    @Id
    private int ny;

    @Id
    @Column(name = "fcst_time")
    private LocalDateTime fcstTime;

    @Column(nullable = false)
    private double precipitation;

    @Column(nullable = false)
    private int temperature;

    @Column(nullable = false)
    private int humidity;

    @Column(name = "wind_speed", nullable = false)
    private double windSpeed;

    @Column(name = "snow", nullable = false)
    private double snow;

    @Column(name = "sky_status", nullable = false)
    private int skyStatus;

    @Column(name = "wind_direction", nullable = false)
    private int wind_direction;

    @LastModifiedDate
    @Column(name = "update_at")
    private LocalDateTime updateAt;

    public WeatherCondition getWeatherCondition(SunriseSunSetTime times){
        if(snow > 1) return WeatherCondition.SNOW;
        if(precipitation >= 30) return WeatherCondition.HEAVY_RAIN;
        if(precipitation > 0) return WeatherCondition.RAIN;
        if(windSpeed >= 14) return WeatherCondition.STRONG_WIND;
        if(fcstTime.getHour() >= times.getSunriseTime().getHour() && fcstTime.getHour() < times.getSunSetTime().getHour()){
            if(temperature >= 33) return WeatherCondition.HEAT_WAVE;
            if(skyStatus == 1) return WeatherCondition.SUNNY;
            if(skyStatus == 3) return WeatherCondition.LESS_CLOUDY;
            if(skyStatus == 4) return WeatherCondition.CLOUDY;
        }
        else{
            if(skyStatus == 1) return WeatherCondition.NIGHT;
            if(skyStatus == 3 || skyStatus == 4) return WeatherCondition.CLOUDY_NIGHT;
        }
        throw new WeatherException(CANNOT_CALCULATE_WEATHER_CONDITION);
    }

    public boolean isUpdated(){
        return LocalDateTime.now().getHour() - updateAt.getHour() < 3;
    }
}
