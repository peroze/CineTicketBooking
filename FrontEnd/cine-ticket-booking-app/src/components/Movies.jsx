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
import { useContext } from 'react';
import { UserContext } from '../App.js';
import { useState } from 'react';
import { useEffect } from 'react';
import movieService from '../services/movie.service.js';



const Movies = () => {
  const [isLoading, setisLoading] = useState(true);
  const navigate=useNavigate();
  const {isLoggedIn, setIsLoggedIn} = useContext(UserContext);
  const [adminStatus, setAdminStatus] = useState(false);
  const {user, setUser} = useContext(UserContext);
  const [movies,setMovies]=useState([]);
  //const {movies,setMovies}=useEffect("")


  const isAdmin = (user) => {
    const authority = user.authorities[0]?.authority;
    if(authority === "ADMIN" ){
      return true;
    }
    return false;
  }

  useEffect(() => {
    // This code will run whenever isLoggedIn changes its value
    if (isLoggedIn) {
      // Call isAdmin when user is logged in
      console.log("Is the user logged in? ",isLoggedIn);
      setAdminStatus(isAdmin(user));
    }
    if(isLoading){
      //setMovies([]);
      movieService.getAllMovies().then((response)=>{
        const list=response;
        console.log(response.length);
        for (let i = 0; i < list.length; i++){
          if((movies.length<list.length)){
            movies.push({id:list[i].id,name:list[i].name})
          }
        }
        setisLoading(false);
      })
    }
  }, [user,isLoading]);
  //var movies=[];
   
   //setMovies([{id:2,name:"The Avengers"},{id:3,name:"Mission: Impossible Fallout"},{id:1,name:"The Avengers: Age of Ultron"}]);
  if (isLoading) {
    return <div className="App">Loading...</div>;
  }
  return (
    <div className="movie-outer-container">
          <div className="movie-header">
          <h1>Movies</h1>
          {isLoggedIn && adminStatus && (
          <div className='add-movie-button' onClick={()=>{navigate("/addmovie")}}>
            <a>
              <FontAwesomeIcon icon={faPlus} style={{color: "#ffffff",}} />
            </a>

          </div>)}
          </div>
         <div className='d-flex flex-row flex-wrap align-items-center justify-content-center gap-2' >
         {movies.map((movie) => (

            <div className="cards" onClick={()=>{
            navigate('/movie',{state:movie.id})
            }}>
              <MovieCard  name={movie.name} id={movie.id}></MovieCard>
            </div>
            ))}
        </div>

      
  </div>
    

  );
};

export default Movies;