package com.unipi.CineTicketBooking.service;

import com.unipi.CineTicketBooking.model.Bookings;
import com.unipi.CineTicketBooking.repository.BookingsRepository;
import org.springframework.stereotype.Service;

@Service
public class BookingsService {

    private final BookingsRepository bookingsRepository;


    public BookingsService(BookingsRepository bookingsRepository) {
        this.bookingsRepository = bookingsRepository;
    }

    public Bookings createBooking(Bookings booking) {

        return bookingsRepository.save(booking);
    }
}
