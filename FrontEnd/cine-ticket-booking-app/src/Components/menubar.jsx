import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from'react-bootstrap/Offcanvas';
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import logo from './Images/Logo.png';
import "../App.css";
import { Component } from 'react';
import styles from"./Style/MenuBar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUser} from'@fortawesome/free-regular-svg-icons'
import {faFilm} from'@fortawesome/free-solid-svg-icons'
import Container from 'react-bootstrap/Container';
import ReactRouterBootstrap,{ LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import Home from './Home.jsx';
import Login from './Login.jsx';
import Movies from './Movies.jsx';
import About from './About.jsx';
import Signup from './Signup.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Popup from 'reactjs-popup';

import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../App.js';
import AuthService from "../services/auth.service.js";
import { useNavigate } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Menubar({icon,username}) {

  const {isLoggedIn, setIsLoggedIn} = useContext(UserContext);
  const [unknownUserIcon,setUnknownUserIcon]=useState("https://ik.imagekit.io/cineticketbooking/Users/unknownuser.png");
  const {user, setUser} = useContext(UserContext);
  const navigate = useNavigate();
  const [adminStatus, setAdminStatus] = useState(false);

  const isAdmin = (user) => {
    const authority = user.authorities[0]?.authority;
    if(authority === "ADMIN" ){
      return true;
    }
    return false;
  }

  useEffect(() => {
    // This code will run whenever isLoggedIn changes its value
    if (isLoggedIn) {
      // Call isAdmin when user is logged in
      console.log("Is the user logged in? ",isLoggedIn);
      setAdminStatus(isAdmin(user));
    }
  }, [user]);


  const handleLogout = () => {
    AuthService.logout()
        .then(function (response) {
            console.log(response);
            setIsLoggedIn(false);
            navigate('/');
        })
        .catch(function (error) {
            console.log(error);
        });
  }
    
    return (
        <Navbar expand="lg" fixed="top" variant="light" className="rounded-pill m-2 p-0 navbar" >
          <Container fluid>
            <Navbar.Brand className='me-auto' as={Link} to="/"><img width="150"  className="Navbarlogo" src={logo}></img></Navbar.Brand>
            <Navbar.Toggle  data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar"><FontAwesomeIcon className="burger" icon={faFilm}/></Navbar.Toggle>
            <Navbar.Offcanvas id="offcanvasNavbar" 
              placement='end'>
                <Offcanvas.Header closeButton>
                <Offcanvas.Title className='ctitle'>
                  CineTicketBooking
                </Offcanvas.Title>
              </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav className="ms-auto gap-3 offcanvas-body " id='offcanvasNavbar'>
                      <Nav.Link as={Link} to="/">Home</Nav.Link>
                      <Nav.Link as={Link} to="/movies" >Movies</Nav.Link>
                      <Nav.Link as={Link} to="/about">About Us</Nav.Link>
                      <Nav.Link as={Link} to="/contactus">Contact Us</Nav.Link>
                      <Nav.Link as={Link} to={{ pathname:'/validate-page',state: {ShowTimeId:1} }}>Validate</Nav.Link>                      

                      {isLoggedIn && adminStatus && (
                        <>             
                          <NavDropdown title="Admin Panel">
                            <NavDropdown.Item>
                              <Nav.Link as={Link} to="/admin-panel/movies">Edit Movies</Nav.Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                              <Nav.Link as={Link} to="/admin-panel/users">Edit Users</Nav.Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                              <Nav.Link as={Link} to="/admin-panel/showtimes">Edit Showtimes</Nav.Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                              <Nav.Link as={Link} to="/admin-panel/rooms">Edit Rooms</Nav.Link>
                            </NavDropdown.Item>  
                          </NavDropdown>              
                        </>
                      )}
                    </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
          {isLoggedIn ? (
              <Popup trigger={<Nav.Link className='exlink rounded-pill'><a className='extext'>{username}</a><img className="fic pull-right navbar-text rounded-pill" src={icon}/></Nav.Link>}position='bottom center'>
              <div className="popupcontainer">
                <div className='usericoncontainer'>
                <img className="fic pull-right navbar-text rounded-pill usericon" src={icon}/>
                </div>
                
                <ul className='userlist'>             
                              <li className='useritem'>
                                Edit Users Information
                              </li>
                              <li className = 'useritem'>
                                My Bookings
                              </li>
                              <li 
                                className='useritem logout'
                                onClick = {handleLogout}
                              >
                                Log Out
                              </li>
                </ul>
              </div>
            </Popup>      


          ) : (
                <Nav.Link className='exlink rounded-pill' as={Link} to="/login">
                  <i className='extext'>Login</i>
                  <img className="fic pull-right navbar-text rounded-pill" src={unknownUserIcon}/></Nav.Link>              
          )}
              
        </Container>
    </Navbar>
    );
  }
  
  export default Menubar;