import api from "./api";
import Booking from "../Components/Models/Booking"
import axios from 'axios';

class BookingService {

    validatebookingbyId(id){
        var booking = this.getBookingById(id)
        var user=booking.user
        var id=booking.id
        var time=booking.time
        var seat=booking.seat
        return api
        .put("/bookings/checkin/"+id,
            
    )}

    expirebookingbyId(id){
        var booking = this.getBookingById(id)
        var user=booking.user
        var id=booking.id
        var time=booking.time
        var seat=booking.seat
        return api
        .put("/bookings/expire/"+id,{
            user,
            id,
            time,
            seat
    })}


    getBookingById(id){
        var booking;
        axios.get("http://localhost:8080/api/bookings/"+id).then(response => {
            //booking =  new Booking(response.data.user,response.data.id,response.data.time,response.data.seat); 
        });
        return booking;
    }

    getAllBookings(){
        return api
        .get("/bookings/all")
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error("Error getting rooms:", error);
            throw error; // Rethrow the error to handle it in the caller
        });
    }
      
    addBookings(UserEmail,firstName,lastName,telephone,seat,selectedSeats,showtime){
        var Showtimeid = showtime.id 
        return api
        .post("/bookings/create",{
            Showtimeid,
            UserEmail,
            firstName,
            lastName,
            telephone,
            seat,
            selectedSeats
        })
        .then(response => {
            console.log(response.data);
          return response.data;
        })
        .catch(error => {
            console.error("Error adding room:", error);
            throw error; // Rethrow the error to handle it in the caller
        });
    }


}

export default new BookingService() ;