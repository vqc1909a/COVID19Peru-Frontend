import React, {useContext, useMemo} from 'react';
import styled from '@emotion/styled';
import {DarkModeContext} from '../../context/DarkModeContext';

const Footer = () => {
 const {darkMode} = useContext(DarkModeContext);
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
    <FooterContent className={darkMode ? 'dark-mode': ''}>
      <p className={darkMode ? 'text-primary-dark': 'text-primary'}>Perú - {new Date().getFullYear()}</p>
    </FooterContent>
  );
}
 
export default Footer;