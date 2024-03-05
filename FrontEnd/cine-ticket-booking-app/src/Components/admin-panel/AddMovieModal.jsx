import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useState,useEffect } from 'react';
import DatePicker from "react-datepicker";
import MovieService from "../../services/movie.service.js";

import "react-datepicker/dist/react-datepicker.css";


const AddMovieModal = ({ showModal, closeModal,handleReload}) => {

    const [currentTitle, setCurrentTitle] = useState();
    const [currentGenre, setCurrentGenre] = useState();
    const [currentDuration, setCurrentDuration] = useState();
    const [currentDescription, setCurrentDescription] = useState();
    const [currentDirector, setCurrentDirector] = useState();
    const [currentActors, setCurrentActors] = useState();
    const [currentRating, setCurrentRating] = useState();
    const [currentReleaseDate, setCurrentReleaseDate] = useState();
    const [currentLanguage, setCurrentLanguage] = useState();



    const handleSubmit = () =>{
        console.log("Submit was pressed");
        MovieService.addMovie(currentTitle,currentGenre,currentDuration,currentReleaseDate,currentDescription,
                                currentDirector,currentActors,currentRating,currentLanguage)
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


    return (
        <Modal 
            show={showModal} 
            onHide={closeModal}
            backdrop="static" 
            centered
            
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add Movie
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Movie Info</h4>
                <div>
                    <Form onSubmit={handleSubmit}>
                        
                        
                        <Form.Group className="w-100">

                        
                            <Form.Label>Title</Form.Label>
                            <Form.Control 
                                type="text" 
                                onChange={(e) => setCurrentTitle(e.target.value)} 

                            />
                            
                            
                            <Form.Label>Genre</Form.Label>
                            <Form.Control 
                                type="text"  
                                onChange={(e) => setCurrentGenre(e.target.value)}
                            />

                            <Form.Label>Duration (in minutes)</Form.Label>
                            <Form.Control 
                                type="number"  
                                onChange={(e) => setCurrentDuration(e.target.value)}
                            />

                            <Form.Label >Release Date</Form.Label>
                            <Form.Control 
                                type="date"  
                                onChange={(e) => setCurrentReleaseDate(e.target.value)}
                            />

                            <Form.Label>Description</Form.Label>
                            <Form.Control 
                                type="textarea"  
                                onChange={(e) => setCurrentDescription(e.target.value)}
                            />

                            <Form.Label>Director</Form.Label>
                            <Form.Control 
                                type="text"  
                                onChange={(e) => setCurrentDirector(e.target.value)}
                            />

                            <Form.Label>Actors</Form.Label>
                            <Form.Control 
                                type="text"                              
                                onChange={(e) => setCurrentActors(e.target.value)}
                            />

                            <Form.Label>Rating</Form.Label>
                            <Form.Control 
                                type="text"                                 
                                onChange={(e) => setCurrentRating(e.target.value)}
                            />

                            <Form.Label>Language</Form.Label>
                            <Form.Control 
                                type="text"                                 
                                onChange={(e) => setCurrentLanguage(e.target.value)}
                            />

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

export default AddMovieModal;