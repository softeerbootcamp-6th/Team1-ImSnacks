package com.imsnacks.Nyeoreumnagi.weather.enums;

import com.imsnacks.Nyeoreumnagi.common.enums.WindDirection;
import com.imsnacks.Nyeoreumnagi.weather.exception.WeatherException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.*;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;

class WindDirectionTest {

    @Test
    void 북풍_성공() {
        assertThat(WindDirection.getDirectionStringFromDegree(0)).isEqualTo("북풍");
        assertThat(WindDirection.getDirectionStringFromDegree(15)).isEqualTo("북풍");
        assertThat(WindDirection.getDirectionStringFromDegree(359)).isEqualTo("북풍");
    }

    @Test
    void 북동풍_성공() {
        assertThat(WindDirection.getDirectionStringFromDegree(30)).isEqualTo("북동풍");
        assertThat(WindDirection.getDirectionStringFromDegree(45)).isEqualTo("북동풍");
        assertThat(WindDirection.getDirectionStringFromDegree(67)).isEqualTo("북동풍");
    }

    @Test
    void 동풍_성공() {
        assertThat(WindDirection.getDirectionStringFromDegree(68)).isEqualTo("동풍");
        assertThat(WindDirection.getDirectionStringFromDegree(90)).isEqualTo("동풍");
        assertThat(WindDirection.getDirectionStringFromDegree(112)).isEqualTo("동풍");
    }

    @Test
    void 남동풍_성공() {
        assertThat(WindDirection.getDirectionStringFromDegree(113)).isEqualTo("남동풍");
        assertThat(WindDirection.getDirectionStringFromDegree(130)).isEqualTo("남동풍");
        assertThat(WindDirection.getDirectionStringFromDegree(157)).isEqualTo("남동풍");
    }

    @Test
    void 남풍_성공() {
        assertThat(WindDirection.getDirectionStringFromDegree(158)).isEqualTo("남풍");
        assertThat(WindDirection.getDirectionStringFromDegree(180)).isEqualTo("남풍");
        assertThat(WindDirection.getDirectionStringFromDegree(202)).isEqualTo("남풍");
    }

    @Test
    void 남서풍_성공() {
        assertThat(WindDirection.getDirectionStringFromDegree(203)).isEqualTo("남서풍");
        assertThat(WindDirection.getDirectionStringFromDegree(220)).isEqualTo("남서풍");
        assertThat(WindDirection.getDirectionStringFromDegree(247)).isEqualTo("남서풍");
    }

    @Test
    void 서풍_성공() {
        assertThat(WindDirection.getDirectionStringFromDegree(248)).isEqualTo("서풍");
        assertThat(WindDirection.getDirectionStringFromDegree(270)).isEqualTo("서풍");
        assertThat(WindDirection.getDirectionStringFromDegree(292)).isEqualTo("서풍");
    }

    @Test
    void 북서풍_성공() {
        assertThat(WindDirection.getDirectionStringFromDegree(293)).isEqualTo("북서풍");
        assertThat(WindDirection.getDirectionStringFromDegree(315)).isEqualTo("북서풍");
        assertThat(WindDirection.getDirectionStringFromDegree(337)).isEqualTo("북서풍");
    }

    @Test
    void 예외처리() {
        assertThatThrownBy(() -> WindDirection.getDirectionStringFromDegree(2345))
                .isInstanceOf(WeatherException.class);
        assertThatThrownBy(() -> WindDirection.getDirectionStringFromDegree(-234))
                .isInstanceOf(WeatherException.class);
    }
}