package com.unipi.CineTicketBooking.controller;

import com.google.gson.Gson;
import com.unipi.CineTicketBooking.exception.NoEntryWithIdException;
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
        try {
            List<Movie> movies = movieService.getMovies();
            return new ResponseEntity<>(movies, HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping(path = "movie/{id}")
    public ResponseEntity<Optional <Movie>> getMoviebyid(@PathVariable("id") Long id ){
        try {
            return new ResponseEntity<>(movieService.getMoviebyid(id), HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping
    public ResponseEntity<Movie> addNewMovie(@RequestBody Movie movie) {
        try {
            Movie addedmovie=movieService.addNewMovie(movie);
            return new ResponseEntity<>(addedmovie,HttpStatus.CREATED);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping(path = "{movieName}")
    public ResponseEntity<String> deleteMovie(@PathVariable("movieName") String name) {
        try {
            movieService.deleteMovie(name);
            return new ResponseEntity<>("Succesfully Deleted Movie",HttpStatus.NO_CONTENT);
        }catch (NoEntryWithIdException e){
            e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(),e.getHttpStatus());
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping(path ="/delete/{id}")
    public ResponseEntity<String> deleteMovieById(@PathVariable("id") Long id){
        try {
            movieService.deleteMovieById(id);
            return new ResponseEntity<>("Successfully Deleted Movie ",HttpStatus.OK);
        }catch (NoEntryWithIdException e){
            e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(),e.getHttpStatus());
        }
    }



    @PutMapping(path = "{movieName}")
    public ResponseEntity<String> updateMovie(@PathVariable("movieName") String name, @RequestBody Movie newMovie) {
        try {
            movieService.updateMovie(name, newMovie);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (NoEntryWithIdException e){
            e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(),e.getHttpStatus());
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping(path = "/update/{id}")
    public ResponseEntity<String> updateMovie(@PathVariable("id") Long id, @RequestBody Movie newMovie) {
        try {
            movieService.updateMovieById(id, newMovie);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (NoEntryWithIdException e){
            e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(),e.getHttpStatus());
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(path = "movieList")
    public ResponseEntity<String> getMovieList(){
        Gson gson = new Gson();
        System.out.println("Inside MovieController before service");
        List<MovieListObject> temp = movieService.getMovieList();
        System.out.println("Inside MovieController after service");
        String movieList = gson.toJson(temp);

        return new ResponseEntity<>(movieList, HttpStatus.OK);
    }




}
