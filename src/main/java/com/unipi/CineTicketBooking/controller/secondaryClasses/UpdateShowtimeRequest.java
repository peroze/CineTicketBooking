package com.unipi.CineTicketBooking.controller.secondaryClasses;

import lombok.*;

@Getter
@Setter
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UpdateShowtimeRequest {

    private String startTime;
    private String endTime;
    private double ticketPrice;

}
