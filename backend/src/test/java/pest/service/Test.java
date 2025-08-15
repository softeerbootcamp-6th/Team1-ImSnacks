package pest.service;

import com.imsnacks.Nyeoreumnagi.pest.service.PestService;
import com.imsnacks.Nyeoreumnagi.pest.service.WeatherConditionCode;
import com.imsnacks.Nyeoreumnagi.pest.service.WeatherConditionCode.RainCode;
import com.imsnacks.Nyeoreumnagi.pest.service.WeatherConditionCode.HumidityCode;
import com.imsnacks.Nyeoreumnagi.pest.service.WeatherConditionCode.TemperatureCode;
import com.imsnacks.Nyeoreumnagi.weather.entity.ShortTermWeatherForecast;
import com.imsnacks.Nyeoreumnagi.weather.repository.ShortTermWeatherForecastRepository;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;

import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@MockitoSettings(strictness = Strictness.LENIENT)
@ExtendWith(MockitoExtension.class)
public class Test {
    @InjectMocks
    private PestService service;

    private final int TEMPERATURE_LOW_TO_MID_THRESHOLD = TemperatureCode.LevelBoundary.LOW_TO_MID.getThresholdValue();
    private final int TEMPERATURE_MID_TO_HIGH_THRESHOLD = TemperatureCode.LevelBoundary.MID_TO_HIGH.getThresholdValue();
    private final int HUMIDITY_LOW_TO_MID_THRESHOLD = HumidityCode.LevelBoundary.LOW_TO_MID.getThresholdValue();
    private final int HUMIDITY_MID_TO_HIGH_THRESHOLD = HumidityCode.LevelBoundary.MID_TO_HIGH.getThresholdValue();
    private final double RAIN_THRESHOLD = RainCode.LevelBoundary.RAIN.getThresholdValue();
    private final int 저온 = TEMPERATURE_LOW_TO_MID_THRESHOLD - 1;
    private final int 보통기온 = TEMPERATURE_LOW_TO_MID_THRESHOLD;
    private final int 고온 = TEMPERATURE_MID_TO_HIGH_THRESHOLD;
    private final int 건조 = HUMIDITY_LOW_TO_MID_THRESHOLD - 1;
    private final int 보통습도 = HUMIDITY_LOW_TO_MID_THRESHOLD;
    private final int 다습 = HUMIDITY_MID_TO_HIGH_THRESHOLD;
    private final double 비없음 =  RAIN_THRESHOLD - 0.42;
    private final double 비있음 =  RAIN_THRESHOLD + 0.42;



    @org.junit.jupiter.api.Test
    void 하나의_예보_저온_건조_비없음() {
        // given
        ShortTermWeatherForecast f1 = ShortTermWeatherForecast.builder()
                .temperature(저온)
                .humidity(건조)
                .precipitation(비없음)
                .build();
        var fcsts = List.of(f1);
        // when
        WeatherConditionCode actual = WeatherConditionCode.of(fcsts);

        // then
        WeatherConditionCode expected = new WeatherConditionCode(HumidityCode.LOW, TemperatureCode.LOW, RainCode.NONE);
        assertThat(actual).isEqualTo(expected);
    }

    @org.junit.jupiter.api.Test
    void 여러개의_예보_저온_저습_비없음() {
        // given

        // 저온 건조 비없음
        ShortTermWeatherForecast f1 = ShortTermWeatherForecast.builder()
                .temperature(저온)
                .humidity(건조)
                .precipitation(RAIN_THRESHOLD - 0.5)
                .build();
        // 저온 다습 비없음
        ShortTermWeatherForecast f2 = ShortTermWeatherForecast.builder()
                .temperature(TEMPERATURE_LOW_TO_MID_THRESHOLD - 1)
                .humidity(HUMIDITY_MID_TO_HIGH_THRESHOLD)
                .precipitation(RAIN_THRESHOLD - 0.5)
                .build();
        // 고온 다습 비없음
        ShortTermWeatherForecast f3 = ShortTermWeatherForecast.builder()
                .temperature(TEMPERATURE_MID_TO_HIGH_THRESHOLD)
                .humidity(HUMIDITY_MID_TO_HIGH_THRESHOLD)
                .precipitation(RAIN_THRESHOLD - 0.5)
                .build();
        // 저온 저습 비없음
        ShortTermWeatherForecast f4 = ShortTermWeatherForecast.builder()
                .temperature(TEMPERATURE_LOW_TO_MID_THRESHOLD - 1)
                .humidity(HUMIDITY_LOW_TO_MID_THRESHOLD - 1)
                .precipitation(RAIN_THRESHOLD - 0.5)
                .build();




    }
}
