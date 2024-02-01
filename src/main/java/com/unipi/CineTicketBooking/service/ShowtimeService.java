package com.unipi.CineTicketBooking.service;

import com.unipi.CineTicketBooking.model.SeatStatus;
import com.unipi.CineTicketBooking.model.Showtime;
import com.unipi.CineTicketBooking.repository.ShowtimeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Map;

@Service
public class ShowtimeService {

    private final ShowtimeRepository showtimeRepository;

    @Autowired
    public ShowtimeService(ShowtimeRepository showtimeRepository) {
        this.showtimeRepository = showtimeRepository;
    }
    public Map<String, SeatStatus> getSeatStatus(Showtime showtime) {
        return showtime.getSeatStatus();
    }

    public List<String> getSeatStatuses(Long showtimeId) {
        return null;
    }

    public void updateSeatStatuses(Long showtimeId) {
    }



}
