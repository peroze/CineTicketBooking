//GoogleLogin.js
import React,{useState,useEffect} from 'react';
import { GoogleOAuthProvider, GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';
import AuthService from "../services/auth.service";

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

const GoogleLoginButton = ({ onLoginComplete }) => {

  const googleLogin = useGoogleLogin({
    flow: 'auth-code',
    scope: "openid profile email",
    onSuccess: async (codeResponse) => {
      try{
        const response = await axios.get(`http://localhost:8080/api/oauth2/code/google?code=${codeResponse.code}`);
        AuthService.oauth2login(response);
        //call the function that handles the login and pass the user email that authenticated
        onLoginComplete(response.data.user_email,response.data.image_url,response.data.isSignUp);
      }
      catch (error){
        console.log(error);
      }
        
    },
    onError: errorResponse => console.log(errorResponse),
  });

  return (
    <Container className='custom-google-btn d-flex flex-column justify-content-md-center align-items-center'>
        
        <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={handleLoginError}
            cancel_on_tap_outside={true}
            size="large"
            shape="rectangular"
            theme="dark"
        />

        <Button onClick={googleLogin}>googleLogin</Button>

        
        
    </Container>
    
  );
};

export default GoogleLoginButton;
