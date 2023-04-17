import React, {useMemo, useContext, Fragment} from 'react';
import styled from '@emotion/styled';
import {DarkModeContext} from '../../context/DarkModeContext';
import {DepartamentoContext} from '../../context/DepartamentoContext';
import BigSpinner from '../../components/BigSpinner';
import SmallSpinner from '../../components/SmallSpinner';
import Chart from 'react-apexcharts'


const DetailsEtapaHome = ({peru, provincia}) => {
  if(Object.keys(provincia).length !== 0){
    peru = provincia
  }
  const {isDarkMode} = useContext(DarkModeContext); 
  const {loadingDataProvincia} = useContext(DepartamentoContext);

  const DetailsEtapaHomeContainer = useMemo(()=>{
    return styled.div`
      text-align: center;
      transition: all .5s ease-ease-in-out;
      h2{
        font-family: "Rubik SemiBold";
        margin: 2rem 0;
        transition: color .5s ease-ease-in-out;
      }
      .grafico-details-etapa{
        display: flex;
        align-items: center;
        .grafico{
          flex: 2;
          display: flex;
          align-items: center;
        }
        .cero-muertos{
          font-family: "Rubik Medium", sans-serif;
          margin: 0 1rem;
         @media (min-width: 768px) {
          margin: 0 2rem;
         }  
        }
        .leyenda{
          flex: 1;
          /* margin-left: 2rem; */
          .etapa{
            margin: .5rem 0;
            display:flex;
            justify-content: space-between;
            align-items: center;
            p{
              text-align: left;
              transition: color .5s ease-ease-in-out;
              margin-right: 2rem;
            }
            .color{
              height: 25px;
              width: 25px;
              border-radius: 50%
            }
          }
        }
      }
      .small-spinner-wrapper{
        margin: 6rem 0;
      }
    `
  }, [])

  
  const cantidad_primera_infancia = peru.etapa_de_vida_fallecidos.primera_infancia;
  const cantidad_infancia = peru.etapa_de_vida_fallecidos.infancia;
  const cantidad_adolescencia = peru.etapa_de_vida_fallecidos.adolescencia;
  const cantidad_juventud = peru.etapa_de_vida_fallecidos.juventud;
  const cantidad_adultez = peru.etapa_de_vida_fallecidos.adultez;
  const cantidad_persona_mayor = peru.etapa_de_vida_fallecidos.persona_mayor;

  const data = {
    series: [cantidad_primera_infancia, cantidad_infancia, cantidad_adolescencia, cantidad_juventud, cantidad_adultez, cantidad_persona_mayor],
    options: {
      chart: {
        type: 'donut'
      },
      labels: [
        'Bebés',
        'Niños',
        'Adolescentes',
        'Jóvenes',
        'Adultos',
        'Ancianos'
      ],      
      colors: [ '#7C69F3',
      '#93B11B',
      '#8A1BB1',
      '#1BB1B1',
      '#B11B1B',
      '#1B69B1'
      ],
      stroke: {
         show: false,
      },
      fill: {
        colors: [ '#7C69F3',
      '#93B11B',
      '#8A1BB1',
      '#1BB1B1',
      '#B11B1B',
      '#1B69B1'],

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
                size: '60%'
            }
        }
      },
      legend: {
          show: false
      },
      responsive: [ 
         {
            breakpoint: 768,
            options: {
                chart: {
                    width: "200",
                    height: "200"
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

  const etapas = [
    {etapa: "Bebés", edad: "0 a 5 años", color: "#7C69F3"},
    {etapa: "Niños", edad: "6 a 11 años", color: "#93B11B"},
    {etapa: "Adolescentes", edad: "12 a 18 años", color: "#8A1BB1"},
    {etapa: "Jóvenes", edad: "19 a 26 años", color: "#1BB1B1"},
    {etapa: "Adultos", edad: "27 a 59 años", color: "#B11B1B"},
    {etapa: "Ancianos", edad: "60 + años", color: "#1B69B1"}
  ]

  
  return (
    <DetailsEtapaHomeContainer className="details-etapa flex">
      <h2 className={`text-big ${isDarkMode ? 'text-primary-dark' : 'text-primary'}`}>Porcentaje de fallecidos <br></br>por rango etario</h2>
      {!loadingDataProvincia
      ?
      
      (cantidad_primera_infancia === 0 & cantidad_infancia === 0 & cantidad_adolescencia === 0 & cantidad_juventud === 0 & cantidad_adultez === 0 & cantidad_persona_mayor === 0)
      ?
       <div className="grafico-details-etapa">
        <p className="cero-muertos text-l">0 <br></br>Muertos</p>

        <div className="leyenda">
          {etapas.map((etapa, key) => (
            <div className="etapa" key={key}>
              <p className={isDarkMode ? 'text-primary-dark' : 'text-primary'}>{etapa.etapa}<br></br><span className={isDarkMode ? 'text-secondary-dark' : 'text-secondary'}>{etapa.edad}</span></p>
              <span className="color" style={{backgroundColor: etapa.color}}></span>
            </div>
          ))}
        </div>
      </div>  
      :
      <div className="grafico-details-etapa">
        <div className="grafico">
          <Chart options={data.options} series={data.series} type="donut" width="300" height="300"></Chart>
        </div>  
        <div className="leyenda">
          {etapas.map((etapa, key) => (
            <div className="etapa" key={key}>
              <p className={isDarkMode ? 'text-primary-dark' : 'text-primary'}>{etapa.etapa}<br></br><span className={isDarkMode ? 'text-secondary-dark' : 'text-secondary'}>{etapa.edad}</span></p>
              <span className="color" style={{backgroundColor: etapa.color}}></span>
            </div>
          ))}
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
      
    </DetailsEtapaHomeContainer>
  );
}
 
export default DetailsEtapaHome;