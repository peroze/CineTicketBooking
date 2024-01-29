
import './App.css';
import Login from './components/Login';
import Home from './components/Home';
import Movies from './components/Movies';
import About from './components/About';
import Signup from './components/Signup';
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

