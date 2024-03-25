import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useState,useEffect } from 'react';
import DatePicker from "react-datepicker";
import ShowtimeService from "../../services/showtime.service.js";
import { toast } from 'react-toastify';

import "react-datepicker/dist/react-datepicker.css";


const DeleteShowtimeModal = ({ showtime, showModal, closeModal,handleReload}) => {

    const applyChanges = () =>{
        ShowtimeService.deleteShowtime(showtime.id)
        .then((response) => {
            toast.success("Successfully deleted the showtime");
            console.log(response.data);
        })
        .catch(error => {
            toast.error("An error occurred. Please try later");
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
                    Delete Showtime
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Showtime id: {showtime.id}</h4>
                <div>
                    Are you sure you want to delete this showtime? <br/>
                    (All customers will be notified about the change)
                </div>
                
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={applyChanges}>Yes</Button>
                <Button onClick={closeModal}>No</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteShowtimeModal;