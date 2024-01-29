package com.unipi.CineTicketBooking.controller;

import com.unipi.CineTicketBooking.model.Movie;
import com.unipi.CineTicketBooking.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(path = "api/movies")
public class MovieController {

    private final MovieService movieService;

    @Autowired
    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    @GetMapping(path = "getAllMovies")
    public ResponseEntity<List<Movie>> getMovies() {
        List<Movie> movies = movieService.getMovies();
        return new ResponseEntity<>(movies, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Void> addNewMovie(@RequestBody Movie movie) {
        movieService.addNewMovie(movie);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping(path = "{movieName}")
    public ResponseEntity<Void> deleteMovie(@PathVariable("movieName") String name) {
        movieService.deleteMovie(name);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping(path = "{movieName}")
    public ResponseEntity<Void> updateMovie(@PathVariable("movieName") String name, @RequestBody Movie newMovie) {
        movieService.updateMovie(name, newMovie);
        return new ResponseEntity<>(HttpStatus.OK);
    }


}
