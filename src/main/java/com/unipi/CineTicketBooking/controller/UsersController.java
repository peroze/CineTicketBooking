package com.unipi.CineTicketBooking.controller;

import com.unipi.CineTicketBooking.controller.secondaryClasses.LoginRequest;
import com.unipi.CineTicketBooking.controller.secondaryClasses.RegisterRequest;
import com.unipi.CineTicketBooking.model.Role;
import com.unipi.CineTicketBooking.model.Users;
import com.unipi.CineTicketBooking.service.UsersService;
import jakarta.servlet.http.Cookie;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(path = "api/users")
@AllArgsConstructor
public class UsersController {
    private final UsersService usersService;
    private  PasswordEncoder passwordEncoder;


    @GetMapping(path = "/username/{userName}")
    public Optional<Users> getUserbyUsername(@PathVariable("userName") String username){
        return usersService.getUserByUsername(username);
    }

    @GetMapping(path="/getAllUsers")
    public List<Users> getUsers(){
        return usersService.getAllUsers();
    }

    @PostMapping("/register")
    public ResponseEntity addNewUser(@RequestBody RegisterRequest request){
        try {
            Users user;
            if(request.getRole().equals("ADMIN")) {
                 user = new Users(request.getId(),request.getFirstName(), request.getLastName(), request.getUsername(), request.getPassword(), request.getEmail(), Role.ADMIN);
            }
            else{
                 //if(request.getRole().equals("USER"))
                 user = new Users(request.getId(),request.getFirstName(), request.getLastName(), request.getUsername(), request.getPassword(), request.getEmail(), Role.USER);
            }
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            return ResponseEntity.ok(usersService.createUser(user));
        }
        catch (IllegalArgumentException e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
        }

    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest request){

        String jwt =usersService.login(request);

        // Set Remember-Me Cookie
        ResponseCookie rememberMeCookie = ResponseCookie.from("rememberMe", request.getRememberMe())
                .maxAge(60 * 60 * 24 * 365) // 1 year
                .httpOnly(true) // Set to true for HTTPS
                .secure(true)
                .path("/")
                .build();

        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.SET_COOKIE, rememberMeCookie.toString());
        return ResponseEntity.ok().headers(headers).body(jwt);
    }


    @DeleteMapping(path="{username}")
    public ResponseEntity deleteUser(@PathVariable("username") String username){
        try {
            usersService.deleteUser(username);
        }
        catch (IllegalArgumentException e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok("User Deleted");
    }


    @PutMapping (path="{userId}")
    public ResponseEntity updateUser(@PathVariable("userId") long id, @RequestBody Users user){
        try {
            usersService.updateUser(id, user);
        }
        catch (IllegalArgumentException e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok(user) ;
    }








}
