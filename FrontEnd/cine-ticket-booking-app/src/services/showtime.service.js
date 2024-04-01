import api from "./api";

class ShowtimeService {
    getAllShowtimes(){
        return api
        .get("/showtime/all")
        .then(response => {
            console.log(response.data);
          return response.data;
        })
        .catch(error => {
            throw error; // Rethrow the error to handle it in the caller
        });
    }

    getAllShowtimesAfterToday(){
        return api
        .get("/showtime/today")
        .then(response => {
            console.log(response.data);
          return response.data;
        })
        .catch(error => {
            throw error; // Rethrow the error to handle it in the caller
        });
    }

    addShowtime(roomId,movieId,startTime,endTime,ticketPrice){
        return api
        .post("/showtime",{
            roomId,
            movieId,
            startTime,
            endTime,
            ticketPrice
        })
        .then(response => {
            console.log(response.data);
            return response.data;
        })
        .catch(error => {
            throw error; // Rethrow the error to handle it in the caller
        });
    }

    deleteShowtime(id){
        return api
        .delete("/showtime/"+id)
        .then(response =>{
            return response.data;
        })
        .catch(error => {
            throw error; // Rethrow the error to handle it in the caller
        });
    }

    getShowtimesbyMovieId(movieId){
        return api
        .get("/showtime/movie/"+movieId)
        .then(response =>{
            return response.data;
        })
        .catch(error => {
            throw error; // Rethrow the error to handle it in the caller
        });
    }
    
    getShowtimesbyMovieId(movieId){
        return api
        .get("/showtime/movie/"+movieId)
        .then(response =>{
            return response.data;
        })
        .catch(error => {
            throw error; // Rethrow the error to handle it in the caller
        });
    }
    
}

export default new ShowtimeService() ;
