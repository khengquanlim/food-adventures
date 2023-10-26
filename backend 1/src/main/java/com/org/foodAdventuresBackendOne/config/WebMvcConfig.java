package com.org.foodAdventuresBackendOne.config;

import com.org.foodAdventuresBackendOne.common.*;
import org.springframework.context.annotation.*;
import org.springframework.web.servlet.config.annotation.*;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:4200")
                .allowedOrigins(CommonConstant.PROD_URL)
                .allowedMethods("GET", "POST","OPTIONS", "PUT")
                .maxAge(3600);
    }
}
