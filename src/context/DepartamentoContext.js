import React, {useState, createContext, useEffect} from 'react';
import axios from 'axios';

import {amazonas} from '../data/amazonas.json';
import {ancash} from '../data/ancash.json';
import {apurimac} from '../data/apurimac.json';
import {arequipa} from '../data/arequipa.json';
import {ayacucho} from '../data/ayacucho.json';
import {cajamarca} from '../data/cajamarca.json';
import {callao} from '../data/callao.json';
import {cusco} from '../data/cusco.json';
import {huancavelica} from '../data/huancavelica.json';
import {huanuco} from '../data/huanuco.json';
import {ica} from '../data/ica.json';
import {junin} from '../data/junin.json';
import {la_libertad} from '../data/la_libertad.json';
import {lambayeque} from '../data/lambayeque.json';
import {lima} from '../data/lima.json';
import {loreto} from '../data/loreto.json';
import {madre_de_dios} from '../data/madre_de_dios.json';
import {moquegua} from '../data/moquegua.json';
import {pasco} from '../data/pasco.json';
import {piura} from '../data/piura.json';
import {puno} from '../data/puno.json';
import {san_martin} from '../data/san_martin.json';
import {tacna} from '../data/tacna.json';
import {tumbes} from '../data/tumbes.json';
import {ucayali} from '../data/ucayali.json';


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

        const [loreto, amazonas, tumbes, piura, lambayeque, cajamarca, libertad, ancash, sanmartin, huanuco, ucayali, pasco, lima, junin, huancavelica, ica, ayacucho, apurimac, cusco, madrededios, puno, arequipa, moquegua, tacna, callao] = await Promise.all([
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

        setDepartamentos([loreto.data, amazonas.data, tumbes.data, piura.data, lambayeque.data, cajamarca.data, libertad.data, ancash.data, sanmartin.data, huanuco.data, ucayali.data, pasco.data, lima.data, junin.data, huancavelica.data, ica.data, ayacucho.data, apurimac.data, cusco.data, madrededios.data, puno.data, arequipa.data, moquegua.data, tacna.data, callao.data]);

        // setDepartamentos(data);
        const pathDepartamento = window.location.pathname.slice(14);

        const {data} = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/departamento/${pathDepartamento}`);
        setDepartamento(data);          
        console.log(departamento);
        
      }
    })();  
  }, [departamentos, departamento])
  
  // useEffect(()=>{
  //   if(departamentos.length !== 0){
  //   }
  // }, [departamentos])

  useEffect(()=>{
    if(Object.keys(departamento).length !== 0){
      console.log("nuevo departamento");
      switch(departamento.name.toLowerCase()){
        case "amazonas":
        setMapaDepartamento(amazonas);
        setLatLngCenter([-5.2393125,-78.0148623]);  
        setNivelZoom(6);      
        
        setLatLngCenterDesktop([-5.2393125,-77.7148623]);
        setNivelZoomDesktop(7);
        break;
        case "ancash":
        setMapaDepartamento(ancash);
        setLatLngCenter([-9.4461096,-77.8325159]);   
        setNivelZoom(7);       

        setLatLngCenterDesktop([-9.4461096,-77.4325159]);
        setNivelZoomDesktop(7);
        break;
        case "apurimac":
        setMapaDepartamento(apurimac);
        setLatLngCenter([-14.2707569,-72.9282625]);    
        setNivelZoom(7);     
        
        setLatLngCenterDesktop([-13.9707569,-72.6282625]);
        setNivelZoomDesktop(8);
        break;
        case "arequipa":
        setMapaDepartamento(arequipa);
        setLatLngCenter([-16.0006729,-72.709381]);  
        setNivelZoom(7);    
        
        setLatLngCenterDesktop([-16.2006729,-72.809381]);
        setNivelZoomDesktop(7);
        break;
        case "ayacucho":
        setMapaDepartamento(ayacucho);
        setLatLngCenter([-14.0539587,-74.5059557]);  
        setNivelZoom(7);      
        
        setLatLngCenterDesktop([-13.8539587,-73.5059557]);
        setNivelZoomDesktop(7);
        break;

        case "cajamarca":
        setMapaDepartamento(cajamarca);
        setLatLngCenter([-6.3829169,-79.210689]);    
        setNivelZoom(7);       

        setLatLngCenterDesktop([-6.1829169,-78.710689]);
        setNivelZoomDesktop(7);
        break;
        case "callao":
        setMapaDepartamento(callao);
        setLatLngCenter([-11.9575372,-77.1330432]);    
        setNivelZoom(10);  
        
        setLatLngCenterDesktop([-11.9575372,-77.1330432]);
        setNivelZoomDesktop(10);
        break;

        case "cusco":
        setMapaDepartamento(cusco);
        setLatLngCenter([-13.2521408,-72.1450229]);   
        setNivelZoom(6);     
        
        setLatLngCenterDesktop([-13.2521408,-71.8450229]);
        setNivelZoomDesktop(7);
        break;

        case "huancavelica":
        setMapaDepartamento(huancavelica);
        setLatLngCenter([-13.1073438,-75.3077166]);    
        setNivelZoom(7);       

        setLatLngCenterDesktop([-12.8073438,-75.3077166]);
        setNivelZoomDesktop(8);
        break;

        case "huanuco":
        setMapaDepartamento(huanuco);
        setLatLngCenter([-9.6307037,-76.1146156]);      
        setNivelZoom(7);     
        
        setLatLngCenterDesktop([-9.4307037,-76.0146156]);
        setNivelZoomDesktop(8);
        break;
        case "ica":
        setMapaDepartamento(ica);
        setLatLngCenter([-14.209475,-75.594383]);      
        setNivelZoom(7);       

        setLatLngCenterDesktop([-14.309475,-75.194383]);
        setNivelZoomDesktop(8);
        break;

        case "junin":
        setMapaDepartamento(junin);
        setLatLngCenter([-11.7497538,-75.049089]);    
        setNivelZoom(7);    
        
        setLatLngCenterDesktop([-11.6497538,-74.949089]);
        setNivelZoomDesktop(8);
        break;

        case "la libertad":
        setMapaDepartamento(la_libertad);
        setLatLngCenter([-8.1368741,-78.3187618]);    
        setNivelZoom(7);      
        
        setLatLngCenterDesktop([-7.9068741,-78.3187618]);
        setNivelZoomDesktop(8);
        break;

        case "lambayeque":
        setMapaDepartamento(lambayeque);
        setLatLngCenter([-6.387508,-79.8308728]);
        setNivelZoom(7);       

        setLatLngCenterDesktop([-6.487508,-79.8308728]);
        setNivelZoomDesktop(8);

        break;
        case "lima":
        setMapaDepartamento(lima);
        setLatLngCenter([-11.7845359,-76.8054682]);     
        setNivelZoom(7);       

        setLatLngCenterDesktop([-11.9845359,-76.7054682]);
        setNivelZoomDesktop(7);
        break;
        case "loreto":
        setMapaDepartamento(loreto);
        setLatLngCenter([-4.5145346,-74.7804353]);   
        setNivelZoom(6);      
        
        setLatLngCenterDesktop([-4.5145346,-74.7804353]);
        setNivelZoomDesktop(6);
        break;
        case "madre de dios":
        setMapaDepartamento(madre_de_dios);
        setLatLngCenter([-11.8200212,-70.6103924]);   
        setNivelZoom(6);       

        setLatLngCenterDesktop([-12.0200212,-70.5103924]);
        setNivelZoomDesktop(7);
        break;
        case "moquegua":
        setMapaDepartamento(moquegua);
        setLatLngCenter([-17.0060669,-70.9084236]);   
        setNivelZoom(7);       

        setLatLngCenterDesktop([-16.9060669,-71.0084236]);
        setNivelZoomDesktop(8);
        break;

        case "pasco":
        setMapaDepartamento(pasco);
        setLatLngCenter([-10.5473215,-75.4979924]);         
        setNivelZoom(7);     
        
        setLatLngCenterDesktop([-10.3473215,-75.5979924]);
        setNivelZoomDesktop(8);
        break;
        case "piura":
        setMapaDepartamento(piura);
        setLatLngCenter([-5.2141378,-80.818311]); 
        setNivelZoom(7);       

        setLatLngCenterDesktop([-5.2141378,-80.618311]);
        setNivelZoomDesktop(8);
        break;
        case "puno":
        setMapaDepartamento(puno);
        setLatLngCenter([-15.2022201,-70.1714319]); 
        setNivelZoom(7);   
        
        setLatLngCenterDesktop([-15.2022201,-69.9714319]);
        setNivelZoomDesktop(7);
        break;
        case "san martin":  
        setMapaDepartamento(san_martin);
        setLatLngCenter([-7.2703861,-76.7451582]); 
        setNivelZoom(6);  

        setLatLngCenterDesktop([-7.1703861,-76.7451582]);
        setNivelZoomDesktop(7);
        break;
        case "tacna":
        setMapaDepartamento(tacna);
        setLatLngCenter([-17.5816511,-70.321977]);      
        setNivelZoom(7);  

        setLatLngCenterDesktop([-17.6816511,-70.321977]);
        setNivelZoomDesktop(8);
        break;
        case "tumbes":
        setMapaDepartamento(tumbes);
        setLatLngCenter([-3.9214814,-80.6558616]);    
        setNivelZoom(8);  

        setLatLngCenterDesktop([-3.9214814,-80.7558616]);
        setNivelZoomDesktop(9);
        break;
        case "ucayali":
        setMapaDepartamento(ucayali);
        setLatLngCenter([-9.7131766,-73.6195824]);
        setNivelZoom(6);  
        
        setLatLngCenterDesktop([-9.7331766,-73.3195824]);
        setNivelZoomDesktop(7);
        break;

        default:
        setMapaDepartamento(ucayali);
        setLatLngCenter([-9.7131766,-73.6195824]);
        setNivelZoom(6);  
        
        setLatLngCenterDesktop([-9.7331766,-73.3195824]);
        setNivelZoomDesktop(7);        
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

