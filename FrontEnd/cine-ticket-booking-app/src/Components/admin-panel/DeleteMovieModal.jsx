import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useState,useEffect } from 'react';
import DatePicker from "react-datepicker";
import MovieService from "../../services/movie.service.js";
import { toast } from 'react-toastify';

import "react-datepicker/dist/react-datepicker.css";


const DeleteMovieModal = ({ movie, showModal, closeModal,handleReload}) => {

    const applyChanges = () =>{
        MovieService.deleteMovie(movie.id)
        .then((response) => {
            toast.success("Successfully deleted the movie");
        })
        .catch(error => {
            toast.success("An error occurred. Please try later");
            console.log(error);
        })
        .finally( () => {
            closeModal();
            handleReload();
        })
    }


    return (
        <Modal 
            show={showModal} 
            onHide={closeModal}
            backdrop="static" 
            centered
            
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Delete Movie
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Movie id: {movie.id}</h4>
                <div>
                    Are you sure you want to delete this movie?
                </div>
                
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={applyChanges}>Yes</Button>
                <Button onClick={closeModal}>No</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteMovieModal;