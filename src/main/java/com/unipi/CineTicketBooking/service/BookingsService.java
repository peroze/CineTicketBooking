package com.unipi.CineTicketBooking.service;

import com.unipi.CineTicketBooking.model.Bookings;
import com.unipi.CineTicketBooking.model.SeatStatus;
import com.unipi.CineTicketBooking.model.Showtime;
import com.unipi.CineTicketBooking.model.Users;
import com.unipi.CineTicketBooking.repository.BookingsRepository;
import com.unipi.CineTicketBooking.repository.ShowtimeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class BookingsService {

    private final BookingsRepository bookingsRepository;
    private final ShowtimeService showtimeService;
    private final ShowtimeRepository showtimeRepository;

    @Autowired
    public BookingsService(
            BookingsRepository bookingsRepository,
            ShowtimeService showtimeService,
            ShowtimeRepository showtimeRepository
    ) {
        this.bookingsRepository = bookingsRepository;
        this.showtimeService = showtimeService;
        this.showtimeRepository = showtimeRepository;
    }


    public Bookings createBooking(Users user, Showtime showtime, String seatNumber) {
        Map<String, SeatStatus> seatsStatus = showtime.getSeatStatus();

        // Έλεγχος για το αν η θέση είναι διαθέσιμη ή όχι
        if (seatsStatus.containsKey(seatNumber) && seatsStatus.get(seatNumber) == SeatStatus.AVAILABLE) {
            // Εάν είναι διαθέσιμη, τότε δημιουργείται η κράτηση
            seatsStatus.put(seatNumber, SeatStatus.BOOKED);

            Bookings booking = new Bookings(user, showtime, seatNumber);
            bookingsRepository.save(booking);

            // Ενημέρωση της βάσης δεδομένων
            showtimeRepository.save(showtime);

            return booking;
        } else {
            // Εάν η θέση δεν είναι διαθέσιμη ή δεν υπάρχει, επιστρέφουμε null
            return null;
        }
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

    public List<String> getSeatStatusesForShowtime(Long showtimeId) {
        return showtimeService.getSeatStatuses(showtimeId);
    }

    public void updateSeatStatusesForShowtime(Long showtimeId) {
        showtimeService.updateSeatStatuses(showtimeId);
    }


}
