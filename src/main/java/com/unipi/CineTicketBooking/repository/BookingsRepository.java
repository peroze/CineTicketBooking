package com.unipi.CineTicketBooking.repository;

import com.unipi.CineTicketBooking.model.Bookings;
import com.unipi.CineTicketBooking.model.Showtime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingsRepository extends JpaRepository<Bookings, Long> {

    List<Bookings> findAllByshowtimeId(Long showtime);

}