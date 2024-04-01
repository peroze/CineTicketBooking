import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import movieImage from './Images/Logo.png';
import "../App.css";
import { Component } from 'react';
import styles from"./Style/MovieCard.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUser} from'@fortawesome/free-regular-svg-icons'
import {faFilm} from'@fortawesome/free-solid-svg-icons'
import Container from 'react-bootstrap/Container';
import gsap from "gsap"; // <-- import GSAP
import { useGSAP } from "@gsap/react";

function MovieCard({ name, id }) {
    


        useGSAP(() => {
            gsap.to(".movieCard",{scale:1,duration:1,delay:0.5,ease:"none"})
        })

        let imagepath="https://ik.imagekit.io/cineticketbooking/Movies/"+id+".jpeg";
        return (
            <div className="movieCard p-2">
                <img className='moviePhoto' src={imagepath}></img>
                <div className="movieText">
                    <a>{name}</a>
                </div>
            </div>
        )
}

export default MovieCard ; 