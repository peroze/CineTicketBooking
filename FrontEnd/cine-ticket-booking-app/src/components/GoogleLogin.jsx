//GoogleLogin.js
import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode';
import Container from 'react-bootstrap/Container';

const GoogleLoginButton = ({ clientId }) => {
  const handleLoginSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    console.log(decoded);
    // Handle further logic if needed
  };

  const handleLoginError = () => {
    console.log('Login Failed');
    // Handle error if needed
  };

  return (
    <Container className='custom-google-btn d-flex flex-column justify-content-md-center align-items-center'>
        <GoogleOAuthProvider clientId="72971430335-bpegei5og5285e6dhuiqcegp8661ffof.apps.googleusercontent.com">
        <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={handleLoginError}
            cancel_on_tap_outside={true}
            size="large"
            shape="rectangular"
            theme="dark"
        />
        </GoogleOAuthProvider>
    </Container>
    
  );
};

export default GoogleLoginButton;
