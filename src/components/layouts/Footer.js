import React, {useContext, useMemo} from 'react';
import styled from '@emotion/styled';
import {DarkModeContext} from '../../context/DarkModeContext';

const Footer = () => {
 const {isDarkMode} = useContext(DarkModeContext);
 const FooterContent = useMemo(()=>{

  return styled.footer`
    transition: all .5s ease-in-out;
    height: 10vh;
    padding: 2rem;
    background-color: #DED8D8;
    display: none;
    z-index: 100;
    @media (min-width: 992px){
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &.dark-mode{
      background-color: #3a2d2d;
    }
    p{
      transition: color .5s ease-in-out;
      font-family: 'Rubik SemiBold', sans-serif;
    }
  `
 }, [])
  return (
    <FooterContent className={isDarkMode ? 'dark-mode': ''}>
      <p className={isDarkMode ? 'text-primary-dark': 'text-primary'}>Copyright © {new Date().getFullYear()}, vqc1909a. Todos los derechos reservados.</p>
    </FooterContent>
  );
}
 
export default Footer;