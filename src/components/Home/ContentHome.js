import React, { useContext, useMemo, Fragment} from 'react';
import styled from '@emotion/styled';
import DarkMode from '../DarkMode';
import Return from '../Return';
import { DarkModeContext } from '../../context/DarkModeContext';
import FooterMobile from '../layouts/FooterMobile';
import {numberWithComas} from '../../helpers'
import {DepartamentoContext} from '../../context/DepartamentoContext';
import InputDropdownDepartamento from '../InputDropdownDepartamento';
import BigSpinner from '../BigSpinner';
import SmallSpinner from '../SmallSpinner';
import { useLocation } from "react-router-dom";

const ContentHome = ({peru, provincia}) => {
  const {pathname} = useLocation();
  const {departamento, loadingDataProvincia, setLoadingDataProvincia} = useContext(DepartamentoContext);
  const { isDarkMode } = useContext(DarkModeContext);

  if(Object.keys(provincia).length !== 0){
    peru = provincia
  }
  const ContentHomeContainer = useMemo(() => {
    return styled.div`
      position: relative;
      transition: all 0.5s ease-in-out;
      .wrapper-input1{
        width: 80%;
        margin: 2rem auto 0;
      }
      .wrapper-input2{
        width: 80%;
        margin: 0 auto 2rem;
      }
      path,
      p
      {
        transition: all 0.5s ease-in-out;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      h1 {
        margin: 2rem 0;
        text-align: center;
        span {
          display: inline-block;
          margin: 0.5rem 0;
          font-family: 'Rubik Light';
        }
        
      }
      h2 {
        display: none;
        margin: 2rem 0;
        @media (min-width: 992px) {
          display: block;
        }
      }
      .casos-positivos {
        align-self: stretch;
        p {
          font-family: 'Rubik Bold';
          margin: 1rem 0;
        }
        span{
          font-family: 'Rubik Regular';
        }
      }
      .casos-especificos {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        margin: 2rem 0;
        align-self: stretch;
        div {
          margin: 1rem 0;
          flex: 1 1 16rem;
        }
        @media (min-width: 768px) {
          margin: 2.5rem 0;
          div {
            margin: 1.5rem 0;
              flex: 1 1 12rem;
          }
        }
        
        p {
          font-family: 'Rubik SemiBold';
          margin: 1rem 0;
        }
      }
      button{
        margin-top: 3rem;
        @media (min-width: 768px) {
          margin-top: 0rem;
        }
      }
      .small-spinner-wrapper{
        margin: 8rem 0;
      }
      .big-spinner-wrapper{
        margin: 4.2rem 0;
      }
    `;
  }, []);

  const scrollDown = () => {
    window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'})
  }

  return (
    <ContentHomeContainer
      className={`content-home flex ${
        isDarkMode
          ? 'background-dark text-primary-dark'
          : 'background text-primary'
      }`}
      style={(pathname !== '/' & window.innerWidth < 992) ? {paddingBottom: "10vh"} : {}}
    >
      {/* Icono DarkMode para celular */}
      <DarkMode></DarkMode>
      {/* Icono de retorno en las paginas de departamento */}
      {pathname.search(/departamento/ig) !== -1 ? <Return></Return> : ""}

      {(pathname !== "/" & window.innerWidth <= 768) ? <div className="wrapper-input1"><InputDropdownDepartamento darkMode={isDarkMode} setLoading={setLoadingDataProvincia}></InputDropdownDepartamento></div> : ""}
      
      <h1 className="text-big">
        <span
          className={`text-medium ${
            isDarkMode ? 'text-secondary-dark' : 'text-secondary'
          }`}
        >
          {Object.keys(provincia).length !== 0  ? provincia.name.toUpperCase() : "Estado del covid-19"}
        </span>
        {/* Dependiendo de la ruta, pintamos el nombre del pais peru o departamento */}
        <br></br> {pathname === '/' ? (Object.keys(peru).length !== 0  ? peru.name.toUpperCase() : "...Cargando") : (!Object.keys(departamento).length ? departamento.name.toUpperCase() : "...Cargando")}
      </h1>
      {(pathname !== "/" & window.innerWidth > 768) ? <div className="wrapper-input2"><InputDropdownDepartamento  darkMode={isDarkMode} setLoading={setLoadingDataProvincia}></InputDropdownDepartamento></div> : ""}
      
      {!loadingDataProvincia
      ?
      <Fragment>
        <div className="casos-positivos flex">
        <svg
          width="65"
          height="65"
          viewBox="0 0 65 65"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0)">
            <path
              className={isDarkMode ? 'special-color-dark' : 'special-color'}
              d="M48.454 19.2801C47.7713 19.2801 47.0886 19.0187 46.5686 18.4987C45.526 17.4561 45.526 15.7707 46.5686 14.7281L52.2246 9.07207C53.2673 8.0294 54.9526 8.0294 55.9953 9.07207C57.038 10.1147 57.038 11.8001 55.9953 12.8427L50.3393 18.4987C49.8193 19.0187 49.1366 19.2801 48.454 19.2801Z"
              fill="#B51D1D"
            />
            <path
              className={isDarkMode ? 'special-color-dark' : 'special-color'}
              d="M61.7873 35.2801H58.454C56.9793 35.2801 55.7873 34.0855 55.7873 32.6134C55.7873 31.1414 56.9793 29.9468 58.454 29.9468H61.7873C63.262 29.9468 64.454 31.1414 64.454 32.6134C64.454 34.0855 63.262 35.2801 61.7873 35.2801Z"
              fill="#B51D1D"
            />
            <path
              className={isDarkMode ? 'special-color-dark' : 'special-color'}
              fillRule="evenodd"
              clipRule="evenodd"
              d="M13.7873 50.6134C13.7873 51.7174 14.6833 52.6134 15.7873 52.6134H49.1206C50.2246 52.6134 51.1206 51.7174 51.1206 50.6134V37.9467C51.1206 27.6534 42.7446 19.28 32.454 19.28C22.1633 19.28 13.7873 27.6534 13.7873 37.9467V50.6134ZM19.1207 37.9467C19.1207 39.4187 20.3127 40.6134 21.7873 40.6134C23.262 40.6134 24.454 39.4187 24.454 37.9467C24.454 33.5361 28.0433 29.9467 32.454 29.9467C33.9287 29.9467 35.1207 28.7521 35.1207 27.2801C35.1207 25.8081 33.9287 24.6134 32.454 24.6134C25.102 24.6134 19.1207 30.5947 19.1207 37.9467Z"
              fill="#B51D1D"
            />
            <path
              className={isDarkMode ? 'special-color-dark' : 'special-color'}
              d="M32.454 13.9467C30.9793 13.9467 29.7873 12.7521 29.7873 11.2801V3.28007C29.7873 1.80807 30.9793 0.613403 32.454 0.613403C33.9286 0.613403 35.1206 1.80807 35.1206 3.28007V11.2801C35.1206 12.7521 33.9286 13.9467 32.454 13.9467Z"
              fill="#B51D1D"
            />
            <path
              d="M16.4539 19.2801C15.7713 19.2801 15.0886 19.0187 14.5686 18.4987L8.91262 12.8427C7.86995 11.8001 7.86995 10.1147 8.91262 9.07207C9.95528 8.0294 11.6406 8.0294 12.6833 9.07207L18.3393 14.7281C19.3819 15.7707 19.3819 17.4561 18.3393 18.4987C17.8193 19.0187 17.1366 19.2801 16.4539 19.2801Z"
              fill="#FFC107"
            />
            <path
              d="M5.78731 35.2801H3.12065C1.64598 35.2801 0.453979 34.0855 0.453979 32.6134C0.453979 31.1414 1.64598 29.9468 3.12065 29.9468H5.78731C7.26198 29.9468 8.45398 31.1414 8.45398 32.6134C8.45398 34.0855 7.26198 35.2801 5.78731 35.2801Z"
              fill="#FFC107"
            />
            <path
              className={isDarkMode ? 'special-color-dark' : 'special-color'}
              d="M59.7873 64.6134H5.12065C2.54731 64.6134 0.453979 62.5201 0.453979 59.9467V53.2801C0.453979 50.7067 2.54731 48.6134 5.12065 48.6134H59.7873C62.3606 48.6134 64.454 50.7067 64.454 53.2801V59.9467C64.454 62.5201 62.3606 64.6134 59.7873 64.6134Z"
              fill="#B51D1D"
            />
            <path
              className={isDarkMode ? 'special-color-dark' : 'special-color'}
              d="M10.7979 8.29071C10.1153 8.29071 9.43262 8.55204 8.91262 9.07204C7.86995 10.1147 7.86995 11.8 8.91262 12.8427L14.5686 18.4987C15.0886 19.0187 15.7713 19.28 16.4539 19.28C17.1366 19.28 17.8193 19.0187 18.3393 18.4987C19.3819 17.456 19.3819 15.7707 18.3393 14.728L12.6833 9.07204C12.1633 8.55204 11.4806 8.29071 10.7979 8.29071Z"
              fill="#B51D1D"
            />
            <path
              className={isDarkMode ? 'special-color-dark' : 'special-color'}
              d="M5.78731 29.9468H3.12065C1.64598 29.9468 0.453979 31.1414 0.453979 32.6134C0.453979 34.0855 1.64598 35.2801 3.12065 35.2801H5.78731C7.26198 35.2801 8.45398 34.0855 8.45398 32.6134C8.45398 31.1414 7.26198 29.9468 5.78731 29.9468Z"
              fill="#B51D1D"
            />
          </g>
          <defs>
            <clipPath id="clip0">
              <rect
                width="64"
                height="64"
                fill="white"
                transform="translate(0.453979 0.613403)"
              />
            </clipPath>
          </defs>
        </svg>
        <p
          className={`text-xl ${
            isDarkMode ? 'special-color-dark' : 'special-color'
          }`}
        >
          {Object.keys(peru).length !== 0 ? numberWithComas(peru.positivos) : "...Cargando"}
        </p>
        <span className={`text-normal`}>Casos Positivos</span>
      </div>
      <div className="casos-especificos">
        <div className="mujeres flex">
          <svg
            width="23"
            height="33"
            viewBox="0 0 23 33"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className={`text-big ${
                isDarkMode ? 'text-primary-dark' : 'text-primary'
              }`}
              d="M22.3188 11.4767C22.3188 5.48917 17.444 0.613403 11.4555 0.613403C5.46494 0.613403 0.589172 5.48817 0.589172 11.4767C0.589172 16.685 4.27004 21.049 9.16885 22.0976V24.6257H6.75199C5.58814 24.6257 4.64464 25.5772 4.64464 26.739C4.64464 27.9029 5.58814 28.8534 6.75199 28.8534H9.16885V30.506C9.16885 31.6699 10.1204 32.6134 11.2842 32.6134C12.4481 32.6134 13.3986 31.6719 13.3986 30.506V28.8534H15.9366C17.0995 28.8534 18.043 27.9029 18.043 26.739C18.043 25.5772 17.1005 24.6257 15.9366 24.6257H13.3986V22.1678C18.4316 21.2513 22.3188 16.8042 22.3188 11.4767ZM4.80489 11.4767C4.80489 7.80987 7.78764 4.82912 11.4525 4.82912C15.1193 4.82912 18.0991 7.80987 18.0991 11.4767C18.0991 15.1426 15.1183 18.1263 11.4525 18.1263C7.78664 18.1253 4.80489 15.1426 4.80489 11.4767Z"
              fill="#100E0E"
            />
          </svg>
          <p
            className={`text-big ${
              isDarkMode ? 'text-primary-dark' : 'text-primary'
            }`}
          >
            {Object.keys(peru).length !== 0 ? numberWithComas(peru.mujeres_infectados) : "...Cargando"}
          </p>
          <span className={`text-normal`}>Mujeres</span>
        </div>
        <div className="varones flex">
          <svg
            width="33"
            height="33"
            viewBox="0 0 33 33"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0)">
              <path
                className={`text-big ${
                  isDarkMode ? 'text-primary-dark' : 'text-primary'
                }`}
                d="M21.2587 15.1419L28.9477 7.45287V15.6381C28.9477 16.1909 29.1718 16.6923 29.5342 17.0548C29.8967 17.4172 30.3981 17.6419 30.9508 17.6413C32.0576 17.6413 32.9546 16.7443 32.9546 15.6375V2.61653C32.9546 1.51104 32.057 0.612754 30.9508 0.613404H17.9292C16.8225 0.613404 15.9255 1.51039 15.9255 2.61718C15.9248 3.72267 16.8231 4.62095 17.9286 4.62031H26.1139L18.4255 12.3087C14.0854 9.30726 8.07341 9.73399 4.21265 13.5954C-0.131999 17.9401 -0.131999 25.0101 4.21265 29.3548C8.5573 33.6994 15.6273 33.6994 19.972 29.3548C23.8334 25.494 24.2601 19.482 21.2587 15.1419ZM7.04586 26.5215C4.26331 23.739 4.26331 19.2112 7.04586 16.428C9.82841 13.6448 14.3562 13.6454 17.1394 16.428C19.9226 19.2105 19.922 23.7383 17.1394 26.5215C14.3569 29.3047 9.82841 29.3047 7.04586 26.5215Z"
                fill="#100E0E"
              />
            </g>
            <defs>
              <clipPath id="clip0">
                <rect
                  width="32"
                  height="32"
                  fill="white"
                  transform="translate(0.953979 0.613403)"
                />
              </clipPath>
            </defs>
          </svg>
          <p
            className={`text-big ${
              isDarkMode ? 'text-primary-dark' : 'text-primary'
            }`}
          >
            {Object.keys(peru).length !== 0 ? numberWithComas(peru.hombres_infectados) : "...Cargando"}
          </p>
          <span className={`text-normal`}>Varones</span>
        </div>
        <div className="fallecidos flex">
          <svg
            width="24"
            height="33"
            viewBox="0 0 24 33"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className={`text-big ${
                isDarkMode ? 'text-primary-dark' : 'text-primary'
              }`}
              d="M20.4347 23.6134H3.47321V26.8634H20.4347V23.6134Z"
              fill="#100E0E"
            />
            <path
              className={`text-big ${
                isDarkMode ? 'text-primary-dark' : 'text-primary'
              }`}
              d="M8.90262 21.7384H15.0054V11.5844H20.1655V5.48172H15.0054V0.613403H8.90262V5.48172H3.74249V11.5844H8.90262V21.7384Z"
              fill="#100E0E"
            />
            <path
              className={`text-big ${
                isDarkMode ? 'text-primary-dark' : 'text-primary'
              }`}
              d="M23.829 28.7384H0.0789795V32.6134H23.829V28.7384Z"
              fill="#100E0E"
            />
          </svg>
          <p
            className={`text-big ${
              isDarkMode ? 'text-primary-dark' : 'text-primary'
            }`}
          >
            {Object.keys(peru).length !== 0 ? numberWithComas(peru.fallecidos) : "...Cargando"}
          </p>
          <span className={`text-normal`}>Fallecidos</span>
        </div>
      </div>
      <button onClick={() => scrollDown()} type="button" className={isDarkMode ? 'button-dark' : ''}>
        Más detalles
      </button>
      </Fragment>
      :
        window.innerWidth >= 768
        ?
        <div className="big-spinner-wrapper">
          <BigSpinner></BigSpinner>
        </div>
        :
        <div className="small-spinner-wrapper">
          <SmallSpinner></SmallSpinner>
        </div>
        
      }
      <FooterMobile></FooterMobile>
    </ContentHomeContainer>
  );
};

export default ContentHome;
