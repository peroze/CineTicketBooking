import api from "./api";

class MovieService {
    getAllShowtimes(){
        return api
        .get("/showtime/all")
        .then(response => {
            console.log(response.data);
          return response.data;
        })
        .catch(error => {
            console.error("Error fetching showtime list:", error);
            throw error; // Rethrow the error to handle it in the caller
        });
    }

    addShowtime(name,genre,duration,releaseDate,description,director,actors,rating,language){
        if (typeof actors === 'string') {
            actors = actors.split(',').map(actor => actor.trim());
        }
        
        return api
        .post("/showtime",{
            name,
            genre,
            duration,
            releaseDate,
            description,
            director,
            actors,
            rating,
            language
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

    deleteShowtime(id){
        return api
        .delete("/movies/delete/"+id)
        .then(response =>{
            return response.data;
        })
        .catch(error => {
            console.error("Error deleting movie:", error);
            throw error; // Rethrow the error to handle it in the caller
        });
    }

    editShowtime(id,genre,duration,releaseDate,description,director,actors,rating,language){
        if (typeof actors === 'string') {
            actors = actors.split(',').map(actor => actor.trim());
        }

        return api
        .put("/movies/update/"+id,{
            genre,
            duration,
            releaseDate,
            description,
            director,
            actors,
            rating,
            language
        })
        .then(response =>{
            return response.data;
        })
        .catch(error => {
            console.error("Error updating showtime:", error);
            throw error; // Rethrow the error to handle it in the caller
        });
    }
    

}

export default new MovieService() ;