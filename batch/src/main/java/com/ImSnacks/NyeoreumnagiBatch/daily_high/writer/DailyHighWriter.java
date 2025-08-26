package com.ImSnacks.NyeoreumnagiBatch.daily_high.writer;

import com.ImSnacks.NyeoreumnagiBatch.common.repository.DashboardTodayWeatherRepository;
import com.ImSnacks.NyeoreumnagiBatch.daily_high.processor.dto.DailyHighProcessorResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.item.Chunk;
import org.springframework.batch.item.ItemWriter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class DailyHighWriter implements ItemWriter<DailyHighProcessorResponseDto> {

    private final DashboardTodayWeatherRepository dashboardTodayWeatherRepository;
    private final JdbcTemplate jdbcTemplate;

    @Override
    public void write(Chunk<? extends DailyHighProcessorResponseDto> chunk) throws Exception {
        log.info("Writing Daily High started");

        batchUpsertDailyHigh((List<DailyHighProcessorResponseDto>) chunk.getItems());
    }

    public void batchUpsertDailyHigh(List<DailyHighProcessorResponseDto> items) {
        if (items.isEmpty()) return;

        StringBuilder sql = new StringBuilder();
        sql.append("INSERT INTO dashboard_today_weather (nx, ny, max_humidity, max_precipitation, max_temperature, max_windspeed, wind_direction) VALUES ");

        List<Object> params = new ArrayList<>();
        for (int i = 0; i < items.size(); i++) {
            sql.append("(?, ?, ?, ?, ?, ?, ?)");
            if (i < items.size() - 1) sql.append(", ");
            DailyHighProcessorResponseDto item = items.get(i);
            params.add(item.nx());
            params.add(item.ny());
            params.add(item.maxHumidity());
            params.add(item.maxPrecipitation());
            params.add(item.maxTemperature());
            params.add(item.maxWindSpeed());
            params.add(item.windDirection());
        }

        sql.append(" ON DUPLICATE KEY UPDATE ")
                .append("max_humidity=VALUES(max_humidity), max_precipitation=VALUES(max_precipitation), max_temperature=VALUES(max_temperature), max_windspeed=VALUES(max_windspeed), wind_direction=VALUES(wind_direction)");

        jdbcTemplate.update(sql.toString(), params.toArray());
    }
}
