package com.unipi.CineTicketBooking.service;

import com.unipi.CineTicketBooking.controller.secondaryClasses.UpdateShowtimeRequest;
import com.unipi.CineTicketBooking.exception.IllegalBookingStatusException;
import com.unipi.CineTicketBooking.controller.secondaryClasses.AddBookingRequest;
import com.unipi.CineTicketBooking.exception.NoEntryWithIdException;
import com.unipi.CineTicketBooking.model.Bookings;
import com.unipi.CineTicketBooking.model.Showtime;
import com.unipi.CineTicketBooking.model.secondary.BookingStatus;
import com.unipi.CineTicketBooking.repository.BookingsRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookingsService {

    private final BookingsRepository bookingsRepository;
    private final ShowtimeService showtimeService;
    private final UsersService usersService;

    public Bookings createBooking(AddBookingRequest bookingRequest) {
        Bookings booking=new Bookings(usersService.getUserByEmail(bookingRequest.getUserEmail()).get(),showtimeService.getShowtimeById(bookingRequest.getShowtimeid()).get(), LocalDateTime.now(),bookingRequest.getSeat(), BookingStatus.PENDING, bookingRequest.getFirstName(), bookingRequest.getLastName(), bookingRequest.getTelephone());
        showtimeService.updateShowtimeSeats(booking.getShowtime().getId(),booking.getSeat());
        return bookingsRepository.save(booking);
    }

    public List<Bookings> getAllBookings() {
        List<Bookings> bookingsList = bookingsRepository.findAll();
        return bookingsList;
    }

    public List<Bookings> getBookingByShowtimeId(Long id) {
        List<Bookings> booking = bookingsRepository.findAllByshowtimeId(id);
        if(booking.isEmpty()){
            throw new EntityNotFoundException("The booking you requested was not found in the database");
        }
        return booking;
    }

    public Bookings getBookingById(Long id) {
        Optional<Bookings> optionalBooking = bookingsRepository.findById(id);
        return optionalBooking.orElse(null);
    }

    public Bookings checkIn(Long id){
        Bookings optionalBooking = bookingsRepository.findById(id).orElse(null);
        if (optionalBooking==null){
            throw new IllegalArgumentException("There is no booking with this id");
        }
       if( optionalBooking.getStatus()==BookingStatus.CHECKED_IN){
           throw new IllegalBookingStatusException(HttpStatus.BAD_REQUEST,"The given booking is already checked-in");
       }
       else if( optionalBooking.getStatus()==BookingStatus.EXPIRED){
            throw new IllegalBookingStatusException(HttpStatus.BAD_REQUEST,"The given booking is already expired");
       }
       optionalBooking.setStatus(BookingStatus.CHECKED_IN);
       bookingsRepository.save(optionalBooking);
       return optionalBooking;
    }

    public Bookings expire(Long id){
        Bookings optionalBooking = bookingsRepository.findById(id).orElse(null);
        if (optionalBooking==null){
            throw new IllegalArgumentException("Wrong Booking Number");
        }
        if( optionalBooking.getStatus()==BookingStatus.CHECKED_IN){
            throw new IllegalBookingStatusException(HttpStatus.BAD_REQUEST,"The Booking is already checked in and can't be set to EXPIRED");
        }
        if( optionalBooking.getStatus()==BookingStatus.EXPIRED){
           return optionalBooking;
        }
        optionalBooking.setStatus(BookingStatus.EXPIRED);
        bookingsRepository.save(optionalBooking);
        return optionalBooking;
    }

    public boolean deleteBooking(Long id) {
        Optional<Bookings> optionalBooking = bookingsRepository.findById(id);

        if (optionalBooking.isPresent()) {
            bookingsRepository.deleteById(id);
            return true;
        } else {
            throw new NoEntryWithIdException("There is no booking with the given id");
        }
    }



}
