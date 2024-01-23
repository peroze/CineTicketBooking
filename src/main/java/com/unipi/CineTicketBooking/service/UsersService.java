package com.unipi.CineTicketBooking.service;

import com.unipi.CineTicketBooking.model.Users;
import com.unipi.CineTicketBooking.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsersService {

    private final UsersRepository usersRepository;

    @Autowired
    public UsersService(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }

    public Users createUser(Users user) {

        return usersRepository.save(user);
    }
}
