
import './App.css';
import Home from './Components/Home.jsx';
import Login from './Components/Login.jsx';
import Movies from './Components/Movies.jsx';
import About from './Components/About.jsx';
import Signup from './Components/Signup.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import logo from './logo.svg';
import './App.css';
import { GoogleOAuthProvider} from '@react-oauth/google';
import {GoogleLogin} from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode';
import Menubar from './Components/menubar.jsx';



function App() {
  return (
    <div className="App p-1" >


      <Menubar>
      </Menubar>

      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route exact path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<Signup />} />

        </Routes>
      </Router>

      
      
    </div>
  );
}

export default App;

