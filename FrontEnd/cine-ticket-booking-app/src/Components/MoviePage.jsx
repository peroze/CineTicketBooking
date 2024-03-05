import React, { useState } from 'react';
import { Movie } from './Models/Movie';
import styles from"./Style/MoviePage.css";
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faAngleLeft} from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import { ShowTime } from './Models/ShowTime';



const MoviePage = () => {
    const location=useLocation();
    const id=location.state;
    const navigate=useNavigate();
    const [isLoading, setLoading] = useState(true);
    const [movie, setMovie] = useState();
    useEffect(() => {
        axios.get("http://localhost:8080/api/movies/movie/"+id).then(response => {
          var movietemp=  new Movie(response.data.name,response.data.id,response.data.genre,response.data.duration,response.data.releaseDate,"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",response.data.director,["Robert Downey Junior","Scarlett Johansson","Chris Evans"],response.data.rating); 
          setMovie(movietemp);
          setLoading(false);
        });
      }, []);
    
      if (isLoading) {
        return <div className="App">Loading...</div>;
      }
        return (
        <div className='movie  d-flex flex-column gap-3'>
            <div className="movieheader">
                <div className="backButton" onClick={()=>{
            navigate('/movies')}}>
                    <FontAwesomeIcon icon={faAngleLeft} /> Return to Movies
                </div>
                <h1>{movie.moviename}</h1>
                </div>
            
            <div className='movietop d-flex flex-wrap flex-row gap-3'>
                <img src={movie.photo}/>
                <div className="chars gap-1 d-flex flex-column  align-items-start justify-content-center">
                    <div className='director fields'><i className="field">Director</i> : {movie.director}</div>
                    <div className='duration fields'><i className="field">Duration</i> :{movie.duration}</div>
                    <div className='genre fields'><i className="field">Genre</i> : {movie.genre}</div>
                    <div className='realeasedate fields'><i className="field">Release Date</i> : {movie.releaseDate}</div>
                    <div className='rating fields'><i className="field">Rating</i> : {movie.rating}</div>
                    <div className='actors fields'><i className="field">Actors</i> : {movie.actors}</div>
                </div>
            </div>
            <div className="discription fields">{movie.description}</div>

            <div className='d-flex  align-items-start justify-content-center' >  
                <button onClick={()=>{
            // navigate('/booking',{state:new ShowTime("25/02/2024, 15:25", "25/02/2024, 18:05", movie.moviename, [9, 41, 35, 11, 65, 26])})
            navigate('/calendar', {state:movie}) }} className="bookButton " role="button"><span className="text">Book Your Ticket </span></button>
            </div>

        </div>
    )

}

export default MoviePage;