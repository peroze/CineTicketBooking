import DataTable from 'react-data-table-component';
import Dropdown from 'react-bootstrap/Dropdown';
import { AiOutlineEllipsis } from "react-icons/ai";
import React, { useState, useContext,useEffect } from 'react';

import CancelBookingModal from './CancelBookingModal.jsx';
import Button from 'react-bootstrap/Button';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { format } from 'date-fns';

import "../Style/MovieDataTable.css";


const MyBookingsDataTable = ({ bookingsData, isPending ,handleReload}) => {
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [showCancelModal, setShowCancelModal] = useState(false);

    const handleEditShow = (booking) => {
        setSelectedBooking(booking);
    };

    const handleCancelShow = (booking) => {
        setSelectedBooking(booking);
        setShowCancelModal(true);
    }
    const handleCancelClose = () => setShowCancelModal(false);

    const getLocalTime = (booking,timeLabel) => {
        const localDateTime = new Date(booking[timeLabel]);
        const formattedDateTime = format(localDateTime, "yyyy-MM-dd'T'HH:mm");
        return formattedDateTime.replace('T',' ');
    }


    const columns = [
        { 
            name: 'Id', 
            selector: row => row.booking_id,
            sortable: true,
            width: '60px',
        },
        { 
            name: 'Movie Name', 
            selector: row => row.movie_name,
            sortable: true,
            width: '120px'
        },
        {
            name: 'Room Name', 
            selector: row => row.room_name,
            sortable: true,
            width: '120px'
        },
        {
            name: 'Seat Number', 
            selector: row => row.seat_number,
            sortable: true,
            width: '120px'
        },
        {
            name: 'Start Time', 
            selector: row => getLocalTime(row,"showtime_start_time"),
            sortable: true,
            width: '150px'
        },
        {
            name: 'Status', 
            selector: row => row.booking_status,
            sortable: true,
        },
        {
            name: 'Actions',
            cell: (row) => (
                <div>
            
            <Button variant="danger" onClick={() => handleCancelShow(row)}>
                <FaTrash />
            </Button>
            </div>
            ),
            ignoreRowClick: true, // Ignore row clicks for this column
            allowOverflow: true,
            button: true,
            
        }
        // Add more columns as needed
    ];

  return (
    <>

        <DataTable 
                    title={
                        <div style={{ textAlign: 'center' }}>
                        My Bookings 
                        </div>
                    }
                    columns={columns} 
                    data={bookingsData} 
                    pagination
                    progressPending={isPending}
                    className="my-bookings-data-table"
        />
        {showCancelModal && (<CancelBookingModal
                show={showCancelModal}
                booking={selectedBooking}
                onHide={() => setShowCancelModal(false)}
                showModal = {handleCancelShow}
                closeModal = {handleCancelClose}
                handleReload = {handleReload}
        />
        )}

    </>
  )
};

export default MyBookingsDataTable;