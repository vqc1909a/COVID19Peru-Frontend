import React, {useMemo, Fragment, useContext, useRef, useEffect} from 'react';
import {MapContainer, GeoJSON} from 'react-leaflet';
import styled from '@emotion/styled';
import L from 'leaflet';
import Leyenda from '../../components/Leyenda';
import BigSpinner from '../BigSpinner';
import {DepartamentoContext} from '../../context/DepartamentoContext';

const MapDepartamento = ({departamento, provincia, mapa, latLngCenterDesktop, nivelZoomDesktop}) => {
   const {setProvincia, setLoadingDataProvincia} = useContext(DepartamentoContext);
   const geojsonref = useRef(null);

  
  const MapDepartamentoContainer = useMemo(() => {
    return styled.div`
      position: relative;
      display: block;
      width: 100%;
      height: 50vh;
      display: none;
    
      @media (min-width: 768px){
        display: block;
      }
      .leaflet-container {
        width: 100%;
        height: 100%;  
        background-color: transparent;
        z-index: 0;
        .leaflet-popup-content-wrapper{
          background-color: white;
          color: black;
          text-align: center;
          p{
            margin: 0
          }
          .leaflet-popup-content{
            margin: 1rem;
          }
        }
        .leaflet-popup-tip-container{
            transform: scale(.6);
        }
        .leaflet-popup{
        }
        .leaflet-control{
          display:none;
        }
      };  
      .myCSSClass {
        font-size: 1rem;
        font-weight: 800;
        color: #776060;
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
    return casos > 25000  ? '#880909' :
          casos > 10000   ? '#C42C2C' :
          casos > 5000   ? '#E35050' :      
          casos > 2500   ? '#EA7878' :
                      '#E8DFDF';      
  }

  //Eventos de cada departamento
  const highlightFeature = (e) => {
    let layer = e.target;
    layer.setStyle({
        weight: 3,
        color: 'white',
        dashArray: '',
        fillOpacity: 0.7
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
    // let casos = layer.feature.properties.CASOS;
    // let departamento = layer.feature.properties.DEPARTAMEN;
    layer.openPopup()
  
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
  const eventoClick = (e) => {
    geojsonref.current.resetStyle();
    let layer = e.target;
    layer.setStyle({
        fillColor: "#ffff40",
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 1
    });
    layer.openPopup();    
    let word = e.target.feature.properties.PROVINCIA;
    // const word_full = `/\b${word}\b/`;
    const provinciaSearch = departamento.provincias.find((provincia) => {
      // const regex = new RegExp(word, 'ig');
      return provincia.name.toLowerCase() === word.toLowerCase();
    })
    setProvincia({...provinciaSearch});
    setLoadingDataProvincia(true);
    setTimeout(()=>{
      setLoadingDataProvincia(false);
    }, 1500)
  }

  const onEachFeature = (geoProvincia, layer) => {
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: (e) => eventoClick(e)
    });
    layer.bindPopup(`
    <p style="font-size: 1.2rem; font-family: Rubik Medium">${geoProvincia.properties.PROVINCIA}</p>
    <p style="color: red; font-size: 2rem; font-family: Rubik SemiBold">${geoProvincia.properties.CASOS}</p>
    <span style="display: block; text-align: center">Casos Positivos</span>
    `);
    //Evento que se ejecuta cuando se agrega un layer correctamente
    layer.on('add', () => {
      //Comprobamos que el layer agregado se la provincia seleccionada en la busqueda, siempre y cuando esta exista
      if(Object.keys(provincia).length){
        if(layer.feature.properties.PROVINCIA.toLowerCase() === provincia.name.toLowerCase()){
          layer.setStyle({
              fillColor: "#ffff40",
              weight: 2,
              opacity: 1,
              color: 'white',
              dashArray: '3',
              fillOpacity: 1
          });
          layer.openPopup();
        }
      }
    });
    // layer.bindTooltip(departamento.properties.PROVINCIA, {permanent: true, direction: 'center', className: 'myCSSClass'});
   
  }

  useEffect(()=> {
    if(Object.keys(provincia).length !== 0 && geojsonref.current){
      geojsonref.current.eachLayer(function(layer){
        layer.closePopup();
        if(layer.feature.properties.PROVINCIA.toLowerCase() === provincia.name.toLowerCase()){
          //Aqui reseteamos todo el gesojsonref
          geojsonref.current.resetStyle();
          layer.setStyle({
              fillColor: "#ffff40",
              weight: 2,
              opacity: 1,
              color: 'white',
              dashArray: '3',
              fillOpacity: 1
          });
          layer.openPopup();
        }
      });
    }
  }, [provincia])

 

  let component;

  if(Object.keys(departamento).length === 0 || latLngCenterDesktop.length === 0){
    component = <div className="big-spinner big-spinner2"><BigSpinner></BigSpinner></div>
  }else{
    mapa.forEach((provincia, i) => {
     const provincia_departamento = departamento.provincias.find((prov) => {
      return prov.name.toLowerCase() === provincia.properties.PROVINCIA.toLowerCase()
     })
     provincia.properties.CASOS = provincia_departamento.positivos;
    }) 
    component = <MapDepartamentoContainer className='map-home'>
       <MapContainer center={latLngCenterDesktop} zoom={nivelZoomDesktop}  scrollWheelZoom={false}>
          <GeoJSON ref={geojsonref} data={mapa} style={mapStyle} onEachFeature={onEachFeature} />
      </MapContainer>
      <div style={{position: "absolute", right: "5%", top: "40vh", zIndex: "2"}}>
        <Leyenda departamento={true}></Leyenda>                   
      </div>  
    </MapDepartamentoContainer>
  }

  return (
    <Fragment>
      {component}
    </Fragment>
  );
}
 
export default MapDepartamento;