package com.unipi.CineTicketBooking.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.unipi.CineTicketBooking.model.secondary.BookingStatus;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;


@Entity
@Table(name = "bookings")
@AllArgsConstructor
public class Bookings {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(targetEntity = Users.class) //
    @JoinColumn(name = "users_id",referencedColumnName = "users_id",nullable = false)
    private Users users;
    @ManyToOne(targetEntity = Showtime.class)
    @JoinColumn(name="showtime_id",referencedColumnName = "showtime_id",nullable = false)
    private Showtime showtime;

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    private BookingStatus status;
    @Column
    private int seat;
    @Column
    private String firstName;
    @Column
    private String lastName;
    @Column
    private String telephone;

    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss[.SSS][.SS][.S]")
    private LocalDateTime bookingTime; // Εδώ περιέχεται η ώρα της κράτησης με ημερομηνία και ώρα


    public Bookings(Users users, Showtime showtime, LocalDateTime bookingTime,int seat,BookingStatus status, String firstName, String lastName, String telephone) {
        this.id = id;
        this.users = users;
        this.showtime = showtime;
        this.bookingTime = bookingTime;
        this.seat=seat;
        this.firstName=firstName;
        this.lastName=lastName;
        this.telephone=telephone;
        this.status=status;
    }

    public Bookings() {

    }

    public Long getId() {
        return id;
    }

    public Users getUsers() {
        return users;
    }

    public Showtime getShowtime() {
        return showtime;
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

    public void setShowtime(Showtime showtime) {
        this.showtime = showtime;
    }

    public void setBookingTime(LocalDateTime bookingTime) {
        this.bookingTime = bookingTime;
    }

    public int getSeat() {
        return seat;
    }

    public void setSeat(int seat) {
        this.seat = seat;
    }

    public BookingStatus getStatus() {
        return status;
    }

    public void setStatus(BookingStatus status) {
        this.status = status;
    }
}
