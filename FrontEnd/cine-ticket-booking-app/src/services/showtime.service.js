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

    addShowtimes(movieid,startDate,endDate,room){
        return api
        .post("showtime/addauto",{
            movieid,
            startDate,
            endDate,
            room
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