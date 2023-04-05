import React, {useMemo, useContext, Fragment} from 'react';
import styled from '@emotion/styled';
import ContentHome from '../components/Home/ContentHome';
import MapHome from '../components/Home/MapHome';
import {DarkModeContext} from '../context/DarkModeContext';
import {PeruContext} from '../context/PeruContext';
import BigSpinner from '../components/BigSpinner';
import DetailsHeaderHome from '../components/Home/DetailsHeaderHome';
import DetailsTotalHome from '../components/Home/DetailsTotalHome';
import DetailsEtapaHome from '../components/Home/DetailsEtapaHome';
import ScrollUp from '../components/ScrollUp';
import Footer from '../components/layouts/Footer';
import useSeo from '../hooks/useSeo';


const Home = () => {
  const {darkMode} = useContext(DarkModeContext);  
  const {peru} = useContext(PeruContext);

  useSeo({title: "API Covid19 - Perú", description: "Servicio de API, que te provee toda la información necesaria sobre el estado del COVID-19 a nivel nacional, departamental y provincial en el Perú"})
  
  const Section1Container = useMemo(()=> {
    return styled.section`
      transition: background-color .5s ease-in-out;
      .container{
        width: 100%;
        min-height: 90vh;
        display: flex;
        @media (min-width: 992px){
          width: 95%;
          margin-right: 5%;
        }        
        .map-home, .big-spinner{
          flex: 1;
          display: none;
          @media (min-width: 992px){
            display:block;
          }
        };
        .big-spinner{
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .content-home{
          flex: 1;
          margin: 2rem 0
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
            margin-bottom: 2rem;
          }

        };
        .details-etapa{
          flex: 1 1 38.4rem;
          padding-bottom: 10vh;
          @media (min-width: 992px){
            padding-bottom: 0;
            margin-bottom: 2rem;
          }
        }
      }
    `
  }, []);

 

  return (
    <Fragment>
      <Section1Container className={darkMode ? 'background-dark' : 'background'}>
        <div className="container">
          <MapHome result={peru}></MapHome>
          <ContentHome result={peru} provincia={{}}></ContentHome>
        </div>
      </Section1Container>
      <Section2Container className={darkMode ? 'background-dark' : 'background'}>
        <DetailsHeaderHome></DetailsHeaderHome>
        <div className="container">
          {Object.keys(peru).length !== 0
          ?
          <Fragment>
            <DetailsTotalHome result={peru} provincia={{}}></DetailsTotalHome> 
            <DetailsEtapaHome result={peru} provincia={{}}></DetailsEtapaHome>
          </Fragment> 
          :
          <BigSpinner></BigSpinner>
          }
        </div>
        <ScrollUp></ScrollUp>
        <Footer></Footer>
      </Section2Container>
    </Fragment>

   
  );
}
 
export default Home;