package com.unipi.CineTicketBooking.repository;

import com.unipi.CineTicketBooking.model.Bookings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookingsRepository extends JpaRepository<Bookings, Long> {

}