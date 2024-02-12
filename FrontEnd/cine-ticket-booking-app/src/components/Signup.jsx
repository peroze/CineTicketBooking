// components/Signup.js
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



import './Style/Signup.css'; // Import the external CSS file

const Signup = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [photo,setPhoto]=useState("")

  const handleSubmit =(e) => {

  };

  const handleInputChange = (e) => {
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
    }
    


  };

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);


  const handleButtonClick = () => {
    //onClick logic here
  };


  return (
    <Container fluid className="signup-page align-items-center justify-content-center">
      <Row className="signup-row text-center d-flex w-100 align-items-center justify-content-center">
        <Col sm={12} lg={12} md={12} className="signup-card-col d-flex align-items-center justify-content-center">
          <Card className= "signup-card my-sm-3 my-md-4 flex-wrap">
            <Card.Body className="p-sm-3 p-md-4">
              <Row>
                <Col className="text-center mb-1">
                  <h1>Sign up</h1>
                  <p>Already have an account? &nbsp;
                  <Link to="/login">Login</Link>
                  </p>
                </Col>
              </Row>
              <Row>

                <Form className="p-4 p-sm-0" id="signup-form">

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
                            
                    <Form.Group className="mb-3" controlId="formPassword" >
                        <Form.Label>Password</Form.Label>
                        <InputGroup className="mb-3">
                            <Form.Control
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className="custom-fields"
                            name="password"
                            value={password}
                            onChange={handleInputChange}
                            />
                            <Button 
                                variant="outline-secondary" 
                                onClick={() => setShowPassword(!showPassword)}
                                className="custom-eye-Btn"                                          
                            >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </Button>
                        </InputGroup>

                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPasswordConfirm" >
                        <Form.Label>Confirm Password</Form.Label>
                        <InputGroup className="mb-3">
                            <Form.Control
                            type={showPasswordConfirm ? "text" : "password"}
                            placeholder="Re-enter Password"
                            className="custom-fields"
                            name="passwordConfirm"
                            value={passwordConfirm}
                            onChange={handleInputChange}
                            />
                            <Button 
                                variant="outline-secondary" 
                                onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                                className="custom-eye-Btn"                                          
                            >
                            {showPasswordConfirm ? <FaEyeSlash /> : <FaEye />}
                            </Button>
                        </InputGroup>

                    </Form.Group>

                    <Form.Group controlId="formImage" className="mb-4">
                      <Form.Label>Profile Picture</Form.Label>
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

export default Signup;