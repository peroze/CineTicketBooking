package com.unipi.CineTicketBooking.controller;

import com.unipi.CineTicketBooking.model.Rooms;
import com.unipi.CineTicketBooking.service.RoomsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
@RequestMapping("/api/rooms")
public class RoomsController {

    private final RoomsService roomsService;

    @Autowired
    public RoomsController(RoomsService roomsService) {
        this.roomsService = roomsService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Rooms>> getAllRooms() {
        try {
            List<Rooms> rooms = roomsService.getAllRooms();
            return new ResponseEntity<>(rooms, HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Rooms> getRoomById(@PathVariable Long id) {
        try {
            Rooms room = roomsService.getRoomsById(id);
            if (room != null) {
                return new ResponseEntity<>(room, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/create")
    public ResponseEntity<Rooms> createRoom(@RequestBody Rooms rooms) {
        try {
            Rooms createdRoom = roomsService.createRooms(rooms);
            return new ResponseEntity<>(createdRoom, HttpStatus.CREATED);
        }catch (IllegalStateException e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Rooms> updateRoom(@PathVariable Long id, @RequestBody Rooms updatedRoom) {
        try {
            Rooms room = roomsService.updateRooms(id, updatedRoom);
            if (room != null) {
                return new ResponseEntity<>(room, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteRoom(@PathVariable Long id) {
        try {
            boolean deleted = roomsService.deleteRooms(id);
            if (deleted) {
                return new ResponseEntity<>("The room has been successfully Deleted", HttpStatus.NO_CONTENT);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
