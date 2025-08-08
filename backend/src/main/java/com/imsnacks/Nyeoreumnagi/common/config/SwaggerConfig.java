package com.imsnacks.Nyeoreumnagi.common.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.parameters.Parameter;
import org.springdoc.core.customizers.OpenApiCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;
import java.util.stream.Collectors;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI()
                .components(new Components())
                .info(apiInfo());
    }

    private Info apiInfo() {
        return new Info()
                .title("Nyeoreumnagi Swagger")
                .description("녀름나기 REST API 문서")
                .version("1.0.0");
    }

    @Bean
    public OpenApiCustomizer hideMemberIdParam() {
        return openApi -> {
            openApi.getPaths().values().forEach(pathItem -> {
                pathItem.readOperations().forEach(operation -> {
                    if (operation.getParameters() != null) {
                        List<Parameter> filtered = operation.getParameters().stream()
                                .filter(param -> !"memberId".equals(param.getName()))
                                .collect(Collectors.toList());
                        operation.setParameters(filtered);
                    }
                });
            });
        };
    }
}
