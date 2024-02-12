package com.unipi.CineTicketBooking.service;

import com.unipi.CineTicketBooking.config.JwtService;
import com.unipi.CineTicketBooking.model.Users;
import com.unipi.CineTicketBooking.repository.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UsersService {

    private final UsersRepository usersRepository;
    private final JwtService jwtService;

    private final AuthenticationManager authenticationManager;


    public String createUser(Users user) {
        Optional<Users> optional=usersRepository.findById(user.getId());
        Optional<Users> mailopt=usersRepository.findUsersByEmail(user.getEmail());
        if (optional.isPresent()){
            throw new IllegalArgumentException("The users already exists");
        }
        if(mailopt.isPresent()){
            throw new IllegalArgumentException("The email is already used");
        }
        usersRepository.save(user);
        var jwtToken=jwtService.generateToken(user);
        return jwtToken;
    }

    public List<Users> getAllUsers() { return usersRepository.findAll();
    }

    public void deleteUser(String email){
        if(usersRepository.findUsersByEmail(email).isEmpty()){
            throw new IllegalArgumentException("The given user does not exist");
        }
        usersRepository.deleteByEmail(email);
    }



    public Optional<Users> getUserByEmail(String email){
        return usersRepository.findUsersByEmail(email);
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
        if(user.getPassword()!=null){
            user.setPassword(userUpd.getPassword());
        }
        usersRepository.save(user);
    }


}
