package com.org.foodAdventuresBackendOne.repository;

import com.org.foodAdventuresBackendOne.entity.*;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.*;
import org.springframework.stereotype.*;

import java.sql.*;
import java.util.*;


@Repository
public interface UserRepository extends JpaRepository<User, String> {
    @Query(value = "select * from T_USER", nativeQuery = true)
    List<User> getAllUsers();

    @Query(value = "insert into T_USER (USER_ID, PWD_HASH, USER_TYPE, LAST_ONLINE, EMAIL, AGE, CRT_TS, UPD_TS)" +
        " VALUES (:userId, :pwdHash, :userType, :lastOnline, :email, :age, :crtTs, :updTs);", nativeQuery = true)
    void saveUser(@Param("userId") String userId,
                  @Param("pwdHash") String pwdHash,
                  @Param("userType") String userType,
                  @Param("lastOnline") Timestamp lastOnline,
                  @Param("email") String email,
                  @Param("age") int age,
                  @Param("crtTs") Timestamp crtTs,
                  @Param("updTs") Timestamp updTs);

    @Query(value = "select * from T_USER where USER_ID = :username", nativeQuery = true)
    User getByName(@Param("username") String username);


    @Query(value = "select * from T_USER where email = :email", nativeQuery = true)
    User findByEmail(
       @Param("email") String email);

}

