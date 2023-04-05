import React, {useMemo, Fragment, useContext, useRef, useEffect, useState} from 'react';
import {MapContainer, GeoJSON, TileLayer} from 'react-leaflet';
import styled from '@emotion/styled';
import L from 'leaflet';
import LeyendaSmall from '../../components/LeyendaSmall';
import BigSpinner from '../BigSpinner';
import {DepartamentoContext} from '../../context/DepartamentoContext';

const MapDepartamento = ({departamento, provincia, mapa, latLngCenter, nivelZoom}) => {
   const {setProvincia, setLoadingDataProvincia} = useContext(DepartamentoContext);
   const geojsonref = useRef();
   const [mimapa, setMiMapa] = useState(false);
   const setMap = (map) => {
    setMiMapa(map)
   }

   const MapDepartamentoContainer = useMemo(() => {
    return styled.div`
       position: relative;
       display: block;
       width:100%;
       height: 40vh;
       @media (min-width: 768px){
         display: none;
       }
      .leaflet-container {
        width: 100%;
        height: 100%;  
        /* background-color: transparent; */
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
            display: none;
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
        color: black;
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
      color: 'white ',
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
    console.log(layer); 
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

  const eventoClick = (e) => {
    console.log("Click departamento");
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
    let word = e.target.feature.properties.PROVINCIA;
    // const word_full = `/\b${word}\b/`;
    const provinciaSearch = departamento.provincias.find((provincia) => {
      // const regex = new RegExp(word, 'ig');
      return provincia.name.toLowerCase() === word.toLowerCase();
    })

    setProvincia(provinciaSearch);
    setLoadingDataProvincia(true);
    setTimeout(()=>{
      setLoadingDataProvincia(false);
    }, 2000)
  }
  useEffect(()=> {
    if(Object.keys(provincia).length !== 0 && mimapa){
      geojsonref.current.eachLayer(function(layer){
        if(layer.feature.properties.PROVINCIA.toLowerCase() === provincia.name.toLowerCase()){
          geojsonref.current.resetStyle();
          layer.setStyle({
              fillColor: "#ffff40",
              weight: 2,
              opacity: 1,
              color: 'white',
              dashArray: '3',
              fillOpacity: 1
          });
        }
      });
    }

  }, [provincia, mimapa])

  const onEachFeature = (provincia, layer) => {
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
       click: (e) => eventoClick(e)
    })
    layer.bindPopup(`
    <p style="font-size: 1rem; font-family: Rubik Bold">${provincia.properties.PROVINCIA}</p>
    <p style="color: red; font-size: 1.5rem; font-family: Rubik SemiBold">${provincia.properties.CASOS}</p>
    <span style="display: block; text-align: center">Casos Positivos</span>
    `);
    layer.bindTooltip(provincia.properties.PROVINCIA, {permanent: true, direction: 'center', className: 'myCSSClass'});
  }

  let component;

  if(Object.keys(departamento).length === 0 || latLngCenter.length === 0){
    component = <div className="big-spinner big-spinner1"><BigSpinner></BigSpinner></div>
  }else{
    mapa.forEach((provincia, i) => {
      const provincia_departamento = departamento.provincias.find((prov) => {
        return prov.name.toLowerCase() === provincia.properties.PROVINCIA.toLowerCase()
      })
      provincia.properties.CASOS = provincia_departamento.positivos;
    }) 
    component = <MapDepartamentoContainer className='map-home'>
       <MapContainer whenCreated = {(map) => setMap(map)} center={latLngCenter} zoom={nivelZoom}  scrollWheelZoom={true} >

        <TileLayer 
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoidnFjMTkwOWEiLCJhIjoiY2tnb2Q2dmJwMGNzNTJwb2lkM2I5cnYyNyJ9.v3Rx_381xfFtDAm_Qu-Tnw"
        />       
          <GeoJSON data={mapa} ref={geojsonref} style={mapStyle} onEachFeature={onEachFeature}  />
      </MapContainer>
      <div style={{position: "absolute", left: "5%", top: "30vh", zIndex: "2"}}>
        <LeyendaSmall></LeyendaSmall>                   
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