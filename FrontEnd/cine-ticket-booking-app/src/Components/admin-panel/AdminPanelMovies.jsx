import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MovieService from "../../services/movie.service.js";
import MovieDataTable from './MovieDataTable';
import React, { useState, useContext,useEffect } from 'react';
import '../Style/AdminPanel.css'; // Import the external CSS file

const AdminPanelMovies = () => {

    const [movieList, setMovieList] = useState("");
    const [pending, setPending] = useState(true);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        getAllMovies();
    }, [reload]); 

    const getAllMovies = () => {

        MovieService.getAllMovies()
        .then(function (response) {
            setMovieList(response);
        })
        .catch(function (error) {
            console.log("Error getting all movies: ",error);
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
                    <MovieDataTable moviesData={movieList} isPending={pending} handleReload={handleReload}/>
                </div>                  
                
            </Container>




        </div>

    )
    

}

export default AdminPanelMovies;