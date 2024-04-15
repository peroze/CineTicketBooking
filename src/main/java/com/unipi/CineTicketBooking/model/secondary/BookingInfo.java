package com.unipi.CineTicketBooking.model.secondary;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@AllArgsConstructor
@Getter
@Setter
public class BookingInfo {

    private Long booking_id;
    private String movie_name;
    private String room_name;
    private int seat_number;
    private LocalDateTime showtime_start_time;
    private BookingStatus booking_status;

}
