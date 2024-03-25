import React, { useState, useContext } from 'react';
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
import axios from 'axios';
import AuthService from "../services/auth.service";
import UserService from "../services/user.service.js";
import { useNavigate } from 'react-router-dom';

import { useEffect } from 'react';
import { UserContext } from '../App.js';
import { toast } from 'react-toastify';

import './Style/Login.css'; // Import the external CSS file


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const {isLoggedIn,setIsLoggedIn} = useContext(UserContext);
    const {user, setUser} = useContext(UserContext);
    const {setUserIcon,setFirstName} = useContext(UserContext);

    const navigate = useNavigate();

    const handleButtonClick =() => {
        
        AuthService.login(email,password)
        .then(function (response) {
            console.log(response);
            handleLogin();
            setIsLoggedIn(true);
            toast.success("Successful Login");
            console.log("Is the user logged in? " ,isLoggedIn);
        })
        .catch(function (error) {
            setIsLoggedIn(false);
            if (!error.response) {
                toast.error("No response from the server. Please try again later.");
                return;
            }
            if(error.response.status == 401){
                toast.error("Invalid Credentials")
            }
            else{
                toast.error("An error occurred. Please try again later.");
            }
            console.log(error);
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    };

    const handleLogin = async () => {
        try {
            const response = await UserService.getUserByEmail(email);
            await setUser(response);
            await setFirstName(response.firstName);
            const imageUrl = "https://ik.imagekit.io/cineticketbooking/Users/" + response.id + ".jpeg";
            await setUserIcon(imageUrl);
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <Container fluid className="login-page align-items-center justify-content-center">
            <Row className="login-row text-center d-flex w-100 align-items-center justify-content-center">
                <Col sm={12} lg={7} md={6}  className="text-center d-flex align-items-center justify-content-center d-none d-lg-block">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid w-65" alt="Sample image" />  
                    <h1 className="image-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet totam, sunt sed voluptates 
                        perferendis, voluptas blanditiis pariatur .</h1>  
                </Col>
                <Col sm={12} lg={5} md={12} className="login-card-col d-flex align-items-center justify-content-center">
                   
                    
                    <Card className= "login-card my-sm-3 my-md-5 flex-wrap">
                        <Card.Body className="p-sm-3 p-md-4">

                            <Row>
                                <Col className="text-center mb-4">
                                    <h1>Login to your account</h1>
                                    <p>Don't have an account? &nbsp;
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