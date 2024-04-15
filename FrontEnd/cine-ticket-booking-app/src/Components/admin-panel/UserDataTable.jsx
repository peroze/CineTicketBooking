import DataTable from 'react-data-table-component';
import Dropdown from 'react-bootstrap/Dropdown';
import { AiOutlineEllipsis } from "react-icons/ai";
import Button from 'react-bootstrap/Button';
import UserService from "../../services/user.service.js";

import React, { useState, useContext,useEffect } from 'react';
import EditUserModal from './EditUserModal';

import "../Style/MovieDataTable.css";


const MovieDataTable = ({ usersData, isPending ,handleReload}) => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [showEditUserModal, setShowEditUserModal] = useState(false);
    const [roles, setRoles] = useState(null);

    const handleEditUserShow = (user) => {
        setSelectedUser(user);
        setShowEditUserModal(true);
    };

    const handleEditUserClose = () => setShowEditUserModal(false);

    const getUserRole = (user) => {
        return user.authorities[0]?.authority;
    }

    useEffect(() => {
        getAllRoles();
    }, []);

    const getAllRoles = () =>{
        UserService.getAllRoles()
        .then((response) => {
            setRoles(response);
        })
        .catch(error => {
            console.log(error);
        })
    };


    const columns = [
        { 
            name: 'Id', 
            selector: row => row.id,
            sortable: true,
            width: '60px',
        },
        { 
            name: 'First Name', 
            selector: row => row.firstName,
            sortable: true,
        },
        {
            name: 'Last Name', 
            selector: row => row.lastName,
            sortable: true,
        },
        {
            name: 'Email', 
            selector: row => row.email,
        },
        {
            name: "Role",
            selector: row => getUserRole(row)
        },
        {
            name: 'Actions',
            cell: (row) => (
    
                <Button onClick={() => handleEditUserShow(row)}>Edit Role</Button>

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
                    title="Users"
                    columns={columns} 
                    data={usersData} 
                    pagination
                    progressPending={isPending}
                    className="movie-data-table"
        />
        {showEditUserModal && (<EditUserModal
                show={showEditUserModal}
                user={selectedUser}
                roles={roles}
                onHide={() => setShowEditUserModal(false)}
                showModal = {handleEditUserShow}
                closeModal = {handleEditUserClose}
                handleReload = {handleReload}
            
        />
        )}
        
    </>
  )
};

export default MovieDataTable;