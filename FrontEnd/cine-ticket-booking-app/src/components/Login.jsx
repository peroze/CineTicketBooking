import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import LoadingButton from './LoadingButton';
import GoogleLogin from './GoogleLogin';
import Card from 'react-bootstrap/Card';
import {FaEyeSlash, FaEye} from 'react-icons/fa';

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import GoogleLoginButton from './GoogleLogin';

import '../styles/Login.css'; // Import the external CSS file


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit =(e) => {

    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    };

    const [showPassword, setShowPassword] = useState(false);


    const handleButtonClick = () => {
        //onClick logic here
    };

    return(
        <Container fluid className="login-page d-flex align-items-center justify-content-center">
            <Row className="text-center d-flex w-100 align-items-center justify-content-center">
                <Col sm={12} lg={7} md={6}  className="text-center d-flex align-items-center justify-content-center d-none d-lg-block">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid" alt="Sample image" />    
                </Col>
                <Col sm={12} lg={5} md={12} className="position-relative d-flex align-items-center justify-content-center">
                   
                    
                    <Card fluid className= "login-card my-5 flex-wrap">
                        <Card.Body className="p-sm-3 p-md-5">

                            <Row>
                                <Col className="text-center mb-4">
                                    <h1>Login to your account</h1>
                                    <p>Don't have an account? <tb></tb>
                                        <Link to="/signup">Sign up</Link>
                                    </p>
                                </Col>
                            </Row>
                            <Row>

                                            <Form className="p-4 p-sm-3" id="login-form">
                                            
                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>Email</Form.Label>
                                                    <Form.Control 
                                                        type="email"
                                                        className="custom-fields" 
                                                        placeholder="Enter email" 
                                                        name="email"
                                                        value={email}
                                                        onChange={handleInputChange}                                                    
                                                    />
                                                    <Form.Text className="text-muted">
                                                        We'll never share your email with anyone else.
                                                    </Form.Text>
                                                </Form.Group>
                                                       
                                                <Form.Group className="mb-3" controlId="formBasicPassword" >
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

                                                <div className='d-flex justify-content-left mb-4'>
                                                    <Form.Check type="checkbox" label="Remember me"/>   
                                                </div>
                    
                                                <LoadingButton
                                                    name="Log in"    
                                                    loadingText="Logging in..."
                                                    onClick={handleButtonClick}                                                  
                                                />
                    
                                            </Form>
                               
                            </Row>
                            <Row>
                                <Col xs={5}>
                                    <hr className="my-3" />
                                    </Col>
                                        <Col xs={2} className="text-center">
                                            <Form.Text className="or-display text-muted">OR</Form.Text>
                                        </Col>
                                    <Col xs={5} className="mb-4">
                                        <hr className="my-3" />
                                    </Col>
                            </Row>
                            <div className="text-center" id="oauth2-btn">  
                                <GoogleLoginButton />     
                            </div>                       
                        </Card.Body>
        
                    </Card>
                    

                </Col>
            </Row>      
        </Container>
    )

}

export default Login;