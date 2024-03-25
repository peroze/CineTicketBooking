import api from "./api";
import TokenService from "./token.service";

class AuthService {
  login(email, password) {
    return api
      .post("/auth/authenticate", {
        email,
        password
      })
      .then(response => {
        if (response.data.access_token) {
          TokenService.setUser(response.data);
        }

        return response.data;
      });
  }

  logout() {
    TokenService.removeUser();
    return api.get("/auth/logout");
  }

  register(firstName,lastName, email, password, role ="USER") {
    return api.post("/auth/register", {
      firstName,
      lastName,
      email,
      password,
      role
    }).then(response => {
      console.log(response.data);
      return response.data;
  })
  .catch(error => {
      console.error("Error in Register:", error);
      throw error; // Rethrow the error to handle it in the caller
  });;
  }

  getCurrentUser() {
    return TokenService.getUser();
  }
}

export default new AuthService()