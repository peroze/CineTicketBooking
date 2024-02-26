import api from "./api";

class UserService {
    getUserByEmail(email){
        return api
        .get("/users/email/"+email)
        .then(response => {
            console.log(response.data);
          return response.data;
        });
    }

}

export default new UserService() ;