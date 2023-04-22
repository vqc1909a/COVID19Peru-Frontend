import React, {useMemo, useContext, useEffect, useRef} from 'react';
import styled from '@emotion/styled';
import {DarkModeContext} from '../../context/DarkModeContext';
import {agregarEspacios} from "../../helpers";
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(ChartDataLabels);
let myChart
const DetailsEtapaHome = ({peru, provincia}) => {
  if(Object.keys(provincia).length !== 0){
    peru = provincia
  }
  const {isDarkMode} = useContext(DarkModeContext); 
  const ctxRef = useRef(null);

  const DetailsEtapaHomeContainer = useMemo(()=>{
    return styled.div`
      text-align: center;
      transition: all .5s ease-ease-in-out;
      h2{
        font-family: "Rubik SemiBold";
        margin: 2rem 0;
        transition: color .5s ease-ease-in-out;
      }
      .cero-muertos{
        font-family: "Rubik Medium", sans-serif;
        margin: 0 1rem;
        @media (min-width: 768px) {
          margin: 0 2rem;
        }  
      }
      .grafico{
        position: relative;
        align-self: stretch;
        @media only screen and (min-width: 768px){
          width: 90%;
          margin: -2rem 0 0 auto;
        }
        @media only screen and (min-width: 1366){
          width: 80%;
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
  const infectados = peru.positivos;


  const etapas = [
    {etapa: "Bebés", edad: "0 a 5 años", color: "#7C69F3"},
    {etapa: "Niños", edad: "6 a 11 años", color: "#93B11B"},
    {etapa: "Adolescentes", edad: "12 a 18 años", color: "#8A1BB1"},
    {etapa: "Jóvenes", edad: "19 a 26 años", color: "#1BB1B1"},
    {etapa: "Adultos", edad: "27 a 59 años", color: "#B11B1B"},
    {etapa: "Ancianos", edad: "60+ años", color: "#1B69B1"}
  ]

  useEffect(() => {
    //Esto lo hacemos por la condicional ya que escondera el dom del grafico
    if(ctxRef.current){
      const ctx = ctxRef.current.getContext('2d');
      if(myChart){
        myChart.destroy()
      }
      myChart = new Chart(ctx, {
          type: 'doughnut',
          data: {
              labels: ['Bebés', 'Niños', 'Adolescentes', 'Jóvenes', 'Adultos', 'Ancianos'],
              datasets: [{
                  label: '# of Votes',
                  //Al final el grafico calcula el espacio con los valores que le das aqui abajo y no con el formatter que resulta al final, eso es solo para pintar el porcetaje nada mas
                  data: [cantidad_primera_infancia, cantidad_infancia, cantidad_adolescencia, cantidad_juventud, cantidad_adultez, cantidad_persona_mayor],
                  hoverOffset: 15,
                  // Hexadecimal, RGB, or HSL notations
                  backgroundColor: ['#7C69F3', '#93B11B', '#8A1BB1', '#1BB1B1', '#B11B1B', '#1B69B1'],
                  borderColor: ['#7C69F3', '#93B11B', '#8A1BB1', '#1BB1B1', '#B11B1B', '#1B69B1'],
                  color: [
                      'black',    // color for data at index 0
                      'black',   // color for data at index 1
                      'black',  // color for data at index 2
                      'black',    // color for data at indexOf
                  ],
                  borderWidth: 0,
                  //!Esto es un cambio solo para los labels de este dataset
                  datalabels: {
                      align: 'center', // center default start end
                      color: 'white',
                      //Esto es para que se ubique en el borde del grafico, central interior o exterior respectivamente
                      anchor: 'center', // center default start end
                      backgroundColor: 'rgba(1, 1, 1, .5)', //null default
                      borderColor: 'white', // null default
                      borderRadius: 3, // 0 defaul
                      borderWidth: 1, // 0 default
                      display: true, // true default
                      font: {
                          size: 13, //12 default
                          family: "'Be Vietnam Pro', sans-serif", //"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif" default
                          style: 'normal', //normal default, italic, oblique, initial, inherit
                          weight: "bold", //undefined default
                          lineHeight: 1 //1.2 default
                      },
                      formatter: function(value, context) {
                          //!Aqui tendríamos que hacer la division del nunmero entre el total x el 100%
                          return (value / infectados * 100).toFixed(2) + '%';
                      },
                      opacity: 1,
                      padding: {
                          top: 8,
                          right: 6,
                          bottom: 6,
                          left: 8
                      },
                      //Te da vuelta el label
                      rotation: 0, //0 default
                      textAlign: 'start', // start default, center, end
                  },
                  
              }],
          },
          options: {
              //Callbacks
              //onHover: function(e){
              //	console.log(e)
              //},
              onClick: function(e){
                  // console.log(e)
              },
              layout: {
                  //!Esto es para añdirle un padding a todos los laoos del grafico en general === ( grafico + leyenda + axios X y Y)
                  //padding: 30,
                  padding: {
                      left: 5,
                      right: 5,
                      top: 5,
                      bottom: 5,
                  },
              },
              plugins: {
                  // Change options for ALL labels of THIS CHART
                  //Esto es para aplicar cambios para todos los labels de este grafico, si quieres más especifico para un dataset, tienes que aplicarlo en la parte de arriba
                  legend: {
                      //Configuraciones para la leyenda
                      onClick: () => {},
                      display: true,
                      position: window.innerWidth >= 768 ? 'right' : 'bottom',//'top', 'left', 'bottom', 'right', 'chartArea'
                      align: 'center', //start, center, end
                      labels: {
                          usePointStyle: true,
                          pointStyleWidth: 18,
                          boxWidth: 18,
                          boxHeight: 18,
                          useBorderRadius: true,
                          generateLabels: function(chart){
                            let labels = chart.data.labels;
                            let datasets = chart.data.datasets;

                            return labels.map(function(label, i) {
                              let dataset = datasets[0];
                              let backgroundColor = dataset.backgroundColor[i];
                              let data = dataset.data[i];
                              let text = label.split(" - ")[0];
                              return {
                                text: `${text} (${etapas.map(etapa => etapa.edad)[i]}) => ${agregarEspacios(data)}`,
                                fontColor: isDarkMode ? '#f5f3f3' : '#100e0e',
                                fillStyle: backgroundColor,
                                lineWidth: 5,
                                strokeStyle: backgroundColor,
                                pointStyle: 'circle',
                                lineDash: [3],
                              };
                            });
                          },
                          // This more specific font property overrides the global property
                          //Esto asfecta a los labels de leyenda y no labels de cantidad
                          font: {
                              size: 13, //12 default
                              family: "'Be Vietnam Pro', sans-serif", //"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif" default
                              style: 'normal', //normal default, italic, oblique, initial, inherit
                              weight: "bold", //undefined default
                              lineHeight: '1.2' //1.2 default
                          },
                          //!Color de los labels de la leyenda
                          color: isDarkMode ? '#f5f3f3' : '#100e0e',
                          //!Padding de  los cuadros con su texto de la derecha o sea eso todo es uno solo y el padding que se aplique es a ello en conjunto
                          padding: window.innerWidth >= 768 ? 20 : 15, //10 default
                          //!Me alinea lo labels
                          textAlign: 'left', //left|right|center
                      }
                  },
                  title: {
                      display: false,
                      text: 'Porcentaje de Fallecidos por Rango Etario',
                      align: 'center', //start, center, end
                      color: 'hsl(12, 88%, 59%)',
                      position: 'top', //top, left, bottom, right 
                      //padding: 25, // 10 default
                      padding: {
                          top: 10,
                          bottom: 20
                      },
                      font : {
                          size: 24, // 12 default 
                          family: "'Be Vietnam Pro', sans-serif", //"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif" default
                          style: 'italic', //normal default, italic, oblique, initial, inherit
                          weight: "bold", //undefined default
                          lineHeight: '1.3' //1.2 default
                      }
                  },
                  tooltip: {
                      //Esto es para formatear la salida
                      callbacks: {
                          label: function(context) {
                              return `${context.label}: ${agregarEspacios(Number(context.parsed))}`;
                          },
                          labelTextColor: function(tooltipItem) {
                            // let color = tooltipItem.dataset.backgroundColor[tooltipItem.dataIndex]
                            return "white"
                          },
                          //Deshabilitar el titulo de cada tooltip
                          title: function(tooltipItem) {
                            return ""
                          }                            
                      },
                      //average se queda estatico cuando haces hover mientras nearest sigue al mouse cuando sale de su scope (figura)
                      position: 'nearest', //average default
                      backgroundColor: function(context){
                        let arrayColors = ['#7C69F3', '#93B11B', '#8A1BB1', '#1BB1B1', '#B11B1B', '#1B69B1']
                        let index = context.tooltip.dataPoints[0].dataIndex
                        return arrayColors[index]
                      },
                      // titleColor: '#fff', //#fff default
                      // bodyColor: "#fff", // #fff default
                      bodyFont: {
                          size: 14, // 12 default 
                          family: "'Be Vietnam Pro', sans-serif", //"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif" default
                          style: 'italic', //normal default, italic, oblique, initial, inherit
                          weight: "bold", //undefined default
                          lineHeight: '1.3' //1.2 default
                      },
                      bodyAlign: "left", // left default, right, center
                      bodySpacing: 2, //2 default
                      //Esta propiedad si funca
                      padding: 8, // 6 default
                      //Este carte es la felchita en la puntita del tooltip
                      caretPadding: 6, // 2 default
                      caretSize: 6, // 5 default
                      //Borders del tooltip
                      cornerRadius: 6, // 6 default
                      //Tamaño y padding(no funca) del cuadradito del tooltip
                      boxWidth: 0, // bodyFont.size default
                      boxHeight: 0, // bodyFont.size default
                      boxPadding: 0, // 1 default
                      //Forma figura del tooltip en base al boxWidth y boxHeight que diste, si le das true te forma la figura, caso contrario será un cuadrado
                      usePointStyle: true,
                      //El border de la figurita del tooltip
                      borderColor: 'rgba(0,0,0,0)', // 'rgba(0,0,0,0)'
                      borderWidth: 0, // 0 default
                  }
              },
              animation: {
                  duration: 2000,
                  easing: "easeOutQuart",
                  delay: 0,
                  //loop: true
              },
              transition: 'reset',
              //animations: {
              //	tension: {
              //		duration: 1000,
              //		easing: 'linear',
              //		from: 1,
              //		to: 0,
              //		loop: true
              //	}
              //}
              cutout: window.innerWidth >= 1400 ? "100" : window.innerWidth >= 768 ? "80": "50"
          }
          
      });
    }
     //eslint-disable-next-line
  }, [isDarkMode, provincia])

  return (
    <DetailsEtapaHomeContainer className="details-etapa flex">
      <h2 className={`text-big ${isDarkMode ? 'text-primary-dark' : 'text-primary'}`}>Porcentaje de fallecidos <br></br>por rango etario</h2>
     
      {(cantidad_primera_infancia === 0 & cantidad_infancia === 0 & cantidad_adolescencia === 0 & cantidad_juventud === 0 & cantidad_adultez === 0 & cantidad_persona_mayor === 0)
      ?
        <p className="cero-muertos text-l">0 <br></br>Muertos</p>
      :
      <div className="grafico">
          {/* <Chart options={data.options} series={data.series} type="donut" width="300" height="300"></Chart> */}
          <canvas
            id="myChart2"
            role="img"
            aria-label="Porcentaje de fallecidos por rango etario"
            ref={ctxRef}
          >
            <p>Porcentaje de fallecidos por rango etario</p>
          </canvas>  
        {/* <div className="leyenda">
          {etapas.map((etapa, key) => (
            <div className="etapa" key={key}>
              <p className={isDarkMode ? 'text-primary-dark' : 'text-primary'}>{etapa.etapa}<br></br><span className={isDarkMode ? 'text-secondary-dark' : 'text-secondary'}>{etapa.edad}</span></p>
              <span className="color" style={{backgroundColor: etapa.color}}></span>
            </div>
          ))}
        </div> */}
      </div>  
      }
      
    </DetailsEtapaHomeContainer>
  );
}
 
export default DetailsEtapaHome;