// components/Movies.js
import React from 'react';
import { Link } from 'react-router-dom';
import MovieCard from './MovieCard.jsx';
import styles from"./Style/Movies.css";


const Movies = () => {
  return (
    <div>
      <h1>Movies</h1>
      <div className='d-flex flex-row flex-wrap align-items-center justify-content-center' >
          <MovieCard name={'The Avengers'} id={2}/>
          <MovieCard name={'Mission: Impossible Fallout'} id={3}/>
          <MovieCard name={'The Avengers 2'} id={1}/>
          <MovieCard name={'The Avengers 2'} id={1}/>
          <MovieCard name={'The Avengers'} id={2}/>
          <MovieCard name={'Mission: Impossible Fallout'} id={3}/>
          
  </div>
  </div>
    

  );
};

export default Movies;