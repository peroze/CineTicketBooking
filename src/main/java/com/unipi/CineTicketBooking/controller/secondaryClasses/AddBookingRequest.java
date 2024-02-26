package com.unipi.CineTicketBooking.controller.secondaryClasses;

import lombok.*;

@Getter
@Setter
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AddBookingRequest  {
    private Long Showtimeid;
    private String UserEmail;
    private int seat;
    private String status;
}
