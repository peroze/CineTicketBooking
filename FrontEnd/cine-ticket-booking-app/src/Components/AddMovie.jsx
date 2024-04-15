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
//import uploadMovie from '../services/imagekit.service';
import {uploadMovie} from '../services/imagekit.service';
import { useNavigate } from 'react-router-dom';





import './Style/AddMovie.css'; // Import the external CSS file

const AddMovie = () => {
  const navigate=useNavigate();
  const [currentTitle, setCurrentTitle] = useState("");
  const [currentGenre, setCurrentGenre] = useState("");
  const [currentDuration, setCurrentDuration] = useState("");
  const [currentDescription, setCurrentDescription] = useState("");
  const [currentDirector, setCurrentDirector] = useState("");
  const [currentActors, setCurrentActors] = useState("");
  const [currentRating, setCurrentRating] = useState("");
  const [currentReleaseDate, setCurrentReleaseDate] = useState(new Date());
  const [currentLanguage, setCurrentLanguage] = useState("");
  const [photo,setPhoto]=useState("")

  const handleSubmit =(e) => {

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
    }else if(name==='language'){
      setCurrentLanguage(value);
    }
    else{
      setPhoto(e.target.files[0]);
    }
    
  }; 

  const handleButtonClick = () => {
    var counter=0;
    document.getElementById('title').classList.remove('error');
    document.getElementById('genre').classList.remove('error');
    document.getElementById('date').classList.remove('error');
    document.getElementById('age').classList.remove('error');
    document.getElementById('director').classList.remove('error');
    document.getElementById('description').classList.remove('error');
    document.getElementById('actors').classList.remove('error');
    document.getElementById('duration').classList.remove('error');
    document.getElementById('language').classList.remove('error');

    if (currentTitle === '') {
      document.getElementById('title').classList.add('error');
      counter++;
    } if (currentGenre === '') {
      document.getElementById('genre').classList.add('error');
      counter++;
    } if (currentReleaseDate === '') {
      document.getElementById('date').classList.add('error');
      counter++;
    } if (currentRating === '') {
      document.getElementById('age').classList.add('error');
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
  }
  };

  function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
   
    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
   
    return [year, month, day].join('-');
  }

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
                          id='title'
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
                              id='genre'
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
                              id='duration'
                              type="number"
                              className="custom-fields" 
                              placeholder="Duration"
                              name="duration"
                              value={currentDuration}
                              onChange={handleInputChange}
                              />
                          </InputGroup>
  
                      </Form.Group>
                      <Form.Group className="mb-3 w-100" controlId="formDuration" >
                          <Form.Label>Language</Form.Label>
                          <InputGroup className="mb-3">
                              <Form.Control
                              id='language'
                              type="text"
                              className="custom-fields" 
                              placeholder="Language"
                              name="language"
                              value={currentLanguage}
                              onChange={handleInputChange}
                              />
                          </InputGroup>
  
                      </Form.Group>
                      <Form.Group className="mb-3 w-100" controlId="formDirector" >
                          <Form.Label>Director</Form.Label>
                          <InputGroup className="mb-3">
                              <Form.Control
                              id='director'
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
                              id='actors'
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
                              <Form.Control 
                              as="textarea"
                              id='description'
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
                              id='age'
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
                              id='date'
                              type="date"
                              className="custom-fields" 
                              placeholder="ReleaseDate"
                              name="realeaseDate"
                              value={currentReleaseDate}
                              onChange={handleInputChange}
                              />
                          </InputGroup>
  
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