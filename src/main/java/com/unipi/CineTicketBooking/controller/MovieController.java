package com.unipi.CineTicketBooking.controller;

import com.unipi.CineTicketBooking.model.Movie;
import com.unipi.CineTicketBooking.model.secondary.MovieListObject;
import com.unipi.CineTicketBooking.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
    @GetMapping(path = "movie/{id}")
    public ResponseEntity<Optional <Movie>> getMoviebyid(@PathVariable("id") Long id ){
        return new ResponseEntity<> (movieService.getMoviebyid(id), HttpStatus.OK);
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

    @GetMapping(path = "movieList")
    public ResponseEntity<ArrayList<MovieListObject>> getMovieList(){
    List<Movie> temp = movieService.getMovieList();
    ArrayList<MovieListObject> movies=new ArrayList<>();
    for (int i=0; i<temp.size(); i++)
    {
        MovieListObject obj = new MovieListObject(temp.get(i).getId(), temp.get(i).getName());
        movies.add(obj);
    }
    return new ResponseEntity<>(movies, HttpStatus.OK);
    }


}
