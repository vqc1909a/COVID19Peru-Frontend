import React, {useMemo, useContext, Fragment, useState, useEffect} from 'react';
import styled from '@emotion/styled';
import {DarkModeContext} from '../../context/DarkModeContext';
import {DepartamentoContext} from '../../context/DepartamentoContext';
import BigSpinner from '../../components/BigSpinner';
import SmallSpinner from '../../components/SmallSpinner';
import Chart from 'react-apexcharts'
import { Chart as Chart2} from 'chart.js';

const DetailsTotalHome = ({peru, provincia}) => {
  if(Object.keys(provincia).length !== 0){
    peru = provincia
  }
  const {isDarkMode} = useContext(DarkModeContext);
  const {loadingDataProvincia} = useContext(DepartamentoContext);

  const [rojo, changeRojo] = useState("#B51D1D");
  const [blanco, changeBlanco] = useState("#DED8D8");

  useEffect(()=>{
    if(isDarkMode){
      changeRojo("#df3333");
      changeBlanco("#3a2d2d");
    }else{
      changeRojo("#B51D1D");
      changeBlanco("#DED8D8");
    }

  }, [isDarkMode])

 
  const poblacion = peru.poblacion
  const infectados = peru.positivos;
  const no_infectados = poblacion - infectados;

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


  useEffect(() => {
    const ctx = document.getElementById('myChart1').getContext('2d');
    let myChart = new Chart2(ctx, {
        type: 'doughnut',
        data: {
            labels: ["Infectados", "No infectados"],
            datasets: [{
                label: '# of Votes',
                //Al final el grafico calcula el espacio con los valores que le das aqui abajo y no con el formatter que resulta al final, eso es solo para pintar el porcetaje nada mas
                data: [infectados, no_infectados],
                hoverOffset: 15,
                // Hexadecimal, RGB, or HSL notations
                backgroundColor: [rojo, blanco],
                borderColor: [rojo, blanco],
                color: [
                    'black',    // color for data at index 0
                    'black',   // color for data at index 1
                    'black',  // color for data at index 2
                    'black',    // color for data at indexOf
                ],
                borderWidth: 1,
                //!Esto es un cambio solo para los labels de este dataset
                datalabels: {
                    align: 'center', // center default start end
                    color: 'white',
                    //Esto es para que se ubique en el borde del grafico, central interior o exterior respectivamente
                    anchor: 'center', // center default start end
                    backgroundColor: 'hsl(12, 88%, 59%)', //null default
                    borderColor: 'hsl(228, 39%, 23%)', // null default
                    borderRadius: 50, // 0 defaul
                    borderWidth: 0, // 0 default
                    display: true, // true default
                    font: {
                        size: 12, //12 default
                        family: "'Be Vietnam Pro', sans-serif", //"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif" default
                        style: 'normal', //normal default, italic, oblique, initial, inherit
                        weight: "bold", //undefined default
                        lineHeight: 1.2 //1.2 default
                    },
                    formatter: function(value, context) {
                        //!Aqui tendríamos que hacer la division del nunmero entre el total x el 100%
                        return (value / poblacion * 100).toFixed(2) + '%';
                    },
                    opacity: 1,
                    padding: {
                        top: 8,
                        right: 8,
                        bottom: 8,
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
                    left: 0,
                    right: 0,
                    top: 10,
                    bottom: 10,
                },
            },
            plugins: {
                // Change options for ALL labels of THIS CHART
                //Esto es para aplicar cambios para todos los labels de este grafico, si quieres más especifico para un dataset, tienes que aplicarlo en la parte de arriba
                legend: {
                    //Configuraciones para la leyenda
                    onClick: () => {},
                    display: false,
                    position: 'left',//'top', 'left', 'bottom', 'right', 'chartArea'
                    align: 'start', //start, center, end
                    labels: {
                        // This more specific font property overrides the global property
                        //Esto asfecta a los labels de leyenda y no labels de cantidad
                        font: {
                            size: 12, //12 default
                            family: "'Be Vietnam Pro', sans-serif", //"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif" default
                            style: 'italic', //normal default, italic, oblique, initial, inherit
                            weight: "bold", //undefined default
                            lineHeight: '1.3' //1.2 default
                        },
                        //!Esto es el ancho de la cajita
                        boxWidth: 40, //40 default
                        boxHeight: 12, // font.size default o sea 12 al principio
                        //!Color de los labels de la leyenda
                        color: 'hsl(228, 39%, 23%)',
                        //!Padding de  los cuadros con su texto de la derecha o sea eso todo es uno solo y el padding que se aplique es a ello en conjunto
                        padding: 12, //10 default
                        //!Me alinea lo labels
                        textAlign: 'left' //left|right|center
                    },
                },
                title: {
                    display: false,
                    text: 'Porcentaje de Votos',
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
                            return `${context.label}: ${(Number(context.parsed) / poblacion * 100).toFixed(2)}%`;
                        }
                    },
                    //average se queda estatico cuando haces hover mientras nearest sigue al mouse cuando sale de su scope (figura)
                    position: 'nearest', //average default
                    backgroundColor: 'hsl(228, 39%, 23%)',
                    titleColor: '#fff', //#fff default
                    bodyColor: "#fff", // #fff default
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
                    boxWidth: 14, // bodyFont.size default
                    boxHeight: 14, // bodyFont.size default
                    boxPadding: 4, // 1 default
                    //Forma figura del tooltip en base al boxWidth y boxHeight que diste, en este caso sera un circulo
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
            transition: 'reset'
            //animations: {
            //	tension: {
            //		duration: 1000,
            //		easing: 'linear',
            //		from: 1,
            //		to: 0,
            //		loop: true
            //	}
            //}
        }
        
    });

    //eslint-disable-next-line
  }, [])


  

  return (
    <DetailsTotalHomeContainer className="details-total flex">
      <h2 className={`text-big ${isDarkMode ? 'text-primary-dark' : 'text-primary'}`}>Porcentaje de la población<br></br>infectada</h2>
      {!loadingDataProvincia 
      ?
        <div className="grafico">
            <Chart options={data.options} series={data.series} type="donut" width="350" height="350"></Chart>
            <canvas
              id="myChart1"
              role="img"
              aria-label="Porcentaje de la población infectada"
            >
              <p>Porcentaje de la población infectada</p>
            </canvas>
            <div className="porcentaje_infectados flex">
                <p className={`text-l ${isDarkMode ? 'text-primary-dark' : 'text-primary'}`}>{((infectados / peru.poblacion) * 100).toFixed(2)}%</p>
                <span className={`text-normal ${isDarkMode ? 'text-primary-dark' : 'text-primary'}`}>INFECTADOS</span>
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