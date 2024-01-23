package com.unipi.CineTicketBooking.service;

import com.unipi.CineTicketBooking.model.Movie;
import com.unipi.CineTicketBooking.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MovieService {

    private final MovieRepository movieRepository;

    @Autowired
    public MovieService(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    public List<Movie> getMovies() { return movieRepository.findAll();
    }


}
