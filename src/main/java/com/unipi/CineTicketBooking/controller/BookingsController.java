package com.unipi.CineTicketBooking.controller;

import org.springframework.web.bind.annotation.*;
import com.unipi.CineTicketBooking.model.Bookings;
import com.unipi.CineTicketBooking.service.BookingsService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.bind.annotation.PathVariable;
import java.util.List;

@RestController
@RequestMapping("/api/bookings")

public class BookingsController {
    private final BookingsService bookingsService;

    @Autowired
    public BookingsController(BookingsService bookingsService) {
        this.bookingsService = bookingsService;
    }

    @GetMapping("/all")
    public List<Bookings> getAllBookings() {
        return bookingsService.getAllBookings();
    }
    @GetMapping("/{id}")
    public Bookings getBookingById(@PathVariable Long id) {
        return bookingsService.getBookingById(id);
    }

    @PostMapping("/create")
    public Bookings createBooking(@RequestBody Bookings booking) {

        return bookingsService.createBooking(booking);
    }

    @PutMapping("/update/{id}")
    public Bookings updateBooking(@PathVariable Long id, @RequestBody Bookings updatedBooking) {
        return bookingsService.updateBooking(id, updatedBooking);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteBooking(@PathVariable Long id) {
        bookingsService.deleteBooking(id);
    }

}
