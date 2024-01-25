package com.unipi.CineTicketBooking.repository;

import com.unipi.CineTicketBooking.model.Movie;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {


    @Query("SELECT m FROM Movie m WHERE m.name =?1")
    Optional<Movie> findMovieByName(String name);
    @Transactional
    @Modifying
    @Query("DELETE FROM Movie m WHERE m.name = :name")
    void deleteByName(@Param("name") String name);

    boolean existsByName(String name);


}
