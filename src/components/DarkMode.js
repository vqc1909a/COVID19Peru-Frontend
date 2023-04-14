import React, {useContext} from 'react';
import {DarkModeContext} from '../context/DarkModeContext';
import styled from '@emotion/styled';

const DarkMode = () => {
  const {isDarkMode, setIsDarkMode} = useContext(DarkModeContext);

  const DarkModeContainer = styled.div`
    position: fixed;
    top: 5%;
    right: 5%;
    z-index: 2;
    cursor: pointer;
    @media (min-width: 992px){
      display: none;
    }
  `
  return (
    <DarkModeContainer >
      <img src={`/icons/${isDarkMode ? 'sun.svg': 'moon.svg'}`} alt={isDarkMode ? 'sun-icon' : 'moon-icon'} onClick={() => setIsDarkMode(!isDarkMode)} />
    </DarkModeContainer>  
  );
}
 
export default DarkMode;