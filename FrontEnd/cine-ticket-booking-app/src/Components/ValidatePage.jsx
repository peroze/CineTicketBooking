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
import QrScanner from "qr-scanner";
import QrFrame from "../Components/Images/qr-frame.svg";
import { useRef } from 'react';
import { toast } from 'react-toastify';





const ValidatePage = () => {
  const scanner = useRef(null);
  const videoEl = useRef(null);
  const qrBoxEl = useRef(null);
  const [qrOn, setQrOn] = useState(true);

  // Result
  const [scannedResult, setScannedResult] = useState("");
   // Success
   const onScanSuccess = (result) => {
    //  Print the "result" to browser console.

    //  Handle success.
    //  You can do whatever you want with the scanned result.
    setScannedResult(result?.data);
    bookingService.validatebookingbyId(scannedResult).
        then(()=>{
            toast.success("Check-In is completed😃");
            setChecker(true);
        });
  };
  
  // Fail
  const onScanFail = (err) => {
    // Print the "err" to browser console.
    console.log(err);
  };

  useEffect(() => {
    if (videoEl?.current && !scanner.current) {
      
      scanner.current = new QrScanner(videoEl?.current, onScanSuccess, {
        onDecodeError: onScanFail,
        // This is the camera facing mode. In mobile devices, "environment" means back camera and "user" means front camera.
        preferredCamera: "environment",
        // This will help us position our "QrFrame.svg" so that user can only scan when qr code is put in between our QrFrame.svg.
        highlightScanRegion: true,
        // This will produce a yellow (default color) outline around the qr code that we scan, showing a proof that our qr-scanner is scanning that qr code.
        highlightCodeOutline: true,
        // A custom div which will pair with "highlightScanRegion" option above 👆. This gives us full control over our scan region.
        overlay: qrBoxEl?.current || undefined,
      });

      // Start QR Scanner
      scanner?.current
        ?.start()
        .then(() => setQrOn(true))
        .catch((err) => {
          if (err) setQrOn(false);
        });
    }

    //  Clean up on unmount.
    //  This removes the QR Scanner from rendering and using camera when it is closed or removed from the UI.
    return () => {
      if (!videoEl?.current) {
        scanner?.current?.stop();
      }
    };
  }, []);

  // If "camera" is not allowed in browser permissions, show an alert.
  useEffect(() => {
    if (!qrOn)
      alert(
        "Camera is blocked or not accessible. Please allow camera in your browser permissions and Reload."
      );
  }, [qrOn]);
  
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
            toast.success("Check-In is completed😃");
            setChecker(true);
        });
        
      };

      const change = (e) => {
        setShowTimeId (e.target.value);
        setChecker(true)
       }


      useEffect(() => {
        if(isLoading==(true)) {
          showtimeService.getAllShowtimesAfterToday(ShowTimeId)
      .then(function (response) {
      var data=response
      setShowTimes(data)
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
        <Col sm={12} lg={12} md={12} className="validate-card-col d-flex flex-wrap align-items-center justify-content-center">
        <div className="qr-reader" >
             
             <video ref={videoEl}></video>
               <div ref={qrBoxEl} className="qr-box">
              <img
               src={QrFrame}
               alt="Qr Frame"
               width={256}
               height={256}
               className="qr-frame"
             />
             </div>
             </div>
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
                         <option value={object.id}> {object.movie.name} | {object.room.name} | {object.startTime.split("T").pop()}  </option>)}
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