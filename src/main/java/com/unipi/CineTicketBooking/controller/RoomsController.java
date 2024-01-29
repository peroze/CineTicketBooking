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
        List<Rooms> rooms = roomsService.getAllRooms();
        return new ResponseEntity<>(rooms, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Rooms> getRoomById(@PathVariable Long id) {
        Rooms room = roomsService.getRoomsById(id);
        if (room != null) {
            return new ResponseEntity<>(room, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/create")
    public ResponseEntity<Rooms> createRoom(@RequestBody Rooms rooms) {
        Rooms createdRoom = roomsService.createRooms(rooms);
        return new ResponseEntity<>(createdRoom, HttpStatus.CREATED);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Rooms> updateRoom(@PathVariable Long id, @RequestBody Rooms updatedRoom) {
        Rooms room = roomsService.updateRooms(id, updatedRoom);
        if (room != null) {
            return new ResponseEntity<>(room, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteRoom(@PathVariable Long id) {
        boolean deleted = roomsService.deleteRooms(id);
        if (deleted) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
