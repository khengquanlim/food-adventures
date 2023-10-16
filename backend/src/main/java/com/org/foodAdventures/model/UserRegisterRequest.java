package com.org.foodAdventures.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UserRegisterRequest implements Serializable {

    @JsonProperty("userId")
    private int userId;

    @JsonProperty("userType")
    private int userType;

    @JsonProperty("birthdate")
    private int birthdate;

    @JsonProperty("email")
    private int email;

    @JsonProperty("password")
    private int password;

}
