package com.unipi.CineTicketBooking;

import com.unipi.CineTicketBooking.model.Bookings;
import com.unipi.CineTicketBooking.model.Movie;
import com.unipi.CineTicketBooking.model.Users;
import com.unipi.CineTicketBooking.repository.BookingsRepository;
import com.unipi.CineTicketBooking.repository.MovieRepository;
import com.unipi.CineTicketBooking.repository.UsersRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@SpringBootApplication
public class CineTicketBookingApplication {

	public static void main(String[] args) {
		SpringApplication.run(CineTicketBookingApplication.class, args);


	}

	@Bean
	CommandLineRunner run (MovieRepository movieRepository, UsersRepository usersRepository, BookingsRepository bookingsRepository) {
		return args ->{
			List<String> names=new ArrayList<>();
			names.add("Robert Downey Junior");
			names.add("Chris Evans");
			names.add("Scarlett Johansson");
			movieRepository.save(new Movie(Long.valueOf("1"),"Avengers 2","Action-Movie",120, LocalDate.now(),"SuperHero Movie","Joss Whedon",names,"PG-13","English"));
			movieRepository.save(new Movie(Long.valueOf(2),"Avengers","Action Movie",130,LocalDate.now(),"SuperHero Movie","Joss Whedon",names,"PG-13","English"));
			usersRepository.save(new Users("Giwrgos","Gewrgiou","Ggerg2024","123454321","g.gewrgiou@gmail.com"));
			usersRepository.save(new Users("Nikolaos","Partsanakis","nikparts","567890098765","n.partsanakis@gmail.com"));
			bookingsRepository.save(new Bookings(Long.valueOf('1'),usersRepository.findById(Long.valueOf(1)).orElseThrow(()->new IllegalArgumentException("The User does not exist")),movieRepository.findById(Long.valueOf(1)).orElseThrow(()->new IllegalArgumentException("The User does not exist")),LocalDateTime.now()));
			bookingsRepository.save(new Bookings(Long.valueOf('2'),usersRepository.findById(Long.valueOf(2)).orElseThrow(()->new IllegalArgumentException("The User does not exist")),movieRepository.findById(Long.valueOf(1)).orElseThrow(()->new IllegalArgumentException("The User does not exist")),LocalDateTime.now()));
			bookingsRepository.save(new Bookings(Long.valueOf('2'),usersRepository.findById(Long.valueOf(2)).orElseThrow(()->new IllegalArgumentException("The User does not exist")),movieRepository.findById(Long.valueOf(2)).orElseThrow(()->new IllegalArgumentException("The User does not exist")),LocalDateTime.now()));


			LocalDateTime.now();
		};
	}








}
