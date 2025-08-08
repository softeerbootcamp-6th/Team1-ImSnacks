package com.ImSnacks.NyeoreumnagiBatch.reader;

import com.ImSnacks.NyeoreumnagiBatch.reader.dto.VilageFcstResponseDto;
import jakarta.annotation.Nullable;
import org.springframework.batch.core.configuration.annotation.StepScope;
import org.springframework.batch.item.ItemReader;
import org.springframework.batch.item.NonTransientResourceException;
import org.springframework.batch.item.ParseException;
import org.springframework.batch.item.UnexpectedInputException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.util.List;

//TODO 아직 오류에 대한 예외처리는 하지 않음. -> Job은 예외를 외부로 던지면 안 됨. Job은 수행 중 발생한 오류를 JobRepository에 보고할 의무를 진다.
//TODO Batch Job 예외 처리 찾아보기
@Component
@StepScope // job parameters 주입을 위해 빈 생성 시점을 step 생성 시점으로 미룬다.
public class WeatherReader implements ItemReader<VilageFcstResponseDto> {

    private static List<NxNy>  locations = null;

    // thread-safe 필요
    private static int index = 0;

    // serviceKey는 고정된 값이니, application.yaml에 두고 읽어온다.
    private final String baseDate;
    private final String baseTime;
    private final JdbcTemplate jdbcTemplate;
    @Autowired
    private ApiCaller apiCaller;

    WeatherReader(@Value("#{jobParameters['base_date']}") String baseDate,
                  @Value("#{jobParameters['base_time']}") String baseTime,
                  JdbcTemplate jdbcTemplate)
    {
        this.baseDate = baseDate;
        this.baseTime = baseTime;
        this.jdbcTemplate = jdbcTemplate;
    }

    @Nullable // 실패 시 null 반환
    @Override
    public VilageFcstResponseDto read() throws Exception, UnexpectedInputException, ParseException, NonTransientResourceException {
        if (locations == null){
            locations = jdbcTemplate.query(
                    "SELECT nx, ny FROM Unique_Nx_Ny",
                    (rs, rowNum) -> new NxNy(rs.getInt("nx"), rs.getInt("ny"))
            );
        }
        if (index >= locations.size()) return null;

        int nx = locations.get(index).nx;
        int ny = locations.get(index).ny;
        index++;

        try {
            VilageFcstResponseDto dto = apiCaller.call(baseDate, baseTime, nx, ny);
            return dto;
        } catch (Exception e) {
            return null;
        }
    }

    public record NxNy(int nx, int ny) {}
}
