import React, {useState, createContext, useEffect} from 'react';
import axios from 'axios';

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


export const DepartamentoContext = createContext();

export const DepartamentoProvider = (props) => {

  const [departamentos, setDepartamentos] = useState([]);
  const [departamento, setDepartamento] = useState({});
  const [provincia, setProvincia] = useState({});
  const [mapaDepartamento, setMapaDepartamento] = useState([]);
  const [latLngCenter, setLatLngCenter] = useState([]);
  const [latLngCenterDesktop, setLatLngCenterDesktop] = useState([]);
  const [nivelZoom, setNivelZoom] = useState(7);
  const [nivelZoomDesktop, setNivelZoomDesktop] = useState(7);
  const [loadingDataProvincia, setLoadingDataProvincia] = useState(false);


  useEffect(()=>{
    (async ()=>{
      //ESto porque el contexto se renderiza cada vez que cambies de ruta
      if(departamentos.length === 0){
        const promAmazonas = axios.get(`${process.env.REACT_APP_BACKEND_URL}/departamento/amazonas`);
        const promAncash = axios.get(`${process.env.REACT_APP_BACKEND_URL}/departamento/ancash`);
        const promApurimac = axios.get(`${process.env.REACT_APP_BACKEND_URL}/departamento/apurimac`);
        const promArequipa = axios.get(`${process.env.REACT_APP_BACKEND_URL}/departamento/arequipa`);
        const promAyacucho = axios.get(`${process.env.REACT_APP_BACKEND_URL}/departamento/ayacucho`);
        const promCajamarca = axios.get(`${process.env.REACT_APP_BACKEND_URL}/departamento/cajamarca`);
        const promCallao = axios.get(`${process.env.REACT_APP_BACKEND_URL}/departamento/callao`);
        const promCusco = axios.get(`${process.env.REACT_APP_BACKEND_URL}/departamento/cusco`);
        const promHuancavelica = axios.get(`${process.env.REACT_APP_BACKEND_URL}/departamento/huancavelica`);
        const promHuanuco = axios.get(`${process.env.REACT_APP_BACKEND_URL}/departamento/huanuco`);
        const promIca = axios.get(`${process.env.REACT_APP_BACKEND_URL}/departamento/ica`);
        const promJunin = axios.get(`${process.env.REACT_APP_BACKEND_URL}/departamento/junin`);
        const promLaLibertad = axios.get(`${process.env.REACT_APP_BACKEND_URL}/departamento/la-libertad`);
        const promLambayeque = axios.get(`${process.env.REACT_APP_BACKEND_URL}/departamento/lambayeque`);
        const promLima = axios.get(`${process.env.REACT_APP_BACKEND_URL}/departamento/lima`);
        const promLoreto = axios.get(`${process.env.REACT_APP_BACKEND_URL}/departamento/loreto`);
        const promMadreDeDios = axios.get(`${process.env.REACT_APP_BACKEND_URL}/departamento/madre-de-dios`);
        const promMoquegua = axios.get(`${process.env.REACT_APP_BACKEND_URL}/departamento/moquegua`);
        const promPasco = axios.get(`${process.env.REACT_APP_BACKEND_URL}/departamento/pasco`);
        const promPiura = axios.get(`${process.env.REACT_APP_BACKEND_URL}/departamento/piura`);
        const promPuno = axios.get(`${process.env.REACT_APP_BACKEND_URL}/departamento/puno`);
        const promSanMartin = axios.get(`${process.env.REACT_APP_BACKEND_URL}/departamento/san-martin`);
        const promTacna = axios.get(`${process.env.REACT_APP_BACKEND_URL}/departamento/tacna`);
        const promTumbes = axios.get(`${process.env.REACT_APP_BACKEND_URL}/departamento/tumbes`);
        const promUcayali = axios.get(`${process.env.REACT_APP_BACKEND_URL}/departamento/ucayali`);

        const [amazonas, ancash, apurimac, arequipa, ayacucho, cajamarca, callao, cusco, huancavelica, huanuco, ica, junin, libertad, lambayeque, lima, loreto, madrededios, moquegua, pasco, piura, puno, sanmartin, tacna, tumbes, ucayali] = await Promise.all([
          promAmazonas, 
          promAncash, 
          promApurimac,
          promArequipa,
          promAyacucho,
          promCajamarca,
          promCallao,
          promCusco,
          promHuancavelica,
          promHuanuco,
          promIca,
          promJunin,
          promLaLibertad,
          promLambayeque,
          promLima,
          promLoreto,
          promMadreDeDios,
          promMoquegua,
          promPasco,
          promPiura,
          promPuno,
          promSanMartin,
          promTacna,
          promTumbes,
          promUcayali
        ]);

        setDepartamentos([amazonas.data, ancash.data, apurimac.data, arequipa.data, ayacucho.data, cajamarca.data, callao.data, cusco.data,huancavelica.data, huanuco.data, ica.data, junin.data, libertad.data, lambayeque.data, lima.data, loreto.data, madrededios.data, moquegua.data, pasco.data, piura.data, puno.data, sanmartin.data, tacna.data, tumbes.data, ucayali.data]);

        // setDepartamentos(data);
        const pathDepartamento = window.location.pathname.slice(14);

        const {data} = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/departamento/${pathDepartamento}`);
        setDepartamento(data);          
        
      }
    })();  
    //eslint-disable-next-line
  }, [])
  

  useEffect(()=>{
    //Ejecutamos esto cada vez que cambie el valor de departamento u provicnia, ambos vieen de la base de datos
    if(Object.keys(departamento).length !== 0){
      switch(departamento.name.toLowerCase()){
        case "amazonas":
        setMapaDepartamento(amazonasJSON.amazonas);
        setLatLngCenterDesktop([-5.2393125,-77.7148623]);
        setNivelZoomDesktop(7);

        setLatLngCenter([-5.0193125,-78.0148623]);  
        setNivelZoom(7);      
        break;
        case "ancash":
        setMapaDepartamento(ancashJSON.ancash);
        setLatLngCenterDesktop([-9.4461096,-77.4325159]);
        setNivelZoomDesktop(7);

        setLatLngCenter([-9.4461096,-77.7025159]);   
        setNivelZoom(7);       
        break;
        case "apurimac":
        setMapaDepartamento(apurimacJSON.apurimac);
        setLatLngCenterDesktop([-13.8707569,-72.8082625]);
        setNivelZoomDesktop(8);

        setLatLngCenter([-14.0007569,-72.9682625]);    
        setNivelZoom(8);     
        break;
        case "arequipa":
        setMapaDepartamento(arequipaJSON.arequipa);
        setLatLngCenterDesktop([-15.9006729,-72.809381]);
        setNivelZoomDesktop(7);

        setLatLngCenter([-15.9006729,-72.709381]);  
        setNivelZoom(7);    
        break;
        case "ayacucho":
        setMapaDepartamento(ayacuchoJSON.ayacucho);
        setLatLngCenterDesktop([-13.7539587,-73.8059557]);
        setNivelZoomDesktop(7);

        setLatLngCenter([-13.8539587,-74.1559557]);  
        setNivelZoom(7);      
        break;
        case "cajamarca":
        setMapaDepartamento(cajamarcaJSON.cajamarca);
        setLatLngCenterDesktop([-6.0829169,-78.710689]);
        setNivelZoomDesktop(7);

        setLatLngCenter([-6.1829169,-78.810689]);    
        setNivelZoom(7);       
        break;
        case "callao":  
        setMapaDepartamento(callaoJSON.callao);
        setLatLngCenterDesktop([-11.9575372,-77.1330432]);
        setNivelZoomDesktop(10);

        setLatLngCenter([-11.9575372,-77.1330432]);    
        setNivelZoom(10);  
        break;
        case "cusco":
        setMapaDepartamento(cuscoJSON.cusco);
        setLatLngCenterDesktop([-13.2521408,-71.8450229]);
        setNivelZoomDesktop(7);

        setLatLngCenter([-13.5521408,-72.0450229]);   
        setNivelZoom(7);     
        break;
        case "huancavelica":
        setMapaDepartamento(huancavelicaJSON.huancavelica);
        setLatLngCenterDesktop([-13.0073438,-75.1077166]);
        setNivelZoomDesktop(8);

        setLatLngCenter([-13.0073438,-75.1077166]);    
        setNivelZoom(7);       
        break;

        case "huanuco":
        setMapaDepartamento(huanucoJSON.huanuco);
        setLatLngCenterDesktop([-9.4007037,-76.0146156]);
        setNivelZoomDesktop(8);

        setLatLngCenter([-9.3007037,-76.1146156]);      
        setNivelZoom(7);     
        break;
        case "ica":
        setMapaDepartamento(icaJSON.ica);
        setLatLngCenterDesktop([-14.209475,-75.294383]);
        setNivelZoomDesktop(8);

        setLatLngCenter([-14.109475,-75.594383]);      
        setNivelZoom(7);       
        break;
        case "junin":
        setMapaDepartamento(juninJSON.junin);
        setLatLngCenterDesktop([-11.6497538,-74.949089]);
        setNivelZoomDesktop(8);

        setLatLngCenter([-11.5497538,-75.009089]);    
        setNivelZoom(7);    
        break;
        case "la libertad":
        setMapaDepartamento(la_libertadJSON.la_libertad);
        setLatLngCenterDesktop([-7.8568741,-78.3187618]);
        setNivelZoomDesktop(8);

        setLatLngCenter([-7.9068741,-78.4187618]);    
        setNivelZoom(7);      
        break;
        case "lambayeque":
        setMapaDepartamento(lambayequeJSON.lambayeque);
        setLatLngCenterDesktop([-6.387508,-79.8308728]);
        setNivelZoomDesktop(8);

        setLatLngCenter([-6.387508,-79.8308728]);
        setNivelZoom(7);       
        break;
        case "lima":
        setMapaDepartamento(limaJSON.lima);
        setLatLngCenterDesktop([-11.6845359,-76.7054682]);
        setNivelZoomDesktop(7);

        setLatLngCenter([-11.7845359,-76.8054682]);     
        setNivelZoom(7);       
        break;
        case "loreto":
        setMapaDepartamento(loretoJSON.loreto);
        setLatLngCenterDesktop([-4.4045346,-74.7804353]);
        setNivelZoomDesktop(6);
        
        setLatLngCenter([-4.5145346,-74.7804353]);   
        setNivelZoom(6);      
        break;
        case "madre de dios":
        setMapaDepartamento(madre_de_diosJSON.madre_de_dios);
        setLatLngCenterDesktop([-11.9200212,-70.5103924]);
        setNivelZoomDesktop(7);

        setLatLngCenter([-11.8200212,-70.6103924]);   
        setNivelZoom(6);       
        break;
        case "moquegua":
        setMapaDepartamento(moqueguaJSON.moquegua);
        setLatLngCenterDesktop([-16.9060669,-71.0084236]);
        setNivelZoomDesktop(8);

        setLatLngCenter([-16.9060669,-70.9084236]);   
        setNivelZoom(7);       
        break;
        case "pasco":
        setMapaDepartamento(pascoJSON.pasco);
        setLatLngCenterDesktop([-10.3473215,-75.5979924]);
        setNivelZoomDesktop(8);

        setLatLngCenter([-10.3473215,-75.4979924]);         
        setNivelZoom(7);     
        break;
        case "piura":
        setMapaDepartamento(piuraJSON.piura);
        setLatLngCenterDesktop([-5.2141378,-80.218311]);
        setNivelZoomDesktop(8);

        setLatLngCenter([-5.1141378,-80.518311]); 
        setNivelZoom(7);       
        break;
        case "puno":
        setMapaDepartamento(punoJSON.puno);
        setLatLngCenterDesktop([-15.1022201,-69.9714319]);
        setNivelZoomDesktop(7);

        setLatLngCenter([-15.2022201,-70.0714319]); 
        setNivelZoom(7);   
        break;
        case "san martin":  
        setMapaDepartamento(san_martinJSON.san_martin);
        setLatLngCenterDesktop([-7.0703861,-76.7451582]);
        setNivelZoomDesktop(7);

        setLatLngCenter([-7.0703861,-76.7451582]); 
        setNivelZoom(7);  
        break;
        case "tacna":
        setMapaDepartamento(tacnaJSON.tacna);
        setLatLngCenterDesktop([-17.4816511,-70.321977]);
        setNivelZoomDesktop(8);

        setLatLngCenter([-17.4816511,-70.321977]);      
        setNivelZoom(7);  
        break;
        case "tumbes":
        setMapaDepartamento(tumbesJSON.tumbes);
        setLatLngCenterDesktop([-3.7514814,-80.5558616]);
        setNivelZoomDesktop(9);

        setLatLngCenter([-3.7214814,-80.5558616]);    
        setNivelZoom(8);  
        break;
        case "ucayali":
        setMapaDepartamento(ucayaliJSON.ucayali);
        setLatLngCenterDesktop([-9.5331766,-73.2195824]);
        setNivelZoomDesktop(7);

        setLatLngCenter([-9.5131766,-73.5195824]);
        setNivelZoom(6);  
        break;

        default:
        setMapaDepartamento(ucayaliJSON.ucayali);
        setLatLngCenterDesktop([-9.5331766,-73.2195824]);
        setNivelZoomDesktop(7);

        setLatLngCenter([-9.5131766,-73.5195824]);
        setNivelZoom(6);  
        break;
      }     
    }
    // eslint-disable-next-line
  }, [departamento, provincia]);    

    return( 
    <DepartamentoContext.Provider value={{departamentos, provincia, setProvincia, departamento, setDepartamento, mapaDepartamento, setMapaDepartamento, latLngCenter, nivelZoom, nivelZoomDesktop, latLngCenterDesktop, loadingDataProvincia, setLoadingDataProvincia}}>
      {props.children}
    </DepartamentoContext.Provider>
  )
}

