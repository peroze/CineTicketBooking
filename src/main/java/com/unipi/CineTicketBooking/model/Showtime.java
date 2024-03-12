package com.unipi.CineTicketBooking.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.unipi.CineTicketBooking.model.secondary.SeatStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "showtimes")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Showtime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "showtime_id")
    private Long id;

    @ManyToOne(targetEntity = Movie.class) //
    @JoinColumn(name = "movie_id",referencedColumnName = "movie_id",nullable = false)
    private Movie movie;

    @ManyToOne(targetEntity = Rooms.class) //
    @JoinColumn(name = "room_id",referencedColumnName = "room_id",nullable = false)
    private Rooms room;

    //Available seats to be able to display them in the calendar
    private int availableSeats;

    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm")
    private LocalDateTime startTime;
    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm")
    private LocalDateTime endTime;
    private double ticketPrice;

    @Enumerated(EnumType.STRING)
    @Column(length=100000)
    private List<SeatStatus> seats;

    public Showtime(Movie movie, Rooms room, int availableSeats, LocalDateTime startTime, LocalDateTime endTime, double ticketPrice) {
        this.movie = movie;
        this.room = room;
        this.availableSeats = availableSeats;
        this.startTime = startTime;
        this.endTime = endTime;
        this.ticketPrice = ticketPrice;
        this.seats = initializeSeats(room);
    }

    // Method to initialize seats list based on room capacity
    private List<SeatStatus> initializeSeats(Rooms room) {
        int capacity = room.getCapacity();
        List<SeatStatus> seats = new ArrayList<>();
        for (int i = 0; i < capacity; i++) {
            seats.add(SeatStatus.AVAILABLE);
        }
        return seats;
    }

    public boolean setSeatBooked(int num){
        seats.set(num,SeatStatus.BOOKED);
        return true;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Movie getMovie() {
        return movie;
    }

    public void setMovie(Movie movie) {
        this.movie = movie;
    }

    public Rooms getRoom() {
        return room;
    }

    public void setRoom(Rooms room) {
        this.room = room;
    }

    public int getAvailableSeats() {
        return availableSeats;
    }

    public void setAvailableSeats(int availableSeats) {
        this.availableSeats = availableSeats;
    }

    public LocalDateTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }

    public LocalDateTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalDateTime endTime) {
        this.endTime = endTime;
    }

    public double getTicketPrice() {
        return ticketPrice;
    }

    public void setTicketPrice(double ticketPrice) {
        this.ticketPrice = ticketPrice;
    }

    public List<SeatStatus> getSeats() {
        return seats;
    }

    public void setSeats(List<SeatStatus> seats) {
        this.seats = seats;
    }
}
