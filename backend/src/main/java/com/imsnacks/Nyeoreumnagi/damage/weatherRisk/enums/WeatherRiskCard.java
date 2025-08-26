package com.imsnacks.Nyeoreumnagi.damage.weatherRisk.enums;

import com.imsnacks.Nyeoreumnagi.common.enums.WeatherRiskType;
import com.imsnacks.Nyeoreumnagi.weather.exception.WeatherException;

import java.util.List;

import static com.imsnacks.Nyeoreumnagi.common.enums.WeatherRiskType.*;
import static com.imsnacks.Nyeoreumnagi.weather.exception.WeatherResponseStatus.NO_MATCHING_WEATHER_RISK_CARD;

public enum WeatherRiskCard {
    SUNBURN("햇볕 데임", "햇빛 가림망을 설치하고 물 주는 시기를 짧게 자주 하는 것이 좋아요."),
    WATER_DEFICIENCY("수분 부족", "토양 수분 증발을 줄이기 위해 지면에 퇴비, 짚, 풀을 깔아보세요."),
    POOR_COLORING("착색 불량", "가지 유인과 과실 돌리기를 통해 과실이 햇빛에 노출되지 않도록 해주세요."),
    FRUIT_CRAKING("열과", "토양수분의 급격한 변화가 발생하지 않도록 배수 관리를 철저히 해주세요."),
    FRUIT_DROP("낙과", "미세살수로 소량의 물을 꾸준히 공급해 토양 수분 변동을 최소화 하세요."),
    FLOWER_DROP("낙화", "강한 비가 올 때 배수관리를 철저히 해 꽃 떨어짐을 예방하세요."),
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
