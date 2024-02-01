import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import logo from './Images/Logo.png';
import "../App.css";
import { Component } from 'react';
import styles from"./Style/navbar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUser} from'@fortawesome/free-regular-svg-icons'
import {faFilm} from'@fortawesome/free-solid-svg-icons'
import Container from 'react-bootstrap/Container';



function Menubar() {
    return (
        <Navbar expand="lg" bg="#77ACA2" fixed="top" variant="light" className="rounded-pill m-3 p-0 navbar" >
          <Container>
            <Navbar.Brand href="#home"><img width="150"  className="Navbarlogo" src={logo}></img></Navbar.Brand>
            <Navbar.Toggle  aria-controls="basic-navbar-nav"><FontAwesomeIcon className="burger" icon={faFilm}/></Navbar.Toggle>
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto gap-5 ">
              <Nav.Link   href="/">Home</Nav.Link>
              <Nav.Link   href="/movies">Movies</Nav.Link>
              <Nav.Link   href="/about">Contact</Nav.Link>
              <Nav.Link   href="/login"><FontAwesomeIcon className="fic" icon={faUser}/></Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
    </Navbar>
    );
  }
  
  export default Menubar;