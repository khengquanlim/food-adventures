package com.org.foodAdventures.entity;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.data.relational.core.mapping.Table;
import jakarta.persistence.*;

import java.math.*;
import java.sql.*;

@Entity
@Table("T_MESSAGE")
@DynamicInsert
@DynamicUpdate
public class Message implements java.io.Serializable{

    @Id
    @Column(name="MSG_ID", unique = true, nullable = false)
    private BigDecimal msgId;

    @Column(name="SENDER_ID", nullable = false)
    private String senderId;

    @Column(name="RECEIVER_ID", nullable = false)
    private String receiverId;

    @Column(name="MESSAGE", nullable = false)
    private String message;

    @Column(name="CRT_TS", nullable = false)
    private Timestamp createdTs;

    @Column(name="UPD_TS", nullable = false)
    private Timestamp updatedTs;

    // Getters and setters

    public BigDecimal getMsgId() {
        return msgId;
    }

    public void setMsgId(BigDecimal msgId) {
        this.msgId = msgId;
    }

    public String getSenderId() {
        return senderId;
    }

    public void setSenderId(String senderId) {
        this.senderId = senderId;
    }

    public String getReceiverId() {
        return receiverId;
    }

    public void setReceiverId(String receiverId) {
        this.receiverId = receiverId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Timestamp getCreatedTs() {
        return createdTs;
    }

    public void setCreatedTs(Timestamp createdTs) {
        this.createdTs = createdTs;
    }

    public Timestamp getUpdatedTs() {
        return updatedTs;
    }

    public void setUpdatedTs(Timestamp updatedTs) {
        this.updatedTs = updatedTs;
    }

    public Message(BigDecimal msgId, String senderId, String receiverId, String message, Timestamp createdTs, Timestamp updatedTs) {
        this.msgId = msgId;
        this.senderId = senderId;
        this.receiverId = receiverId;
        this.message = message;
        this.createdTs = createdTs;
        this.updatedTs = updatedTs;
    }

    public Message() {}

    @Override
    public String toString() {
        return "Message{" +
            "msgId=" + msgId +
            ", senderId='" + senderId + '\'' +
            ", receiverId='" + receiverId + '\'' +
            ", message='" + message + '\'' +
            ", createdTs=" + createdTs +
            ", updatedTs=" + updatedTs +
            '}';
    }
}
