import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useState,useEffect } from 'react';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import MovieService from "../../services/movie.service.js";


const EditMovieModal = ({ movie, showModal, closeModal,handleReload}) => {

    const [currentTitle, setCurrentTitle] = useState(movie.name);
    const [currentGenre, setCurrentGenre] = useState(movie.genre);
    const [currentDuration, setCurrentDuration] = useState(movie.duration);
    const [currentDescription, setCurrentDescription] = useState(movie.description);
    const [currentDirector, setCurrentDirector] = useState(movie.director);
    const [currentActors, setCurrentActors] = useState(movie.actors);
    const [currentRating, setCurrentRating] = useState(movie.rating);
    const [currentReleaseDate, setCurrentReleaseDate] = useState(movie.releaseDate);
    const [currentLanguage, setCurrentLanguage] = useState(movie.language);

    const applyChanges = () =>{
        MovieService.editMovie(movie.id,currentGenre,currentDuration,currentReleaseDate,currentDescription
            ,currentDirector,currentActors,currentRating,currentLanguage)
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
                    Edit Movie
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Movie Info</h4>
                <div>
                    <Form>
                        
                        
                        <Form.Group className="w-100">

                            <Form.Label>Id</Form.Label>
                            <Form.Control 
                                type="number" 
                                value={movie.id} 
                                disabled
                            />

                            <Form.Label>Title</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={currentTitle} 
                                disabled
                            />
                            
                            
                            <Form.Label>Genre</Form.Label>
                            <Form.Control 
                                type="text"  
                                value={currentGenre}
                                onChange={(e) => setCurrentGenre(e.target.value)}
                            />

                            <Form.Label>Duration (in minutes)</Form.Label>
                            <Form.Control 
                                type="number"  
                                value={currentDuration}
                                onChange={(e) => setCurrentDuration(e.target.value)}
                            />

                            <Form.Label >Release Date</Form.Label>
                            <Form.Control 
                                type="date"  
                                value={currentReleaseDate}
                                onChange={(e) => setCurrentReleaseDate(e.target.value)}
                            />

                            <Form.Label>Description</Form.Label>
                            <Form.Control 
                                type="textarea"  
                                value={currentDescription}
                                onChange={(e) => setCurrentDescription(e.target.value)}
                            />

                            <Form.Label>Director</Form.Label>
                            <Form.Control 
                                type="text"  
                                value={currentDirector}
                                onChange={(e) => setCurrentDirector(e.target.value)}
                            />

                            <Form.Label>Actors</Form.Label>
                            <Form.Control 
                                type="text"  
                                value={currentActors}
                                onChange={(e) => setCurrentActors(e.target.value)}
                            />

                            <Form.Label>Rating</Form.Label>
                            <Form.Control 
                                type="text"  
                                value={currentRating}
                                onChange={(e) => setCurrentRating(e.target.value)}
                            />

                            <Form.Label>Language</Form.Label>
                            <Form.Control 
                                type="text"  
                                value={currentLanguage}
                                onChange={(e) => setCurrentLanguage(e.target.value)}
                            />

                        </Form.Group>
                    
                    </Form>
                    
                </div>
                
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={applyChanges}>Apply Changes</Button>
                <Button onClick={closeModal}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditMovieModal;