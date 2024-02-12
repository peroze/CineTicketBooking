package com.unipi.CineTicketBooking.controller;

import com.unipi.CineTicketBooking.controller.secondaryClasses.RegisterRequest;
import com.unipi.CineTicketBooking.model.Role;
import com.unipi.CineTicketBooking.model.Users;
import com.unipi.CineTicketBooking.service.UsersService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
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


    @GetMapping(path = "/email/{encodedEmail}")
    public Optional<Users> getUserbyEmail(@PathVariable("encodedEmail") String encodedEmail){
        //We can't enter the special chars "@" and "." at the pathName, that's why we will encode the email and the conversions
        // "@" -> "%40" and "." -> "%2E" would be ok as a path variable. The front-end should do the request using the encoded email
        // which will be decoded in the backend

        return usersService.getUserByEmail(encodedEmail);
    }

    @GetMapping(path="/getAllUsers")
    public List<Users> getUsers(){
        return usersService.getAllUsers();
    }


    @DeleteMapping(path="{email}")
    public ResponseEntity deleteUser(@PathVariable("email") String email){
        try {
            usersService.deleteUser(email);
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
