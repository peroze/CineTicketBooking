package com.unipi.CineTicketBooking.controller;

import com.unipi.CineTicketBooking.model.Users;
import com.unipi.CineTicketBooking.service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "api/users")
public class UsersController {
    private final UsersService usersService;

    @Autowired
    public UsersController(UsersService usersService){
        this.usersService=usersService;
    }

    @GetMapping(path = "/username/{userName}")
    public Optional<Users> getUserbyUsername(@PathVariable("userName") String username){
        return usersService.getUserByUsername(username);
    }

    @GetMapping(path="/getAllUsers")
    public List<Users> getUsers(){
        return usersService.getAllUsers();
    }

    @PostMapping
    public ResponseEntity addNewUser(@RequestBody Users user){
        try {
            usersService.createUser(user);
        }
        catch (IllegalArgumentException e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok(user) ;
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
