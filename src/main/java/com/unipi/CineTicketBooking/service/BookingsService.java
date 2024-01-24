package com.unipi.CineTicketBooking.service;

import com.unipi.CineTicketBooking.model.Bookings;
import com.unipi.CineTicketBooking.repository.BookingsRepository;
import org.springframework.stereotype.Service;
import java.util.Optional;

import java.util.List;

@Service
public class BookingsService {

    private final BookingsRepository bookingsRepository;

    public BookingsService(BookingsRepository bookingsRepository) {
        this.bookingsRepository = bookingsRepository;
    }

    public Bookings createBooking(Bookings booking) {

        return bookingsRepository.save(booking);
    }

    public List<Bookings> getAllBookings() {
        List<Bookings> bookingsList = bookingsRepository.findAll();
        return bookingsList;
    }
    public Bookings getBookingById(Long id) {
        Optional<Bookings> optionalBooking = bookingsRepository.findById(id);
        return optionalBooking.orElse(null);
    }
    public Bookings updateBooking(Long id, Bookings updatedBooking) {
        Optional<Bookings> optionalBooking = bookingsRepository.findById(id);

        if (optionalBooking.isPresent()) {
            Bookings booking = optionalBooking.get();
            return bookingsRepository.save(booking);
        } else {
            return null;
        }
    }
    public boolean deleteBooking(Long id) {
        Optional<Bookings> optionalBooking = bookingsRepository.findById(id);

        if (optionalBooking.isPresent()) {
            bookingsRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }



}
