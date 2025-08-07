package com.imsnacks.Nyeoreumnagi.authTest;

import com.imsnacks.Nyeoreumnagi.common.auth.annotation.PreAuthorize;
import com.imsnacks.Nyeoreumnagi.common.auth.argumentResolver.JwtAuthHandlerArgumentResolver;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.core.MethodParameter;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.context.request.ServletWebRequest;
import org.springframework.web.method.support.ModelAndViewContainer;

import jakarta.servlet.http.HttpServletRequest;

import java.lang.reflect.Method;
import static org.assertj.core.api.Assertions.*;

public class JwtAuthHandlerArgumentResolverTest {

    JwtAuthHandlerArgumentResolver resolver;

    @BeforeEach
    void setUp() {
        resolver = new JwtAuthHandlerArgumentResolver();
    }

    @Test
    void 커스텀_어노테이션_타입_판단_성공() throws Exception {
        // given
        Method method = TestController.class.getMethod("testMethod", long.class, String.class);
        MethodParameter paramWithAnno = new MethodParameter(method, 0);
        MethodParameter paramWithoutAnno = new MethodParameter(method, 1);

        // when
        boolean resultWithAnno = resolver.supportsParameter(paramWithAnno);
        boolean resultWithoutAnno = resolver.supportsParameter(paramWithoutAnno);

        // then
        assertThat(resultWithAnno).isTrue();
        assertThat(resultWithoutAnno).isFalse();
    }

    @Test
    void 토큰의_멤버_아이디_추출_성공() throws Exception {
        // given
        Method method = TestController.class.getMethod("testMethod", long.class, String.class);
        MethodParameter paramWithAnno = new MethodParameter(method, 0);

        HttpServletRequest servletRequest = Mockito.mock(HttpServletRequest.class);
        Mockito.when(servletRequest.getAttribute("memberId")).thenReturn(42L);

        NativeWebRequest webRequest = new ServletWebRequest(servletRequest);
        ModelAndViewContainer container = new ModelAndViewContainer();

        // when
        Object resolved = resolver.resolveArgument(paramWithAnno, container, webRequest, null);

        // then
        assertThat(resolved).isEqualTo(42L);
    }

    private static class TestController {
        public void testMethod(@PreAuthorize long memberId, String another) {}
    }
}