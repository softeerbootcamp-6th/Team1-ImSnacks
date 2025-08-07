package com.imsnacks.Nyeoreumnagi;

import com.imsnacks.Nyeoreumnagi.common.auth.jwt.JwtProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
@RequiredArgsConstructor
public class WeatherController {

    private final JwtProvider jwtProvider;

    @GetMapping()
    public String getWeather() {
        return jwtProvider.createToken(1).getAccessToken();
    }
}
