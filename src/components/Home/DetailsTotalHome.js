import React, {useMemo, useContext, Fragment, useState, useEffect} from 'react';
import styled from '@emotion/styled';
import {DarkModeContext} from '../../context/DarkModeContext';
import {DepartamentoContext} from '../../context/DepartamentoContext';
import BigSpinner from '../../components/BigSpinner';
import SmallSpinner from '../../components/SmallSpinner';
import Chart from 'react-apexcharts'


const DetailsTotalHome = ({result, provincia}) => {

  
  if(Object.keys(provincia).length !== 0){
    result = provincia
  }
 

  const {darkMode} = useContext(DarkModeContext);
  const {loadingDataProvincia} = useContext(DepartamentoContext);

  const [rojo, changeRojo] = useState("#B51D1D");
  const [blanco, changeBlanco] = useState("#DED8D8");

  useEffect(()=>{
    if(darkMode){
      changeRojo("#df3333");
      changeBlanco("#3a2d2d");
    }else{
      changeRojo("#B51D1D");
      changeBlanco("#DED8D8");
    }

  }, [darkMode])


  const infectados = result.positivos;
  const no_infectados = result.poblacion - infectados;

  const DetailsTotalHomeContainer = useMemo(()=>{
    return styled.div`
      text-align: center;
      transition: all .5s ease-ease-in-out;

      h2{
        font-family: "Rubik SemiBold";
        margin: 2rem 0;
        transition: color .5s ease-ease-in-out;
      }
     .grafico{
        position: relative;
        /* .chartjs-render-monitor{
          width:  100% !important;
          height:  100% !important;

        } */
        .porcentaje_infectados{
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          p{
            font-family: "Rubik Medium";
            margin-bottom: .5rem;
            transition: color .5s ease-ease-in-out;
          }
          span{
            font-family: "Rubik Medium", sans-serif;
          }
        }
      }
      .small-spinner-wrapper{
        margin: 6rem 0;
      }
    `
  }, [])

  const data = {
    series: [infectados, no_infectados],
    options: {
      chart: {
        type: 'donut'
      },
      labels: ["Infectados", "No Infectados"],
      colors: [rojo, blanco],
      stroke: {
         show: false,
      },
      fill: {
        colors: [rojo, blanco],
        type: 'solid',
        gradient: {
            shade: 'dark',
            type: "horizontal",
            shadeIntensity: 0.5,
            gradientToColors: undefined,
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 50, 100],
            colorStops: []
        },
      },
      plotOptions: {
        pie: {
            expandOnClick: false,
            donut: {
                size: '80%'
            }
        }
      },
      legend: {
          show: false
      },
      responsive: [ 
         {
            breakpoint: 576,
            options: {
                chart: {
                    width: "210",
                    height: "210"
                }
            }
        },
        {
            breakpoint: 768,
            options: {
                chart: {
                    width: "250",
                    height: "250"
                }
            }
        }
      ],
      dataLabels: {
        style: {
            fontSize: '16px',
            fontFamily: 'Arial, Helvetica,sans-serif',
            fontWeight: 'light',
            colors: ['#000', '#000']
        },
        background: {
            enabled: true,
            foreColor: '#fff',
            padding: 6,
            borderRadius: 2,
            borderWidth: 1,
            borderColor: '#fff',
            opacity: 0.6,
            dropShadow: {
                enabled: false,
                top: 1,
                left: 1,
                blur: 1,
                color: '#000',
                opacity: 0.45
            }
        }
      }
    }
  };



  

  return (
    <DetailsTotalHomeContainer className="details-total flex">
     <h2 className={`text-big ${darkMode ? 'text-primary-dark' : 'text-primary'}`}>Porcentaje de la población<br></br>infectada</h2>
        {!loadingDataProvincia 
        ?
          <div className="grafico">
              <Chart options={data.options} series={data.series} type="donut" width="350" height="350"></Chart>
             
              <div className="porcentaje_infectados flex">
                  <p className={`text-l ${darkMode ? 'text-primary-dark' : 'text-primary'}`}>{((infectados / result.poblacion) * 100).toFixed(2)}%</p>
                  <span className={`text-normal ${darkMode ? 'text-primary-dark' : 'text-primary'}`}>INFECTADOS</span>
              </div>
          </div>  
        :
          <Fragment>
            <BigSpinner></BigSpinner>
            <div className="small-spinner-wrapper">
              <SmallSpinner></SmallSpinner>
            </div>
          </Fragment>
        }
    </DetailsTotalHomeContainer>
  );
}
 
export default DetailsTotalHome;