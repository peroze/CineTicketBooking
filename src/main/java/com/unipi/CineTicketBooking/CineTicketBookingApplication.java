package com.unipi.CineTicketBooking;

import com.unipi.CineTicketBooking.controller.secondaryClasses.RegisterRequest;
import com.unipi.CineTicketBooking.model.*;
import com.unipi.CineTicketBooking.model.secondary.BookingStatus;
import com.unipi.CineTicketBooking.model.secondary.Provider;
import com.unipi.CineTicketBooking.repository.*;
import com.unipi.CineTicketBooking.service.AuthenticationService;
import com.unipi.CineTicketBooking.service.EmailService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
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
			//PdfGeneration pdf=new PdfGeneration();
			//pdf.generate(1);
			List<String> names=new ArrayList<>();
			names.add("Robert Downey Junior");
			names.add("Chris Evans");
			names.add("Scarlett Johansson");
			movieRepository.save(new Movie(3L,"Avengers 2","Action-Movie",120, LocalDate.now(),"SuperHero Movie","Joss Whedon",names,"PG-13","English"));
			movieRepository.save(new Movie(2L,"Avengers","Action Movie",130,LocalDate.now(),"Marvel Studios presents in association with Paramount Pictures \"Marvel's The Avengers\" — the superhero team-up of a lifetime, featuring iconic Marvel superheroes Iron Man, The Incredible Hulk, Thor, Captain America, Hawkeye, and Black Widow. When an unexpected enemy emerges that threatens global safety and security, Nick Fury, Director of the international peacekeeping agency known as S.H.I.E.L.D., finds himself in need of a team to pull the world back from the brink of disaster. Spanning the globe, a daring recruitment effort begins.","Joss Whedon",names,"PG-13","English"));
			movieRepository.save(new Movie(3L,"Random movie : 2","Action Movie",150,LocalDate.now(),"Random Movie","Someone",names,"PG-13","English"));


			var admin = RegisterRequest.builder()
					.firstName("Admin")
					.lastName("Admin")
					.email("cineticketbooking@gmail.com")
					.password("12345")
					.role(Role.ADMIN)
					.build();

			System.out.println("Admin token: " + authenticationService.register(admin).getAccessToken());
			usersRepository.save(new Users("Giwrgos","Gewrgiou","$2a$10$1b2k0DuAPefZPXkPdeKRFuOBuXV5VQkWmLXZYaFLfiWPh615fBfuO","g.gewrgiou@gmails.com", Role.ADMIN, Provider.LOCAL));
			usersRepository.save(new Users("Nikolaos","Partsanakis","$2a$10$1b2k0DuAPefZPXkPdeKRFuOBuXV5VQkWmLXZYaFLfiWPh615fBfuO","cineticketbooking@gmails.com",Role.USER,Provider.LOCAL));
			LocalDateTime localDateTime1 =LocalDateTime.of(2024, 4, 18, 18, 0, 0, 0);
			LocalDateTime localDateTime2 =LocalDateTime.of(2024, 4, 19, 18, 0, 0, 0);
			LocalDateTime localDateTime3 =LocalDateTime.of(2024, 4, 20, 18, 0, 0, 0);
			roomsRepository.save(new Rooms("Theater 1", 200));
			showtimeRepository.save(new Showtime(movieRepository.findById(Long.valueOf("1")).get(),roomsRepository.findById(Long.valueOf("1")).get(),roomsRepository.findById(Long.valueOf("1")).get().getCapacity(),localDateTime1,localDateTime1.plusMinutes(Long.valueOf(movieRepository.findById(Long.valueOf("1")).get().getDuration())),25));
			showtimeRepository.save(new Showtime(movieRepository.findById(Long.valueOf("2")).get(),roomsRepository.findById(Long.valueOf("1")).get(),roomsRepository.findById(Long.valueOf("1")).get().getCapacity(),localDateTime2,localDateTime2.plusMinutes(Long.valueOf(movieRepository.findById(Long.valueOf("1")).get().getDuration())),25));
			bookingsRepository.save(new Bookings(usersRepository.findById(Long.valueOf(1)).orElseThrow(()->new IllegalArgumentException("The User does not exist")),showtimeRepository.findById(Long.valueOf(1)).orElseThrow(()->new IllegalArgumentException("The User does not exist")),LocalDateTime.now(),13, BookingStatus.PENDING, "Konstantinos", "Perrakis", "6969696969"));
			bookingsRepository.save(new Bookings(usersRepository.findById(1L).orElseThrow(()->new IllegalArgumentException("The User does not exist")),showtimeRepository.findById(2L).orElseThrow(()->new IllegalArgumentException("The User does not exist")),LocalDateTime.now(),14, BookingStatus.PENDING, "Konstantinos", "Perrakis", "6969696969"));

			LocalDateTime.now();

		};
	}

	@Bean
	public CorsFilter corsFilter() {
		CorsConfiguration corsConfiguration = new CorsConfiguration();
		corsConfiguration.setAllowCredentials(true);
		corsConfiguration.setAllowedOrigins(Arrays.asList(
				"http://localhost:3000",
				"https://accounts.google.com",
				"https://www.googleapis.com"
				)
		);
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
