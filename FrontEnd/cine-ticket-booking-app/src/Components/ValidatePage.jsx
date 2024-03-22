import DataTable from 'react-data-table-component';
import Dropdown from 'react-bootstrap/Dropdown';
import { AiOutlineEllipsis } from "react-icons/ai";
import React, { useState, useContext,useEffect } from 'react';
import styles from"./Style/ValidatePage.css"
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useLocation } from 'react-router-dom';
import LoadingButton from './LoadingButton';
import bookingService from '../services/booking.service';
import showtimeService from '../services/showtime.service';
import { ShowTime } from './Models/ShowTime';


const ValidatePage = () => {
  
    const [bookingsdata, setbookingsdata] = useState("");
    const [bookingid, setbookingid ] = useState("");
    const location=useLocation();
    //const ShowTimeId=location.state;
    //const ShowTimeId=2;
    const [checker,setChecker]=useState(true);
    const [isLoading, setisLoading] = useState(true);
    const [ShowTimeId, setShowTimeId] = useState(1);
    const [ShowTimes, setShowTimes] = useState([])
    const handleInputChange = (e) => {
        
        const { name, value } = e.target;
          setbookingid(value);
        }; 

      const handleButtonClick = () => {
        bookingService.validatebookingbyId(bookingid).
        then(()=>{
            setChecker(true);
        });
        
      };

      const change = (e) => {
        console.log(e.target.value)
        setShowTimeId (e.target.value);
        setChecker(true)
       }


      useEffect(() => {
        if(isLoading==(true)) {
          showtimeService.getAllShowtimes(ShowTimeId)
      .then(function (response) {
      var data=response
      setShowTimes(data)
      console.log(data);
  },[])
  .catch(function (error) {
      console.log("Error getting all ShowTimes: ",error);
  })
        }
      if(checker==true){
        createdata()
        setChecker(false)
      }
    },[checker, ShowTimeId])

    function createdata() {
        //var data = [{Id:1,name:"Konstantinos",Status:"Checked-In"}, {Id:2,name:"Lamprini",Status:"Pending"}]
        //setbookingsdata(data);

        bookingService.getBookingsByShowTimeId(ShowTimeId)
    .then(function (response) {
      var data=response
      setbookingsdata(data)
      setisLoading(false)
  },[])
  .catch(function (error) {
      console.log("Error getting all movies: ",error);
  })
        
    }
  
    const customStyle = {
      rows: {
          style: {
              fontWeight:"bold",
              minHeight:"60px",
          },
      },
   
  }

const ConditionalsRowsStyle  = [
  {
      when: row => row.status === "CHECKED_IN",

          style:
          { 
            color: "green"
          },

  },
  {
    when: row => row.status === "PENDING",

        style:
        {   
          color: "#D36135"
        },

},
]
    
    const columns = [
        { 
            name: 'Id', 
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'Name',
            selector: row => row.lastName,
            sortable: true,
        },
        {
            
            name: 'Status',
            selector: row => row.status,
            sortable: true,
        }
       
        // Add more columns as needed
    ];

return (

    <div className='outside-validate-page'>
        <h1>Validate Page</h1>
        <div className='Flex-Validate-Page'>
       
       
    <div className='Validate-form'>
    <Container fluid className="validate-page w-500 align-items-center justify-content-center">
      <Row className="validate-row text-center d-flex w-500 align-items-center justify-content-center">
        <Col sm={12} lg={12} md={12} className="validate-card-col d-flex align-items-center justify-content-center">
          <Card className= "validate-card my-sm-3 my-md-4 flex-wrap">
            <Card.Body className="p-sm-3 p-md-4">
            <Row>
                <Col className="text-center mb-1">
                  <h1>Validate Ticket</h1>
                </Col>
              </Row>
              <Row>
                <Form className="p-4 p-sm-0" id="validate-form">
                <Form.Group className="mb-3 w-100" controlId="formDuration" >
                        <Form.Label>Room</Form.Label>
                        <InputGroup className="mb-3">
                        <select id="rooms" name="roomlist" form="add-movie-form" onChange={change} value={ShowTimeId}>
                        {ShowTimes.map((object, i) =>
                         <option value={object.id}> Id = {object.id} movie = {object.movie.name} </option>)}
                        </select>
                        </InputGroup>

                    </Form.Group>
                  <Form.Group className="mb-3 w-100" controlId="formFullName" >
                    <Form.Label>Booking Id</Form.Label>
                    <InputGroup className="mb-3">
                      <Form.Control 
                        type="text"
                        className="custom-fields" 
                        placeholder="Booking Id" 
                        name="bookingid"
                        value={bookingid}
                        onChange={handleInputChange}                                                    
                      />
                        
                    </InputGroup>

                  </Form.Group>
                  

                    <LoadingButton
                        name="Submit"    
                        loadingText="Submitting..."
                        onClick={handleButtonClick}                                                  
                    />

                </Form>
            
                
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </div>
    <div className='tb'>
       <DataTable 
            title={
                <div style={{ textAlign: 'center' }}>
                Bookings 
                </div>
            }
            columns={columns} 
            data={bookingsdata} 
            pagination
            customStyles={customStyle}
            conditionalRowStyles={ConditionalsRowsStyle}

/>
       </div>
        </div>
       
    </div>


  )

}

export default ValidatePage;