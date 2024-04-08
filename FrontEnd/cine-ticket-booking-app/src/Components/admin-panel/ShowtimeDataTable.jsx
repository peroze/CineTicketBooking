import DataTable from 'react-data-table-component';
import Dropdown from 'react-bootstrap/Dropdown';
import { AiOutlineEllipsis } from "react-icons/ai";
import Button from 'react-bootstrap/Button';
import MovieService from "../../services/movie.service.js";
import RoomService from "../../services/room.service.js";

import React, { useState, useContext,useEffect } from 'react';

import "../Style/ShowtimeDataTable.css";
import AddShowtimeModal from './AddShowtimeModal';
import DeleteShowtimeModal from './DeleteShowtimeModal.jsx';


const ShowtimeDataTable = ({ showtimesData, isPending ,handleReload}) => {

    const [selectedShowtime, setSelectedShowtime] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [movies, setMovies] = useState(null);
    const [rooms, setRooms] = useState(null);

    const handleAddShow = () => setShowAddModal(true);
    const handleAddClose = () => setShowAddModal(false);

    const handleDeleteShow = (showtime) => {
        setSelectedShowtime(showtime);
        setShowDeleteModal(true);
    }
    const handleDeleteClose = () => {
        console.log("HIIIIIIIIIIIII"); 
        getAllMovies();
        setShowDeleteModal(false)
    };

    useEffect(() => {
        getAllMovies();
        getAllRooms();
    }, []);

    const getAllMovies = () =>{
        MovieService.getAllMovies()
        .then((response) => {
            console.log(response);
            setMovies(response);
        })
        .catch(error => {
            console.log(error);
        })
    };

    const getAllRooms = () => {
        RoomService.getAllRooms()
        .then((response) => {
            console.log(response);
            setRooms(response);
        })
        .catch(error => {
            console.log(error);
        })
    }

    const getLocalTime = (showtime,timeLabel) => {
        return showtime[timeLabel].replace('T',' ');
    }


    const columns = [
        { 
            name: 'Id', 
            selector: row => row.id,
            sortable: true,
            width: '60px',
        },
        { 
            name: 'Movie', 
            selector: row => row.movie.name,
            sortable: true,
        },
        {
            name: 'Room', 
            selector: row => row.room.name,
            sortable: true,
        },
        {
            name: 'Available Seats', 
            selector: row => row.availableSeats
        },
        {
            name: 'Start time', 
            selector: row => getLocalTime(row,"startTime")
        },
        {
            name: "End time",
            selector: row => getLocalTime(row,"endTime")
        },
        {
            name: "Ticket Price",
            selector: row => row.ticketPrice
        },
        {
            name: 'Actions',
            cell: (row) => (
                <Button variant='danger' onClick={() => handleDeleteShow(row)}>Delete</Button>
            ),
            ignoreRowClick: true, // Ignore row clicks for this column
            allowOverflow: true,
            button: true
        }
        // Add more columns as needed
    ];

  return (
    <>
        <DataTable 
                    title={
                        <div style={{ textAlign: 'center' }}>
                        Showtimes 
                        <Button style={{ float: 'right' }} onClick={() => { handleAddShow() }}>Add Showtime</Button>
                        </div>
                    }
                    columns={columns} 
                    data={showtimesData} 
                    pagination
                    progressPending={isPending}
                    className="showtime-data-table"
        />
        {showAddModal && (<AddShowtimeModal
                show={showAddModal}
                onHide={() => setShowAddModal(false)}
                showModal = {handleAddShow}
                closeModal = {handleAddClose}
                handleReload = {handleReload}
                movieList = {movies}
                roomList = {rooms}
        />
        )}
        {showDeleteModal && (<DeleteShowtimeModal
                show={showDeleteModal}
                showtime={selectedShowtime}
                onHide={() => setShowDeleteModal(false)}
                showModal = {handleDeleteShow}
                closeModal = {handleDeleteClose}
                handleReload = {handleReload}
        />
        )}
        
    </>
  )
};

export default ShowtimeDataTable;