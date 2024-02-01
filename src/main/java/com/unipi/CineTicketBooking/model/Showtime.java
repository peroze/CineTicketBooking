package com.unipi.CineTicketBooking.model;

import jakarta.persistence.*;
import java.util.Map;

@Entity
public class Showtime {


    public Map<String, SeatStatus> getSeatStatus() {
        return this.seatsStatus;
    }


    @ElementCollection
    @CollectionTable(name = "showtime_seats", joinColumns = @JoinColumn(name = "showtime_id"))
    @MapKeyColumn(name = "seat_number")
    @Column(name = "seat_status")
    @Enumerated(EnumType.STRING)
    private Map<String, SeatStatus> seatsStatus;
    @Id
    private Long id;
    public void addBooking(String seatNumber) {
        // Έλεγχος αν η θέση υπάρχει στον χάρτη
        if (seatsStatus.containsKey(seatNumber)) {
            // Έλεγχος αν η θέση είναι διαθέσιμη
            if (seatsStatus.get(seatNumber) == SeatStatus.AVAILABLE) {
                // Αν είναι διαθέσιμη, τότε δημιουργείται η κράτηση
                seatsStatus.put(seatNumber, SeatStatus.BOOKED);
            } else {
                // H  θέση δεν είναι διαθέσιμη
                System.out.println("Η θέση δεν είναι διαθέσιμη.");
            }
        } else {
            // Αν η θέση δεν υπάρχει
            System.out.println("Η θέση δεν υπάρχει.");
        }
    }


}