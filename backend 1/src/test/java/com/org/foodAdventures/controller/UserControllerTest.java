package com.org.foodAdventures.controller;


import com.org.foodAdventuresBackendOne.common.CommonConstant;
import com.org.foodAdventuresBackendOne.common.JsonWrapperObject;
import com.org.foodAdventuresBackendOne.controller.UserController;
import com.org.foodAdventuresBackendOne.entity.User;
import com.org.foodAdventuresBackendOne.model.LoginRequest;
import com.org.foodAdventuresBackendOne.model.UserRegisterRequest;
import com.org.foodAdventuresBackendOne.service.UserService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class UserControllerTest {
    @InjectMocks
    private UserController userController;

    @Mock
    private UserService userService;

    private String ERR_MSG_USER_EXISTS = "UserId already exists";
    private String ERR_MSG_INCORRECT_PWD = "incorrect_password";
    private String ERR_MSG_USER_NOT_FOUND = "User not found";

    @Test
    public void successfulUserRegistrationController() {
        UserRegisterRequest userRegisterRequest = new UserRegisterRequest();
        userRegisterRequest.setUserType("diner");
        userRegisterRequest.setUserId("Sky0001");
        userRegisterRequest.setEmail("test@gmail.com");
        userRegisterRequest.setPassword("random string");

        User user = new User();
        user.setUserType("diner");
        user.setId("Sky0001");

        when(userService.saveUserRegistration(userRegisterRequest)).thenReturn(user);
        ResponseEntity<JsonWrapperObject> responseEntity = userController.saveUserRegistration(userRegisterRequest);

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(CommonConstant.SUCCESS, responseEntity.getBody().getStatus());
        assertNotNull(responseEntity.getBody().getData());
    }

    @Test
    public void unsuccessfulNullUserRegistrationController() {
        UserRegisterRequest userRegisterRequest = new UserRegisterRequest();
        userRegisterRequest.setUserType("diner");
        userRegisterRequest.setUserId("Sky0001");
        userRegisterRequest.setEmail("test@gmail.com");
        userRegisterRequest.setPassword("random string");

        when(userService.saveUserRegistration(userRegisterRequest)).thenReturn(null);
        ResponseEntity<JsonWrapperObject> responseEntity = userController.saveUserRegistration(userRegisterRequest);

        assertEquals(HttpStatus.BAD_REQUEST, responseEntity.getStatusCode());
        assertEquals(CommonConstant.FAILURE, responseEntity.getBody().getStatus());
        assertEquals(ERR_MSG_USER_EXISTS, responseEntity.getBody().getDescription());
        assertNull(responseEntity.getBody().getData());
    }

    @Test
    public void successfulLoginController() {
        LoginRequest loginData = new LoginRequest();

        when(userService.login(loginData.getEmail(), loginData.getEmail())).thenReturn(new User());
        ResponseEntity<JsonWrapperObject> responseEntity = userController.login(loginData);

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals("success", responseEntity.getBody().getStatus());
        assertNotNull(responseEntity.getBody().getData());
    }

    @Test
    public void unsuccessfulLoginController() {
        LoginRequest loginData = new LoginRequest();

        // user not found
        when(userService.login(loginData.getEmail(), loginData.getEmail())).thenReturn(ERR_MSG_USER_NOT_FOUND);
        ResponseEntity<JsonWrapperObject> responseEntity = userController.login(loginData);

        assertEquals(HttpStatus.UNAUTHORIZED, responseEntity.getStatusCode());
        assertEquals("error", responseEntity.getBody().getStatus());

        // incorrect pwd
        when(userService.login(loginData.getEmail(), loginData.getEmail())).thenReturn(ERR_MSG_INCORRECT_PWD);
        ResponseEntity<JsonWrapperObject> responseEntity1 = userController.login(loginData);

        assertEquals(HttpStatus.UNAUTHORIZED, responseEntity1.getStatusCode());
        assertEquals("error", responseEntity1.getBody().getStatus());

    }
}
