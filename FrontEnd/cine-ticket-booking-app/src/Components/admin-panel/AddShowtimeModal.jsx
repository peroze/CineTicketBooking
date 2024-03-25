import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useState,useEffect } from 'react';
import DatePicker from "react-datepicker";
import ShowtimeService from "../../services/showtime.service.js";


import "react-datepicker/dist/react-datepicker.css";


const AddShowtimeModal = ({ showModal, closeModal,handleReload, movieList, roomList}) => {

    const [currentStartTime, setCurrentStartTime] = useState();
    const [currentEndTime, setCurrentEndTime] = useState();
    const [currentTicketPrice,setCurrentTicketPrice] = useState();
    const [roomId, setRoomId] = useState(-1);
    const [movieId, setMovieId] = useState(-1);
    const [isTimeValid, setIsTimeValid] = useState(true);

    const [validated, setValidated] = useState(false);
    


    const handleSubmit = (event) =>{
        
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }
        setValidated(true);
        
        ShowtimeService.addShowtime(roomId,movieId,currentStartTime,currentEndTime,currentTicketPrice)
        .then((response) => {
            console.log(response.data);
        })
        .catch(error => {
            console.log(error);
        })
        .finally( () => {
            closeModal();
            handleReload();
        })
        
    }

    const handleTicketPriceChange = (e) => {
        const value = parseFloat(e.target.value); // Parse input value as a float
        if (!isNaN(value)) {
          setCurrentTicketPrice(value); // Update state with parsed double value
        }
    };

    return (
        <Modal 
            show={showModal} 
            onHide={closeModal}
            backdrop="static" 
            centered
            
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add Showtime
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Showtime Info</h4>
                <div>
                    <Form onSubmit={handleSubmit} noValidate validated={validated}>
                        
                        
                        <Form.Group className="w-100">
                            
                            <Form.Label>Movie</Form.Label>
                            <Form.Select onChange={(e) => setMovieId(e.target.value)}>
                            <option hidden>Select a movie</option>
                                {movieList.map((movie, index) => (
                                    <option 
                                        key={index} 
                                        value={movie.id}
                                    >{movie.name}</option>
                                ))}
                            </Form.Select>

                            <Form.Label>Room</Form.Label>
                            <Form.Select onChange={(e) => setRoomId(e.target.value)}>
                            <option hidden>Select a room</option>
                                {roomList.map((room, index) => (
                                    <option 
                                        key={index} 
                                        value={room.id}
                                    >{room.name}</option>
                                ))}
                            </Form.Select>
                                    
                            <Form.Label>Start Time</Form.Label>
                            <Form.Control 
                                type="datetime-local"  
                                onChange={(e) => setCurrentStartTime(e.target.value)}
                            />
                                                 
                            <Form.Label>End Time</Form.Label>
                            <Form.Control 
                                type="datetime-local"  
                                onChange={(e) => setCurrentEndTime(e.target.value)}
                            />
                            

                            <Form.Label>Ticket Price</Form.Label>
                            <Form.Control 
                                type="number"  
                                onChange={(e) => handleTicketPriceChange(e)}
                                step="0.1"
                                required
                                min="0"
                            />
                            <Form.Control.Feedback type="invalid">
                                Please enter a valid ticket price
                            </Form.Control.Feedback>

                        </Form.Group>
                    
                    </Form>
                    
                </div>
                
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleSubmit}>Submit</Button>
                <Button onClick={closeModal}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddShowtimeModal;