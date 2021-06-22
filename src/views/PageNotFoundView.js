import React, {useMemo, useContext, Fragment} from 'react';
import styled from '@emotion/styled';
import {DarkModeContext} from '../context/DarkModeContext';
import Footer from '../components/layouts/Footer';

const PageNotFound = () => {
  const {darkMode} = useContext(DarkModeContext); 

  const PageNotFoundContainer = useMemo(() => {
    return styled.section`
      transition: background-color .5s ease-in-out;
      min-height: 90vh;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      .circles { 
        text-align: center;
        position: relative;
        margin-top:-60px;
      }

      .circles p {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 120px;
        color: #fff;
        position: relative;
        z-index: 2;
        @media (min-width: 992px){
          font-size: 240px;
        }  
      }

      .circles p small { 
        font-size: 40px; 
        line-height: 100%; 
        vertical-align: top;   
      }

      .circles .circle.small {
        width: 70px;
        height: 70px;
        @media (min-width: 992px){
          width: 140px;
          height: 140px;
        } 
        border-radius: 50%;
        background-color: #b51d1d;
        position: absolute;
        top: 80px;
        left: 50%;
        transition: background-color 600ms ease-in-out;
        animation: 7s smallmove infinite cubic-bezier(1,.22,.71,.98);	
        -webkit-animation: 7s smallmove infinite cubic-bezier(1,.22,.71,.98);
        animation-delay: 1.2s;
        -webkit-animation-delay: 1.2s;
      }

      .circles .circle.med {
        width: 100px;
        height: 100px;
        @media (min-width: 992px){
          width: 200px;
          height: 200px;
        } 
        border-radius: 50%;
        background-color: #b51d1d;
        position: absolute;
        top: 0;
        left: 10%;
        transition: background-color 600ms ease-in-out;
        animation: 7s medmove infinite cubic-bezier(.32,.04,.15,.75);	
        -webkit-animation: 7s medmove infinite cubic-bezier(.32,.04,.15,.75);
        animation-delay: 0.4s;
        -webkit-animation-delay: 0.4s;
      }

      .circles .circle.big {
        width: 200px;
        height: 200px;
        @media (min-width: 992px){
          width: 400px;
          height: 400px;
        } 
        border-radius: 50%;
        background-color: #b51d1d;
        position: absolute;
        top: 200px;
        right: 0;
        transition: background-color 600ms ease-in-out;
        animation: 8s bigmove infinite;	
        -webkit-animation: 8s bigmove infinite;
        animation-delay: 3s;
        -webkit-animation-delay: 1s;
      }

      @-webkit-keyframes smallmove {
        0% { top: 10px; left: 45%; opacity: 1; }
        25% { top: 300px; left: 40%; opacity:0.7; }
        50% { top: 240px; left: 55%; opacity:0.4; }
        75% { top: 100px; left: 40%;  opacity:0.6; }
        100% { top: 10px; left: 45%; opacity: 1; }
      }
      @keyframes smallmove {
        0% { top: 10px; left: 45%; opacity: 1; }
        25% { top: 300px; left: 40%; opacity:0.7; }
        50% { top: 240px; left: 55%; opacity:0.4; }
        75% { top: 100px; left: 40%;  opacity:0.6; }
        100% { top: 10px; left: 45%; opacity: 1; }
      }

      @-webkit-keyframes medmove {
        0% { top: 0px; left: 15%; opacity: 1; }
        25% { top: 300px; left: 60%; opacity:0.7; }
        50% { top: 240px; left: 45%; opacity:0.4; }
        75% { top: 100px; left: 30%;  opacity:0.6; }
        100% { top: 0px; left: 15%; opacity: 1; }
      }

      @keyframes medmove {
        0% { top: 0px; left: 15%; opacity: 1; }
        25% { top: 300px; left: 60%; opacity:0.7; }
        50% { top: 240px; left: 45%; opacity:0.4; }
        75% { top: 100px; left: 30%;  opacity:0.6; }
        100% { top: 0px; left: 15%; opacity: 1; }
      }

      @-webkit-keyframes bigmove {
        0% { top: 0px; right: 3; opacity: 0.5; }
        25% { top: 75px; right: 45%; opacity:0.4; }
        50% { top: 150px; right: 50%; opacity:0.8; }
        75% { top: 75px; right: 40%;  opacity:0.6; }
        100% { top: 0px; right: 3; opacity: 0.5; }
      }
      @keyframes bigmove {
        0% { top: 0px; right: 3; opacity: 0.5; }
        25% { top: 75px; right: 45%; opacity:0.4; }
        50% { top: 150px; right: 50%; opacity:0.8; }
        75% { top: 75px; right: 40%;  opacity:0.6; }
        100% { top: 0px; right: 3; opacity: 0.5; }
      }
    `
  }, [])

  return (
    <Fragment>
      <PageNotFoundContainer className={darkMode ? 'background-dark' : 'background'}>
        <div className="circles">
          <p>404<br/><small>PAGE NOT FOUND</small></p>
          <span className={`circle big ${darkMode ? 'special-color-dark' : ''}`}></span>
          <span className={`circle med ${darkMode ? 'special-color-dark' : ''}`}></span>
          <span className={`circle small ${darkMode ? 'special-color-dark' : ''}`}></span>
        </div>
      </PageNotFoundContainer>
      <Footer></Footer>
    </Fragment>
  );
}
 
export default PageNotFound;
