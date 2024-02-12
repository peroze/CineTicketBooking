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





function Menubar({icon,user}) {
    
    return (
        <Navbar expand="lg" fixed="top" variant="light" className="rounded-pill m-2 p-0 navbar" >
          <Container fluid>
            <Navbar.Brand className='me-auto' href="#home"><img width="150"  className="Navbarlogo" src={logo}></img></Navbar.Brand>
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
                    </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
          <Nav.Link className='exlink rounded-pill' href="/login"><a className='extext'>{user}</a><img className="fic pull-right navbar-text rounded-pill" src={icon}/></Nav.Link>          
        </Container>
    </Navbar>
    );
  }
  
  export default Menubar;