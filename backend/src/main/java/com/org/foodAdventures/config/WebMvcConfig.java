package com.org.foodAdventures.config;



import com.org.foodAdventures.common.*;
import org.springframework.context.annotation.Configuration;

import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


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
