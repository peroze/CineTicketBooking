package com.unipi.CineTicketBooking.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;

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

    @ManyToOne(targetEntity = Users.class) //
    @JoinColumn(name = "users_id",referencedColumnName = "users_id",nullable = false)
    private Users users;


    @ManyToOne(targetEntity = Movie.class)
    @JoinColumn(name = "movie_id",referencedColumnName = "movie_id", nullable = false)
    private Movie movie;

    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss[.SSS][.SS][.S]")
    private LocalDateTime bookingTime; // Εδώ περιέχεται η ώρα της κράτησης με ημερομηνία και ώρα


    public Bookings(Long id, Users users, Movie movie, LocalDateTime bookingTime) {
        this.id = id;
        this.users = users;
        this.movie = movie;
        this.bookingTime = bookingTime;
    }
    public Bookings(Users user, Showtime showtime, String seatNumber) {

    }

    public Long getId() {
        return id;
    }

    public Users getUsers() {
        return users;
    }

    public Movie getMovie() {
        return movie;
    }

    public LocalDateTime getBookingTime() {
        return bookingTime;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUsers(Users users) {
        this.users = users;
    }

    public void setMovie(Movie movie) {
        this.movie = movie;
    }

    public void setBookingTime(LocalDateTime bookingTime) {
        this.bookingTime = bookingTime;
    }
}
