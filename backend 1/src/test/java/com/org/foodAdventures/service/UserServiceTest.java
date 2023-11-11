package com.org.foodAdventures.service;

import com.org.foodAdventuresBackendOne.entity.User;
import com.org.foodAdventuresBackendOne.model.UserRegisterRequest;
import com.org.foodAdventuresBackendOne.repository.UserRepository;
import com.org.foodAdventuresBackendOne.service.UserService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {
    @InjectMocks
    private UserService userService;

    @Mock
    private UserRepository userRepository;

    @Mock
    private BCryptPasswordEncoder passwordEncoder;

    private final Logger log = LoggerFactory.getLogger(UserService.class);

    public UserServiceTest() {
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    @Test
    public void successfulRegistrationService() {
        UserRegisterRequest userRegisterRequest = new UserRegisterRequest();
        userRegisterRequest.setUserId("Sky0001");

        User user = new User();

        // new user
        when (userRepository.getByName(userRegisterRequest.getUserId())).thenReturn(null);
        when (userRepository.save(any(User.class))).thenReturn(user);
        User savedUser = userService.saveUserRegistration(userRegisterRequest);

        assertNotNull(savedUser);
        // Ensure the userRepository.save method is called once with any User argument
        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    public void unsuccessfulRegistrationService() {
        UserRegisterRequest userRegisterRequest = new UserRegisterRequest();
        userRegisterRequest.setUserId("Sky0001");

        User user = new User();

        when (userRepository.getByName(userRegisterRequest.getUserId())).thenReturn(user);
        User savedUser = userService.saveUserRegistration(userRegisterRequest);

        assertNull(savedUser);
    }

    @Test
    public void successfulLogin() {
        String email = "test@example.com";
        String password = "pwd123";

        User mockUser = new User();
        mockUser.setEmail(email);
        mockUser.setPwdHash("hashedPassword123");

        when(userRepository.findByEmail(email)).thenReturn(mockUser);
        when(userService.verifyPassword(anyString(), anyString())).thenReturn(true);
        when(passwordEncoder.matches(anyString(), anyString())).thenReturn(true);

        Object result = userService.login(email, password);

        assertTrue(result instanceof User);
        assertEquals(mockUser, result);
    }

    @Test
    public void unsuccessfulLoginWithNullUser() {
        String email = "test@example.com";
        String password = "pwd123";

        when(userRepository.findByEmail(email)).thenReturn(null);
        Object result = userService.login(email, password);

        assertEquals("user_not_found", result);
    }

    @Test
    public void unsuccessfulLoginWithIncorrectPwd() {
        String email = "test@example.com";
        String password = "pwd123";

        User mockUser = new User();
        mockUser.setEmail(email);
        mockUser.setPwdHash("hashedPassword123");

        when(userRepository.findByEmail(email)).thenReturn(mockUser);
        when(userService.verifyPassword(anyString(), anyString())).thenReturn(false);
        Object result = userService.login(email, password);

        assertEquals("incorrect_password", result);

    }

}
