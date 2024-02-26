import DataTable from 'react-data-table-component';
import Dropdown from 'react-bootstrap/Dropdown';
import { AiOutlineEllipsis } from "react-icons/ai";
import MovieService from "../../services/movie.service.js";
import React, { useState, useContext,useEffect } from 'react';
import EditMovieModal from './EditMovieModal';
import AddMovieModal from './AddMovieModal';
import Button from 'react-bootstrap/Button';


const MovieDataTable = ({ moviesData, isPending ,handleReload}) => {
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);

    const handleEditShow = (movie) => {
        setSelectedMovie(movie);
        setShowEditModal(true);
    };

    const handleEditClose = () => setShowEditModal(false);

    const handleAddShow = () => setShowAddModal(true);
    const handleAddClose = () => setShowAddModal(false);

    const columns = [
        { 
            name: 'Id', 
            selector: row => row.id,
            sortable: true,
            width: '60px',
        },
        { 
            name: 'Title', 
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Actions',
            cell: (row) => (
            <Dropdown>
                <Dropdown.Toggle variant="secondary" id={`dropdown-${row.id}`}>
                {/* Three dots for the ellipsis */}
                <AiOutlineEllipsis />
                </Dropdown.Toggle>
    
                <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleEditShow(row)}>Edit</Dropdown.Item>
                <Dropdown.Item className="text-danger">Delete</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            ),
            ignoreRowClick: true, // Ignore row clicks for this column
            allowOverflow: true,
            button: true,
            width: '56px', // Adjust the width of the column as needed
        }
        // Add more columns as needed
    ];

  return (
    <>

        <DataTable 
                    title={
                        <div style={{ textAlign: 'center' }}>
                        Movies 
                        <Button style={{ float: 'right' }} onClick={() => { handleAddShow() }}>Add Movie</Button>
                        </div>
                    }
                    columns={columns} 
                    data={moviesData} 
                    pagination
                    progressPending={isPending}
        />
        {showEditModal && (<EditMovieModal
                show={showEditModal}
                movie={selectedMovie}
                onHide={() => setShowEditModal(false)}
                showModal = {handleEditShow}
                closeModal = {handleEditClose}
                handleReload = {handleReload}
            
        />
        )}
        {showAddModal && (<AddMovieModal
                show={showAddModal}
                onHide={() => setShowAddModal(false)}
                showModal = {handleAddShow}
                closeModal = {handleAddClose}
                handleReload = {handleReload}
        />
        )}

    </>
  )
};

export default MovieDataTable;