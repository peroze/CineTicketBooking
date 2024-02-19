package com.unipi.CineTicketBooking.controller.secondaryClasses;

import lombok.*;

@Getter
@Setter
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AddShowtimeRequest {

    private Long roomId;
    private Long movieId;
    private String startTime;
    private String endTime;
    private double ticketPrice;

}
