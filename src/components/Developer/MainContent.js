import React, {useContext} from 'react';
import {DarkModeContext} from '../../context/DarkModeContext';

const MainContent = ({main_content}) => {
 const {isDarkMode} = useContext(DarkModeContext);
 
 return (
  <div ref={main_content} className={`main-content ${!isDarkMode ? 'dark-mode': ''}`} style={{"overflowY": "scroll", "height": "100vh"}}>
    <h1 className={`introduccion text-big ${!isDarkMode ? 'text-primary': 'text-primary-dark'}`} style={{letterSpacing: "6px"}}>Documentación</h1>
    <hr className={`${!isDarkMode ? '': 'dark-mode'}`} />
    <div className="intro">
      <p className={`text-normal ${!isDarkMode ? 'text-primary': 'text-primary-dark'}`}>Bienvenido a la <b>API Covid19 - Perú </b>. Está API fue elaborada gracias a los datos abiertos que nos provee el <b>MINSA</b> sobre el estado del COVID-19 del Perú (<a target="_blank" without rel="noreferrer" href="https://www.datosabiertos.gob.pe/group/datos-abiertos-de-covid-19" className={`text-normal ${!isDarkMode ? 'text-secondary': 'text-secondary-dark'}`} style={{textDecoration: "underline"}}>https://www.datosabiertos.gob.pe/group/datos-abiertos-de-covid-19</a>)</p>
      <p className={`text-normal ${!isDarkMode ? 'text-primary': 'text-primary-dark'}`}>Esta documentación debe proporcionarle toda la información necesaria sobre el estado del COVID-19 a nivel nacional, departamental y provincial en el Perú, cada una de las informaciones resueltas contiene datos como la cantidad de casos positivos en sus diferentes variaciones(total, hombres y mujeres y por etapa de vida), la cantidad de decesos (total, hombre, mujeres y por etapa de vida), la cantidad poblacional demográfica y por último el año, mes y día de cuando fue recopilado cada uno de estos datos.</p>
    </div>  
    <div className="limit">
      <h3 className={`text-normal-bg ${!isDarkMode ? 'text-secondary': 'text-secondary-dark'}`} style={{letterSpacing: "3px"}}>Limite de Peticiones</h3>
      <p className={`text-normal ${!isDarkMode ? 'text-primary': 'text-primary-dark'}`}>Esta API es totalmente gratuita, no hay intención de crear tokens de acceso. Sin embargo, para evitar sobrecargas de transferencia de datos hay un límite de tasa de 100 solicitudes por día. Si alcanza ese límite, recibirá un codigo de estado 404 (Resource Not Found) y recuperará el acceso después de 24 horas.</p>
    </div>
    <div className="code base-url">
      <h3 className={`text-normal-bg ${!isDarkMode ? 'text-secondary': 'text-secondary-dark'}`} style={{letterSpacing: "3px"}}>Base Url</h3>
      <div className="request"><p>{process.env.REACT_APP_BACKEND_URL}/api</p></div>
      <p className={`code__down ${!isDarkMode ? 'text-primary': 'text-primary-dark'}`}>La URL base contiene información sobre todos los recursos disponibles. Todas las solicitudes son solicitudes <code style={{'fontFamily': 'Rubik Medium', 'padding': '.25rem .5rem', 'borderRadius': '3px', 'backgroundColor': '#100e0e', 'color': '#f5f3f3'}}>GET</code>. Y todas las respuestas se devolverán en formato <code style={{'fontFamily': 'Rubik Medium', 'padding': '.25rem .5rem', 'borderRadius': '3px', 'backgroundColor': '#100e0e', 'color': '#f5f3f3'}}>json</code>.</p>
      {window.innerWidth >= 768
      ?
      <div className="response">
        <pre>
          <p>
          {`
{
"nacional": ${process.env.REACT_APP_BACKEND_URL}/api/pais
"departamentos": ${process.env.REACT_APP_BACKEND_URL}/api/departamentos",
"provincias": ${process.env.REACT_APP_BACKEND_URL}/api/provincias"
}         
          `}
          </p>
        </pre>
      </div>
      :
       <div className="response">
        <pre>
          <p>
          {`
{
"nacional": ${process.env.REACT_APP_BACKEND_URL}
            /api/pais
"departamentos": ${process.env.REACT_APP_BACKEND_URL}
            /api/departamentos",
"provincias": ${process.env.REACT_APP_BACKEND_URL}
            /api/provincias"
}         
          `}
          </p>
        </pre>
      </div>
      }
      
    </div>

    <div className="pais-endpoint">
      <h2 className={`text-medium ${!isDarkMode ? 'text-primary': 'text-primary-dark'}`} style={{letterSpacing: "6px"}}>País</h2>
      <hr className={`${!isDarkMode ? '': 'dark-mode'}`} />
      <div className="code">
        <h3 className={`pais text-normal-bg ${!isDarkMode ? 'text-secondary': 'text-secondary-dark'}`} style={{letterSpacing: "3px"}}>Estado actual del país</h3>
        <p className={`code__up text-normal ${!isDarkMode ? 'text-primary': 'text-primary-dark'}`}>Endpoint para recuperar información detallada del estado actual del país.</p>
        <div className="request"><p>{process.env.REACT_APP_BACKEND_URL}/api/pais</p></div>
        <div className="response">
          <pre>
            <p>
              {`
{
  "name": "peru",
  "poblacion": 32526084,
  "positivos": 4499001,
  "hombres_infectados": 2173705,
  "mujeres_infectados": 2325295,
  "fallecidos": 220057,
  "hombres_fallecidos": 138868,
  "mujeres_fallecidos": 81189,
  "etapa_de_vida_fallecidos": {
  "_id": "6445f3db853e134b040c46c0",
    "primera_infancia": 743,
    "infancia": 390,
    "adolescencia": 594,
    "juventud": 1751,
    "adultez": 62984,
    "persona_mayor": 153595
  },
  "fecha": "2023-04-23T00:00:00.000Z"
}
              `}
            </p>
          </pre>
        </div>
      </div>
      <div className="code date-pais">
        <h3 className={`text-normal-bg ${!isDarkMode ? 'text-secondary': 'text-secondary-dark'}`} style={{letterSpacing: "3px"}}>Estado en fecha específica</h3>
        <p className={`code__up text-normal ${!isDarkMode ? 'text-primary': 'text-primary-dark'}`}>Utilice tres parámetros "anio", "mes" y "dia" para obtener el estado del país en la fecha específica.</p>
        <div className="request"><p>{process.env.REACT_APP_BACKEND_URL}/api/pais?anio=2020&mes=3&dia=6</p></div>
        <p className={`code__down text-normal ${!isDarkMode ? 'text-primary': 'text-primary-dark'}`}><b>NOTA: El parametro "mes" tiene como mínimo y maximo valor el 1 y 12 respectivamente, el valor dependerá del orden del mes. La fecha mínima es 2020-03-06.</b></p>
        <div className="response">
          <pre>
            <p>
              {`
{
  "name": "peru",
  "poblacion": 32526084,
  "positivos": 2024,
  "hombres_infectados": 1053,
  "mujeres_infectados": 971,
  "fallecidos": 2,
  "hombres_fallecidos": 2,
  "mujeres_fallecidos": 0,
  "etapa_de_vida_fallecidos": {
    "_id": "6431a13b4dec3e31db0682be",
    "primera_infancia": 0,
    "infancia": 0,
    "adolescencia": 0,
    "juventud": 0,
    "adultez": 0,
    "persona_mayor": 2
  },
  "fecha": "2020-03-06T00:00:00.000Z"
}
              `}
            </p>
          </pre>
        </div>
      </div>
      <div className="code limit-pais">
        <h3 className={`text-normal-bg ${!isDarkMode ? 'text-secondary': 'text-secondary-dark'}`} style={{letterSpacing: "3px"}}>Estado hace n° días</h3>
        <p className={`code__up text-normal ${!isDarkMode ? 'text-primary': 'text-primary-dark'}`}>Utilice un parámetro "limit" para obtener el estado del país en los últimos n°días.</p>
        <div className="request"><p>{process.env.REACT_APP_BACKEND_URL}/api/pais?limit=100</p></div>
        <p className={`code__down text-normal ${!isDarkMode ? 'text-primary': 'text-primary-dark'}`}><b>NOTA: La cantidad máxima de días que se puede especificar es de 100</b></p>
        <div className="response">
          <pre>
            <p>
              {`
[ ... ] //100 items
              `}
            </p>
          </pre>
        </div>
      </div>
      
      <div className="code attributes-pais">
        <h3 className={`text-normal-bg ${!isDarkMode ? 'text-secondary': 'text-secondary-dark'}`} style={{letterSpacing: "3px"}}>Atributos</h3>
        <p className={`code__up text-normal ${!isDarkMode ? 'text-primary': 'text-primary-dark'}`}>Estos son los atributos obtenidos del estado actual del país.</p>
        <table className={`text-normal ${!isDarkMode ? 'text-primary': 'text-primary-dark'}`} style={{"textAlign": "left", "width": "100%", "display": "block"}} width="100%" cellSpacing="20">
          <thead>
          <tr>
            <th style={{"borderBottom": "2px solid white", "paddingBottom": "4px"}}>Atributo</th>
            <th style={{"borderBottom": "2px solid white", "paddingBottom": "4px"}}>Tipo</th>
            <th style={{"borderBottom": "2px solid white", "paddingBottom": "4px"}}>Descripción</th>                
          </tr>
          </thead>
          <tbody>

          <tr>
            <td>name</td>
            <td>string</td>
            <td>Nombre del país</td>
          </tr>
          <tr>
            <td>poblacion</td>
            <td>integer</td>
            <td>Cantidad poblacional</td>
          </tr>
          <tr>
            <td>positivos</td>
            <td>integer</td>
            <td>Cantidad total de infectados</td>
          </tr>
          <tr>
            <td>hombres_infectados</td>
            <td>integer</td>
            <td>Cantidad total de hombres infectados</td>
          </tr>
          <tr>
            <td>mujeres_infectados</td>
            <td>integer</td>
            <td>Cantidad total de mujeres infectados</td>
          </tr>
          <tr>
            <td>fallecidos</td>
            <td>integer</td>
            <td>Cantidad total de personas fallecidos</td>
          </tr>
          <tr>
            <td>hombres_fallecidos</td>
            <td>integer</td>
            <td>Cantidad total de hombres fallecidos</td>
          </tr>
          <tr>
            <td>mujeres_fallecidos</td>
            <td>integer</td>
            <td>Cantidad total de mujeres fallecidos</td>
          </tr>
          <tr>
            <td>etapa_de_vida_fallecidos</td>
            <td>object</td>
            <td>Cantidad total de fallecidos por etapa de vida</td>
          </tr>
          <tr>
            <td colSpan="3" style={{paddingLeft: "1.5rem"}}>
              <table className={`table-small ${!isDarkMode ? 'text-primary': 'text-primary-dark'}`}width="100%" border="1" bordercolor="#fff" cellSpacing="0" style={{"textAlign": "center"}}>
                <thead>
                  <tr>
                    <th>Atributo</th>
                    <th>Tipo</th>
                    <th>Descripción</th>                
                  </tr>
                </thead>        
                <tbody>
                  <tr>
                    <td>primera_infancia</td>
                    <td>integer</td>
                    <td>Cantidad de fallecidos entre 0 y 5 años</td>
                  </tr>
                  <tr>
                    <td>infancia</td>
                    <td>integer</td>
                    <td>Cantidad de fallecidos entre 6 y 11 años</td>
                  </tr>
                  <tr>
                    <td>adolescencia</td>
                    <td>integer</td>
                    <td>Cantidad de fallecidos entre 12 y 18 años</td>
                  </tr>
                  <tr>
                    <td>juventud</td>
                    <td>integer</td>
                    <td>Cantidad de fallecidos entre 19 y 26 años</td>
                  </tr>
                  <tr>
                    <td>adultez</td>
                    <td>integer</td>
                    <td>Cantidad de fallecidos entre 27 y 59 años</td>
                  </tr>
                  <tr>
                    <td>persona_mayor</td>
                    <td>integer</td>
                    <td>Cantidad de fallecidos entre 60 a más años.</td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td>fecha</td>
            <td>string</td>
            <td>Fecha de la información recopilada del país</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div className="departamento-endpoint">
      <h2 className={`text-medium ${!isDarkMode ? 'text-primary': 'text-primary-dark'}`} style={{letterSpacing: "6px"}}>Departamento</h2>
      <hr className={`${!isDarkMode ? '': 'dark-mode'}`} />
      <div className="code all-departamento">
        <h3 className={`text-normal-bg ${!isDarkMode ? 'text-secondary': 'text-secondary-dark'}`} style={{letterSpacing: "3px"}}>Estado de todos los departamentos</h3>
        <p className={`code__up text-normal ${!isDarkMode ? 'text-primary': 'text-primary-dark'}`}>Endpoint para recuperar información del estado actual de todos los departamentos.</p>
        <div className="request"><p>{process.env.REACT_APP_BACKEND_URL}/api/departamentos</p></div>
        <div className="response">
          <pre>
            <p>
              {`
  [ ... ] //25 items
              `}
            </p>
          </pre>
        </div>
      </div>
      <div className="code name-departamento">
        <h3 className={`text-normal-bg ${!isDarkMode ? 'text-secondary': 'text-secondary-dark'}`} style={{letterSpacing: "3px"}}>Estado de un departamento por nombre</h3>
        <p className={`code__up text-normal ${!isDarkMode ? 'text-primary': 'text-primary-dark'}`}>Endpoint para recuperar información del estado actual de un departamento por su nombre. Ej. "San martin" ó "Madre de Dios".</p>
        <div className="request"><p>{process.env.REACT_APP_BACKEND_URL}/api/departamentos/san martin</p></div>
        <p className={`code__down text-normal ${!isDarkMode ? 'text-primary': 'text-primary-dark'}`}><b>NOTA: Estos nombres no deben de llevar tilde ni carácteres especiales</b></p>
        <div className="response">
            <pre>
              <p>
              {`
{
"name": "san martin",
"poblacion": 884795,
"positivos": 70207,
"hombres_infectados": 32227,
"mujeres_infectados": 37980,
"fallecidos": 3247,
"hombres_fallecidos": 2091,
"mujeres_fallecidos": 1156,
"type": "Departamento",
"etapa_de_vida_fallecidos": {
  "_id": "6445f3db853e134b040c484a",
  "primera_infancia": 22,
  "infancia": 12,
  "adolescencia": 15,
  "juventud": 49,
  "adultez": 946,
  "persona_mayor": 2203
},
"fecha": "2023-04-23T00:00:00.000Z"
}
              `}
              </p>
            </pre>
        </div>
      </div>

      <div className="code aleatorio-departamento">
        <h3 className={`text-normal-bg ${!isDarkMode ? 'text-secondary': 'text-secondary-dark'}`} style={{letterSpacing: "3px"}}>Estado de un departamento aleatorio</h3>
        <p className={`code__up text-normal ${!isDarkMode ? 'text-primary': 'text-primary-dark'}`}>Endpoint para solicitar el estado actual de un departamento aleatorio.</p>
        <div className="request"><p>{process.env.REACT_APP_BACKEND_URL}/api/departamentos/random</p></div>
        <p className={`code__down text-normal ${!isDarkMode ? 'text-primary': 'text-primary-dark'}`}><b>NOTA: Estos nombres no deben de llevar tilde ni carácteres especiales</b></p>

        <div className="response">
            <pre>
              <p>
              {`
{
"name": "piura",
"poblacion": 1901896,
"positivos": 181579,
"hombres_infectados": 86797,
"mujeres_infectados": 94782,
"fallecidos": 13236,
"hombres_fallecidos": 8297,
"mujeres_fallecidos": 4939,
"type": "Departamento",
"etapa_de_vida_fallecidos": {
  "_id": "6445f3db853e134b040c481c",
  "primera_infancia": 64,
  "infancia": 24,
  "adolescencia": 40,
  "juventud": 96,
  "adultez": 3557,
  "persona_mayor": 9455
},
"fecha": "2023-04-23T00:00:00.000Z"
}
              `}
              </p>
            </pre>
          </div>
      </div>

      <div className="code limit-departamento">
        <h3 className={`text-normal-bg ${!isDarkMode ? 'text-secondary': 'text-secondary-dark'}`} style={{letterSpacing: "3px"}}>Estado hace n° días</h3>
        <p className={`code__up text-normal ${!isDarkMode ? 'text-primary': 'text-primary-dark'}`}>Utilice un parámetro "limit" para obtener el estado del COVID19 en los últimos n°días del departamento especificado.</p>
        <div className="request"><p>{process.env.REACT_APP_BACKEND_URL}/api/departamentos/san martin?limit=100</p></div>
        <p className={`code__down text-normal ${!isDarkMode ? 'text-primary': 'text-primary-dark'}`}><b>NOTA: La cantidad máxima de días que se puede especificar es de 100</b></p>

        <div className="response">
          <pre>
            <p>
              {`
[ ... ] //100 items
              `}
            </p>
          </pre>
        </div>
      </div>

      
      <div className="code attributes-departamento">
        <h3 className={`text-normal-bg ${!isDarkMode ? 'text-secondary': 'text-secondary-dark'}`} style={{letterSpacing: "3px"}}>Atributos</h3>
        <p className={`code__up text-normal ${!isDarkMode ? 'text-primary': 'text-primary-dark'}`}>Estos son los atributos obtenidos del estado actual del departamento.</p>

        <table className={`text-normal ${!isDarkMode ? 'text-primary': 'text-primary-dark'}`} style={{"textAlign": "left", "width": "100%", "display": "block"}} width="100%" cellSpacing="20">
          <thead>
          <tr>
            <th style={{"borderBottom": "2px solid white", "paddingBottom": "4px"}}>Atributo</th>
            <th style={{"borderBottom": "2px solid white", "paddingBottom": "4px"}}>Tipo</th>
            <th style={{"borderBottom": "2px solid white", "paddingBottom": "4px"}}>Descripción</th>                
          </tr>
          </thead>
          <tbody>
            <tr>
              <td>name</td>
              <td>string</td>
              <td>Nombre del departamento</td>
            </tr>
            <tr>
              <td>poblacion</td>
              <td>integer</td>
              <td>Cantidad poblacional por departamento</td>
            </tr>
            <tr>
              <td>positivos</td>
              <td>integer</td>
              <td>Cantidad total de infectados por departamento</td>
            </tr>
            <tr>
              <td>hombres_infectados</td>
              <td>integer</td>
              <td>Cantidad total de hombres infectados por departamento</td>
            </tr>
            <tr>
              <td>mujeres_infectados</td>
              <td>integer</td>
              <td>Cantidad total de mujeres infectados por departamento</td>
            </tr>
            <tr>
              <td>fallecidos</td>
              <td>integer</td>
              <td>Cantidad total de personas fallecidos por departamento</td>
            </tr>
            <tr>
              <td>hombres_fallecidos</td>
              <td>integer</td>
              <td>Cantidad total de hombres fallecidos por departamento</td>
            </tr>
            <tr>
              <td>mujeres_fallecidos</td>
              <td>integer</td>
              <td>Cantidad total de mujeres fallecidos por departamento</td>
            </tr>
            <tr>
              <td>etapa_de_vida_fallecidos</td>
              <td>object</td>
              <td>Cantidad total de fallecidos por etapa de vida por departamento</td>
            </tr>
            <tr>
              <td colSpan="3"  style={{paddingLeft: "1.5rem"}}>
                <table className={`table-small ${!isDarkMode ? 'text-primary': 'text-primary-dark'}`}width="100%" border="1" bordercolor="#fff" cellSpacing="0" style={{"textAlign": "center"}}>
                  <thead>
                    <tr>
                      <th>Atributo</th>
                      <th>Tipo</th>
                      <th>Descripción</th>                
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>primera_infancia</td>
                      <td>integer</td>
                      <td>Cantidad de fallecidos entre 0 y 5 años</td>
                    </tr>
                    <tr>
                      <td>infancia</td>
                      <td>integer</td>
                      <td>Cantidad de fallecidos entre 6 y 11 años</td>
                    </tr>
                    <tr>
                      <td>adolescencia</td>
                      <td>integer</td>
                      <td>Cantidad de fallecidos entre 12 y 18 años</td>
                    </tr>
                    <tr>
                      <td>juventud</td>
                      <td>integer</td>
                      <td>Cantidad de fallecidos entre 19 y 26 años</td>
                    </tr>
                    <tr>
                      <td>adultez</td>
                      <td>integer</td>
                      <td>Cantidad de fallecidos entre 27 y 59 años</td>
                    </tr>
                    <tr>
                      <td>persona_mayor</td>
                      <td>integer</td>
                      <td>Cantidad de fallecidos entre 60 a más años.</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td>fecha</td>
              <td>string</td>
              <td>Fecha de la información recopilada del departamento</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div className="provincia-endpoint">
      <h2 className={`text-medium ${!isDarkMode ? 'text-primary': 'text-primary-dark'}`} style={{letterSpacing: "6px"}}>Provincia</h2>
      <hr className={`${!isDarkMode ? '': 'dark-mode'}`} />
      <div className="all-provincia code">
        <h3 className={`text-normal-bg ${!isDarkMode ? 'text-secondary': 'text-secondary-dark'}`} style={{letterSpacing: "3px"}}>Estado de todas las provincias</h3>
        <p className={`code__up text-normal ${!isDarkMode ? 'text-primary': 'text-primary-dark'}`}>Endpoint para recuperar información del estado actual de todas las provincias.</p>
        <div className="request"><p>{process.env.REACT_APP_BACKEND_URL}/api/provincias</p></div>
        <div className="response">
          <pre>
            <p>
            {`
  [ ... ] //196 items
            `}
            </p>
          </pre>
        </div>
      </div>
      <div className="name-provincia code">
        <h3 className={`text-normal-bg ${!isDarkMode ? 'text-secondary': 'text-secondary-dark'}`} style={{letterSpacing: "3px"}}>Estado de una provincia por nombre</h3>
        <p className={`code__up text-normal ${!isDarkMode ? 'text-primary': 'text-primary-dark'}`}>Endpoint para recuperar información del estado actual de una provincia por su nombre. Ej. "Huaura" ó "Junin".</p>
        <div className="request"><p>{process.env.REACT_APP_BACKEND_URL}/api/provincias/san antonio de putina</p></div>
        <p className={`code__down text-normal ${!isDarkMode ? 'text-primary': 'text-primary-dark'}`}><b>NOTA: Estos nombres no deben de llevar tilde ni carácteres especiales</b></p>
        <div className="response">
            <pre>
              <p>
              {`
{
  "_id": "64474a8bbb168e49dc857843",
  "name": "san antonio de putina",
  "poblacion": 71977,
  "positivos": 1192,
  "hombres_infectados": 628,
  "mujeres_infectados": 564,
  "fallecidos": 65,
  "hombres_fallecidos": 49,
  "mujeres_fallecidos": 16,
  "type": "Provincia",
  "etapa_de_vida_fallecidos": {
    "_id": "64474a8bbb168e49dc857844",
    "primera_infancia": 1,
    "infancia": 1,
    "adolescencia": 2,
    "juventud": 3,
    "adultez": 27,
    "persona_mayor": 31
  },
  "fecha": "2023-04-24T00:00:00.000Z"
}
              `}
              </p>
            </pre>
          </div>
      </div>

      <div className="code aleatorio-provincia">
        <h3 className={`text-normal-bg ${!isDarkMode ? 'text-secondary': 'text-secondary-dark'}`} style={{letterSpacing: "3px"}}>Estado de una provincia aleatoria</h3>
        <p className={`code__up text-normal ${!isDarkMode ? 'text-primary': 'text-primary-dark'}`}>Endpoint para recuperar información del estado actual de una provincia aleatoria.</p>
        <div className="request"><p>{process.env.REACT_APP_BACKEND_URL}/api/provincias/random</p></div>

        <div className="response">
            <pre>
              <p>
              {`
{
  "_id": "64474a8bbb168e49dc857797",
  "name": "lauricocha",
  "poblacion": 39728,
  "positivos": 389,
  "hombres_infectados": 229,
  "mujeres_infectados": 160,
  "fallecidos": 52,
  "hombres_fallecidos": 36,
  "mujeres_fallecidos": 16,
  "type": "Provincia",
  "etapa_de_vida_fallecidos": {
    "_id": "64474a8bbb168e49dc857798",
    "primera_infancia": 0,
    "infancia": 0,
    "adolescencia": 0,
    "juventud": 1,
    "adultez": 15,
    "persona_mayor": 36
  },
  "fecha": "2023-04-24T00:00:00.000Z"
}
              `}
              </p>
            </pre>
          </div>
      </div>
      <div className="code limit-provincia">
        <h3 className={`text-normal-bg ${!isDarkMode ? 'text-secondary': 'text-secondary-dark'}`} style={{letterSpacing: "3px"}}>Estado hace n° días</h3>
        <p className={`code__up text-normal ${!isDarkMode ? 'text-primary': 'text-primary-dark'}`}>Utilice un parámetro "limit" para obtener el estado del COVID19 en los últimos n°días de la provincia especificada.</p>
        <div className="request"><p>{process.env.REACT_APP_BACKEND_URL}/api/provincias/san martin?limit=100</p></div>
        <p className={`code__down text-normal ${!isDarkMode ? 'text-primary': 'text-primary-dark'}`}><b>NOTA: La cantidad máxima de días que se puede especificar es de 100</b></p>

        <div className="response">
          <pre>
            <p>
              {`
[ ... ] //100 items
              `}
            </p>
          </pre>
        </div>
      </div>
      
      <div className="code attributes-provincia">
        <h3 className={`text-normal-bg ${!isDarkMode ? 'text-secondary': 'text-secondary-dark'}`} style={{letterSpacing: "3px"}}>Atributos</h3>
        <p className={`code__up text-normal ${!isDarkMode ? 'text-primary': 'text-primary-dark'}`}>Estos son los atributos obtenidos del estado actual de la provincia</p>
        <table className={`text-normal ${!isDarkMode ? 'text-primary': 'text-primary-dark'}`} style={{"textAlign": "left", "width": "100%", "display": "block"}} width="100%" cellSpacing="20">
          <thead>
            <tr>
              <th style={{"borderBottom": "2px solid white", "paddingBottom": "4px"}}>Atributo</th>
              <th style={{"borderBottom": "2px solid white", "paddingBottom": "4px"}}>Tipo</th>
              <th style={{"borderBottom": "2px solid white", "paddingBottom": "4px"}}>Descripción</th>                
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>name</td>
              <td>string</td>
              <td>Nombre de la Provincia</td>
            </tr>
            <tr>
              <td>poblacion</td>
              <td>integer</td>
              <td>Cantidad poblacional por provincia</td>
            </tr>
            <tr>
              <td>positivos</td>
              <td>integer</td>
              <td>Cantidad total de infectados por provincia</td>
            </tr>
            <tr>
              <td>hombres_infectados</td>
              <td>integer</td>
              <td>Cantidad total de hombres infectados por provincia</td>
            </tr>
            <tr>
              <td>mujeres_infectados</td>
              <td>integer</td>
              <td>Cantidad total de mujeres infectados por provincia</td>
            </tr>
            <tr>
              <td>fallecidos</td>
              <td>integer</td>
              <td>Cantidad total de personas fallecidos por provincia</td>
            </tr>
            <tr>
              <td>hombres_fallecidos</td>
              <td>integer</td>
              <td>Cantidad total de hombres fallecidos por provincia</td>
            </tr>
            <tr>
              <td>mujeres_fallecidos</td>
              <td>integer</td>
              <td>Cantidad total de mujeres fallecidos por provincia</td>
            </tr>
            <tr>
              <td>etapa_de_vida_fallecidos</td>
              <td>object</td>
              <td>Cantidad total de fallecidos por etapa de vida por provincia</td>
            </tr>
            <tr>
              <td colSpan="3" style={{paddingLeft: "1.5rem"}}>
                <table className={`table-small ${!isDarkMode ? 'text-primary': 'text-primary-dark'}`}width="100%" border="1" bordercolor="#fff" cellSpacing="0" style={{"textAlign": "center"}}>
                  <thead>
                    <tr>
                      <th>Atributo</th>
                      <th>Tipo</th>
                      <th>Descripción</th>                
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>primera_infancia</td>
                      <td>integer</td>
                      <td>Cantidad de fallecidos entre 0 y 5 años</td>
                    </tr>
                    <tr>
                      <td>infancia</td>
                      <td>integer</td>
                      <td>Cantidad de fallecidos entre 6 y 11 años</td>
                    </tr>
                    <tr>
                      <td>adolescencia</td>
                      <td>integer</td>
                      <td>Cantidad de fallecidos entre 12 y 18 años</td>
                    </tr>
                    <tr>
                      <td>juventud</td>
                      <td>integer</td>
                      <td>Cantidad de fallecidos entre 19 y 26 años</td>
                    </tr>
                    <tr>
                      <td>adultez</td>
                      <td>integer</td>
                      <td>Cantidad de fallecidos entre 27 y 59 años</td>
                    </tr>
                    <tr>
                      <td>persona_mayor</td>
                      <td>integer</td>
                      <td>Cantidad de fallecidos entre 60 a más años.</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td>fecha</td>
              <td>string</td>
              <td>Fecha de la información recopilada de la provincia</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
 );
}
 
export default MainContent;