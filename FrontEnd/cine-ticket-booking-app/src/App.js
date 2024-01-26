import logo from './logo.svg';
import './App.css';
import { GoogleOAuthProvider} from '@react-oauth/google';
import {GoogleLogin} from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode';
import Menubar from './Components/menubar.jsx';



function App() {
  return (
    <div className="App p-1" >

      <Menubar></Menubar>
      
      
    </div>
  );
}

export default App;
