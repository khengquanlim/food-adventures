package com.org.foodAdventures.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
import java.math.BigDecimal;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.org.foodAdventures.entity.BookingDetails;

@Repository
public interface BookingDetailsRepository extends JpaRepository<BookingDetails,Integer>{

    @Query(value = "select * from t_booking_details u where ((u.bookedBy = :bookedBy ) OR (u.bookedFor = :bookedBy))", nativeQuery = true)
    public List<BookingDetails> getBookingDetailsByUsername(
        @Param("bookedBy") String bookedBy
    );

    @Modifying
    @Query(value = "INSERT INTO t_booking_details (restaurantId, bookedBy, bookedFor, contactNo) values (:restaurantId, :bookedBy, :bookedFor, :contactNo) ", nativeQuery = true)
    int insertBooking(
        @Param("restaurantId") String restaurantId,
        @Param("bookedBy") String bookedBy,
        @Param("bookedFor") String bookedFor,
        @Param("contactNo") String contactNo

    );

}
