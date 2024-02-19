package com.unipi.CineTicketBooking.controller;

import com.unipi.CineTicketBooking.model.Movie;
import io.imagekit.sdk.ImageKit;
import io.imagekit.sdk.config.Configuration;
import io.imagekit.sdk.utils.Utils;
import lombok.NoArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/imagekit")
@NoArgsConstructor
public class ImageKitController {

    @GetMapping
    public Map<String,String> imagekitauth(){
            ImageKit imageKit = ImageKit.getInstance();
            Configuration config = new Configuration("public_RpxufWizWBajeZch607qowKJCrg=", "private_DmlQqdyOyekkM/fI4NSIAT9DNBE=", "https://ik.imagekit.io/cineticketbooking");
            imageKit.setConfig(config);
            Map<String,String> authenticationParams = ImageKit.getInstance().getAuthenticationParameters();
            System.out.println(authenticationParams);
            return authenticationParams;
    }


}
