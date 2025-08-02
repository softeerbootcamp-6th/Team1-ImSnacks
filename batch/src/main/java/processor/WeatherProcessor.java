package processor;

import com.ImSnacks.NyeoreumnagiBatch.writer.dto.ShortTermWeatherDto;
import dto.VilageFcstResponse;
import org.springframework.batch.item.ItemProcessor;

public class WeatherProcessor implements ItemProcessor<VilageFcstResponse, ShortTermWeatherDto> {
    @Override
    public ShortTermWeatherDto process(VilageFcstResponse item) throws Exception {
        //TODO: WeatherForecastByTime DTO 생성
        //type casting 하는 로직 필요


        //TODO: WeatherRisk DTO 생성
        //전략 패턴으로 기상 특보 판단 로직 작성

    }
}
