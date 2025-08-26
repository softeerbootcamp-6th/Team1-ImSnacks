package com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast.processor;

import com.ImSnacks.NyeoreumnagiBatch.common.entity.UniqueNxNy;
import com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast.reader.ApiCaller;
import com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast.reader.dto.VilageFcstResponseDto;
import com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast.writer.dto.ShortTermWeatherDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.configuration.annotation.StepScope;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.List;

@Slf4j
@StepScope
@Component
public class ImprovedWeatherProcessor implements ItemProcessor<UniqueNxNy, ShortTermWeatherDto> {

    @Autowired
    private final WeatherProcessor processor;
    @Autowired
    private final ImprovedApiCaller improvedApiCaller;
    @Autowired
    private final AlterApiCaller alterApiCaller;
    @Value("#{jobParameters['base_date']}")
    private String baseDate;
    @Value("#{jobParameters['base_time']}")
    private String baseTime;

    public ImprovedWeatherProcessor(WeatherProcessor processor, ImprovedApiCaller improvedApiCaller, AlterApiCaller alterApiCaller) {
        this.processor = processor;
        this.improvedApiCaller = improvedApiCaller;
        this.alterApiCaller = alterApiCaller;
    }

    @Override
    public ShortTermWeatherDto process(UniqueNxNy loc) throws Exception {
        int nx = loc.getId().getNx();
        int ny = loc.getId().getNy();

        VilageFcstResponseDto response = improvedApiCaller.call(baseDate, baseTime, nx, ny);
        if (response == null || response.getWeatherInfo() == null || response.getWeatherInfo().isEmpty()) {
            log.warn("Primary API response is empty for nx={}, ny={}", loc.getId().getNx(), loc.getId().getNy());
            response = alterApiCaller.call(baseDate, baseTime, loc.getLatitude(), loc.getLongitude(), nx, ny);
            if(response == null || response.getWeatherInfo() == null || response.getWeatherInfo().isEmpty()) {
                log.warn("Secondary API response is empty for nx={}, ny={}", nx, ny);
                response = getDefaultData(baseDate, baseTime);
            }
        }
        return processor.process(response);
    }

    private VilageFcstResponseDto getDefaultData(String baseDate, String baseTime) {
        List<VilageFcstResponseDto.Item> itemList = List.of(
                createItem("PCP", baseDate, baseTime, baseDate, baseTime, "강수없음")
        );
        VilageFcstResponseDto.Items items = new VilageFcstResponseDto.Items();
        items.setItem(itemList);

        VilageFcstResponseDto.Body body = new VilageFcstResponseDto.Body();
        body.setItems(items);

        VilageFcstResponseDto.Header header = new VilageFcstResponseDto.Header();
        header.setResultCode("00");
        header.setResultMsg("OK");

        VilageFcstResponseDto.Response response = new VilageFcstResponseDto.Response();
        response.setHeader(header);
        response.setBody(body);

        VilageFcstResponseDto VilageFcstResponseDto = new VilageFcstResponseDto();
        VilageFcstResponseDto.setResponse(response);

        return VilageFcstResponseDto;
    }

    private VilageFcstResponseDto.Item createItem(String category, String baseDate, String baseTime, String fcstDate, String fcstTime, String value) {
        VilageFcstResponseDto.Item item = new VilageFcstResponseDto.Item();
        item.setCategory(category);
        item.setBaseDate(baseDate);
        item.setBaseTime(baseTime);
        item.setFcstDate(fcstDate);
        item.setFcstTime(fcstTime);
        item.setFcstValue(value);
        item.setNx(0);
        item.setNy(0);
        return item;
    }

}
