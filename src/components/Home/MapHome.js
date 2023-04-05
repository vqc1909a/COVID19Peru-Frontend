// asdsasd
import React, {Fragment, useMemo} from 'react';
import {MapContainer, GeoJSON} from 'react-leaflet';
import styled from '@emotion/styled';
import {peru} from '../../data/departamentos.json';
import L from 'leaflet';
import Leyenda from '../../components/Leyenda';
import BigSpinner from '../BigSpinner';

const MapHome = ({result}) => {
 
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
      }
      .leaflet-popup-tip-container{
          display: none;
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
  

  
  //ESTILOS PARA CADA DEPARTAMENTO  
  const mapStyle = (feature) => {
    return {
      fillColor: getColor(feature.properties.CASOS),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 1
    }
  };
  const getColor = (casos) => {
    return casos > 100000  ? '#880909' :
          casos > 40000   ? '#C42C2C' :
          casos > 20000   ? '#E35050' :      
          casos > 10000   ? '#EA7878' :
                      '#E8DFDF';      
  }

 
  
  //Eventos de cada departamento
  const highlightFeature = (e) => {
    let layer = e.target;
    layer.setStyle({
        weight: 4,
        color: 'white',
        dashArray: '',
        fillOpacity: 0.7
    });
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

  const onEachFeature = (departamento, layer) => {
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
    })
    layer.bindPopup(`
    <p style="font-size: 1.2rem; font-family: Rubik Medium">${departamento.properties.DEPARTAMEN}</p>
    <p style="color: red; font-size: 2rem; font-family: Rubik SemiBold">${departamento.properties.CASOS}</p>
    <span style="display: block; text-align: center">Casos Positivos</span>
    <a href="/departamento/${departamento.properties.URL}" style="display: inline-block; font-size: 1rem; margin: 1rem 0; text-decoration: none; padding: .5rem 1.5rem; border: 2px solid red; border-radius: 10px; background-color: transparent; color: red; cursor: pointer; transition: all .5s ease-in-out;
    font-family: Rubik SemiBold">Ver Mapa</a>
    `);
    // layer.bindTooltip(departamento.properties.DEPARTAMEN, {permanent: true, direction: 'center', className: `myCSSClass`});

  }

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

  if(Object.keys(result).length === 0){
    component = <div className="big-spinner"><BigSpinner></BigSpinner></div>
  }else{
    peru.forEach((departamento, i) => {
     departamento.properties.CASOS = result.mapa_hijos[i];
    }) 
    component = <MapHomeContainer className='map-home'>
       <MapContainer bounds={[[-22.161163634734045,-84.80996808647168],[3.299233698762967,-65.372673543283874]]} scrollWheelZoom={false} minZoom={5}>
          <GeoJSON data={peru} style={mapStyle} onEachFeature={onEachFeature}  />
          <div style={{position: "absolute", left: "15%", bottom: "10%"}}>
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