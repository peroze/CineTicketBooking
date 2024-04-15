import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import UserService from "../../services/user.service.js";
import UserDataTable from './UserDataTable';
import React, { useState, useContext,useEffect } from 'react';
import '../Style/AdminPanel.css'; // Import the external CSS file

const AdminPanelUsers = () => {
 
    const [userList, setUserList] = useState("");
    const [pending, setPending] = useState(true);
    const [reload, setReload] = useState(false);
    
    useEffect(() => {
        getAllUsers();
    }, [reload]); 
    
    const getAllUsers = () => {
    
        UserService.getAllUsers()
        .then(function (response) {
            setUserList(response);
        })
        .catch(function (error) {
            console.log("Error getting all users: ",error);
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
        <div>
            <Container className="admin-edit-container"> 
                     
                <div >
                    <UserDataTable usersData={userList} isPending={pending} handleReload={handleReload}/>
                </div>                  
                    
            </Container>
    
    
    
    
        </div>
    
    )
        
    
}
    

export default AdminPanelUsers;