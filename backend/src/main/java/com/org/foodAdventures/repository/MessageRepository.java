package com.org.foodAdventures.repository;

import com.org.foodAdventures.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.*;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Repository
public interface MessageRepository extends JpaRepository<Message, BigDecimal> {
    @Query(value = "select * from T_MESSAGE where SENDER_ID =:senderId and RECEIVER_ID=:receiverId order by CRT_TS desc", nativeQuery = true)
    List<Message> getAllMessagesBySenderIdAndReceiverId(
        @Param("senderId") String senderId,
        @Param("receiverId") String receiverId);
}
