// components/addshowtime.js
import React, { useState,useEffect } from 'react';
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
import showtimeService from '../services/showtime.service';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import './Style/AddShowTime.css'; // Import the external CSS file
import roomService from '../services/room.service';


const AddShowTime = () => {
const navigate=useNavigate();
const location=useLocation();
const movie = location.state;
const [startDate,setstartdate]=useState("")
const [endDate,setenddate]=useState("")
const [room,setroom]=useState(1)
const [rooms, setRooms] = useState([])
const [isLoading, setisLoading] = useState(true);



  const handleSubmit =(e) => {
    
  };

   const change = (e) => {
    setroom (e.target.value);
   }

   useEffect(() => {
    if(isLoading==(true)) {
      roomService.getAllRooms()
      .then( (response) => {
        var data=response
        setRooms(data)
        setisLoading(false)
        console.log(data);
      })
      .catch(function (error) {
        console.log("Error getting all Rooms: ",error);
      })
    }
},[isLoading])

   
  

   const handleInputChange = (e) => {
    
    const { name, value } = e.target;
    if (name === 'startdate') {
      setstartdate(value);
    } else if (name === 'enddate') {
      setenddate(value);
    } else if (name === 'room') {
      setroom(value);
    }
    
  }; 

  const handleButtonClick = () => {
    console.log(movie.id,startDate,endDate);
    showtimeService.addShowtimes(movie.id,startDate,endDate,room)
    .then((response) => {
      console.log(response.data);
      toast.info("The showtimes have been created succesfully");
      navigate('/movies');


  })
  .catch(error => {
      console.log(error);
  })
  };


  return (
    <Container fluid className="addshowtime-page w-500 align-items-center justify-content-center">
      <Row className="addshowtime-row text-center d-flex w-500 align-items-center justify-content-center">
        <Col sm={12} lg={12} md={12} className="addshowtime-card-col d-flex align-items-center justify-content-center">
          <Card className= "addshowtime-card my-sm-3 my-md-4 flex-wrap">
            <Card.Body className="p-sm-3 p-md-4">
            <Row>
                <Col className="text-center mb-1">
                  <h1>Add ShowTimes</h1>
                </Col>
              </Row>
              <Row>
                <Form className="p-4 p-sm-0" id="addshowtime-form">

                            
                    <Form.Group className="mb-3 w-100" controlId="formDuration" >
                        <Form.Label>Room</Form.Label>
                        <InputGroup className="mb-3">
                        <select id="rooms" name="roomlist" form="add-movie-form" onChange={change} value={room}>
                        {rooms.map((object, i) =>
                              <option value={object.id}> {object.name} </option>)}
                        </select>
                        </InputGroup>

                    </Form.Group>
            
                    <Form.Group className="mb-3 w-100" controlId="formStartDate" >
                        <Form.Label>StartDate</Form.Label>
                        <InputGroup className="mb-3">
                            <Form.Control
                            type="date"
                            className="custom-fields" 
                            placeholder="Starting Date"
                            name="startdate"
                            value={startDate}
                            onChange={handleInputChange}
                            />
                        </InputGroup>

                    </Form.Group>

                    <Form.Group className="mb-3 w-100" controlId="formEndDate" >
                        <Form.Label>EndDate</Form.Label>
                        <InputGroup className="mb-3">
                            <Form.Control
                            type="date"
                            className="custom-fields" 
                            placeholder="Ending Date"
                            name="enddate"
                            value={endDate}
                            onChange={handleInputChange}
                            />
                        </InputGroup>

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
  );
};

export default AddShowTime;