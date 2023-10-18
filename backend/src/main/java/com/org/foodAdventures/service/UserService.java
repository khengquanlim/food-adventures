package com.org.foodAdventures.service;

import com.org.foodAdventures.entity.User;
import com.org.foodAdventures.model.*;
import com.org.foodAdventures.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.sql.*;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.*;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

//    @Autowired
//    private BCryptPasswordEncoder passwordEncoder;

    private static final String UPLOAD_DIR = "/path/to/your/photo/directory";
    private final Logger log = LoggerFactory.getLogger(UserService.class);

    public List<User> getAllUsers() {
        return userRepository.getAllUsers();
    }

    // @Transactional
    // public void updateUserDetails(String username, Integer age, String gender, String profilePic, String bio) {
    //     // log.info("update user details");
    //     // log.info("username = " + username + ",age = "+ age + ", gender = " + gender + ", profilePic = " + profilePic + ", bio = " + bio);
    //     userRepository.updateUserDetails(age, gender, profilePic, bio, username);
    // }

    // public void insertPhoto(String username, String photoUrl) {
    //     userRepository.insertPhoto(userId, photoUrl);
    // }

    // @Transactional
    // public void insertPhoto(String username, MultipartFile photo) {
    //     // fileURL = this.storePhoto(username, photo);
    //     userRepository.insertPhoto(username,photo);
    // }

    // public String storePhoto(String username, MultipartFile photo) {
    //     try {
    //         // Ensure the upload directory exists
    //         File uploadDir = new File(UPLOAD_DIR);
    //         if (!uploadDir.exists()) {
    //             uploadDir.mkdirs();
    //         }

    //         // Generate a unique filename, you can use UUID.randomUUID() for this
    //         String filename = UUID.randomUUID().toString() + "_" + photo.getOriginalFilename();
    //         String filePath = Paths.get(UPLOAD_DIR, filename).toString();

    //         // Save the file to the upload directory
    //         Files.copy(photo.getInputStream(), Paths.get(filePath), StandardCopyOption.REPLACE_EXISTING);

    //         // Return the URL of the stored photo
    //         return "/uploads/" + filename; // Modify this URL as needed

    //     } catch (IOException e) {
    //         throw new RuntimeException("Failed to store photo: " + e.getMessage());
    //     }
    // }


    // public List<User> getUserDetails(String username) {
    //     return userRepository.getUserDetails(username);
    // }

    // public List<Photo> getPhotoFeed(String username) {
    //     return userRepository.getPhotoFeed(username);
    // }

    // public static byte[] compressBytes(byte[] data) {
	// 	Deflater deflater = new Deflater();
	// 	deflater.setInput(data);
	// 	deflater.finish();

	// 	ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
	// 	byte[] buffer = new byte[1024];
	// 	while (!deflater.finished()) {
	// 		int count = deflater.deflate(buffer);
	// 		outputStream.write(buffer, 0, count);
	// 	}
	// 	try {
	// 		outputStream.close();
	// 	} catch (IOException e) {
	// 	}
	// 	System.out.println("Compressed Image Byte Size - " + outputStream.toByteArray().length);

	// 	return outputStream.toByteArray();
	// }

    // public static byte[] decompressBytes(byte[] data) {
	// 	Inflater inflater = new Inflater();
	// 	inflater.setInput(data);
	// 	ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
	// 	byte[] buffer = new byte[1024];
	// 	try {
	// 		while (!inflater.finished()) {
	// 			int count = inflater.inflate(buffer);
	// 			outputStream.write(buffer, 0, count);
	// 		}
	// 		outputStream.close();
	// 	} catch (IOException ioe) {
	// 	} catch (DataFormatException e) {
	// 	}
	// 	return outputStream.toByteArray();
	// }

    @Transactional
    public User saveUserRegistration(UserRegisterRequest userRegisterRequest) {

        try{

            List<User> allUsers1 = userRepository.getAllUsers();
            log.info(" "+allUsers1.size());

//        String hashedPassword = passwordEncoder.encode(userRegisterRequest.getPassword());
            Timestamp currentTimestamp = new Timestamp(System.currentTimeMillis());

            User user = new User();
            log.info("userRegisterRequest: {}", userRegisterRequest);
            log.info("id: {}", userRegisterRequest.getUserId());
            log.info("userType: {}", userRegisterRequest.getUserType());
            log.info("pwdHash: {}", userRegisterRequest.getPassword());
            log.info("age: {}", userRegisterRequest.getAge());
            log.info("email: {}", userRegisterRequest.getEmail());
            user.setId(userRegisterRequest.getUserId());
            user.setUserType(userRegisterRequest.getUserType());
            user.setPwdHash(userRegisterRequest.getPassword());
            user.setAge(userRegisterRequest.getAge());
            user.setEmail(userRegisterRequest.getEmail());
            user.setLastOnline(currentTimestamp);
            user.setCreatedTs(currentTimestamp);
            user.setUpdatedTs(currentTimestamp);

//        log.info("saveUserRegistration: {}", user);
            User newUser = userRepository.saveAndFlush(user);
//            userRepository.flush();
            log.info("newUser: {}", newUser);
            List<User> allUsers = userRepository.getAllUsers();
            log.info(" "+allUsers.size());

            return newUser;
//        return userRepository.save(user);

        }catch (Exception e){
            log.info("Exception: {}", e);
        }
        return null;

    }

}
