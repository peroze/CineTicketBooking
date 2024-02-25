
import './App.css';
import Home from './Components/Home.jsx';
import Login from './Components/Login.jsx';
import Movies from './Components/Movies.jsx';
import About from './Components/About.jsx';
import Signup from './Components/Signup.jsx';
import Footer from './Components/Footer.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import logo from './logo.svg';
import './App.css';
import { GoogleOAuthProvider} from '@react-oauth/google';
import {GoogleLogin} from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode';
import Menubar from './Components/MenuBar.jsx';
import MovieCard from './Components/MovieCard.jsx' 
import { Link } from 'react-router-dom';
import { useState } from 'react';
import MoviePage from './Components/MoviePage.jsx';
import ContactUs from './Components/ContactUs.jsx';
import CalendarPage from './Components/CalendarPage.jsx';
import BookingPage from './Components/BookingPage.jsx';

function App() {

  const [usericon,setUsericon]=useState("https://ik.imagekit.io/cineticketbooking/Users/konper.jpeg")
  const [username,setUsername]=useState("Konper98");
  return (
    <div className="App p-1" >

      
  
      <div className="content-container">
        <Router>
        <header className="sticky-header">
          <Menubar  icon={usericon} user={username}/>
        </header>
          <Routes> 
              <Route path="/login" element={<Login />} />
              <Route exact path="/" element={<Home />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/about" element={<About />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/contactus" element={<ContactUs />} />
              <Route path="/movie" element={<MoviePage/>}></Route>
              <Route path="/calendar" element={<CalendarPage/>}></Route>
              <Route path="/booking" element={<BookingPage/>}></Route>
          </Routes>
          <Footer></Footer>
        </Router>
        
      </div>
      
      
      
    </div>
  );
}

export default App;

