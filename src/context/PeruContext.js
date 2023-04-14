import React, {useState, createContext} from 'react';
import axios from 'axios';
export const PeruContext = createContext();

export const PeruProvider = (props) => {

  const [peru, setPeru] = useState({});

  (async ()=>{
    //ESto porque el contexto se renderiza cada vez que cambies de ruta
    if(Object.keys(peru).length === 0){
      const {data} = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/peru`);
      setPeru(data);
    }
  })();  

    return( 
    <PeruContext.Provider value={{peru}}>
      {props.children}
    </PeruContext.Provider>
  )
}

