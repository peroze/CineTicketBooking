// components/Movies.js
import React from 'react';
import { Link } from 'react-router-dom';
import MovieCard from './MovieCard.jsx';
import styles from"./Style/Movies.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route,Header } from "react-router-dom";
import MoviePage from './MoviePage.jsx';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlus} from'@fortawesome/free-solid-svg-icons'

const Movies = () => {
  const navigate=useNavigate();
  const movies=[{id:2,name:"The Avengers"},{id:3,name:"Mission: Impossible Fallout"},{id:1,name:"The Avengers: Age of Ultron"}]
  return (
    <div>
          <div className="movie-header">
          <h1>Movies</h1>
          <div className='add-movie-button' onClick={()=>{navigate("/add-movie")}}>
            <a>
              <FontAwesomeIcon icon={faPlus} style={{color: "#ffffff",}} />
            </a>

          </div>
          </div>
         <div className='d-flex flex-row flex-wrap align-items-center justify-content-center gap-2' >
         {movies.map(movie => (
            <div className="cards"onClick={()=>{
            navigate('/movie',{state:movie.id})
            }}>
              <MovieCard  name={movie.name} id={movie.id}></MovieCard>
            </div>
            ))}
            <div className="cards" onClick={()=>{
                navigate('/movie',{state:1})
            }}><MovieCard name={'The Avengers 2'} id={1}/></div>
            <div className="cards"onClick={()=>{
                navigate('/movie',{state:2})
            }}><MovieCard name={'The Avengers'} id={2}/></div>
            <div className="cards"onClick={()=>{
                navigate('/movie',{state:3})
            }}><MovieCard name={'Mission: Impossible Fallout'} id={3}/> </div>
        </div>

      
  </div>
    

  );
};

export default Movies;