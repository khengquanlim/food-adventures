package com.org.foodAdventures;

import org.slf4j.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.jdbc.repository.config.EnableJdbcRepositories;

@EnableJdbcRepositories(basePackages = "com.example.jdbc.repositories")
@EnableJpaRepositories(basePackages = "com.example.jpa.repositories")
@SpringBootApplication
public class FoodAdventuresApplication {
    @Value("${spring.application.name}")
    private String applicationName;
    private static final Logger LOG = LoggerFactory.getLogger(FoodAdventuresApplication.class);

    public static void main(String[] args) {
        LOG.info("Food Adventures begin~ LFG!");
        SpringApplication.run(FoodAdventuresApplication.class, args);
    }

}
