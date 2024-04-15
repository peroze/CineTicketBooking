import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from'react-bootstrap/Offcanvas';
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import logo from './Images/Logo.png';
import "../App.css";
import { Component } from 'react';
import style from"./Style/Footer.css"
import styles from"./Style/MenuBar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPaperPlane} from'@fortawesome/free-regular-svg-icons'
import {faPhone,faMapLocationDot} from'@fortawesome/free-solid-svg-icons'
import Container from 'react-bootstrap/Container';
import ReactRouterBootstrap,{ LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import Home from './Home.jsx';
import Login from './Login.jsx';
import Movies from './Movies.jsx';
import About from './About.jsx';
import Signup from './Signup.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function Footer({icon,user}) {
    
    return (
        <div className="Footer">
            <div className="container">
                <Row>
                    <Col className='footerLogo'>
                        <Navbar.Brand className='brandFooter' href="#home"><img width="150"  className="Navbarlogo" src={logo}></img></Navbar.Brand>
                        <p className="footer_paragraph">Captivating Stories Begin with a Click <br/> Reserve Your Cinematic Escape Now!</p>
                    </Col>
                    <Col className='footerMenuContainer' id="roadmap">
                        <h2 className="footer_titles">Site Roadmap</h2>
                        <ul className='footerMenu d-flex flex-column align-items-center justify-content-flex-end gap-2'>
                            <li><i className="footerLink"><Link to="/">Home Page</Link></i></li>
                            <li><i className="footerLink"><Link to="/movies">Movies</Link></i></li>
                            <li><i className="footerLink"><Link to="/contactus">Contact Us</Link></i></li>
                        </ul>
                    </Col>
                    <Col className='footerMenuContainer'>
                        <h2 className="footer_titles">Contact Us</h2>
                        <ul className='footerMenu contactFooter d-flex flex-column align-items-center justify-content-center gap-2'>
                            <li>
                                <a><FontAwesomeIcon className='fafooter' icon={faPaperPlane}/><i className="footerLink">CineTicketBooking@gmail.com</i></a>
                            </li>
                            <li><a><FontAwesomeIcon className='fafooter' icon={faPhone} /> <i className="footerLink">6998989898</i></a></li>
                            <li><a><FontAwesomeIcon className='fafooter' icon={faMapLocationDot}/> <i className="footerLink">University of Pireaus, Karaoli & Dimitriou 80</i></a></li>
                            
                        </ul>
                    </Col>
                </Row>
            </div>
        </div>
    );
  }
  
  export default Footer;