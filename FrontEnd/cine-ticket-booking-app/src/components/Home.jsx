// components/Home.js
import React ,{useContext } from 'react';
import { Link } from 'react-router-dom';
import MoviePage from './MoviePage';
import { Movie } from './Models/Movie';
import styles from './Style/Home.css'
import { useNavigate} from 'react-router-dom';
import gsap from "gsap"; // <-- import GSAP
import { useGSAP } from "@gsap/react";
import HomePageIcon from "./Images/HomePageIcon.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareFromSquare } from '@fortawesome/free-regular-svg-icons';
import {faFacebook,faXTwitter,faInstagram,faYoutube} from '@fortawesome/free-brands-svg-icons';




const Home = () => {
  const navigate=useNavigate();
  useGSAP(() => {
    gsap.from(".top",{top:"50%",duration:1,delay:0.5})
    gsap.from(".bottom",{top:"50%",duration:1,delay:0.5})
    gsap.from("h4",{opacity:0,delay:1.5})
    gsap.to(".top",{opacity:0,delay:1.5})
    gsap.to(".bottom",{opacity:0,delay:1.5})
    gsap.from("h4",{fontSize:"100px",delay:2.5,duration:0.7})
    gsap.from(".HomeImage",{width: 0,duration:1.2,delay:3});
    gsap.from("h1",{opacity:0,delay:2.5})
    gsap.from(".TextContainerHome",{transform: "translateX(20%)",duration:1.2,delay:3});
    gsap.from(".HomeA",{y:1500,duration:1,delay:4.2});
    gsap.from(".socials",{y:1500,duration:1,delay:4.5});





  })

  function hoverAnimation(){
    gsap.to(".face",{x:"100%",delay:0.5})
    gsap.to(".insta",{x:"-100%",delay:0.5})
    gsap.to(".youtu",{y:"100%",delay:0.5})
    gsap.to(".tweet",{y:"-100%",delay:0.5})
    gsap.to(".social",{opacity:0,delay:0.5})

    
  }

  function hoverExit(){
    gsap.to(".face",{x:"0%",delay:0.7})
    gsap.to(".insta",{x:"0%",delay:0.7})
    gsap.to(".youtu",{y:"0%",delay:0.7})
    gsap.to(".tweet",{y:"0%",delay:0.7})
    gsap.to(".social",{opacity:1,delay:0.7})

  }

  

  return (
    <div className='HomeContainer'>
      
      <div className='TextContainerHome'>
        <div className='welcome'><h4 >Welcome</h4><div className='top'></div><div className='bottom'></div></div>
        <div ><h1>BOOK YOUR <br/> TICKET <br/> <i className='NowText' onClick={()=>{
                navigate('/movies')}}  >NOW!</i></h1></div>
        <div className='HomeA'>
          <a>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce faucibus aliquam mauris id gravida. Vestibulum in nunc nec lectus dictum</a>
        </div>
        <div className='socials' onMouseEnter={()=>{hoverAnimation()}} onMouseLeave={()=>{hoverExit()}}>
          <div className='social' >
            <FontAwesomeIcon icon={faShareFromSquare}/></div>
          <div className='socialIcon face'> <FontAwesomeIcon icon={faFacebook} /></div>
          <div className='socialIcon tweet'><FontAwesomeIcon icon={faXTwitter}></FontAwesomeIcon></div>
          <div className='socialIcon insta'><FontAwesomeIcon icon={faInstagram}></FontAwesomeIcon></div>
          <div className='socialIcon youtu'><FontAwesomeIcon icon={faYoutube}></FontAwesomeIcon></div>
          </div>
      </div>
      <div className='HomeImage'>
        <img src={HomePageIcon}/>
      </div>
      <div className='socialButtons'>
  
        </div>
    </div>

  );
};

export default Home;