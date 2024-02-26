package com.unipi.CineTicketBooking.controller;

import com.unipi.CineTicketBooking.config.CustomHttpStatusExceptions.IllegalBookingStatusException;
import com.unipi.CineTicketBooking.controller.secondaryClasses.AddBookingRequest;
import com.unipi.CineTicketBooking.model.PdfGeneration;
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
    public ResponseEntity<Bookings> createBooking(@RequestBody AddBookingRequest bookingrequest) {
        Bookings createdBooking = bookingsService.createBooking(bookingrequest);
        PdfGeneration pdf=new PdfGeneration();
        pdf.generate(createdBooking);
        createdBooking.getShowtime().setSeatBooked(createdBooking.getSeat());
        return new ResponseEntity<>(createdBooking, HttpStatus.CREATED);
    }


    @PutMapping("/checkin/{id}")
    public ResponseEntity<Bookings> checkIn(@PathVariable Long id) {
        try {
            Bookings booking = bookingsService.checkIn(id);
            return new ResponseEntity<>(booking,HttpStatus.OK);
        }
        catch (IllegalArgumentException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        catch (IllegalBookingStatusException e){
            return new ResponseEntity<>(e.getHttpStatus());
        }

    }

    @PutMapping("/expire/{id}")
    public ResponseEntity<Bookings> expire(@PathVariable Long id) {
        try {
            Bookings booking = bookingsService.expire(id);
            return new ResponseEntity<>(booking,HttpStatus.OK);
        }
        catch (IllegalArgumentException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        catch (IllegalBookingStatusException e){
            return new ResponseEntity<>(e.getHttpStatus());
        }

    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteBooking(@PathVariable Long id) {
        bookingsService.deleteBooking(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
