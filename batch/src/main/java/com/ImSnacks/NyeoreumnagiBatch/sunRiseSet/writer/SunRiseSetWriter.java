package com.ImSnacks.NyeoreumnagiBatch.sunRiseSet.writer;

import com.ImSnacks.NyeoreumnagiBatch.common.entity.DashboardTodayWeather;
import com.ImSnacks.NyeoreumnagiBatch.common.repository.DashboardTodayWeatherRepository;
import com.ImSnacks.NyeoreumnagiBatch.sunRiseSet.processor.dto.SunRiseSetProcessorResponseDto;
import com.ImSnacks.NyeoreumnagiBatch.common.entity.NxNy;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.item.Chunk;
import org.springframework.batch.item.ItemWriter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Component
@RequiredArgsConstructor
public class SunRiseSetWriter implements ItemWriter<SunRiseSetProcessorResponseDto> {

    private final DashboardTodayWeatherRepository dashboardTodayWeatherRepository;
    private final JdbcTemplate jdbcTemplate;

    @Override
    public void write(Chunk<? extends SunRiseSetProcessorResponseDto> chunk) throws Exception {
        log.info("Writing SunRiseSet started");

        batchUpsertSunrise((List<SunRiseSetProcessorResponseDto>) chunk.getItems());
    }

    public void batchUpsertSunrise(List<SunRiseSetProcessorResponseDto> items) {
        if (items.isEmpty()) return;

        StringBuilder sql = new StringBuilder();
        sql.append("INSERT INTO dashboard_today_weather (nx, ny, sunrise_time, sunset_time) VALUES ");

        List<Object> params = new ArrayList<>();
        for (int i = 0; i < items.size(); i++) {
            sql.append("(?, ?, ?, ?)");
            if (i < items.size() - 1) sql.append(", ");
            SunRiseSetProcessorResponseDto item = items.get(i);
            params.add(item.nx());
            params.add(item.ny());
            params.add(item.sunRise());
            params.add(item.sunSet());
        }

        sql.append(" ON DUPLICATE KEY UPDATE ")
                .append("sunrise_time=VALUES(sunrise_time), sunset_time=VALUES(sunset_time)");

        jdbcTemplate.update(sql.toString(), params.toArray());
    }
}
