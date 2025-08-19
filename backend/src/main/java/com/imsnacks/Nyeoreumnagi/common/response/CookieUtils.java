package com.imsnacks.Nyeoreumnagi.common.response;

import jakarta.servlet.http.Cookie;
import org.springframework.stereotype.Component;

@Component
public class CookieUtils {
    public static Cookie createCookie(String name, String value, int maxAge, String path) {
        Cookie cookie = new Cookie(name, value);
        cookie.setHttpOnly(true);
        cookie.setMaxAge(maxAge);
        cookie.setPath(path);
        cookie.setSecure(true);
        cookie.setAttribute("SameSite", "None"); //프론트 개발용. 배포시 제거
        return cookie;
    }
}
