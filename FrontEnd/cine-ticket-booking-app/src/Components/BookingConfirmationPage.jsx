// components/addmovie.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LoadingButton from './LoadingButton';
import GoogleLogin from './GoogleLogin';
import {FaEyeSlash, FaEye} from 'react-icons/fa';
import GoogleLoginButton from './GoogleLogin';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faAngleLeft} from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';




import './Style/BookingConfirmationPage.css'; // Import the external CSS file

const BookingConfirmationPage = () => {
  const location=useLocation();
  const booking=location.state;
  const navigate=useNavigate();
    
  return (
    <div className="w-500 booking-container">
        <h1>
            Your Booking has been confirmed
        </h1>
        The details of your booking have been sent in your email along with a pdf file.<i className='warning'>The pdf file is necessary to enter in the cinema.</i> <br/>
        
        <div className='bookings-details'>
            Name: {booking.firstName} {booking.lastName}<br/><br/>
            Movie: {booking.showtime.movie.name}<br/><br/>
            Time: {booking.showtime.startTime}<br/><br/>
            Room: {booking.showtime.room.id}<br/><br/>
            Seat: {booking.seat}<br/><br/>
            <a className='warning'>
            Please, note that your reservation is valid until 30 minutes before the start of the movie
            </a>
        <div className="backButton" onClick={()=>{
            navigate('/movies')}}>
                    <FontAwesomeIcon icon={faAngleLeft} /> Return to Movies
                </div>
        </div>
    </div>
  );
};

export default BookingConfirmationPage;