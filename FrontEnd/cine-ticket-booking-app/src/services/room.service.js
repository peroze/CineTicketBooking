import api from "./api";

class RoomService {

    getRoomById(id){
        return api
        .get("/rooms/"+id)
        .then(response => {
          return response.data;
        })
        .catch(error => {
            console.error("Error getting user:", error);
            throw error; // Rethrow the error to handle it in the caller
        });
    }

    getAllRooms(){
        return api
        .get("/rooms/all")
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error("Error getting rooms:", error);
            throw error; // Rethrow the error to handle it in the caller
        });
    }

}

export default new RoomService() ;