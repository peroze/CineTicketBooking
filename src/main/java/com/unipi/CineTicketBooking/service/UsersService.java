package com.unipi.CineTicketBooking.service;

import com.unipi.CineTicketBooking.model.Users;
import com.unipi.CineTicketBooking.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsersService {

    private final UsersRepository usersRepository;

    @Autowired
    public UsersService(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }

    public Users createUser(Users user) {
        Optional<Users> optional=usersRepository.findById(user.getId());
        Optional<Users> useropt=usersRepository.findUsersByUsername(user.getUsername());
        Optional<Users> mailopt=usersRepository.findUsersByEmail(user.getEmail());
        if (optional.isPresent()){
            throw new IllegalArgumentException("The users already exists");
        }
        if(useropt.isPresent()){
            throw new IllegalArgumentException("The username is already used");
        }
        if(mailopt.isPresent()){
            throw new IllegalArgumentException("The email is already used");
        }
        return usersRepository.save(user);
    }

    public List<Users> getAllUsers() { return usersRepository.findAll();
    }

    public void deleteUser(String username){
        if(usersRepository.findUsersByUsername(username).isEmpty()){
            throw new IllegalArgumentException("The given user does not exist");
        }
        usersRepository.deleteByUsername(username);
    }


    public Optional<Users> getUserByUsername(String username){
        return usersRepository.findUsersByUsername(username);
    }

    public void updateUser(long id,Users userUpd){
        Users user=usersRepository.findById(id).orElseThrow(()->new IllegalArgumentException("The User does not exist"));
        if(user.getEmail()!=null){
            user.setEmail(userUpd.getEmail());
        }
        if(user.getFirstName()!=null){
            user.setFirstName(userUpd.getFirstName());
        }
        if(user.getLastName()!=null){
            user.setLastName(userUpd.getLastName());
        }
        if(user.getUsername()!=null){
            user.setUsername(userUpd.getUsername());
        }
        if(user.getPassword()!=null){
            user.setPassword(userUpd.getPassword());
        }
        usersRepository.save(user);
    }
}
