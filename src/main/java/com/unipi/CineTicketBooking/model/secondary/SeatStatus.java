package com.unipi.CineTicketBooking.model.secondary;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.STRING)
public enum SeatStatus {
    AVAILABLE,
    BOOKED,
    RESERVED
}
