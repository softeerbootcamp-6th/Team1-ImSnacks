package com.ImSnacks.NyeoreumnagiBatch.ultraviolet.writer;

import com.ImSnacks.NyeoreumnagiBatch.common.entity.DashboardTodayWeather;
import com.ImSnacks.NyeoreumnagiBatch.common.entity.NxNy;
import com.ImSnacks.NyeoreumnagiBatch.common.repository.DashboardTodayWeatherRepository;
import com.ImSnacks.NyeoreumnagiBatch.daily_high.processor.dto.DailyHighProcessorResponseDto;
import com.ImSnacks.NyeoreumnagiBatch.ultraviolet.processor.dto.UVProcessorResponseDto;
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
public class UVWriter implements ItemWriter<UVProcessorResponseDto> {

    private final DashboardTodayWeatherRepository dashboardTodayWeatherRepository;
    private final JdbcTemplate jdbcTemplate;

    public void write(Chunk<? extends UVProcessorResponseDto> chunk) throws Exception {
        log.info("Writing UV started");

        batchUpsertUV((List<UVProcessorResponseDto>) chunk.getItems());
    }

    public void batchUpsertUV(List<UVProcessorResponseDto> items) {
        if (items.isEmpty()) return;

        StringBuilder sql = new StringBuilder();
        sql.append("INSERT INTO dashboard_today_weather (nx, ny, max_uv_index, max_uv_start, max_uv_end) VALUES ");

        List<Object> params = new ArrayList<>();
        for (int i = 0; i < items.size(); i++) {
            sql.append("(?, ?, ?, ?, ?)");
            if (i < items.size() - 1) sql.append(", ");
            UVProcessorResponseDto item = items.get(i);
            params.add(item.nx());
            params.add(item.ny());
            params.add(item.maxUVIndex());
            params.add(item.maxUVStartTime());
            params.add(item.maxUVEndTime());
        }

        sql.append(" ON DUPLICATE KEY UPDATE ")
                .append("max_uv_index=VALUES(max_uv_index), max_uv_start=VALUES(max_uv_start), max_uv_end=VALUES(max_uv_end)");

        jdbcTemplate.update(sql.toString(), params.toArray());
    }
}
