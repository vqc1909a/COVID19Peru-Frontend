import React, {useMemo, useContext} from 'react';
import styled from '@emotion/styled';
import { DarkModeContext } from '../../context/DarkModeContext';

const DetailsHeaderHome = () => {
  const { darkMode } = useContext(DarkModeContext);

  const DetailsHeaderHomeContent = useMemo(() => {
    return styled.header`
      .header-icon{
        padding: 3rem 0; 
        @media (min-width: 992px){
          padding: 5rem 0; 
        }
        min-height: 10vh;
        background: #DED8D8;
        clip-path: polygon(100% 0, 100% 75%, 87% 87%, 71% 96%, 50% 100%, 29% 96%, 13% 88%, 0 75%, 0 0);
        display:flex;
        align-items:center;
        justify-content: center;
        transition: all .5s ease-in-out;
        h2{
          text-transform: uppercase;
          font-family: "Rubik Bold";
          font-style: italic;
        }
        &.dark-mode{
          background: #3a2d2d;
          
        }
      }
    `

  }, []);
  return (
    <DetailsHeaderHomeContent>
      <div className={`header-icon ${darkMode ? "dark-mode" : "" }`}>
        <h2 className={`text-medium ${darkMode ? 'special-color-dark' : 'special-color'}`}>Unidos Podemos Más</h2>
      </div>
    </DetailsHeaderHomeContent>
  );
}
 
export default DetailsHeaderHome;