/* package com.unipi.CineTicketBooking.service;

import com.unipi.CineTicketBooking.model.Bookings;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;


@Service
public class EmailService {
    private final JavaMailSender javaMailSender;
    @Autowired
    public EmailService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    public void sendBookingConfirmation(Bookings booking) {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        try {
            helper.setTo(booking.getUsers().getEmail());
            helper.setSubject("Booking Confirmation");
            helper.setText("Dear " + booking.getUsers().getFirstName() + "Your booking has been confirmed.\nBooking details:\nMovie: "
                    + booking.getMovie().getTitle() + "\nBooking Time: " + booking.getBookingTime());

            javaMailSender.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }
} */

