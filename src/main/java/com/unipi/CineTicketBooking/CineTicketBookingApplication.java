package com.unipi.CineTicketBooking;

import com.unipi.CineTicketBooking.controller.secondaryClasses.RegisterRequest;
import com.unipi.CineTicketBooking.model.*;
import com.unipi.CineTicketBooking.repository.*;
import com.unipi.CineTicketBooking.service.AuthenticationService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

@SpringBootApplication
public class CineTicketBookingApplication {


	private PasswordEncoder passwordEncoder;
	public static void main(String[] args) {
		SpringApplication.run(CineTicketBookingApplication.class, args);


	}

	@Bean
	CommandLineRunner run (RoomsRepository roomsRepository, MovieRepository movieRepository, UsersRepository usersRepository,
						   BookingsRepository bookingsRepository, AuthenticationService authenticationService,
							ShowtimeRepository showtimeRepository) {
		return args ->{
			List<String> names=new ArrayList<>();
			names.add("Robert Downey Junior");
			names.add("Chris Evans");
			names.add("Scarlett Johansson");
			movieRepository.save(new Movie(Long.valueOf("1"),"Avengers 2","Action-Movie",120, LocalDate.now(),"SuperHero Movie","Joss Whedon",names,"PG-13","English"));
			movieRepository.save(new Movie(Long.valueOf(2),"Avengers","Action Movie",130,LocalDate.now(),"SuperHero Movie","Joss Whedon",names,"PG-13","English"));
			movieRepository.save(new Movie(3L,"Random movie : 2","Action Movie",150,LocalDate.now(),"Random Movie","Someone",names,"PG-13","English"));


			var admin = RegisterRequest.builder()
					.firstName("Admin")
					.lastName("Admin")
					.email("admin@mail.com")
					.password("12345")
					.role(Role.ADMIN)
					.build();

			System.out.println("Admin token: " + authenticationService.register(admin).getAccessToken());
			usersRepository.save(new Users("Giwrgos","Gewrgiou","$2a$10$1b2k0DuAPefZPXkPdeKRFuOBuXV5VQkWmLXZYaFLfiWPh615fBfuO","g.gewrgiou@gmail.com", Role.ADMIN));
			usersRepository.save(new Users("Nikolaos","Partsanakis","$2a$10$1b2k0DuAPefZPXkPdeKRFuOBuXV5VQkWmLXZYaFLfiWPh615fBfuO","n.partsanakis@gmail.com",Role.USER));
			bookingsRepository.save(new Bookings(Long.valueOf('1'),usersRepository.findById(Long.valueOf(1)).orElseThrow(()->new IllegalArgumentException("The User does not exist")),movieRepository.findById(Long.valueOf(1)).orElseThrow(()->new IllegalArgumentException("The User does not exist")),LocalDateTime.now()));
			bookingsRepository.save(new Bookings(Long.valueOf('2'),usersRepository.findById(Long.valueOf(2)).orElseThrow(()->new IllegalArgumentException("The User does not exist")),movieRepository.findById(Long.valueOf(1)).orElseThrow(()->new IllegalArgumentException("The User does not exist")),LocalDateTime.now()));
			bookingsRepository.save(new Bookings(Long.valueOf('2'),usersRepository.findById(Long.valueOf(2)).orElseThrow(()->new IllegalArgumentException("The User does not exist")),movieRepository.findById(Long.valueOf(2)).orElseThrow(()->new IllegalArgumentException("The User does not exist")),LocalDateTime.now()));

			roomsRepository.save(new Rooms("Theater 1", 200));


			LocalDateTime.now();
		};
	}

	@Bean
	public CorsFilter corsFilter() {
		CorsConfiguration corsConfiguration = new CorsConfiguration();
		corsConfiguration.setAllowCredentials(true);
		corsConfiguration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
		corsConfiguration.setAllowedHeaders(Arrays.asList("Origin", "Access-Control-Allow-Origin", "Content-Type",
				"Accept", "Authorization", "Origin, Accept", "X-Requested-With",
				"Access-Control-Request-Method", "Access-Control-Request-Headers"));
		corsConfiguration.setExposedHeaders(Arrays.asList("Origin", "Content-Type", "Accept", "Authorization",
				"Access-Control-Allow-Origin", "Access-Control-Allow-Origin", "Access-Control-Allow-Credentials"));
		corsConfiguration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
		UrlBasedCorsConfigurationSource urlBasedCorsConfigurationSource = new UrlBasedCorsConfigurationSource();
		urlBasedCorsConfigurationSource.registerCorsConfiguration("/**", corsConfiguration);
		return new CorsFilter(urlBasedCorsConfigurationSource);
	}








}
