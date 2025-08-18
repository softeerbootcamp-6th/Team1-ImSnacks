package com.imsnacks.Nyeoreumnagi.damage.weatherRisk.enums;

import com.imsnacks.Nyeoreumnagi.common.enums.WeatherRiskType;
import com.imsnacks.Nyeoreumnagi.weather.exception.WeatherException;

import java.util.List;

import static com.imsnacks.Nyeoreumnagi.common.enums.WeatherRiskType.*;
import static com.imsnacks.Nyeoreumnagi.weather.exception.WeatherResponseStatus.NO_MATCHING_WEATHER_RISK_CARD;

public enum WeatherRiskCard {
    SUNBURN("햇볕 데임", ""),
    WATER_DEFICIENCY("수분 부족", ""),
    POOR_COLORING("착색 불량", ""),
    FRUIT_CRAKING("열과", ""),
    FRUIT_DROP("낙과", ""),
    FLOWER_DROP("낙화", ""),
    ;

    private final String title;
    private final String description;

    WeatherRiskCard(String title, String description) {
        this.title = title;
        this.description = description;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public static List<WeatherRiskCard> getCardFromRisk(WeatherRiskType type) {
        if(type == RAIN || type == HEAVY_RAIN || type == TORRENTIAL_RAIN){
            return List.of(FRUIT_CRAKING, FRUIT_DROP, FLOWER_DROP);
        }
        if(type == ABNORMAL_HEAT){
            return List.of(SUNBURN, WATER_DEFICIENCY, POOR_COLORING);
        }
        throw new WeatherException(NO_MATCHING_WEATHER_RISK_CARD);
    }
}
