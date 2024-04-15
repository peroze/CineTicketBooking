import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ShowtimeService from "../../services/showtime.service.js";
import ShowtimeDataTable from './ShowtimeDataTable.jsx';
import React, { useState, useContext,useEffect } from 'react';
import '../Style/AdminPanel.css'; // Import the external CSS file

const AdminPanelShowtimes = () => {

    const [showtimeList, setShowtimeList] = useState("");
    const [pending, setPending] = useState(true);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        getAllShowtimes();
    }, [reload]); 

    const getAllShowtimes = () => {

        ShowtimeService.getAllShowtimes()
        .then(function (response) {
            setShowtimeList(response);
        })
        .catch(function (error) {
            console.log("Error getting all showtimes: ",error);
        })
        .finally(() => {
            setPending(false);
            setReload(false);
        });
        
    }

    const handleReload = () => {
        setReload(true);
    }

    return(
        <div className="datatable-container">
            <Container className="admin-edit-container"> 
                 
                <div >
                    <ShowtimeDataTable showtimesData={showtimeList} isPending={pending} handleReload={handleReload}/>
                </div>                  
                
            </Container>




        </div>

    )
    

}

export default AdminPanelShowtimes;