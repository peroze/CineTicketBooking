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
import java.util.Random;

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
        long time=(System.currentTimeMillis()/1000L)+1000L;
        System.out.println(time);
        // Map<String,String> authenticationParams = ImageKit.getInstance().getAuthenticationParameters();
        Map<String,String> authenticationParams=imageKit.getAuthenticationParameters(String.valueOf(System.currentTimeMillis()+new Random().nextLong()),time);
        return authenticationParams;
    }


}
