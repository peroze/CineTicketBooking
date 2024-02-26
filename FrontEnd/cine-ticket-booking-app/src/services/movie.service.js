import api from "./api";

class MovieService {
    getAllMovies(){
        return api
        .get("/movies/getAllMovies")
        .then(response => {
            console.log(response.data);
          return response.data;
        });
    }

    addMovie(name,genre,duration,releaseDate,description,director,actors,rating,language){
        if (typeof actors === 'string') {
            actors = actors.split(',').map(actor => actor.trim());
        }
        
        return api
        .post("/movies",{
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
    

}

export default new MovieService() ;