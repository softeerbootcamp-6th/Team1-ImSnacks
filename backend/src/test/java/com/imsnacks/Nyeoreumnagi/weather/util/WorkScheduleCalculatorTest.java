package com.imsnacks.Nyeoreumnagi.weather.util;

import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;


/**
 * 클래스명과 패키지는 네 프로젝트 구조에 맞게 조정.
 * windowsForWork(...)는 질문에 준 "원본" 구현을 그대로 사용한다고 가정.
 */
@ExtendWith(MockitoExtension.class)
@MockitoSettings(strictness = Strictness.LENIENT)
class WorkScheduleCalculatorTest {

//    private final WorkScheduleCalculator workScheduleCalculator = new WorkScheduleCalculator();
//
//    private RecommendedWork work;
//
//    @BeforeEach
//    void setUp() {
//        work = mock(RecommendedWork.class);
//        when(work.getId()).thenReturn(100L);
//        when(work.getRecommendation()).thenReturn("추천해요");
//
//        when(work.isRain()).thenReturn(true);
//        when(work.isSnow()).thenReturn(true);
//        when(work.isHighTemperature()).thenReturn(true);
//        when(work.isLowTemperature()).thenReturn(true);
//        when(work.isHighHumidity()).thenReturn(true);
//        when(work.isLowHumidity()).thenReturn(true);
//        when(work.isStrongWind()).thenReturn(true);
//    }
//
//    // 헬퍼: OK 조건의 예보(조건 충족)
//    private ShortTermWeatherForecast okFcst(int hour) {
//        ShortTermWeatherForecast f = mock(ShortTermWeatherForecast.class);
//        when(f.getFcstTime()).thenReturn(hour);
//        // meets 조건을 충족시키는 안전한 값들
//        when(f.getPrecipitation()).thenReturn(0.0);
//        when(f.getTemperature()).thenReturn(20);
//        when(f.getHumidity()).thenReturn(50);
//        when(f.getWindSpeed()).thenReturn(1.0);
//
//        return f;
//    }
//
//    // 헬퍼: NG 조건의 예보(조건 불충족: 예=비 많이 옴)
//    private ShortTermWeatherForecast ngFcst(int hour) {
//        ShortTermWeatherForecast f = mock(ShortTermWeatherForecast.class);
//        when(f.getFcstTime()).thenReturn(hour);
//        when(f.getPrecipitation()).thenReturn(10.0); // 충분히 큰 강수 → rain=true 가정
//        when(f.getTemperature()).thenReturn(20);
//        when(f.getHumidity()).thenReturn(50);
//        when(f.getWindSpeed()).thenReturn(1.0);
//        return f;
//    }
//
//    private String ts(int hour) {
//        return LocalDateTime.of(LocalDate.now(), LocalTime.of(hour, 0)).toString();
//    }
//
//    private String ts(long plusDay, int hour) {
//        return LocalDateTime.of(LocalDate.now().plusDays(plusDay), LocalTime.of(hour, 0)).toString();
//    }
//
//    @Test
//    void MyWork_연속_시간대는_하나의_윈도우로_묶인다() {
//        // 00~05시 OK
//        List<ShortTermWeatherForecast> fcsts = List.of(
//                okFcst(0), okFcst(1), okFcst(2), okFcst(3), okFcst(4), okFcst(5)
//        );
//
//        List<RecommendedWorksResponse> out =
//                workScheduleCalculator.windowsForWork(work, fcsts, LocalDateTime.of(2025, 8, 12, 0, 0));
//
//        assertEquals(1, out.size());
//        assertEquals("추천해요", out.get(0).recommendation());
//        assertEquals(ts(0), out.get(0).startTime());
//        // 반개방 [start, end) 로직 → 6시가 끝
//        assertEquals(ts(6), out.get(0).endTime());
//    }
//
//    @Test
//    void 다음날_시간도_제대로_정렬한다() {
//        List<ShortTermWeatherForecast> fcsts = List.of(
//                okFcst(23), okFcst(0), okFcst(1), okFcst(2), ngFcst(4), ngFcst(5)
//        );
//
//        List<RecommendedWorksResponse> out =
//                workScheduleCalculator.windowsForWork(work, fcsts,  LocalDateTime.of(2025, 8, 12, 23, 0));
//
//        assertEquals(1, out.size());
//        assertEquals("추천해요", out.get(0).recommendation());
//        assertEquals(ts(23), out.get(0).startTime());
//        // 반개방 [start, end) 로직 → 6시가 끝
//        assertEquals(ts(1, 3), out.get(0).endTime());
//    }
//
//    @Test
//    @DisplayName("MyWork_불연속이면_윈도우가_분리된다")
//    void MyWork_불연속이면_윈도우가_분리된다() {
//        List<ShortTermWeatherForecast> fcsts = List.of(
//                okFcst(0), okFcst(1), okFcst(2), okFcst(3), okFcst(4), okFcst(5),
//                ngFcst(6),
//                okFcst(7), okFcst(8), okFcst(9), okFcst(10)
//        );
//
//        List<RecommendedWorksResponse> out =
//                workScheduleCalculator.windowsForWork(work, fcsts, LocalDateTime.of(2025, 8, 12, 0, 0));
//
//        assertEquals(2, out.size());
//
//        // 첫 구간
//        assertEquals(ts(0), out.get(0).startTime());
//        assertEquals(ts(6), out.get(0).endTime());
//
//        // 둘째 구간
//        assertEquals(ts(7), out.get(1).startTime());
//        assertEquals(ts(11), out.get(1).endTime());
//    }
//
//    @Test
//    @DisplayName("MyWork_minHours_미만의_짧은_구간은_제외된다")
//    void MyWork_minHours_미만의_짧은_구간은_제외된다() {
//        // 00~00 OK(1시간), 01 NG, 02~04 OK(3시간)
//        List<ShortTermWeatherForecast> fcsts = List.of(
//                okFcst(0),
//                ngFcst(1),
//                okFcst(2), okFcst(3), okFcst(4)
//        );
//
//        List<RecommendedWorksResponse> out =
//                workScheduleCalculator.windowsForWork(work, fcsts, LocalDateTime.of(2025, 8, 12, 0, 0));
//
//        // 00~01 한 시간짜리 구간은 필터됨, 02~05(종료는 5시)만 남음
//        assertEquals(1, out.size());
//        assertEquals(ts(2), out.get(0).startTime());
//        assertEquals(ts(5), out.get(0).endTime());
//    }
//
//    @Test
//    @DisplayName("MyWork_마지막에_열린_구간도_정상_마감된다")
//    void MyWork_마지막에_열린_구간도_정상_마감된다() {
//        // 끝까지 OK: 20~23
//        List<ShortTermWeatherForecast> fcsts = List.of(
//                okFcst(20), okFcst(21), okFcst(22), okFcst(23)
//        );
//
//        List<RecommendedWorksResponse> out =
//                workScheduleCalculator.windowsForWork(work, fcsts, LocalDateTime.of(2025, 8, 12, 0, 0));
//
//        assertEquals(1, out.size());
//        assertEquals(ts(20), out.get(0).startTime());
//        // prevOk(23) + 1h → 24:00은 다음날 00:00이지만 구현은 LocalDate.now로 동일 날짜 취급
//        // 현재 구현은 LocalDateTime.of(LocalDate.now(), 24:00)을 허용하지 않으므로, 종료는 23 + 1h = 00:00 (다음날) 문자열이 나옴.
//        // 메서드가 그대로라면 toString()은 다음날 00:00을 출력.
//        assertEquals(LocalDateTime.of(LocalDate.now().plusDays(1), LocalTime.MIDNIGHT).toString(),
//                out.get(0).endTime());
//    }
//
//    @Test
//    @DisplayName("MyWork_모두_NG면_빈_리스트를_반환한다")
//    void MyWork_모두_NG면_빈_리스트를_반환한다() {
//        List<ShortTermWeatherForecast> fcsts = List.of(
//                ngFcst(0), ngFcst(1), ngFcst(2)
//        );
//
//        List<RecommendedWorksResponse> out =
//                workScheduleCalculator.windowsForWork(work, fcsts, LocalDateTime.of(2025, 8, 12, 0, 0));
//
//        assertTrue(out.isEmpty());
//    }
}