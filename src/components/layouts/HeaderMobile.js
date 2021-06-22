import React, {useContext, useRef, useMemo} from 'react';
import styled from '@emotion/styled';
import {DarkModeContext} from '../../context/DarkModeContext';
import {Link, withRouter} from 'react-router-dom'
const HeaderMobile = (props) => {
  const ruta = props.location.pathname;
  const {darkMode} = useContext(DarkModeContext);
  const headerTag = useRef()
  const specialColor = darkMode ? "#df3333" : "#b51d1d";
  const HeaderMobileContainer = useMemo(() => {
    return styled.header`
    position: fixed;
    bottom: 0;
    width: 100%;
    transition: all .5s ease-in-out;
      ul{
        /* position: fixed;
        bottom: 0;
        width: 100%; */
        min-height: 10vh;
        display: flex;
        li{
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          margin: 0rem 1rem;
          a{
            span{
              margin: .5rem 0; 
            }
          }
        }
      };
      @media (min-width: 992px){
        display: none;
      }

  `}, []);
  return (
    <HeaderMobileContainer ref={headerTag} className={darkMode ? 'background-dark' : 'background'}>
      <nav>
        <ul>
          <li style={ruta === '/' ? {borderTop: `3px solid ${specialColor}`} : {}}>
            <Link to="/" className="flex">
              <svg width="25" height="25" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path className={darkMode ? 'text-secondary-dark' : 'text-secondary'} style={ruta === '/' ? {fill: `${specialColor}`} : {}}  d="M9.78732 21.3061V14.6394H15.1207V21.3061C15.1207 22.0394 15.7207 22.6394 16.454 22.6394H20.454C21.1873 22.6394 21.7873 22.0394 21.7873 21.3061V11.9727H24.054C24.6673 11.9727 24.9607 11.2127 24.494 10.8127L13.3473 0.772739C12.8407 0.319406 12.0673 0.319406 11.5607 0.772739L0.413988 10.8127C-0.0393451 11.2127 0.240655 11.9727 0.853988 11.9727H3.12065V21.3061C3.12065 22.0394 3.72065 22.6394 4.45399 22.6394H8.45399C9.18732 22.6394 9.78732 22.0394 9.78732 21.3061Z" fill="#544A4A"/>
              </svg>
              <span className={darkMode ? 'text-secondary-dark' : 'text-secondary'} style={ruta === '/' ? {color: `${specialColor}`} : {}} >Inicio</span>
            </Link>
          </li>
          <li style={ruta === '/mapa' ? {borderTop: `3px solid ${specialColor}`} : {}}>
            <Link to="/mapa" className="flex">
              <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path className={darkMode ? 'text-secondary-dark' : 'text-secondary'} style={ruta === '/mapa' ? {fill: `${specialColor}`} : {}} d="M24.2873 0.972778L24.074 1.01278L16.954 3.77278L8.95398 0.972778L1.43398 3.50611C1.15398 3.59945 0.953979 3.83945 0.953979 4.14611V24.3061C0.953979 24.6794 1.24731 24.9728 1.62065 24.9728L1.83398 24.9328L8.95398 22.1728L16.954 24.9728L24.474 22.4394C24.754 22.3461 24.954 22.1061 24.954 21.7994V1.63945C24.954 1.26611 24.6606 0.972778 24.2873 0.972778ZM16.954 22.3061L8.95398 19.4928V3.63945L16.954 6.45278V22.3061Z" fill="#544A4A"/>
              </svg>
              <span className={darkMode ? 'text-secondary-dark' : 'text-secondary'} style={ruta === '/mapa' ? {color: `${specialColor}`} : {}}>Mapa</span>
            </Link>
          </li>
          <li style={ruta === '/busqueda' ? {borderTop: `3px solid ${specialColor}`} : {}}>
            <Link to="/busqueda" className="flex">
              <svg width="30" height="30" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path className={darkMode ? 'text-secondary-dark' : 'text-secondary'} style={ruta === '/busqueda' ? {fill: `${specialColor}`} : {}} d="M28.454 4.97278L4.45398 15.0128V16.3194L13.574 19.8528L17.094 28.9728H18.4006L28.454 4.97278Z" fill="#544A4A"/>
              </svg>
              <span className={darkMode ? 'text-secondary-dark' : 'text-secondary'} style={ruta === '/busqueda' ? {color: `${specialColor}`} : {}}>Explorar</span>
            </Link>
          </li>
          <li style={ruta === '/nosotros' ? {borderTop: `3px solid ${specialColor}`} : {}}>
            <Link to="/api" className="flex">
              <svg width="25" height="25" viewBox="0 0 27 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path className={darkMode ? 'text-secondary-dark' : 'text-secondary'} style={ruta === '/nosotros' ? {fill: `${specialColor}`} : {}} d="M13.454 0.639404C6.094 0.639404 0.120667 6.61274 0.120667 13.9727C0.120667 21.3327 6.094 27.3061 13.454 27.3061C20.814 27.3061 26.7873 21.3327 26.7873 13.9727C26.7873 6.61274 20.814 0.639404 13.454 0.639404ZM13.454 4.6394C15.6673 4.6394 17.454 6.42607 17.454 8.6394C17.454 10.8527 15.6673 12.6394 13.454 12.6394C11.2407 12.6394 9.454 10.8527 9.454 8.6394C9.454 6.42607 11.2407 4.6394 13.454 4.6394ZM13.454 23.5727C11.8698 23.5727 10.3102 23.1807 8.91437 22.4316C7.5185 21.6825 6.3297 20.5996 5.454 19.2794C5.494 16.6261 10.7873 15.1727 13.454 15.1727C16.1073 15.1727 21.414 16.6261 21.454 19.2794C20.5783 20.5996 19.3895 21.6825 17.9936 22.4316C16.5978 23.1807 15.0382 23.5727 13.454 23.5727Z" fill="#544A4A"/>
              </svg>
              <span className={darkMode ? 'text-secondary-dark' : 'text-secondary'} style={ruta === '/nosotros' ? {color: `${specialColor}`} : {}}>API</span>
            </Link>
          </li>
        </ul>
      </nav>
      
    </HeaderMobileContainer>
  );
}
 
export default withRouter(HeaderMobile);

