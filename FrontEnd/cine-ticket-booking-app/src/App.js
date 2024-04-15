
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
import Menubar from './Components/menubar.jsx';
import MovieCard from './Components/MovieCard.jsx' 
import { Link } from 'react-router-dom';
import { useState , createContext,useEffect,useRef } from 'react';
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
import BookingConfirmationPage from './Components/BookingConfirmationPage.jsx'
import PrivateRoute from './Components/PrivateRoute.jsx';
import PageNotFound from './Components/PageNotFound.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import refreshPageService from './services/refresh.page.service.js';

export const UserContext = createContext();

function App() {

  const [userIcon,setUserIcon]=useState("")
  const [firstName,setFirstName]=useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState("");
  const [isAdmin,setIsAdmin] = useState(false);
  const [isInspector,setIsInspector] = useState(false);

  const hasRun = useRef(false);


  useEffect(() => {
    if(!hasRun.current){
      if(refreshPageService.getReload() === 'true'){
        hasRun.current = true;

       refreshPageService.onPageLoad()
        .then((localUser) => {
          if (localUser != null) {
            setUser(localUser);
            setIsLoggedIn(refreshPageService.getIsLoggedIn());
            setUserIcon("https://ik.imagekit.io/cineticketbooking/Users/" + localUser.id + ".jpeg");
            setFirstName(localUser.firstName);
          }
        }).catch((error) => {
          // Handle any errors during fetching
          console.error("Error fetching localUser:", error);
        });
        
      }
      refreshPageService.setReload(true);
      
    }
    
  }, []);

  useEffect(() => {
    if(user != ""){
      refreshPageService.onPageRefresh(isLoggedIn,user.id);
    }
  },[isLoggedIn,user])

  return (
    <div className="App p-1" > 
      
      <UserContext.Provider 
        value={{isLoggedIn, setIsLoggedIn, user, setUser,isAdmin,setIsAdmin,
                isInspector,setIsInspector,userIcon,setUserIcon,firstName,setFirstName}
              }>

      <div className="content-container">
        <Router>
        <header className="sticky-header">
          <Menubar  icon={userIcon} username={firstName}/>
        </header>
          <Routes> 
              <Route path="/login" element={<Login />} />
              <Route exact path="/" element={<Home />} />
              <Route path="/movies" element={<Movies />} />
              {/* <Route path="/about" element={<About />} /> */}
              <Route path="/signup" element={<Signup />} />
              <Route path="/contactus" element={<ContactUs />} />
              <Route path="/movie" element={<MoviePage/>}></Route>
              <Route path="/calendar" element={<CalendarPage/>}></Route>
              <Route path="/booking" element={<BookingPage/>}></Route>        
              <Route path="/booking-confirmation" element={<BookingConfirmationPage/>}></Route>

              <Route path="*" element={<PageNotFound />} />

              <Route path="/add-show-time" 
                element={<PrivateRoute 
                  path="/add-show-time" 
                  component={AddShowTime} 
                  isAuthenticated={isLoggedIn} 
                  hasPermission={isAdmin} 
                  />
              }></Route>

              <Route path="/addmovie" 
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

