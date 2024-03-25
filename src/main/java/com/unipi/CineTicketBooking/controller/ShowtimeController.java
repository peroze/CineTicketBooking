package com.unipi.CineTicketBooking.controller;

import com.google.gson.Gson;
import com.unipi.CineTicketBooking.controller.secondaryClasses.AddShowtimeRequest;
import com.unipi.CineTicketBooking.controller.secondaryClasses.UpdateShowtimeRequest;
import com.unipi.CineTicketBooking.exception.NoEntryWithIdException;
import com.unipi.CineTicketBooking.exception.ShowtimeAvailabilityException;
import com.unipi.CineTicketBooking.model.Showtime;
import com.unipi.CineTicketBooking.model.secondary.SeatStatus;
import com.unipi.CineTicketBooking.service.MovieService;
import com.unipi.CineTicketBooking.service.ShowtimeService;
import lombok.RequiredArgsConstructor;
import org.hibernate.sql.Update;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(path = "api/showtime")
@RequiredArgsConstructor
public class ShowtimeController {

    private final ShowtimeService showtimeService;
    private final MovieService movieService;


    @GetMapping(path = "/{id}")
    public ResponseEntity<Optional<Showtime>> getShowtimeById(@PathVariable("id") Long id ){
        try {
            return new ResponseEntity<>(showtimeService.getShowtimeById(id), HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }    }
    @GetMapping(path="/movie/{id}")
    public  ResponseEntity<List<Showtime>> getShowtimeByMovieId(@PathVariable("id") Long id){
        try{
            //Gson gson = new Gson();
            List<Showtime> showtimes=showtimeService.getShowtimeByMovieId(id);
            //String movieList = gson.toJson(showtimes);
            return new ResponseEntity<>(showtimes,HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping(path="/all")
    public  ResponseEntity<List<Showtime>> getAllShowTimes(){
        try{
            //Gson gson = new Gson();
            List<Showtime> showtimes=showtimeService.getAllShowTimes();
            //String movieList = gson.toJson(showtimes);
            return new ResponseEntity<>(showtimes,HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PostMapping
    public ResponseEntity<String> addNewShowtime(@RequestBody AddShowtimeRequest addShowtimeRequest) {
        try {
            showtimeService.addNewShowtime(addShowtimeRequest);
            return new ResponseEntity<>(HttpStatus.CREATED);
        }catch (ShowtimeAvailabilityException e){
            e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(),e.getHttpStatus());
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_GATEWAY);
        }

    }

    @PostMapping(path="/addauto")
    public ResponseEntity<String> addNewShowtimes(@RequestBody AddShowtimeRequest addShowtimeRequest) {
        try {
            LocalDate end = LocalDate.parse(addShowtimeRequest.getEndTime());
            LocalDate start = LocalDate.parse(addShowtimeRequest.getStartTime());
            int duration = movieService.getMoviebyid(addShowtimeRequest.getMovieId()).orElseThrow().getDuration();
            for (LocalDate date = start; date.isBefore(end); date = date.plusDays(1)) {
                AddShowtimeRequest first_show = new AddShowtimeRequest(addShowtimeRequest.getRoomId(), addShowtimeRequest.getMovieId(), date.atTime(18, 0).toString(), date.atTime(18, 0).plusMinutes(duration + 15).toString(), addShowtimeRequest.getTicketPrice());
                showtimeService.addNewShowtime(first_show);
                AddShowtimeRequest second_show = new AddShowtimeRequest(addShowtimeRequest.getRoomId(), addShowtimeRequest.getMovieId(), date.atTime(21, 30).toString(), date.atTime(21, 30).plusMinutes(duration + 15).toString(), addShowtimeRequest.getTicketPrice());
                showtimeService.addNewShowtime(second_show);
            }
            return new ResponseEntity<>("Showtime Successfully Created",HttpStatus.CREATED);
        }catch (ShowtimeAvailabilityException e){
            e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(),e.getHttpStatus());
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_GATEWAY);
        }
    }

    @DeleteMapping(path = "{showtimeId}")
    public ResponseEntity<String> deleteShowtime(@PathVariable("showtimeId") Long id) {
        try {
            showtimeService.deleteShowtime(id);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch(NoEntryWithIdException e){
            return new ResponseEntity<>(e.getMessage(),e.getHttpStatus());
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping(path = "{showtimeId}")
    public ResponseEntity<Void> updateShowtime(@PathVariable("showtimeId") Long id, @RequestBody UpdateShowtimeRequest updateShowtimeRequest) {
        try {
            showtimeService.updateShowtime(id, updateShowtimeRequest);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (NoEntryWithIdException e){
            return new ResponseEntity<>(e.getHttpStatus());
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping(path="{showtimeId}/{seatNumber}")
    public ResponseEntity<Void> changeSeatStatus(@PathVariable("showtimeId") Long showtimeId,
                                                 @PathVariable("seatNumber") int seatNumber,
                                                 @RequestBody SeatStatus seatStatus)
    {
        try {
            showtimeService.changeSeatStatus(showtimeId, seatNumber, seatStatus);
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(path="/all/{localDate}")
    public ResponseEntity<List<Showtime>> getShowtimeByDate(@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate localDate)
    {
        try {
            //System.out.println("Inside getShowtimeByDate in Controller");
            return new ResponseEntity<>(showtimeService.getShowtimeByDate(localDate), HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
