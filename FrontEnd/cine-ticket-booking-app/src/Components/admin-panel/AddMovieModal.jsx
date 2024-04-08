import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useState,useEffect } from 'react';
import DatePicker from "react-datepicker";
import MovieService from "../../services/movie.service.js";
import {uploadMovie} from "../../services/imagekit.service.js";
import { useNavigate } from 'react-router-dom';

import "react-datepicker/dist/react-datepicker.css";


const AddMovieModal = ({ showModal, closeModal,handleReload}) => {

    
    const navigate=useNavigate();
    const [currentTitle, setCurrentTitle] = useState();
    const [currentGenre, setCurrentGenre] = useState();
    const [currentDuration, setCurrentDuration] = useState();
    const [currentDescription, setCurrentDescription] = useState();
    const [currentDirector, setCurrentDirector] = useState();
    const [currentActors, setCurrentActors] = useState();
    const [currentRating, setCurrentRating] = useState();
    const [currentReleaseDate, setCurrentReleaseDate] = useState();
    const [currentLanguage, setCurrentLanguage] = useState();
    const [photo,setPhoto]=useState("")



    const handleSubmit = () =>{
        var counter=0;
        document.getElementById('title').classList.remove('error');
        document.getElementById('genre').classList.remove('error');
        document.getElementById('duration').classList.remove('error');
        document.getElementById('description').classList.remove('error');
        document.getElementById('actors').classList.remove('error');
        document.getElementById('rating').classList.remove('error');
        document.getElementById('releasedate').classList.remove('error');
        document.getElementById('director').classList.remove('error');
        document.getElementById('language').classList.remove('error');

        if (currentTitle === '') {
            document.getElementById('title').classList.add('error');
            counter++;
          } if (currentGenre === '') {
            document.getElementById('genre').classList.add('error');
            counter++;
          } if (currentReleaseDate === '') {
            document.getElementById('releasedate').classList.add('error');
            counter++;
          } if (currentRating === '') {
            document.getElementById('rating').classList.add('error');
            counter++;
          } if (currentDescription === '') {
            document.getElementById('description').classList.add('error');
            counter++;
          } if (currentActors === '') {
            document.getElementById('actors').classList.add('error');
            counter++;
          } if (currentDuration === '') {
            document.getElementById('duration').classList.add('error');
            counter++;
          } if (currentLanguage === '') {
            document.getElementById('language').classList.add('error');
            counter++;
          } 
          if(photo ===''){
            counter++;
          }
          if(counter==0){
            MovieService.addMovie(currentTitle,currentGenre,currentDuration,currentReleaseDate,currentDescription,
                currentDirector,currentActors,currentRating,currentLanguage)
                .then((response) => {
                  console.log(response.id);
                  uploadMovie(response.id,photo);
                  navigate('/add-show-time',{state:response});
                })
                .catch(error => {
                console.log(error);
              }) 
              .finally( () => {
                closeModal();
                handleReload();
            })
        }
        
    }

    const handleInputChange = (e) => {
        setPhoto(e.target.files[0]);

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
                                id = "title"
                                type="text" 
                                onChange={(e) => setCurrentTitle(e.target.value)} 
                            />
                            
                            
                            <Form.Label>Genre</Form.Label>
                            <Form.Control
                                id = "genre"
                                type="text"  
                                onChange={(e) => setCurrentGenre(e.target.value)}
                            />

                            <Form.Label>Duration (in minutes)</Form.Label>
                            <Form.Control
                                id = "duration"
                                type="number"  
                                onChange={(e) => setCurrentDuration(e.target.value)}
                            />

                            <Form.Label >Release Date</Form.Label>
                            <Form.Control
                                id = "releasedate"
                                type="date"  
                                onChange={(e) => setCurrentReleaseDate(e.target.value)}
                            />

                            <Form.Label>Description</Form.Label>
                            <Form.Control 
                                id = "description"
                                type="textarea"  
                                onChange={(e) => setCurrentDescription(e.target.value)}
                            />

                            <Form.Label>Director</Form.Label>
                            <Form.Control
                                id = "director"
                                type="text"  
                                onChange={(e) => setCurrentDirector(e.target.value)}
                            />

                            <Form.Label>Actors</Form.Label>
                            <Form.Control
                                id = "actors"
                                type="text"                              
                                onChange={(e) => setCurrentActors(e.target.value)}
                            />

                            <Form.Label>Rating</Form.Label>
                            <Form.Control
                                id = "rating"
                                type="text"                                 
                                onChange={(e) => setCurrentRating(e.target.value)}
                            />

                            <Form.Label>Language</Form.Label>
                            <Form.Control
                                id = "language"
                                type="text"                                 
                                onChange={(e) => setCurrentLanguage(e.target.value)}
                            />

                        </Form.Group>

                        <Form.Group controlId="formImage" className="mb-4">
                      <Form.Label>Movie Picture</Form.Label>
                      <Form.Control 
                        type="file" 
                        accept=".png, .jpeg, .jpg"
                        className="custom-fields"
                        onChange={handleInputChange}
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