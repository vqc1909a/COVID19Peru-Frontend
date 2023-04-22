import React, {useMemo, useContext, useState, useEffect, useRef} from 'react';
import styled from '@emotion/styled';
import {DarkModeContext} from '../../context/DarkModeContext';
import {agregarEspacios} from "../../helpers";
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(ChartDataLabels);

let myChart;
const DetailsTotalHome = ({peru, provincia}) => {
  if(Object.keys(provincia).length !== 0){
    peru = provincia
  }
  const {isDarkMode} = useContext(DarkModeContext);

  const [rojo, changeRojo] = useState("#B51D1D");
  const [blanco, changeBlanco] = useState("#DED8D8");

  const ctxRef = useRef(null);

 
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
        align-self: stretch;
        display: flex;
        justify-content: center;
        /* .chartjs-render-monitor{
          width:  100% !important;
          height:  100% !important;

        } */
        @media only screen and (min-width: 768px){
          width: 60%;
          margin: 0 auto;
        }
        .porcentaje_infectados{
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          p{
            font-family: "Rubik Medium";
            transition: color .5s ease-ease-in-out;
            margin-bottom: -.5rem
          }
          span{
            font-family: "Rubik Medium", sans-serif;
            transition: color .5s ease-ease-in-out;
          }
        }
      }
      .small-spinner-wrapper{
        margin: 6rem 0;
      }
    `
  }, [])

  useEffect(()=>{
    if(isDarkMode){
      changeRojo("#df3333");
      changeBlanco("#3a2d2d");
    }else{
      changeRojo("#B51D1D");
      changeBlanco("#DED8D8");
    }
  }, [isDarkMode])


  //No debes de hacer condicionales para el canvas que hacer referencia el new Chart para que dibuje el grafico, siempre debe estar presente en el DOM desde el inicio, en vez de destruir tu grafico y volver a crearlo, puede tambien actualizar sus datos con el metodo .update() pero antes asignado el valor de sus atributos, pero como en react esta dinamico podemos también hacer el update(), pero como quiero aprovechar la transición, lo destruimos y creamos o tra vez
  useEffect(() => {
    const ctx = ctxRef.current.getContext('2d');
    if(myChart){
      myChart.destroy();      
    }
    myChart = new Chart(ctx, {
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
                        return (value / poblacion * 100).toFixed(2) + '%';
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
                    left: window.innerWidth >= 768 ? 5 : 20,
                    right: window.innerWidth >= 768 ? 5 : 20,
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
                      let arrayColors = [rojo, blanco]
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
            cutout: window.innerWidth >= 1400 ? "170" : "140"
        }
        
    });
    //eslint-disable-next-line
  }, [isDarkMode, provincia])

  return (
    <DetailsTotalHomeContainer className="details-total flex">
      <h2 className={`text-big ${isDarkMode ? 'text-primary-dark' : 'text-primary'}`}>Porcentaje de la población<br></br>infectada</h2>
      <span className={`text-normal ${isDarkMode ? 'text-primary-dark' : 'text-primary'}`}>Población <span style={{textTransform: "capitalize"}}>{peru.name}</span>: {agregarEspacios(poblacion)}</span>
      
        <div className="grafico">
            {/* <Chart options={data.options} series={data.series} type="donut" width="350" height="350"></Chart> */}
            <canvas
              id="myChart1"
              role="img"
              aria-label="Porcentaje de la población infectada"
              ref={ctxRef}
            >
              <p>Porcentaje de la población infectada</p>
            </canvas>
            <div className="porcentaje_infectados flex">
                <p className={`text-l ${isDarkMode ? 'text-primary-dark' : 'text-primary'}`}>{((infectados / peru.poblacion) * 100).toFixed(2)}%</p>
                <span className={`text-normal ${isDarkMode ? 'text-primary-dark' : 'text-primary'}`}>INFECTADOS</span>
            </div>
        </div>  
    
    </DetailsTotalHomeContainer>
  );
}
 
export default DetailsTotalHome;