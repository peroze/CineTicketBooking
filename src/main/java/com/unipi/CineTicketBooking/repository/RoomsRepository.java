package com.unipi.CineTicketBooking.repository;

import com.unipi.CineTicketBooking.model.Rooms;
import com.unipi.CineTicketBooking.model.Rooms;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomsRepository extends JpaRepository<Rooms, Long> {

    Rooms findByName(String name); //αναζήτηση των Rooms με βάσει τα ονόματα της αίθουσασ
}
