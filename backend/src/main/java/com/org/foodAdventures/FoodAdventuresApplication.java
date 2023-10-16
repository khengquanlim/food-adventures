package com.org.foodAdventures;

import org.slf4j.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.*;
import org.springframework.context.annotation.*;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.jdbc.repository.config.EnableJdbcRepositories;

@EntityScan("com.org.foodAdventures.entity")
//@EnableJdbcRepositories(basePackages = "com.example.jdbc.repositories")
@EnableJdbcRepositories(basePackages = "com.org.foodAdventures.repository")
//@EnableJpaRepositories(basePackages = "com.example.jpa.repositories")
@EnableJpaRepositories(basePackages = "com.org.foodAdventures.repository")
//@ComponentScan(basePackages = "com.org.foodAdventures.repository")
@SpringBootApplication(scanBasePackages = {"com.org.foodAdventures"})
//@SpringBootApplication
public class FoodAdventuresApplication {
    @Value("${spring.application.name}")
    private String applicationName;
    private static final Logger LOG = LoggerFactory.getLogger(FoodAdventuresApplication.class);

    public static void main(String[] args) {
        LOG.info("Food Adventures begin~ LFG!");
        SpringApplication.run(FoodAdventuresApplication.class, args);
    }

}
