package com.unipi.CineTicketBooking.repository;

import com.unipi.CineTicketBooking.model.Showtime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShowtimeRepository extends JpaRepository<Showtime, Long> {

}
