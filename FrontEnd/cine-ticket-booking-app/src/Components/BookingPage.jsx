// components/booking.js
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
import styles from"./Style/BookingPage.css";
import clsx from 'clsx'
import { useLocation } from 'react-router-dom';



const BookingPage = () => {
const occupied = [9, 41, 35, 11, 65, 26];
const seats = Array.from({ length: 8 * 8 }, (_, i) => i);


/* const movie = {
    name: 'Joker',
    occupied: [9, 41, 35, 11, 65, 26],
  } */

  const location=useLocation();
  const movie = location.state;
  

  const [email, setEmail] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [seat,setseat]=useState("");
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSubmit =(e) => {

  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);      
    } else if (name === 'firstName') {
      setfirstName(value);
    } else if (name === 'lastName') {
      setlastName(value);
    } else if (name === 'number of seat') {
      setseat(value);
    }
    
  };

  const handleButtonClick = () => {
    //onClick logic here
  };
  
  return (
    <div className="outsidecontainter">
        <h1>
            Booking Details for {movie.name}
        </h1>


    <div className='outside-booking-container'>
    <div className="cinemaoutside">
        <Cinema movie = {movie} selectedSeats={selectedSeats}
        onSelectedSeatsChange={selectedSeats => setSelectedSeats(selectedSeats)}>
    
        </Cinema>
    </div>
   <div className="formoutside">

   <Container fluid className="booking-page align-items-center justify-content-center">
      <Row className="booking-row text-center d-flex w-100 align-items-center justify-content-center">
        <Col sm={12} lg={12} md={12} className="booking-card-col d-flex align-items-center justify-content-center">
          <Card className= "booking-card my-sm-3 my-md-4 flex-wrap">
            <Card.Body className="p-sm-3 p-md-4">
              <Row>

                <Form className="p-4 p-sm-0" id="booking-form">

                  <Form.Group className="mb-3" controlId="formFullName" >
                    <Form.Label>Full Name</Form.Label>
                    <InputGroup className="mb-3">
                      <Form.Control 
                        type="text"
                        className="custom-fields" 
                        placeholder="First Name" 
                        name="firstName"
                        value={firstName}
                        onChange={handleInputChange}                                                    
                      />
                      <Form.Control 
                        type="text"
                        className="custom-fields" 
                        placeholder="Last Name" 
                        name="lastName"
                        value={lastName}
                        onChange={handleInputChange}                                                    
                      />
                        
                    </InputGroup>

                  </Form.Group>


                    <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                        <Form.Control 
                            type="email"
                            className="custom-fields" 
                            placeholder="Enter email" 
                            name="email"
                            value={email}
                            onChange={handleInputChange}                                                    
                        />
                    </Form.Group>

                    <LoadingButton
                        name="Submit"    
                        loadingText="Submitting..."
                        onClick={handleButtonClick}                                                  
                    />

                </Form>
                
              </Row>
            </Card.Body>
          </Card>









        </Col>
      </Row>
    </Container>

   </div>
    </div>
    </div>
  );
  function Cinema({ movie, selectedSeats, onSelectedSeatsChange }) {
    function handleSelectedState(seat) {
      const isSelected = selectedSeats.includes(seat)
      if (isSelected) {
        onSelectedSeatsChange(
          selectedSeats.filter(selectedSeat => selectedSeat !== seat),
        )
      } else {
        onSelectedSeatsChange([...selectedSeats, seat])
      }
    }
  
    return (
      <div className="Cinema">
        <div className="screen" />
  
        <div className="seats">
          {seats.map(seat => {
            const isSelected = selectedSeats.includes(seat)
            const isOccupied = movie.occupied.includes(seat)
            return (
              <span
                tabIndex="0"
                key={seat}
                className={clsx(
                  'seat',
                  isSelected && 'selected',
                  isOccupied && 'occupied',
                )}
                onClick={isOccupied ? null : () => handleSelectedState(seat)}
                onKeyPress={
                  isOccupied
                    ? null
                    : e => {
                        if (e.key === 'Enter') {
                          handleSelectedState(seat)
                        }
                      }
                }
              />
            )
          })}
        </div>
      </div>
    )
    }
};

export default BookingPage;