
import './App.css';
import Home from './Components/Home.jsx';
import Login from './Components/Login.jsx';
import Movies from './Components/Movies.jsx';
import About from './Components/About.jsx';
import Signup from './Components/Signup.jsx';
import Footer from './Components/Footer.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import logo from './logo.svg';
import './App.css';
import { GoogleOAuthProvider} from '@react-oauth/google';
import {GoogleLogin} from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode';
import Menubar from './Components/MenuBar.jsx';
import MovieCard from './Components/MovieCard.jsx' 
import { Link } from 'react-router-dom';
import { useState , createContext } from 'react';
import MoviePage from './Components/MoviePage.jsx';
import ContactUs from './Components/ContactUs.jsx';
import CalendarPage from './Components/CalendarPage.jsx';
import BookingPage from './Components/BookingPage.jsx';
import AddMovie from './Components/AddMovie.jsx';
import AdminPanelMovies from './Components/admin-panel/AdminPanelMovies.jsx';
import AdminPanelShowtimes from './Components/admin-panel/AdminPanelShowtimes.jsx';
import AdminPanelUsers from './Components/admin-panel/AdminPanelUsers.jsx';
import ValidatePage from './Components/ValidatePage.jsx';
import AddShowTime from './Components/AddShowTime.jsx';
import PrivateRoute from './Components/PrivateRoute.jsx';
import PageNotFound from './Components/PageNotFound.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export const UserContext = createContext();

function App() {

  const [usericon,setUsericon]=useState("https://ik.imagekit.io/cineticketbooking/Users/konper.jpeg")
  const [username,setUsername]=useState("Konper98");

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState("");
  const [isAdmin,setIsAdmin] = useState(false);
  const [isInspector,setIsInspector] = useState(false);

  return (
    <div className="App p-1" > 
      
      <UserContext.Provider value={{isLoggedIn, setIsLoggedIn, user, setUser,isAdmin,setIsAdmin,isInspector,setIsInspector}}>

      <div className="content-container">
        <Router>
        <header className="sticky-header">
          <Menubar  icon={usericon} username={username}/>
        </header>
          <Routes> 
              <Route path="/login" element={<Login />} />
              <Route exact path="/" element={<Home />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/about" element={<About />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/contactus" element={<ContactUs />} />
              <Route path="/movie" element={<MoviePage/>}></Route>
              <Route path="/calendar" element={<CalendarPage/>}></Route>
              <Route path="/booking" element={<BookingPage/>}></Route>
             
              <Route path="*" element={<PageNotFound />} />

              <Route path="/add-show-time" 
                element={<PrivateRoute 
                  path="/add-show-time" 
                  component={AddShowTime} 
                  isAuthenticated={isLoggedIn} 
                  hasPermission={isAdmin} 
                  />
              }></Route>

              <Route path="/add-movie" 
                element={<PrivateRoute 
                  path="/add-movie" 
                  component={AddMovie} 
                  isAuthenticated={isLoggedIn} 
                  hasPermission={isAdmin} 
                  />
              }></Route>

              <Route path="/admin-panel/movies" 
                element={<PrivateRoute 
                  path="/admin-panel/movies" 
                  component={AdminPanelMovies} 
                  isAuthenticated={isLoggedIn} 
                  hasPermission={isAdmin} 
                  />
              }></Route>

              <Route path="/admin-panel/users" 
                element={<PrivateRoute 
                  path="/admin-panel/users" 
                  component={AdminPanelUsers} 
                  isAuthenticated={isLoggedIn} 
                  hasPermission={isAdmin} 
                  />
              }></Route>

              <Route path="/admin-panel/showtimes" 
                element={<PrivateRoute 
                  path="/admin-panel/showtimes" 
                  component={AdminPanelShowtimes} 
                  isAuthenticated={isLoggedIn} 
                  hasPermission={isAdmin} 
                  />
              }></Route>

              <Route path="/validate-page" 
                element={<PrivateRoute 
                  path="/validate-page" 
                  component={ValidatePage} 
                  isAuthenticated={isLoggedIn} 
                  hasPermission={isInspector || isAdmin} 
                  />
              }></Route>

              
          </Routes>
          <Footer></Footer>
        </Router>
        
      </div>
      
      </UserContext.Provider>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      
    </div>
  );
}

export default App;

