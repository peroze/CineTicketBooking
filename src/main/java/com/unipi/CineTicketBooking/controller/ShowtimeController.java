package com.unipi.CineTicketBooking.controller;

import com.unipi.CineTicketBooking.controller.secondaryClasses.AddShowtimeRequest;
import com.unipi.CineTicketBooking.controller.secondaryClasses.UpdateShowtimeRequest;
import com.unipi.CineTicketBooking.model.Showtime;
import com.unipi.CineTicketBooking.model.secondary.SeatStatus;
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

    @GetMapping(path = "/{id}")
    public ResponseEntity<Optional<Showtime>> getShowtimeById(@PathVariable("id") Long id ){
        return new ResponseEntity<> (showtimeService.getShowtimeById(id), HttpStatus.OK);
    }

    @GetMapping(path ="/all")
    public ResponseEntity<List<Showtime>> getAllShowtimes()
    {
        return new ResponseEntity<>(showtimeService.getAllShowtimes() , HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Void> addNewShowtime(@RequestBody AddShowtimeRequest addShowtimeRequest) {
        showtimeService.addNewShowtime(addShowtimeRequest);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping(path = "{showtimeId}")
    public ResponseEntity<Void> deleteShowtime(@PathVariable("showtimeId") Long id) {
        showtimeService.deleteShowtime(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping(path = "{showtimeId}")
    public ResponseEntity<Void> updateShowtime(@PathVariable("showtimeId") Long id, @RequestBody UpdateShowtimeRequest updateShowtimeRequest) {
        showtimeService.updateShowtime(id, updateShowtimeRequest);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

    @PutMapping(path="{showtimeId}/{seatNumber}")
    public ResponseEntity<Void> changeSeatStatus(@PathVariable("showtimeId") Long showtimeId,
                                                 @PathVariable("seatNumber") int seatNumber,
                                                 @RequestBody SeatStatus seatStatus)
    {
        showtimeService.changeSeatStatus(showtimeId,seatNumber,seatStatus);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

    @GetMapping(path="/all/{localDate}")
    public ResponseEntity<List<Showtime>> getShowtimeByDate(@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate localDate)
    {
        return new ResponseEntity<>(showtimeService.getShowtimeByDate(localDate) , HttpStatus.OK);
    }

}
