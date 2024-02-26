package com.unipi.CineTicketBooking.service;

import com.unipi.CineTicketBooking.controller.secondaryClasses.AddShowtimeRequest;
import com.unipi.CineTicketBooking.controller.secondaryClasses.UpdateShowtimeRequest;
import com.unipi.CineTicketBooking.exception.ShowtimeAvailabilityException;
import com.unipi.CineTicketBooking.model.Movie;
import com.unipi.CineTicketBooking.model.Rooms;
import com.unipi.CineTicketBooking.model.Showtime;
import com.unipi.CineTicketBooking.model.secondary.SeatStatus;
import com.unipi.CineTicketBooking.repository.MovieRepository;
import com.unipi.CineTicketBooking.repository.RoomsRepository;
import com.unipi.CineTicketBooking.repository.ShowtimeRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ShowtimeService {

    private final ShowtimeRepository showtimeRepository;
    private final MovieRepository movieRepository;
    private final RoomsRepository roomRepository;

    public Optional<Showtime> getShowtimeById(Long id) {
        Optional<Showtime> showtime = showtimeRepository.findById(id);
        if(showtime.isEmpty()){
            throw new EntityNotFoundException("The showtime you requested was not found in the database");
        }
        return showtime;
    }

    public List<Showtime> getShowtimeByDate(LocalDate localDate) {
        System.out.println("Inside getShowtimeByDate in Service");
        List<Showtime> showtimes = showtimeRepository.findShowtimesBySpecificDate(localDate);
        if (showtimes.isEmpty()) {
            throw new EntityNotFoundException("No showtimes found for the specified date: " + localDate);
        }
        return showtimes;
    }

    public void addNewShowtime(AddShowtimeRequest showtimeRequest) {

        Long movieId = showtimeRequest.getMovieId();
        Long roomId = showtimeRequest.getRoomId();
        Movie movie = movieRepository.findById(movieId).orElseThrow(() -> new EntityNotFoundException("Movie not found with id: " + movieId));
        Rooms room = roomRepository.findById(roomId).orElseThrow(() -> new EntityNotFoundException("Room not found with id: " + roomId));

        int availableSeats = room.getCapacity();
        LocalDateTime startTime = LocalDateTime.parse(showtimeRequest.getStartTime());
        LocalDateTime endTime = LocalDateTime.parse(showtimeRequest.getEndTime());

        validateTimeWindow(startTime,endTime);

        double ticketPrice = showtimeRequest.getTicketPrice();

        if (!isRoomAvailable(room,startTime, endTime)) {
            throw new ShowtimeAvailabilityException("Room is not available for the requested time window.");
        }

        Showtime showtime = new Showtime (movie, room,availableSeats,startTime,endTime,ticketPrice);

        showtimeRepository.save(showtime);

    }

    public void deleteShowtime(Long id) {
        showtimeRepository.deleteShowtime(id);
    }

    @Transactional
    public void updateShowtime(Long showtimeId, UpdateShowtimeRequest showtimeRequest) {
        //We don't allow Movie or Room changes because that would mess up the seats that are already booked.
        //If the admin wants to change the room and the movie, he can delete it and add it manually
        Showtime showtime = showtimeRepository.findById(showtimeId).orElseThrow(() -> new EntityNotFoundException(
                "The showtime you requested was not found in the database"
        ));

        LocalDateTime startTime = parseDateTime(showtimeRequest.getStartTime(), "startTime");
        LocalDateTime endTime = parseDateTime(showtimeRequest.getEndTime(), "endTime");
        validateTimeWindow(startTime, endTime);

        if(startTime != null && endTime != null){
            setShowtimeTimeWindow(showtime,startTime,endTime);
        }
        else if(startTime != null){
            endTime = showtime.getEndTime();
            validateTimeWindow(startTime, endTime);
            setShowtimeTimeWindow(showtime,startTime,endTime);
        }
        else if(endTime != null){
             startTime = showtime.getStartTime();
             validateTimeWindow(startTime, endTime);
             setShowtimeTimeWindow(showtime,startTime, endTime);
        }

        if(showtimeRequest.getTicketPrice() > 0.0){
            showtime.setTicketPrice(showtimeRequest.getTicketPrice());
        }

    }


    @Transactional
    public void changeSeatStatus(Long showtimeId, int seatNumber, SeatStatus seatStatus) {
        if(seatStatus == null){
            throw new IllegalStateException("SeatStatus can't be null");
        }
        // Retrieve the Showtime entity from the database
        Showtime showtime = showtimeRepository.findById(showtimeId)
                .orElseThrow(() -> new EntityNotFoundException("Showtime not found with id: " + showtimeId));

        // Modify the status of the seat at the specified index
        List<SeatStatus> seats = showtime.getSeats();
        if (seatNumber >= 0 && seatNumber < seats.size()) {
            seats.set(seatNumber, seatStatus);
        } else {
            throw new IllegalArgumentException("Invalid seat index: " + seatNumber);
        }
        if(seatStatus.equals(SeatStatus.AVAILABLE)){
            showtime.setAvailableSeats(showtime.getAvailableSeats() + 1);
        }
        else{
            showtime.setAvailableSeats(showtime.getAvailableSeats() - 1);
        }

    }

    //Checks whether the showtime overlaps with the time of other showtimes for the room.
    private boolean isRoomAvailable(Rooms room,LocalDateTime startTime,LocalDateTime endTime){
        return showtimeRepository.countOverlappingShowtimes(room, startTime, endTime) <= 0;
    }

    //Checks whether the showtime overlaps with the time of other showtimes for the room excluding the showtime with showtimeId.
    private boolean isRoomAvailable(Long showtimeId,Rooms room,LocalDateTime startTime,LocalDateTime endTime){
        return showtimeRepository.countOverlappingShowtimes(showtimeId,room, startTime, endTime) <= 0;
    }

    private LocalDateTime parseDateTime(String dateTimeString, String fieldName){
        if (dateTimeString == null || dateTimeString.isBlank()) {
            return null;
        }
        try {
            return LocalDateTime.parse(dateTimeString);
        } catch (DateTimeParseException e) {
            throw new IllegalArgumentException("Invalid format for " + fieldName);
        }
    }

    private void validateTimeWindow(LocalDateTime startTime, LocalDateTime endTime) {
        if (startTime != null && endTime != null && startTime.isAfter(endTime)) {
            throw new IllegalArgumentException("The provided startTime can't be after the endTime");
        }
    }

    private void setShowtimeTimeWindow(Showtime showtime, LocalDateTime startTime, LocalDateTime endTime){
        if(isRoomAvailable(showtime.getId(),showtime.getRoom(),startTime,endTime)){
            if(startTime != null){
                showtime.setStartTime(startTime);
            }
            if(endTime != null){
                showtime.setEndTime(endTime);
            }
        }
        else{
            throw new ShowtimeAvailabilityException("Room with id " +showtime.getRoom().getId() +
                    " is not available for the requested time window: "+startTime + " - " + endTime);
        }
    }

}
