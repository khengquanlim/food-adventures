package com.org.foodAdventuresBackendOne;

import org.slf4j.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.*;
import org.springframework.data.jdbc.repository.config.*;
import org.springframework.data.jpa.repository.config.*;

@EntityScan("com.org.foodAdventuresBackendOne.entity")
@EnableJdbcRepositories(basePackages = "com.org.foodAdventuresBackendOne.repository")
@EnableJpaRepositories(basePackages = "com.org.foodAdventuresBackendOne.repository")
@SpringBootApplication(scanBasePackages = {"com.org.foodAdventuresBackendOne"})
public class FoodAdventuresApplicationBackendOne {

    @Value("${spring.application.name}")
    private String applicationName;

    private static final Logger LOG = LoggerFactory.getLogger(FoodAdventuresApplicationBackendOne.class);

    public static void main(String[] args) {
        LOG.info("Food Adventures MICROSERVICE 1 BEGINSSSS!");
        SpringApplication.run(FoodAdventuresApplicationBackendOne.class, args);

	}

}
