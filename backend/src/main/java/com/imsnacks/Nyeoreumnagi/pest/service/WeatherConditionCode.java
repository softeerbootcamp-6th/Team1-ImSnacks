package com.imsnacks.Nyeoreumnagi.pest.service;

import com.imsnacks.Nyeoreumnagi.weather.entity.ShortTermWeatherForecast;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

import java.util.List;

public record WeatherConditionCode(
        HumidityCode humidityCode,
        TemperatureCode temperatureCode,
        RainCode rainCode) {

    private static final int LOW_INDEX = 0;
    private static final int HIGH_INDEX = 1;

    public static WeatherConditionCode of(@NotNull List<ShortTermWeatherForecast> fcsts) {
        // 습도와 기온은 (높음, 보통, 낮음) 중 앞선 24시간 동안의 예보 중 가장 빈도가 높은 것을 반환한다.
        // 다만, 보통의 경우가 가장 많더라도 (높음, 낮음)이 하나라도 있으면 이것으로 기상 코드를 반환한다.
        // 비 예보가 하나라도 있으면 비가 오는 것으로 코드를 반환한다.
        int[] hcodes = new int[2];
        int[] tcodes = new int[2];
        HumidityCode hcode = HumidityCode.MID;
        TemperatureCode tcode = TemperatureCode.MID;
        RainCode rcode = RainCode.NONE;

        for (var fcst : fcsts) {
            countHcode(HumidityCode.of(fcst.getHumidity()), hcodes);
            countTcode(TemperatureCode.of(fcst.getTemperature()), tcodes);
            if (RainCode.RAIN == RainCode.of(fcst.getPrecipitation())) {
                rcode = RainCode.RAIN;
            }
        }

        if (hcodes[LOW_INDEX] > 0 || hcodes[HIGH_INDEX] > 0) {
            hcode = (hcodes[LOW_INDEX] > hcodes[HIGH_INDEX]) ? HumidityCode.LOW : HumidityCode.HIGH;
        }
        if (tcodes[LOW_INDEX] > 0 || tcodes[HIGH_INDEX] > 0) {
            tcode = (tcodes[LOW_INDEX] > tcodes[HIGH_INDEX]) ? TemperatureCode.LOW : TemperatureCode.HIGH;
        }

        return new WeatherConditionCode(hcode, tcode, rcode);
    }

    private static void countHcode(final @NotNull HumidityCode hcode, final @NotNull int[] hcodes) {
        switch (hcode) {
            case LOW:
                hcodes[LOW_INDEX]++;
                break;
            case HIGH:
                hcodes[HIGH_INDEX]++;
                break;
            default:
                assert (false); // 절대 실행될 일 없음.
                break;
        }
    }

    private static void countTcode(final @NotNull TemperatureCode tcode, final @NotNull int[] tcodes) {
        switch (tcode) {
            case LOW:
                tcodes[LOW_INDEX]++;
                break;
            case HIGH:
                tcodes[HIGH_INDEX]++;
                break;
            default:
                assert (false); // 절대 실행될 일 없음.
                break;
        }
    }

    public enum HumidityCode {
        LOW,
        MID,
        HIGH,
        NONE,
        DONT_CARE;

        public static HumidityCode of(final int humidity) {
            if (humidity < LevelBoundary.LOW_TO_MID.getThresholdValue()) {
                return LOW;
            } else if (humidity < LevelBoundary.MID_TO_HIGH.getThresholdValue()) {
                return MID;
            } else {
                return HIGH;
            }
        }

        public enum LevelBoundary {
            LOW_TO_MID(30),
            MID_TO_HIGH(60);

            @Getter
            private final int thresholdValue;

            LevelBoundary(final int thresholdValue) {
                this.thresholdValue = thresholdValue;
            }
        }
    }

    public enum TemperatureCode {
        LOW,
        MID,
        HIGH,
        NONE,
        DONT_CARE;

        public static TemperatureCode of(final int temperature) {
            if (temperature < LevelBoundary.LOW_TO_MID.getThresholdValue()) {
                return LOW;
            } else if (temperature < LevelBoundary.MID_TO_HIGH.getThresholdValue()) {
                return MID;
            } else {
                return HIGH;
            }
        }

        public enum LevelBoundary {
            LOW_TO_MID(30),
            MID_TO_HIGH(60);

            @Getter
            private final int thresholdValue;

            LevelBoundary(final int thresholdValue) {
                this.thresholdValue = thresholdValue;
            }
        }
    }

    public enum RainCode {
        RAIN,
        NONE,
        DONT_CARE;

        public static RainCode of(final double precipitation) {
            if (precipitation >= LevelBoundary.RAIN.getThresholdValue()) {
                return RAIN;
            } else {
                return NONE;
            }
        }

        public enum LevelBoundary {
            RAIN(1.0);

            @Getter
            private final double thresholdValue;

            LevelBoundary(final double thresholdValue) {
                this.thresholdValue = thresholdValue;
            }
        }
    }

}
