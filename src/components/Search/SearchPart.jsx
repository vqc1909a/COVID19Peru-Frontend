import styled from '@emotion/styled';
import { useMemo, useState, useContext, useEffect } from 'react';
import InputDropdown from '../InputDropdown';
import SmallSpinner from '../SmallSpinner';
import {DepartamentoContext} from '../../context/DepartamentoContext';
import {useHistory} from 'react-router-dom';
import React from 'react';
const SearchPart = ({ isDarkMode, searViewRef}) => {
  const {departamentos, setProvincia, setDepartamento, departamento} = useContext(DepartamentoContext);
  const [result, setResult] = useState({});
  const [cargando, setCargando] = useState(false);
  const history = useHistory();

  const encontrarDepartamento = (provincia) => {
      const departamento = departamentos.find((depa) => {
        //No es necesario el toLowerCase porque el nombre d ela provincia es de base de datos y la busquedas es también de los datos obtenidos de la base de datos
        return depa.provincias.some(prov => prov.name.toLowerCase() === provincia.name.toLowerCase());
      })
      setDepartamento({...departamento})
  }

  const SectionStyled = useMemo(
    () =>
      styled.section`
        width: 100%;
        .search-title {
          font-weight: 500;
          margin-top: 75px;
          text-align: center;
          width: 100%;
          color: 1000ee;

          @media (min-width: 992px) {
            margin-top: 56px;
            font-weight: bold;
          }
        }

        .search-instruction-container {
          margin-top: 48px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: flex-start;

          @media (min-width: 992px) {
            align-items: center;
          }

          p {
            margin: 2rem 0;
            @media (min-width: 992px) {
              display: none;
            }
          }
        }

        .no-results-container {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          margin: 2rem 0 2rem;

          p {
            margin-top: 16px;
            text-align: center;

            @media (min-width: 992px) {
              max-width: 438px;
            }
          }

          @media (min-width: 992px) {
            margin-top: 48px;
          }
        }

        .results-container {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin: 4rem 0 2rem;
          > p {
            margin-bottom: 1rem;
            text-transform: uppercase;
          }
          div {
            p {
              font-weight: bold;
              text-align: center;
              margin: 8px 0;
            }

            span {
              text-align: center;
            }

            .btn {
              margin-top: 16px;
            }
          }
        }
        .spinner-wrapper{
          height: 10vh;
          margin: 3rem 0;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `,
    []
  );
  
  const redirigirDepartamento = (url) => {
    history.push(`/departamento/${url}`)
  }

  useEffect(()=>{
    if(Object.keys(result).length !== 0){
      //Si lo seleccionado es un departamento, selecciono departamento, caso contrario hago la busqueda del departamento por la provincia elegida
      if(result.type === "Departamento"){
          setDepartamento({...result});
          setProvincia({});
      }else{     
          setProvincia({...result});
          encontrarDepartamento(result);
      }
    }
    // eslint-disable-next-line
  }, [result]);

  return (
    <SectionStyled>
      <h1
        className={`search-title text-l ${
          isDarkMode ? 'text-primary-dark' : 'text-primary'
        }`}
      >
        EXPLORAR
      </h1>
      <div className="search-instruction-container">
        <p className={` ${isDarkMode ? 'text-primary-dark' : 'text-primary'}`}>
          Busca un departamento o provincia
        </p>
        <InputDropdown setResult={setResult} setCargando={setCargando} searViewRef={searViewRef} />
      </div>

      {Object.keys(result).length === 0 ? (
        <div className="no-results-container">
          <svg
            width="86"
            height="86"
            viewBox="0 0 86 86"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M55.8498 50.2234H53.0519L52.0602 49.2671C55.651 45.1022 57.6246 39.785 57.6207 34.2859C57.6207 29.7328 56.2705 25.2819 53.741 21.4962C51.2114 17.7104 47.616 14.7598 43.4095 13.0174C39.203 11.275 34.5743 10.8191 30.1087 11.7074C25.6431 12.5956 21.5412 14.7881 18.3216 18.0077C15.1021 21.2272 12.9096 25.3291 12.0213 29.7947C11.1331 34.2603 11.589 38.889 13.3313 43.0956C15.0737 47.3021 18.0244 50.8974 21.8101 53.427C25.5959 55.9566 30.0467 57.3067 34.5998 57.3067C40.3019 57.3067 45.5436 55.2171 49.5811 51.7463L50.5373 52.7379V55.5359L68.2457 73.2088L73.5228 67.9317L55.8498 50.2234ZM34.5998 50.2234C25.7811 50.2234 18.6623 43.1046 18.6623 34.2859C18.6623 25.4671 25.7811 18.3484 34.5998 18.3484C43.4186 18.3484 50.5373 25.4671 50.5373 34.2859C50.5373 43.1046 43.4186 50.2234 34.5998 50.2234Z"
              fill="#877777"
            />
          </svg>
          <p
            className={`text-normal ${
              isDarkMode ? 'text-secondary-dark' : 'text-secondary'
            }`}
          >
            Aquí aparecerán algunos detalles del departamento o provincia que
            elijas.
          </p>
        </div>
      ) : (
        !cargando
        ?
        <div className={`results-container`}>
          <p
            className={`text-small ${
              isDarkMode ? 'text-secondary-dark' : 'text-secondary'
            }`}
          >
            {result.type} DE {result.name}
          </p>
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
          <div>
           

            <p
              className={`text-l ${
                isDarkMode ? 'text-secondary-dark' : 'text-secondary'
              }`}
            >
              {result.positivos}
            </p>
            <span
              className={`text-medium ${
                isDarkMode ? 'text-secondary-dark' : 'text-secondary'
              }`}
            >
              Casos positivos
            </span>
          </div>
          <div>
            <button
              type="button"
              className={` btn ${isDarkMode ? 'button-dark' : ''}`}
              onClick={() => redirigirDepartamento(departamento.url)}
            >
              Más detalles
            </button>
          </div>
        </div>
        :
        <div className="spinner-wrapper">
          <SmallSpinner></SmallSpinner>
        </div>
      )}
      {/* <div style={{backgroundColor: "white", height: "500px"}}></div> */}

    </SectionStyled>
  );
};

export default SearchPart;
