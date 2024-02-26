 package com.unipi.CineTicketBooking.service;

import com.unipi.CineTicketBooking.model.Bookings;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;


@RequiredArgsConstructor
@Service
public class EmailService {
    private final JavaMailSender javaMailSender;

    public void sendBookingConfirmation(Bookings booking) {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        try {
            helper.setTo(booking.getUsers().getEmail());
            helper.setSubject("Booking Confirmation");
            helper.setText("Dear " + booking.getUsers().getFirstName() + ",\nYour booking has been confirmed.\nBooking details:\nMovie: "
                    + booking.getShowtime().getMovie().getTitle() + "\nBooking Time: " + booking.getBookingTime());
            javaMailSender.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }
}

