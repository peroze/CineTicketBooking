package com.unipi.CineTicketBooking.repository;


import com.unipi.CineTicketBooking.model.Movie;
import com.unipi.CineTicketBooking.model.Rooms;
import com.unipi.CineTicketBooking.model.Showtime;
import com.unipi.CineTicketBooking.model.secondary.SeatStatus;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface ShowtimeRepository extends JpaRepository<Showtime, Long> {


    Optional<Showtime> findById(Long id);

    @Transactional
    @Modifying
    @Query("DELETE FROM Showtime s WHERE s.id = :id")
    void deleteShowtime(@Param("id") Long id);


    @Query("SELECT COUNT(s) FROM Showtime s " +
            "WHERE s.id <> :showtimeIdToExclude " +  // Exclude the showtime with the same ID
            "AND s.room = :room " +
            "AND ((s.startTime >= :startTime AND s.startTime < :endTime) OR "+
            "     (s.endTime > :startTime AND s.endTime <= :endTime) OR "+
            "     (s.startTime <= :startTime AND s.endTime >= :endTime) "+
            ")")
    int countOverlappingShowtimes(@Param("showtimeIdToExclude") Long showtimeIdToExclude,
                                  @Param("room") Rooms room,
                                  @Param("startTime") LocalDateTime startTime,
                                  @Param("endTime") LocalDateTime endTime);

    @Query("SELECT COUNT(s) FROM Showtime s " +
            "WHERE s.room = :room " +
            "AND ((s.startTime >= :startTime AND s.startTime < :endTime) OR "+
            "     (s.endTime > :startTime AND s.endTime <= :endTime) OR "+
            "     (s.startTime <= :startTime AND s.endTime >= :endTime) "+
            ")")
    int countOverlappingShowtimes(@Param("room") Rooms room,
                                  @Param("startTime") LocalDateTime startTime,
                                  @Param("endTime") LocalDateTime endTime);



    @Query("SELECT s FROM Showtime s WHERE CAST(s.startTime AS date) = :specificDate")
    List<Showtime> findShowtimesBySpecificDate(@Param("specificDate") LocalDate specificDate);

}
