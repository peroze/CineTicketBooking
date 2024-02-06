package com.unipi.CineTicketBooking.service;

import com.unipi.CineTicketBooking.model.Movie;
import com.unipi.CineTicketBooking.repository.MovieRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MovieService {

    private final MovieRepository movieRepository;

    @Autowired
    public MovieService(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    public List<Movie> getMovies() { return movieRepository.findAll();
    }

    public Optional<Movie>getMoviebyid(Long id) {
        return movieRepository.findById(id);
    }


    public void addNewMovie(Movie movie) {
        Optional<Movie> movieOptional = movieRepository.findMovieByName(movie.getName());
        if(movieOptional.isPresent()){
            throw new IllegalStateException("name already in list");
        }
        movieRepository.save(movie);
    }


    public void deleteMovie(String name) {
        boolean exists = movieRepository.existsByName(name);
        if(!exists){
            throw new IllegalStateException("Movie with name "+name+" does not exists");
        }
        movieRepository.deleteByName(name);
    }

    @Transactional
    public void updateMovie(String movieName, Movie newMovie) {
        Movie movie = movieRepository.findMovieByName(movieName).orElseThrow(() -> new IllegalStateException(
                "movie with name "+movieName+ " does not exist"
        ));

        if(newMovie.getGenre() != null && !newMovie.getGenre().isBlank()){
            movie.setGenre(newMovie.getGenre());
        }
        if (newMovie.getDuration() != null && newMovie.getDuration() > 0) {
            movie.setDuration(newMovie.getDuration());
        }
        if (newMovie.getReleaseDate() != null) {
            movie.setReleaseDate(newMovie.getReleaseDate());
        }
        if (newMovie.getDescription() != null && !newMovie.getDescription().isBlank()) {
            movie.setDescription(newMovie.getDescription());
        }
        if (newMovie.getDirector() != null && !newMovie.getDirector().isBlank()) {
            movie.setDirector(newMovie.getDirector());
        }
        if (newMovie.getActors() != null && !newMovie.getActors().isEmpty()) {
            movie.setActors(newMovie.getActors());
        }
        if (newMovie.getRating() != null && !newMovie.getRating().isBlank()) {
            movie.setRating(newMovie.getRating());
        }
        if (newMovie.getLanguage() != null && !newMovie.getLanguage().isBlank()) {
            movie.setLanguage(newMovie.getLanguage());
        }


    }

    public List<Movie> getMovieList()
    {
        return movieRepository.getMovieList();
    }
}
