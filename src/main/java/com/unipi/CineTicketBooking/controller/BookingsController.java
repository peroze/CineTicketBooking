package com.unipi.CineTicketBooking.controller;

import org.springframework.web.bind.annotation.*;
import com.unipi.CineTicketBooking.model.Bookings;
import com.unipi.CineTicketBooking.service.BookingsService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.PathVariable;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/bookings")
public class BookingsController {
    private final BookingsService bookingsService;


    @Autowired
    public BookingsController(BookingsService bookingsService) {
        this.bookingsService = bookingsService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Bookings>> getAllBookings() {
        List<Bookings> bookings = bookingsService.getAllBookings();
        return new ResponseEntity<>(bookings, HttpStatus.OK);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Bookings> getBookingById(@PathVariable Long id) {
        Bookings booking = bookingsService.getBookingById(id);
        if (booking != null) {
            return new ResponseEntity<>(booking, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/create")
    public ResponseEntity<Bookings> createBooking(@RequestBody Bookings booking) {
        List<String> seatStatuses = bookingsService.getSeatStatusesForShowtime(booking.getShowtimeId());

        if (seatStatuses.contains("BOOKED")) {
            // Εάν υπάρχει ήδη κράτηση σε κάποια θέση
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Bookings createdBooking = bookingsService.createBooking(booking);

        return new ResponseEntity<>(createdBooking, HttpStatus.CREATED);
    }


    @PutMapping("/update/{id}")
    public ResponseEntity<Bookings> updateBooking(@PathVariable Long id, @RequestBody Bookings updatedBooking) {
        Bookings booking = bookingsService.updateBooking(id, updatedBooking);
        if (booking != null) {
            return new ResponseEntity<>(booking, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteBooking(@PathVariable Long id) {
        bookingsService.deleteBooking(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
