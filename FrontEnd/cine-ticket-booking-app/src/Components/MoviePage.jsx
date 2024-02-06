import React, { useState } from 'react';
import { Movie } from './Models/Movie';
import styles from"./Style/MoviePage.css";
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faAngleLeft} from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



const MoviePage = () => {
    const location=useLocation();
    const id=location.state;
    const naviagte=useNavigate();
    var movie

    axios({
        method: 'get',
        url: 'http://localhost:8080/api/movies/',
        params: {
            id: String(id)
        }
    })
    .then(function (response) {
        console.log(response.data);
        
        
    })
    .catch(function (error) {
        console.log(error);
    });


    if(id==1){
         movie=new Movie("The Avengers: Age of Ultron",1,"Superhero Movie",120,"04/02/2024","Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.","Josh Wedon",["Robert Downey Junior","Scarlett Johansson","Chris Evans"],"PG-13");
    }
    else if(id==2){
         movie=new Movie("The Avengers",2,"Superhero Movie",120,"04/02/2024","Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.","Josh Wedon",["Robert Downey Junior","Scarlett Johansson","Chris Evans"],"PG-13");
    }
    else if(id==3){
         movie=new Movie("Mission: Impossible Fallout",3,"Action Movie",120,"04/02/2024","Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.","Josh Wedon",["Tom Cruise","Rebecca Ferguson","Simmon Pegg"],"PG-13");
    }
    else{
         movie=new Movie("The Avengers: Age of Ultron",1,"Superhero Movie",120,"04/02/2024","Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.","Josh Wedon",["Robert Downey Junior","Scarlett Johansson","Chris Evans"],"PG-13");
    }
    return (
        <div className='movie  d-flex flex-column gap-3'>
            <div className="movieheader">
                <div className="backButton" onClick={()=>{
            naviagte('/movies')}}>
                    <FontAwesomeIcon icon={faAngleLeft} /> Return to Movies
                </div>
                <h1>{movie.name}</h1>
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
                <button className="bookButton " role="button"><span className="text">Book Your Ticket </span></button>
            </div>

        </div>
    )

}

export default MoviePage;