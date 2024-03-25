import api from "./api";

class ShowtimeService {

    getShowtimesbyId(id){
        return api
        .get("/showtime/"+id)
        .then(response => {
          return response.data;
        });
    }

    getAllShowtimes(){
        return api
        .get("/showtime/all")
        .then(response => {
          return response.data;
        });
    }

    getShowtimesbyMovieId(id){
        return api
        .get("/showtime/movie/"+id)
        .then(response => {
          return response.data;
        });
    }

    addShowtimes(movieId,startTime,endTime,roomId){
        var ticketPrice=15;
        roomId=1;
        return api
        .post("showtime/addauto",{
            movieId,
            startTime,
            endTime,
            roomId,
            ticketPrice
        })
        .then(response => {
            console.log(response.data);
            return response.data;
        })
        .catch(error => {
            console.error("Error adding movie:", error);
            throw error; // Rethrow the error to handle it in the caller
        });
    }


    

}

export default new ShowtimeService() ;