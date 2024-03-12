package com.unipi.CineTicketBooking.controller.secondaryClasses;

import lombok.*;

@Getter
@Setter
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UpdateShowtimeRequest {
    private int seat_no;
    private String startTime;
    private String endTime;
    private double ticketPrice;

    public UpdateShowtimeRequest(String startTime, String endTime, double ticketPrice) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.ticketPrice = ticketPrice;
    }
}
