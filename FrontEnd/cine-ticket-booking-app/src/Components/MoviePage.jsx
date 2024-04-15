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
    const [checker,setChecker]=useState(true);
    const id=location.state;
    const navigate=useNavigate();
    const [isLoading, setLoading] = useState(true);
    const [movie, setMovie] = useState();
    useEffect(() => {
        if (checker==true){
          axios.get("http://localhost:8080/api/movies/movie/"+id).then(response => {
          var movietemp=  new Movie(response.data.name,response.data.id,response.data.genre,response.data.duration,response.data.releaseDate,response.data.description,response.data.director,response.data.actors,response.data.rating); 
          setMovie(movietemp);
          setLoading(false);
        });
        setChecker(false);
    }
      }, [checker]);
    
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
                    <div className='duration fields'><i className="field">Duration</i> :{movie.duration} minutes</div>
                    <div className='genre fields'><i className="field">Genre</i> : {movie.genre}</div>
                    <div className='realeasedate fields'><i className="field">Release Date</i> : {movie.releaseDate}</div>
                    <div className='rating fields'><i className="field">Rating</i> : {movie.rating}</div>
                    <div className='actors fields'><i className="field">Actors</i> : {movie.actors}</div>
                </div>
            </div>
            <div className="discription fields">{movie.description}</div>

            <div className='d-flex  align-items-start justify-content-center' >  
                <button onClick={()=>{
            navigate('/calendar', {state:movie}) }} className="bookButton " role="button"><span className="text">Book Your Ticket </span></button>
            </div>

        </div>
    )

}

export default MoviePage;