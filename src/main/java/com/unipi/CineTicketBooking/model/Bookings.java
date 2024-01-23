package com.unipi.CineTicketBooking.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;


@Entity
@Table(name = "bookings")

public class Bookings {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne //
    @JoinColumn(name = "users_id", nullable = false)
    private Users users;


    @ManyToOne
    @JoinColumn(name = "movie_id", nullable = false)
    private Movie movie;

    private LocalDateTime bookingTime; // Εδώ περιέχεται η ώρα της κράτησης με ημερομηνία και ώρα

}
