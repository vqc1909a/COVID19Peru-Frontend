import React, {useContext, useMemo, Fragment, useState, useEffect, useRef} from 'react';
import {DarkModeContext} from '../context/DarkModeContext';
import {DepartamentoContext} from '../context/DepartamentoContext';
import styled from '@emotion/styled';
import MapDepartamento from '../components/Departamento/MapDepartamento';
import MapDepartamentoDesktop from '../components/Departamento/MapDepartamentoDesktop';
import ContentHome from '../components/Home/ContentHome';
import TableDepartamento from '../components/Departamento/TableDepartamento';
import DetailsHeaderHome from '../components/Home/DetailsHeaderHome';
import DetailsTotalHome from '../components/Home/DetailsTotalHome';
import DetailsEtapaHome from '../components/Home/DetailsEtapaHome';
import BigSpinner from '../components/BigSpinner';
import ScrollUp from '../components/ScrollUp';
import Footer from '../components/layouts/Footer';
import useSeo from '../hooks/useSeo';

const DepartamentView = (props) => {

  const departamentViewRef = useRef();
  const {isDarkMode} = useContext(DarkModeContext);  
  const {departamento, provincia, mapaDepartamento, latLngCenter, nivelZoom, nivelZoomDesktop, latLngCenterDesktop} = useContext(DepartamentoContext);  
  const [provinciasOrdenadas, setProvinciasOrdenadas] = useState([]);

  useSeo({title: `${departamento.name} | API Covid19 - Perú`})


 
 const Section1Container = useMemo(()=> {
    return styled.section`
      transition: background-color .5s ease-in-out;
      .container{
        width: 100%;
        min-height: 90vh;
        display: flex;
        flex-wrap: wrap;
        @media (min-width: 992px){
          width: 95%;
          margin-left: 5%;
        }        
        .map-home-wrapper{
          flex: 1 1 384px;
          order: 1;
          @media (min-width: 768px){
            order: 2
          }
        }
        .map-home, .big-spinner{
        };
        .big-spinner{
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .big-spinner1{
          display: block;
          @media (min-width: 768px){
            display: none;
          }         
        }
        .big-spinner2{
          display: none;
          @media (min-width: 768px){
            display: block;
          }         
        }
        .content-home{
          flex: 1 1 384px;
          order: 2;
          @media (min-width: 768px){
            order: 1
          }
        }
      }
     
    `
  }, []);

  const Section2Container = useMemo(()=> {
    return styled.section`
      transition: background-color .5s ease-in-out;
      position: relative;
      .container{
        width: 100%;
        min-height: 90vh;
        display: flex;
        flex-wrap: wrap;
        @media (min-width: 992px){
          min-height: 90vh;
          width: 90%;
        }        
        .details-total{
          flex: 1 1 38.4rem;
          @media (min-width: 768px){
            padding-bottom: 10vh
          }
          @media (min-width: 992px){
            padding-bottom: 0;  
          }
          margin-bottom: 2rem;
          >span{
            margin-bottom: 0rem;
            @media (min-width: 768px){
              padding-bottom: .5rem;
            }
          }

        };
        .details-etapa{
          flex: 1 1 38.4rem;
          padding-bottom: 10vh;
          @media (min-width: 992px){
            padding-bottom: 0;
          }
           margin-bottom: 2rem;
        }
      }
    `
  }, []);

  useEffect(()=>{
    if(Object.keys(departamento).length !== 0){
      let provincias = departamento.provincias.sort((a, b) => b.positivos - a.positivos).slice(0, 5)
      setProvinciasOrdenadas(provincias);
    }
  }, [departamento])
  
  return (
    <div ref={departamentViewRef}>
      <Section1Container className={isDarkMode ? 'background-dark' : 'background'}>
        <div className="container">
          <ContentHome peru={departamento} provincia={provincia} departamentViewRef={departamentViewRef}></ContentHome>
          <div className="map-home-wrapper">
            <MapDepartamento departamento={departamento} provincia={provincia} mapa={mapaDepartamento} latLngCenter={latLngCenter} nivelZoom={nivelZoom}></MapDepartamento>
            <MapDepartamentoDesktop departamento={departamento} provincia={provincia} mapa={mapaDepartamento} latLngCenterDesktop={latLngCenterDesktop} nivelZoomDesktop={nivelZoomDesktop}></MapDepartamentoDesktop>
            <TableDepartamento isDarkMode={isDarkMode} provinciasOrdenadas={provinciasOrdenadas} departamento={departamento}></TableDepartamento>
          </div>
        </div>  
      </Section1Container>
      <Section2Container className={isDarkMode ? 'background-dark' : 'background'}>
        <DetailsHeaderHome></DetailsHeaderHome>
        <div className="container">
          {Object.keys(departamento).length !== 0
          ?
          <Fragment>
            <DetailsTotalHome peru={departamento} provincia={provincia}></DetailsTotalHome> 
            <DetailsEtapaHome peru={departamento} provincia={provincia}></DetailsEtapaHome>
          </Fragment>
          :
          <BigSpinner></BigSpinner>
          }
        </div>
      
        <ScrollUp></ScrollUp>
        <Footer></Footer>
      </Section2Container>
    </div>
  );
}
 
export default DepartamentView;