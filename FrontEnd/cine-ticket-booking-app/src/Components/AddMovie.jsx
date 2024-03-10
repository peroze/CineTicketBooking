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
import MovieService from '../services/movie.service';



import './Style/AddMovie.css'; // Import the external CSS file

const AddMovie = () => {
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

  const handleSubmit = (e) => {

  };

   const handleInputChange = (e) => {
    

    const { name, value } = e.target;
    if (name === 'moviename' ) {
      setCurrentTitle(value)
  
    } else if (name === 'genre') {
      setCurrentGenre(value)
    } else if (name === 'duration') {
      setCurrentDuration(value)
    } else if (name === 'director') {
      setCurrentDirector(value)
    } else if (name === 'actors') {
      setCurrentActors(value)
    } else if (name === 'description') {
      setCurrentDescription(value)
    } else if (name === 'rating') {
      setCurrentRating(value)
    } else if (name === 'realeaseDate') {
      setCurrentReleaseDate(value)
    } 
    
  }; 

  const handleButtonClick = () => {
    console.log("Submit was pressed");
        MovieService.addMovie(currentTitle,currentGenre,currentDuration,currentReleaseDate,currentDescription,
                                currentDirector,currentActors,currentRating,currentLanguage)
        .then((response) => {
            console.log(response.data);
        })
        .catch(error => {
            console.log(error);
        })
  };


  return (
    <Container fluid className="addmovie-page w-500 align-items-center justify-content-center">
      <Row className="addmovie-row text-center d-flex w-500 align-items-center justify-content-center">
        <Col sm={12} lg={12} md={12} className="addmovie-card-col d-flex align-items-center justify-content-center">
          <Card className= "addmovie-card my-sm-3 my-md-4 flex-wrap">
            <Card.Body className="p-sm-3 p-md-4">
            <Row>
                <Col className="text-center mb-1">
                  <h1>Add Movie</h1>
                </Col>
              </Row>
              <Row>
                <Form className="p-4 p-sm-0" id="addmovie-form">

                  <Form.Group className="mb-3 w-100" controlId="formFullName" >
                    <Form.Label>Movie Title</Form.Label>
                    <InputGroup className="mb-3">
                      <Form.Control 
                        type="text"
                        className="custom-fields" 
                        placeholder="Movie Title" 
                        name="moviename"
                        value={currentTitle}
                        onChange={handleInputChange}                                                    
                      />
                        
                    </InputGroup>

                  </Form.Group>


                    <Form.Group className="mb-3 w-100" controlId="formGenre">
                    <Form.Label>Genre</Form.Label>
                        <Form.Control 
                            type="text"
                            className="custom-fields" 
                            placeholder="Genre" 
                            name="genre"
                            value={currentGenre}
                            onChange={handleInputChange}                                                    
                        />
                    </Form.Group>
                            
                    <Form.Group className="mb-3 w-100" controlId="formDuration" >
                        <Form.Label>Duration</Form.Label>
                        <InputGroup className="mb-3">
                            <Form.Control
                            type="number"
                            className="custom-fields" 
                            placeholder="Duration"
                            name="duration"
                            value={currentDuration}
                            onChange={handleInputChange}
                            />
                        </InputGroup>

                    </Form.Group>
                    <Form.Group className="mb-3 w-100" controlId="formDirector" >
                        <Form.Label>Director</Form.Label>
                        <InputGroup className="mb-3">
                            <Form.Control
                            type="text"
                            className="custom-fields" 
                            placeholder="Director"
                            name="director"
                            value={currentDirector}
                            onChange={handleInputChange}
                            />
                        </InputGroup>

                    </Form.Group>
                    <Form.Group className="mb-3 w-100" controlId="formActors" >
                        <Form.Label>Actors</Form.Label>
                        <InputGroup className="mb-3">
                            <Form.Control
                            type="text"
                            className="custom-fields" 
                            placeholder="Actors"
                            name="actors"
                            value={currentActors}
                            onChange={handleInputChange}
                            />
                        </InputGroup>

                    </Form.Group>

                    <Form.Group className="mb-3 w-100" controlId="formDescription" >
                        <Form.Label>Description</Form.Label>
                        <InputGroup className="mb-3">
                            <textarea
                            className="descform" 
                            placeholder="Description"
                            name="description"
                            value={currentDescription}
                            onChange={handleInputChange}
                            />
                        </InputGroup>

                    </Form.Group>

                    <Form.Group className="mb-3 w-100" controlId="formRating" >
                        <Form.Label>Age Rating</Form.Label>
                        <InputGroup className="mb-3">
                            <Form.Control
                            type="text"
                            className="custom-fields" 
                            placeholder="Age Rating"
                            name="rating"
                            value={currentRating}
                            onChange={handleInputChange}
                            />
                        </InputGroup>

                    </Form.Group>
                    <Form.Group className="mb-3 w-100" controlId="formReleaseDate" >
                        <Form.Label>ReleaseDate</Form.Label>
                        <InputGroup className="mb-3">
                            <Form.Control
                            type="date"
                            className="custom-fields" 
                            placeholder="ReleaseDate"
                            name="releaseDate"
                            value={currentReleaseDate}
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

export default AddMovie;