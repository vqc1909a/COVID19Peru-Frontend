// asdsasd
import React, {Fragment, useMemo, useState} from 'react';
import {MapContainer, GeoJSON, useMapEvent} from 'react-leaflet';
import styled from '@emotion/styled';
import {peru as peruJSON} from '../../data/departamentos.json';
import L from 'leaflet';
import Leyenda from '../../components/Leyenda';
import BigSpinner from '../BigSpinner';
import {agregarEspacios} from "../../helpers"
const MapHome = ({departamentos}) => {
  const positionCenterPeru = [-9.189967, -75.015152];
  // const bounds={[[-22.161163634734045,-84.80996808647168],[3.299233698762967,-65.372673543283874]]}

  const MapHomeContainer = useMemo(() => {
  return styled.div`
      z-index: 1;
     .leaflet-container {
      width: 100%;
      height: 100%;  
      background-color: transparent;
      position: relative;
      .leaflet-popup-content-wrapper{
        background-color: white;
        color: black;
        text-align: center;
        p{
          margin: 0
        }
        .leaflet-popup-content{
          margin: 1.5rem 2rem
        }
      }
      .leaflet-popup-tip-container{
        transform: scale(.6);
      }
      .leaflet-popup{
        margin-bottom: 2rem;
      }
      .leaflet-control{
        display:none;
      }
    };  
    .myCSSClass {
      font-size: 1rem;
      font-weight: 700;
      color: white;
      transition: color .5s ease-in-out;
      background-color: none;
      border-color: none;
      background: none; 
      border: none;
      box-shadow: none;
      margin: 0px;
      cursor: none;
      direction: 'center';
      fill: false;
    }
    .leaflet-tooltip-left.myCSSClass::before {
      border-left-color: transparent;
    }
    .leaflet-tooltip-right.myCSSClass::before {
      border-right-color: transparent;
    }
    `
  }, []);
  

  
  //------------------------------ESTILOS PARA CADA DEPARTAMENTO---------------------------  
  const mapStyle = (feature) => {
    return {
      fillColor: getColor(feature.properties.CASOS),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 1,
    }
  };
  const getColor = (casos) => {
    return casos > 100000  ? '#880909' :
          casos > 40000   ? '#C42C2C' :
          casos > 20000   ? '#E35050' :      
          casos > 10000   ? '#EA7878' :
                      '#E8DFDF';      
  }
  //----------------------------------------------------------------------------------------
 
  
  //------------------------------EVENTOS DE CADA DEPARTAMENTO------------------------------
  const highlightFeature = (e) => {
    let layer = e.target;
    layer.setStyle({
        weight: 3,
        color: 'white',
        dashArray: '0',
        fillOpacity: 0.7
    });
    //Verificar si el navegador del usuario es alguno de estos navegadores con el objetivo de mover una capa al frente del mapa para que la capa se vuelva no interactiva en estos navegadores, lo que significa que el usuario no podrá interactuar con ella.
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
    // let casos = layer.feature.properties.CASOS;
    // let departamento = layer.feature.properties.DEPARTAMEN;
    layer.openPopup();
    
  }

  const resetHighlight = (e) => {
    let layer = e.target;
    layer.setStyle({
        weight: 2,
        color: 'white',
        dashArray: '3',
        fillOpacity: 1
    });
  }

  //EVENTOS
  //Eventos establecidos para cada feature(características de cada layer) y layer (figura geometrica), también a todo se denomina layers
  const onEachFeature = (departamento, layer) => {
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
    })
    layer.bindPopup(`
    <p style="font-size: 1.2rem; font-family: Rubik Medium">${departamento.properties.DEPARTAMEN}</p>
    <p style="color: red; font-size: 2rem; font-family: Rubik SemiBold">${agregarEspacios(departamento.properties.CASOS)}</p>
    <span style="display: block; text-align: center">Casos Positivos</span>
    <a href="/departamento/${departamento.properties.URL}" style="display: inline-block; font-size: 1rem; margin: 1rem 0rem 0rem; text-decoration: none; padding: .5rem 1.5rem; border: 2px solid red; border-radius: 10px; background-color: transparent; color: red; cursor: pointer; transition: all .5s ease-in-out;
    font-family: Rubik SemiBold">Ver Mapa</a>
    `);
    // layer.bindTooltip(departamento.properties.DEPARTAMEN, {permanent: true, direction: 'center', className: `myCSSClass`});

  }
  //---------------------------------------------------------------------------------------------


  //Obtener array de casos, obtner caso_menor, caso_mayor
  // const casos = [];
  // let caso_menor = parseInt(departamentos[0].properties.CASOS);
  // let caso_mayor = parseInt(departamentos[0].properties.CASOS)

  // for (let i=0; i < departamentos.length; i++){
  //   let caso = parseInt(departamentos[i].properties.CASOS);
  //   casos.push(caso);
  //   if (caso_menor > caso){
  //     caso_menor = caso
  //   }
  //   if (caso_mayor < caso){
  //     caso_mayor = caso
  //   }
  // }      

  let component;

  if(departamentos.length === 0){
    component = <div className="big-spinner"><BigSpinner></BigSpinner></div>
  }else{
    peruJSON.forEach((departamento, i) => {
     departamento.properties.CASOS = departamentos[i].positivos;
    }) 
    component = <MapHomeContainer className='map-home'>
       <MapContainer center={positionCenterPeru} scrollWheelZoom={false} zoom={6}>
          <GeoJSON data={peruJSON} style={mapStyle} onEachFeature={onEachFeature}  />

          <div style={{position: "absolute", left: "10%", bottom: "8%"}}>
            <Leyenda departamento={false}></Leyenda>                   
          </div>  
      </MapContainer>
    </MapHomeContainer>
  }
  
  return (
    <Fragment>
      {component}
    </Fragment>
  );
}
 
export default React.memo(MapHome);