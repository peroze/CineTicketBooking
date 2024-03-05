package com.unipi.CineTicketBooking.service;

import com.unipi.CineTicketBooking.model.Movie;
import com.unipi.CineTicketBooking.model.Rooms;
import com.unipi.CineTicketBooking.repository.RoomsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoomsService {

    private final RoomsRepository roomsRepository;

    @Autowired
    public RoomsService(RoomsRepository roomsRepository) {
        this.roomsRepository = roomsRepository;
    }

    public List<Rooms> getAllRooms() {
        return roomsRepository.findAll();
    }

    public Rooms getRoomsById(Long id) {
        Optional<Rooms> optionalRoom = roomsRepository.findById(id);
        return optionalRoom.orElse(null);
    }

    public Rooms createRooms(Rooms room) {
        return roomsRepository.save(room);
    }

    public Rooms updateRooms(Long id, Rooms updatedRoom) {
        Optional<Rooms> optionalRoom = roomsRepository.findById(id);
        if (optionalRoom.isPresent()) {
            Rooms existingRoom = optionalRoom.get();

            if(updatedRoom.getName() != null) {
                existingRoom.setName(updatedRoom.getName());
            }
            if(updatedRoom.getCapacity() > 0) {
                existingRoom.setCapacity(updatedRoom.getCapacity());
            }

            return roomsRepository.save(existingRoom);
        } else {
            return null;
        }
    }

    public boolean deleteRooms(Long id) {
        roomsRepository.deleteById(id);
        return false;
    }
}
