package com.unipi.CineTicketBooking.controller;

import com.unipi.CineTicketBooking.exception.IllegalBookingStatusException;
import com.unipi.CineTicketBooking.controller.secondaryClasses.AddBookingRequest;
import com.unipi.CineTicketBooking.exception.NoEntryWithIdException;
import com.unipi.CineTicketBooking.model.PdfGeneration;
import com.unipi.CineTicketBooking.model.Showtime;
import com.unipi.CineTicketBooking.service.EmailService;
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
    private final EmailService emailService;


    @Autowired
    public BookingsController(BookingsService bookingsService,EmailService emailService) {
        this.bookingsService = bookingsService;
        this.emailService = emailService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Bookings>> getAllBookings() {
        try{
        List<Bookings> bookings = bookingsService.getAllBookings();
        return new ResponseEntity<>(bookings, HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(path="/showtime/{id}")
    public  ResponseEntity<List<Bookings>> getBookingByMovieId(@PathVariable("id") Long id){
        try{
            //Gson gson = new Gson();
            List<Bookings> bookings=bookingsService.getBookingByShowtimeId(id);
            //String movieList = gson.toJson(showtimes);
            return new ResponseEntity<>(bookings,HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/{id}")
    public ResponseEntity<Bookings> getBookingById(@PathVariable Long id) {
        try {
            Bookings booking = bookingsService.getBookingById(id);
            if (booking != null) {
                return new ResponseEntity<>(booking, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/create")
    public ResponseEntity<Bookings> createBooking(@RequestBody AddBookingRequest bookingrequest) {
        try {
            Bookings createdBooking = bookingsService.createBooking(bookingrequest);
            PdfGeneration pdf = new PdfGeneration();
            pdf.generate(createdBooking);
            createdBooking.getShowtime().setSeatBooked(createdBooking.getSeat());
            emailService.sendBookingConfirmation(createdBooking);
            return new ResponseEntity<>(createdBooking, HttpStatus.CREATED);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
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
    public ResponseEntity<String> deleteBooking(@PathVariable Long id) {
        try {
            bookingsService.deleteBooking(id);
            return new ResponseEntity<>("Successfully Deleted",HttpStatus.OK);
        }catch (NoEntryWithIdException e){
            e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(),e.getHttpStatus());
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
