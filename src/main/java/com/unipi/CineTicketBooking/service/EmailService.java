 package com.unipi.CineTicketBooking.service;

import com.unipi.CineTicketBooking.model.Bookings;
import com.unipi.CineTicketBooking.model.Showtime;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.FileSystemResource;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;

import java.io.File;
import java.time.LocalDateTime;

 @RequiredArgsConstructor
@Service
public class EmailService {

     @Autowired
     private final JavaMailSender javaMailSender;

    public void sendBookingConfirmation(Bookings booking) {
        MimeMessage message = javaMailSender.createMimeMessage();

        try {

            MimeMessageHelper helper = new MimeMessageHelper(message,true);
            helper.setTo(booking.getUsers().getEmail());
            helper.setSubject("Booking Confirmation");
            helper.setText("Dear " + booking.getUsers().getFirstName() + ",\nYour booking has been confirmed.\nBooking details:\nMovie: "
                    + booking.getShowtime().getMovie().getTitle() + "\nBooking Time: " + booking.getBookingTime());


            FileSystemResource file = new FileSystemResource(new File("bookingConfirmation/"+booking.getId()+".pdf"));
            helper.addAttachment("confirmation.pdf", file);


            javaMailSender.send(message);

        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }

    public void ShowTimeCancelation(Showtime st,Bookings booking){

        MimeMessage message = javaMailSender.createMimeMessage();

        try {

            MimeMessageHelper helper = new MimeMessageHelper(message,true);
            helper.setTo(booking.getUsers().getEmail());
            helper.setSubject("The showtime at" + st.getStartTime() + "has been canceled.");
            helper.setText("Dear " + booking.getUsers().getFirstName() + ",\nThe above mentioned showtime has been canceled due to technical reasons");
            javaMailSender.send(message);

        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }

    public void ShowTimeEdit(Showtime st,Bookings booking, LocalDateTime olddate){

        MimeMessage message = javaMailSender.createMimeMessage();

        try {

            MimeMessageHelper helper = new MimeMessageHelper(message,true);
            helper.setTo(booking.getUsers().getEmail());
            helper.setSubject("The showtime at" + olddate + "has been edited.");
            helper.setText("Dear " + booking.getUsers().getFirstName() + ",\nThe date of the above mentioned showtime has been edited.\n The new date is : "+ st.getStartTime());
            javaMailSender.send(message);

        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }
}

