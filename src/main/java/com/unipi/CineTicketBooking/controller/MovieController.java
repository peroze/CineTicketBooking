package com.unipi.CineTicketBooking.controller;

import com.unipi.CineTicketBooking.model.Movie;
import com.unipi.CineTicketBooking.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping(path = "api/movies")
public class MovieController {

    private final MovieService movieService;

    @Autowired
    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    @GetMapping(path = "getAllMovies")
    public List<Movie> getMovies(){
        return movieService.getMovies();
    }

    @PostMapping
    public void addNewMovie(@RequestBody Movie movie){
        movieService.addNewMovie(movie);
    }

    @DeleteMapping(path = "{movieName}")
    public void deleteMovie(@PathVariable("movieName") String name){
        movieService.deleteMovie(name);
    }

    @PutMapping(path = "{movieName}")
    public void updateMovie(@PathVariable("movieName") String name, @RequestBody Movie newMovie) {
        movieService.updateMovie(name, newMovie);
    }


}
