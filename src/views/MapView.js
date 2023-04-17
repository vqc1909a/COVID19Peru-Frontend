import React, {useMemo, useRef, useContext, Fragment, useState} from 'react';
import styled from '@emotion/styled';
import {DepartamentoContext} from '../context/DepartamentoContext';
import {PeruContext} from '../context/PeruContext';
import peruJSON from '../data/departamentos.json';
import amazonasJSON from '../data/amazonas.json';
import ancashJSON from '../data/ancash.json';
import apurimacJSON from '../data/apurimac.json';
import arequipaJSON from '../data/arequipa.json';
import ayacuchoJSON from '../data/ayacucho.json';
import cajamarcaJSON from '../data/cajamarca.json';
import callaoJSON from '../data/callao.json';
import cuscoJSON from '../data/cusco.json';
import huancavelicaJSON from '../data/huancavelica.json';
import huanucoJSON from '../data/huanuco.json';
import icaJSON from '../data/ica.json';
import juninJSON from '../data/junin.json';
import la_libertadJSON from '../data/la_libertad.json';
import lambayequeJSON from '../data/lambayeque.json';
import limaJSON from '../data/lima.json';
import loretoJSON from '../data/loreto.json';
import madre_de_diosJSON from '../data/madre_de_dios.json';
import moqueguaJSON from '../data/moquegua.json';
import pascoJSON from '../data/pasco.json';
import piuraJSON from '../data/piura.json';
import punoJSON from '../data/puno.json';
import san_martinJSON from '../data/san_martin.json';
import tacnaJSON from '../data/tacna.json';
import tumbesJSON from '../data/tumbes.json';
import ucayaliJSON from '../data/ucayali.json';
import { MapContainer, GeoJSON, useMapEvent, TileLayer, LayersControl, Marker, Popup, useMapEvents} from 'react-leaflet';
import BigSpinner from '../components/BigSpinner';
import L from 'leaflet';
import useSeo from '../hooks/useSeo';

import LeyendaMap from  '../components/Map/LeyendaMap';


const MapView = () => {
  const {departamentos}  = useContext(DepartamentoContext);
  const {peru} = useContext(PeruContext);

  useSeo({title: "Mapa | API Covid19 - Perú"})

  let mymap;
  const geojsonref = useRef();
  let layersProvincias = [];

  const setMap = (map) => {
    mymap = map
    mymap.locate()
   
    geojsonref.current.eachLayer(function(layer){
      if(layer.feature.properties.PROVINCIA){
          layersProvincias.push(layer);
          geojsonref.current.removeLayer(layer);
      }
    });

    mymap.on('click', function(e){
      console.log("clickeando")
    })

    mymap.on('layeradd', function(e){
      console.log("añadiendo un layer")
      geojsonref.current.eachLayer(function(layer){
         if(layer.feature.properties.PROVINCIA){
           layer.setStyle({
             fillColor: getColorProvincia(layer.feature.properties.CASOS),
             weight: 2,
             opacity: 1,
             color: 'white ',
             dashArray: '3',
             fillOpacity: 1
           });
         }
      });
      
    })
    mymap.on('zoomend', function(e){
      console.log(mymap.getZoom())
        
          if(mymap.getZoom() <= 5){
            layersProvincias.forEach((layerProvincia)=>{
                geojsonref.current.removeLayer(layerProvincia);
            })
            geojsonref.current.resetStyle();
            geojsonref.current.eachLayer(function(layer){
              layer.openTooltip();
              layer.closePopup();
            });
          }        
          if(mymap.getZoom() >= 9){
            layersProvincias.forEach((layerProvincia)=>{
                geojsonref.current.addLayer(layerProvincia);
            })
          }
    })
  }

  
  

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
  
  const getColorProvincia = (casos) => {
    return casos > 25000  ? '#880909' :
          casos > 10000   ? '#C42C2C' :
          casos > 5000   ? '#E35050' :      
          casos > 2500   ? '#EA7878' :
                      '#E8DFDF';      
  }

  //EVENTOS
  const zoomToFeature = (e) => {
    let departamento = e.target;
    console.log(mymap.getZoom())
    console.log("haciendo bounds")
    if(!departamento.feature.properties.PROVINCIA){

      mymap.fitBounds(departamento.getBounds());

      layersProvincias.forEach((layerProvincia)=>{
        if(layerProvincia.feature.properties.DEPARTAMEN === departamento.feature.properties.DEPARTAMEN){
          geojsonref.current.addLayer(layerProvincia);
        }else{
          geojsonref.current.removeLayer(layerProvincia);
        }
      })
    }
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

  const highlightFeature = (e) => {
    let layer = e.target;
    layer.setStyle({
        weight: 3,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      layer.bringToFront();
    }
    layer.openPopup();
  }

  const onEachFeature = (departamento, layer) => {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    })
    layer.bindPopup(`
      <p style="font-size: 1rem; font-family: Rubik SemiBold">${departamento.properties.PROVINCIA ? "Provincia" : "Departamento"}</p>
      <p style="font-size: 1.2rem; font-family: Rubik Medium">${departamento.properties.PROVINCIA ? departamento.properties.PROVINCIA : departamento.properties.DEPARTAMEN}</p>
      <p style="color: red; font-size: 2rem; font-family: Rubik SemiBold">${departamento.properties.CASOS}</p>
      <span style="display: block; text-align: center">Casos Positivos</span>
      
    `)

    layer.bindTooltip(layer.feature.properties.PROVINCIA ? layer.feature.properties.PROVINCIA : layer.feature.properties.DEPARTAMEN,{permanent: true, direction: 'center', className: 'myCSSClass'}).closeTooltip();;
  }

  const SetViewOnClick = ({animateRef}) => {
      const map = useMapEvent('click', (e) => {
        map.setView(e.latlng, map.getZoom(), {
          animate: animateRef || false,
        })
      })
      return null;
  }

  //Evento de geolocalizacion
  const LocationMarker = () => {
      const [position, setPosition] = useState(null)
      const map = useMapEvents({
        locationfound(e) {
          setPosition(e.latlng)
          map.flyTo(e.latlng, map.getZoom())
        },
      })

      return position === null ? null : (
        <Marker position={position}>
          <Popup>You are here</Popup>
        </Marker>
      )
  }
  const MapSectionContainer = useMemo(()=>{
    return styled.section`
      height: 90vh;
      position: relative;
      .leaflet-container {
        width: 100%;
        height: 100%;  
        z-index: 1;
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
      }
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
  }, [])
  
  let component;
  if(Object.keys(peru).length === 0 || departamentos.length === 0){
    component = <div className="big-spinner"><BigSpinner></BigSpinner></div>
  }else{
    peruJSON.peru.forEach((departamento, i) => {
     departamento.properties.CASOS = peru.mapa_hijos[i];
    }) 
    amazonasJSON.amazonas.forEach((provincia, i) => {
      provincia.properties.CASOS = departamentos.find((departamento)=> departamento.name.toLowerCase() === "amazonas").provincias[i].positivos;
    })
    ancashJSON.ancash.forEach((provincia, i) => {
      provincia.properties.CASOS = departamentos.find((departamento)=> departamento.name.toLowerCase() === "ancash").provincias[i].positivos;
    })
    apurimacJSON.apurimac.forEach((provincia, i) => {
      provincia.properties.CASOS = departamentos.find((departamento)=> departamento.name.toLowerCase() === "apurimac").provincias[i].positivos;
    })
    arequipaJSON.arequipa.forEach((provincia, i) => {
      provincia.properties.CASOS = departamentos.find((departamento)=> departamento.name.toLowerCase() === "arequipa").provincias[i].positivos;
    })
    ayacuchoJSON.ayacucho.forEach((provincia, i) => {
      provincia.properties.CASOS = departamentos.find((departamento)=> departamento.name.toLowerCase() === "ayacucho").provincias[i].positivos;
    })
    cajamarcaJSON.cajamarca.forEach((provincia, i) => {
      provincia.properties.CASOS = departamentos.find((departamento)=> departamento.name.toLowerCase() === "cajamarca").provincias[i].positivos;
    })
    callaoJSON.callao.forEach((provincia, i) => {
      provincia.properties.CASOS = departamentos.find((departamento)=> departamento.name.toLowerCase() === "callao").provincias[i].positivos;
    })
    cuscoJSON.cusco.forEach((provincia, i) => {
      provincia.properties.CASOS = departamentos.find((departamento)=> departamento.name.toLowerCase() === "cusco").provincias[i].positivos;
    })
    huancavelicaJSON.huancavelica.forEach((provincia, i) => {
      provincia.properties.CASOS = departamentos.find((departamento)=> departamento.name.toLowerCase() === "huancavelica").provincias[i].positivos;
    })
    huanucoJSON.huanuco.forEach((provincia, i) => {
      provincia.properties.CASOS = departamentos.find((departamento)=> departamento.name.toLowerCase() === "huanuco").provincias[i].positivos;
    })
    icaJSON.ica.forEach((provincia, i) => {
      provincia.properties.CASOS = departamentos.find((departamento)=> departamento.name.toLowerCase() === "ica").provincias[i].positivos;
    })
    juninJSON.junin.forEach((provincia, i) => {
      provincia.properties.CASOS = departamentos.find((departamento)=> departamento.name.toLowerCase() === "junin").provincias[i].positivos;
    })
    la_libertadJSON.la_libertad.forEach((provincia, i) => {
      provincia.properties.CASOS = departamentos.find((departamento)=> departamento.name.toLowerCase() === "la libertad").provincias[i].positivos;
    })
    lambayequeJSON.lambayeque.forEach((provincia, i) => {
      provincia.properties.CASOS = departamentos.find((departamento)=> departamento.name.toLowerCase() === "lambayeque").provincias[i].positivos;
    })
    limaJSON.lima.forEach((provincia, i) => {
      provincia.properties.CASOS = departamentos.find((departamento)=> departamento.name.toLowerCase() === "lima").provincias[i].positivos;
    })
    loretoJSON.loreto.forEach((provincia, i) => {
      provincia.properties.CASOS = departamentos.find((departamento)=> departamento.name.toLowerCase() === "loreto").provincias[i].positivos;
    })
    madre_de_diosJSON.madre_de_dios.forEach((provincia, i) => {
      provincia.properties.CASOS = departamentos.find((departamento)=> departamento.name.toLowerCase() === "madre de dios").provincias[i].positivos;
    })
    moqueguaJSON.moquegua.forEach((provincia, i) => {
      provincia.properties.CASOS = departamentos.find((departamento)=> departamento.name.toLowerCase() === "moquegua").provincias[i].positivos;
    })
    pascoJSON.pasco.forEach((provincia, i) => {
      provincia.properties.CASOS = departamentos.find((departamento)=> departamento.name.toLowerCase() === "pasco").provincias[i].positivos;
    })
    piuraJSON.piura.forEach((provincia, i) => {
      provincia.properties.CASOS = departamentos.find((departamento)=> departamento.name.toLowerCase() === "piura").provincias[i].positivos;
    })
    punoJSON.puno.forEach((provincia, i) => {
      provincia.properties.CASOS = departamentos.find((departamento)=> departamento.name.toLowerCase() === "puno").provincias[i].positivos;
    })
    san_martinJSON.san_martin.forEach((provincia, i) => {
      provincia.properties.CASOS = departamentos.find((departamento)=> departamento.name.toLowerCase() === "san martin").provincias[i].positivos;
    })
    tacnaJSON.tacna.forEach((provincia, i) => {
      provincia.properties.CASOS = departamentos.find((departamento)=> departamento.name.toLowerCase() === "tacna").provincias[i].positivos;
    })
    tumbesJSON.tumbes.forEach((provincia, i) => {
      provincia.properties.CASOS = departamentos.find((departamento)=> departamento.name.toLowerCase() === "tumbes").provincias[i].positivos;
    })
    ucayaliJSON.ucayali.forEach((provincia, i) => {
      provincia.properties.CASOS = departamentos.find((departamento)=> departamento.name.toLowerCase() === "ucayali").provincias[i].positivos;
    })

    component =  <MapSectionContainer>
        <MapContainer whenCreated = {(map) => setMap(map)}  center={[-9.068272,-74.5763731]} zoom={6} scrollWheelZoom={true} >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoidnFjMTkwOWEiLCJhIjoiY2tnb2Q2dmJwMGNzNTJwb2lkM2I5cnYyNyJ9.v3Rx_381xfFtDAm_Qu-Tnw"
          />
            <GeoJSON ref={geojsonref}  data={[...peruJSON.peru, ...amazonasJSON.amazonas, ...ancashJSON.ancash, ...apurimacJSON.apurimac, ...arequipaJSON.arequipa, ...ayacuchoJSON.ayacucho, ...cajamarcaJSON.cajamarca, ...callaoJSON.callao, ...cuscoJSON.cusco, ...huancavelicaJSON.huancavelica, ...huanucoJSON.huanuco, ...icaJSON.ica, ...juninJSON.junin, ...la_libertadJSON.la_libertad, ...lambayequeJSON.lambayeque, ...limaJSON.lima, ...loretoJSON.loreto, ...madre_de_diosJSON.madre_de_dios, ...moqueguaJSON.moquegua, ...pascoJSON.pasco, ...piuraJSON.piura, ...punoJSON.puno, ...san_martinJSON.san_martin, ...tacnaJSON.tacna, ...tumbesJSON.tumbes, ...ucayaliJSON.ucayali]} style={mapStyle} onEachFeature={onEachFeature} />
            <SetViewOnClick animateRef={true} />

            <LayersControl position="topright">

              <LayersControl.BaseLayer checked name="Carto Dark Mode No Labels">
                <TileLayer
                  attribution='<a href="https://cartodb.com/basemaps/">Map tiles by CartoDB, under CC BY 3.0. Data by OpenStreetMap, under ODbL.</a>'
                  url="http://a.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png"
                />
              </LayersControl.BaseLayer>

              <LayersControl.BaseLayer  name="Carto Light Mode No Labels">
                <TileLayer
                  attribution='<a href="https://cartodb.com/basemaps/">Map tiles by CartoDB, under CC BY 3.0. Data by OpenStreetMap, under ODbL.</a>'
                  url="http://a.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png"
                />
              </LayersControl.BaseLayer>


              <LayersControl.BaseLayer name="Carto Dark Mode">
                <TileLayer
                  attribution='<a href="https://cartodb.com/basemaps/">Map tiles by CartoDB, under CC BY 3.0. Data by OpenStreetMap, under ODbL.</a>'
                  url="http://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png"
                />
              </LayersControl.BaseLayer>

              <LayersControl.BaseLayer name="Carto Light Mode">
                <TileLayer
                  attribution='<a href="https://cartodb.com/basemaps/">Map tiles by CartoDB, under CC BY 3.0. Data by OpenStreetMap, under ODbL.</a>'
                  url="http://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
                />
              </LayersControl.BaseLayer>

              <LayersControl.BaseLayer name="ArcGis Dark Gray">
                <TileLayer
                  attribution=''
                  url="http://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}"
                />
              </LayersControl.BaseLayer>

              <LayersControl.BaseLayer name="ArcGis Light Gray">
                <TileLayer
                  attribution=''
                  url="http://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
                />
              </LayersControl.BaseLayer>

              <LayersControl.BaseLayer name="OpenStreetMap">
                <TileLayer
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
              </LayersControl.BaseLayer>
            </LayersControl>
            <LocationMarker />
        </MapContainer>
         <div style={{position: "absolute", left: "5%", bottom: "3%", zIndex: "2"}}>
          <LeyendaMap></LeyendaMap>                   
        </div>  
    </MapSectionContainer>
  }

  return (
   <Fragment>
    {component}
   </Fragment>
  );
}
 
export default MapView;