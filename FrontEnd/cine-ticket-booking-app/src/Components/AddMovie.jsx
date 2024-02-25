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



import './Style/AddMovie.css'; // Import the external CSS file

const AddMovie = () => {
const [movie, setmovie] = useState("") 
const [photo,setPhoto]=useState("")

  const handleSubmit =(e) => {

  };

   const handleInputChange = (e) => {
    /*
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    } else if (name === 'firstName') {
      setfirstName(value);
    } else if (name === 'lastName') {
      setlastName(value);
    } else if (name === 'passwordConfirm') {
      setPasswordConfirm(value);
    } */
    
  }; 

  const handleButtonClick = () => {
    //onClick logic here
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
                        value={movie.moviename}
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
                            value={movie.genre}
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
                            value={movie.duration}
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
                            value={movie.director}
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
                            value={movie.actors}
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
                            value={movie.description}
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
                            value={movie.rating}
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
                            value={movie.releaseDate}
                            onChange={handleInputChange}
                            />
                        </InputGroup>

                    </Form.Group>

                    <Form.Group controlId="formImage" className="mb-4 w-100">
                      <Form.Label>Poster</Form.Label>
                      <Form.Control 
                        type="file" 
                        accept=".png, .jpeg, .jpg"
                        customName="custom-fields"
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
  );
};

export default AddMovie;