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
import LoadingButton from './LoadingButton';


const ValidatePage = () => {
    const [bookingsdata, setbookingsdata] = useState("");

    const [bookingid, setbookingid ] = useState("");

    const handleInputChange = (e) => {
        
        const { name, value } = e.target;
          setbookingid(value);
        }; 

      const handleButtonClick = () => {
        //onClick logic here
      };

    useEffect(() => {createdata()})

    function createdata() {
        var data = [{Id:1,name:"Konstantinos",Status:"checkedin"}, {Id:2,name:"Lamprini",Status:"pending"}]
        setbookingsdata(data);
        
    }

    const ConditionalsRowsStyle  = [ 
        {
            when: row => row.Id < 2,

                style: 
                { backgroundColor: "green",
                  color: "white"
                },

        },
    ]


//TEST
const conditionalRowStyles = [ 
    {   
        when: row => row.Id < 300,    
        style: {      
            backgroundColor: 'green',      color: 'white',      '&:hover': 
            {        cursor: 'pointer',      
        },    
    },  
}
]

const CustomStyle = {
    rows: {
        style: {
            minHeight: '200px'
        }
    }

}

    
    const columns = [
        { 
            name: 'Id', 
            selector: row => row.Id,
            sortable: true,
        },
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            
            name: 'Status',
            selector: row => row.Status,
            sortable: true,
        }
       
        // Add more columns as needed
    ];

    const bookingstable = () => {
        return (<DataTable 
            title={
                <div style={{ textAlign: 'center' }}>
                Bookings 
                </div>
            }
            //conditionalRowStyles={conditionalRowStyles}

            columns={columns} 
            data={bookingsdata} 
            pagination
            customStyles={CustomStyle}
/>
)
    }
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
/>
       </div>
        </div>
       
    </div>


  )

}

export default ValidatePage;