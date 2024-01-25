import logo from './logo.svg';
import './App.css';
import { GoogleOAuthProvider} from '@react-oauth/google';
import {GoogleLogin} from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode';



function App() {
  return (
    <div className="App">
           Hi,Welcome to the frontend

      <GoogleOAuthProvider 
      clientId="813061530558-eumv2pprpivufvqth4352l5qoo9mtj7b.apps.googleusercontent.com">
        <GoogleLogin
          onSuccess={credentialResponse => {
            const decoded = jwtDecode(credentialResponse.credential);
            console.log(decoded);
            //console.log(credentialResponse);
          }}
          onError={() => {
            console.log('Login Failed');
          }}
          cancel_on_tap_outside={true}
          size="large"
          shape="pill"
        />
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
