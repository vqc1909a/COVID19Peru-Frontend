import React, {useContext, useMemo, useState} from 'react';
import styled from '@emotion/styled';
import {DarkModeContext} from '../context/DarkModeContext';

const ScrollUp = () => {
  const {darkMode} = useContext(DarkModeContext);  
  const [viewport, setViewport] = useState(window.innerWidth);


  const ScrollUpContent = useMemo(()=>{
    return styled.div`
      position: absolute;
      bottom: 0%;
      left: 90%;
      transform: translate(-50%, -50%);
      padding: 1rem;
      background-color: #b51d1d;
      transition: background-color .5s ease-in-out;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      
      &.dark-mode{
        background-color: #df3333;
      }
    `
  }, [])

  window.onscroll = function(){
    setViewport(this.innerWidth);
  }
  const scrollUp = () => {
    window.scrollTo({top: 0, behavior: 'smooth'})
  }

  return (
     <ScrollUpContent className={`${darkMode ? 'dark-mode' : ''}`} onClick={() => scrollUp()}>
      <svg style={viewport >= 576 ? {height: "30px", width: "30px"} : {height: "15px", width: "15px"}} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.3333 20.3062V5.41284L18.84 11.9195C19.36 12.4395 20.2133 12.4395 20.7333 11.9195C20.857 11.7962 20.955 11.6496 21.0219 11.4883C21.0888 11.327 21.1233 11.1541 21.1233 10.9795C21.1233 10.8049 21.0888 10.632 21.0219 10.4707C20.955 10.3094 20.857 10.1629 20.7333 10.0395L11.9467 1.25284C11.8233 1.12924 11.6768 1.03117 11.5155 0.964264C11.3542 0.897355 11.1813 0.862915 11.0067 0.862915C10.8321 0.862915 10.6591 0.897355 10.4978 0.964264C10.3366 1.03117 10.19 1.12924 10.0667 1.25284L1.26668 10.0262C1.14324 10.1496 1.04532 10.2962 0.978511 10.4574C0.911704 10.6187 0.877319 10.7916 0.877319 10.9662C0.877319 11.1407 0.911704 11.3136 0.978511 11.4749C1.04532 11.6362 1.14324 11.7827 1.26668 11.9062C1.39012 12.0296 1.53667 12.1275 1.69796 12.1943C1.85924 12.2612 2.03211 12.2955 2.20668 12.2955C2.38125 12.2955 2.55412 12.2612 2.7154 12.1943C2.87669 12.1275 3.02324 12.0296 3.14668 11.9062L9.66668 5.41284V20.3062C9.66668 21.0395 10.2667 21.6395 11 21.6395C11.7333 21.6395 12.3333 21.0395 12.3333 20.3062Z" fill="#F5F4F4"/>
      </svg>
    </ScrollUpContent>
  );
}
 
export default ScrollUp;