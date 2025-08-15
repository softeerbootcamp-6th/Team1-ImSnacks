package com.imsnacks.Nyeoreumnagi.pest.service;

public record WeatherConditionCode(
        HumidityCode humidityCode,
        TemperatureCode temperatureCode,
        RainCode rainCode) {
    public enum HumidityCode {
        LOW,
        MID,
        HIGH,
        NONE,
        DONT_CARE;

        public static HumidityCode of(final int humidity) {
            if (humidity <= 40) {
                return LOW;
            } else if (humidity >= 70) {
                return MID;
            } else {
                return HIGH;
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
            if (temperature <= 10) {
                return LOW;
            } else if (temperature >= 30) {
                return MID;
            } else {
                return HIGH;
            }
        }
    }

    public enum RainCode {
        RAIN,
        NONE,
        DONT_CARE;

        public static RainCode of(final double precipitation) {
            if (precipitation >= 1.0) {
                return RAIN;
            } else {
                return NONE;
            }
        }
    }

}
