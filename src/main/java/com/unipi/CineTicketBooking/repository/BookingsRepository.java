package com.unipi.CineTicketBooking.repository;

import com.unipi.CineTicketBooking.model.Bookings;
import com.unipi.CineTicketBooking.model.Showtime;
import com.unipi.CineTicketBooking.model.secondary.BookingInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookingsRepository extends JpaRepository<Bookings, Long> {


    List<Bookings> findAllByshowtimeId(Long showtime);

    @Query("SELECT new com.unipi.CineTicketBooking.model.secondary.BookingInfo(b.id, b.showtime.movie.name," +
            "b.showtime.room.name,b.seat,b.showtime.startTime,b.status) FROM Bookings b WHERE b.users.id = :user_id")
    List<BookingInfo> findAllByUserId(Long user_id);



}