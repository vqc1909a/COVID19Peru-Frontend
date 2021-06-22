import React, {useContext} from 'react';
import {DarkModeContext} from '../../context/DarkModeContext';

const MainContent = ({main_content}) => {
 const {darkMode} = useContext(DarkModeContext);
 
 return (
  <div ref={main_content} className={`main-content ${darkMode ? 'dark-mode': ''}`} style={{"overflowY": "scroll", "height": "100vh"}}>
    <h1 className={`introduccion text-big ${darkMode ? 'text-primary': 'text-primary-dark'}`} style={{letterSpacing: "6px"}}>Documentación</h1>
    <hr className={`${darkMode ? '': 'dark-mode'}`} />
    <div className="intro">
      <p className={`text-normal ${darkMode ? 'text-primary': 'text-primary-dark'}`}>Bienvenido a la <b>API Covid19 - Perú </b>. Está API fue elaborada gracias a los datos abiertos que nos provee el <b>MINSA</b> sobre el estado del COVID-19 del Perú (<a target="_blank" without rel="noreferrer" href="https://covid19.minsa.gob.pe/sala_situacional.asp" className={`text-normal ${darkMode ? 'text-secondary': 'text-secondary-dark'}`}>https://covid19.minsa.gob.pe/sala_situacional.asp</a>)</p>
      <p className={`text-normal ${darkMode ? 'text-primary': 'text-primary-dark'}`}>Esta documentación debe proporcionarle toda la información necesaria sobre el estado del COVID-19 a nivel nacional, departamental y provincial en el Perú, cada una de las informaciones resueltas contiene datos como la cantidad de casos positivos en sus diferentes variaciones(total, hombres y mujeres), la cantidad de decesos (total, hombre, mujeres y por etapa de vida), la cantidad poblacional demográfica y por último el año, mes y día de cuando fue recopilado cada uno de estos datos.</p>
    </div>  
    <div className="limit">
      <h3 className={`text-normal-bg ${darkMode ? 'text-secondary': 'text-secondary-dark'}`} style={{letterSpacing: "3px"}}>Limite de Peticiones</h3>
      <p className={`text-normal ${darkMode ? 'text-primary': 'text-primary-dark'}`}>Esta API es totalmente gratuita por el momento, no hay intención de crear tokens de acceso. Sin embargo, para evitar sobrecargas de transferencia de datos hay un límite de tasa de 100 solicitudes por día. Si alcanza ese límite, recibirá un codigo de estado 404 (Resource Not Found) y recuperará el acceso después de 24 horas.</p>
    </div>
    <div className="code base-url">
      <h3 className={`text-normal-bg ${darkMode ? 'text-secondary': 'text-secondary-dark'}`} style={{letterSpacing: "3px"}}>Base Url</h3>
      <div className="request"><p>{process.env.REACT_APP_BACKEND_URL}/api</p></div>
      <p className={`code__down text-normal ${darkMode ? 'text-primary': 'text-primary-dark'}`}>La URL base contiene información sobre todos los recursos de API disponibles. Todas las solicitudes son solicitudes <code style={{'fontFamily': 'Rubik Medium', 'padding': '.25rem .5rem', 'borderRadius': '3px', 'backgroundColor': '#100e0e', 'color': '#f5f3f3'}}>GET</code>. Y todas las respuestas se devolverán en formato <code style={{'fontFamily': 'Rubik Medium', 'padding': '.25rem .5rem', 'borderRadius': '3px', 'backgroundColor': '#100e0e', 'color': '#f5f3f3'}}>json</code>.</p>

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
    </div>

    <div className="pais-endpoint">
      <h2 className={`text-medium ${darkMode ? 'text-primary': 'text-primary-dark'}`} style={{letterSpacing: "6px"}}>País Endpoints</h2>
      <hr className={`${darkMode ? '': 'dark-mode'}`} />
      <div className="code">
        <h3 className={`pais text-normal-bg ${darkMode ? 'text-secondary': 'text-secondary-dark'}`} style={{letterSpacing: "3px"}}>Obtener estado del país</h3>
        <p className={`code__up text-normal ${darkMode ? 'text-primary': 'text-primary-dark'}`}>Endpoint para recuperar información detallada del país.</p>
        <div className="request"><p>{process.env.REACT_APP_BACKEND_URL}/api/pais</p></div>
        <div className="response">
          <pre>
            <p>
              {`
{
"_id": "60cbe7be90dead1ca478c9e3",
"name": "peru",
"poblacion": 33028673,
"positivos": 2003625,
"hombres_infectados": 1027620,
"mujeres_infectados": 976004,
"recuperados": 858388,
"fallecidos": 188708,
"hombres_fallecidos": 120365,
"mujeres_fallecidos": 68341,
"etapa_de_vida_fallecidos": {
"_id": "60cbe7be90dead1ca478c9e4",
"primera_infancia": 486,
"infancia": 238,
"adolescencia": 364,
"juventud": 1261,
"adultez": 54596,
"persona_mayor": 131750
},
"fecha": 2021,
"mes": "Junio",
"dia": 17,
"__v": 0
}
              `}
            </p>
          </pre>
        </div>
      </div>

      <div className="code limit-pais">
        <h3 className={`text-normal-bg ${darkMode ? 'text-secondary': 'text-secondary-dark'}`} style={{letterSpacing: "3px"}}>Limit</h3>
        <p className={`code__up text-normal ${darkMode ? 'text-primary': 'text-primary-dark'}`}>Utilice un parámetro query "limit" para obtener el estado del COVID19 en los últimos n°días del país.</p>
        <div className="request"><p>{process.env.REACT_APP_BACKEND_URL}/api/pais?limit=10</p></div>
        <p className={`code__down text-normal ${darkMode ? 'text-primary': 'text-primary-dark'}`}><b>NOTA: La cantidad máxima de días que se puede especificar es de 10 por el momento</b></p>
      </div>
      
      <div className="code attributes-pais">
        <h3 className={`text-normal-bg ${darkMode ? 'text-secondary': 'text-secondary-dark'}`} style={{letterSpacing: "3px"}}>Atributos del País</h3>
        <table className={`text-normal ${darkMode ? 'text-primary': 'text-primary-dark'}`} style={{"textAlign": "left", "width": "100%", "display": "block"}} width="100%" cellSpacing="20">
          <thead>
          <tr>
            <th style={{"borderBottom": "2px solid white", "paddingBottom": "4px"}}>Atributo</th>
            <th style={{"borderBottom": "2px solid white", "paddingBottom": "4px"}}>Tipo</th>
            <th style={{"borderBottom": "2px solid white", "paddingBottom": "4px"}}>Descripción</th>                
          </tr>
          </thead>
          <tbody>

          <tr>
            <td>_id</td>
            <td>string</td>
            <td>Id único por departamento</td>
          </tr>
          <tr>
            <td>name</td>
            <td>string</td>
            <td>Nombre del Departamento</td>
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
            <td>recuperados</td>
            <td>integer</td>
            <td>Cantidad total de personas recuperadas después de la infección</td>
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
            <td colSpan="3">
              <table className={`table-small ${darkMode ? 'text-primary': 'text-primary-dark'}`}width="100%" border="1" bordercolor="#fff" cellSpacing="0" style={{"textAlign": "center"}}>
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
            <td>integer</td>
            <td>Año de la información recopilada del departamento</td>
          </tr>
          <tr>
            <td>mes</td>
            <td>string</td>
            <td>Mes de la información recopilada del departamento</td>
          </tr>
          <tr>
            <td>dia</td>
            <td>integer</td>
            <td>Dia de la información recopilada del departamento</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div className="departamento-endpoint">
      <h2 className={`text-medium ${darkMode ? 'text-primary': 'text-primary-dark'}`} style={{letterSpacing: "6px"}}>Departamento Endpoints</h2>
      <hr className={`${darkMode ? '': 'dark-mode'}`} />
      <div className="code all-departamento">
        <h3 className={`text-normal-bg ${darkMode ? 'text-secondary': 'text-secondary-dark'}`} style={{letterSpacing: "3px"}}>Obtener todos los departamentos</h3>
        <p className={`code__up text-normal ${darkMode ? 'text-primary': 'text-primary-dark'}`}>Endpoint para recuperar información de todos los departamentos.</p>
        <div className="request"><p>{process.env.REACT_APP_BACKEND_URL}/api/departamentos</p></div>
      </div>
      <div className="code name-departamento">
        <h3 className={`text-normal-bg ${darkMode ? 'text-secondary': 'text-secondary-dark'}`} style={{letterSpacing: "3px"}}>Obtener departamento por nombre</h3>
        <p className={`code__up text-normal ${darkMode ? 'text-primary': 'text-primary-dark'}`}>Endpoint para solicitar un departamento por nombre, como "San martin" ó "Madre de Dios".</p>
        <div className="request"><p>{process.env.REACT_APP_BACKEND_URL}/api/departamentos/san martin</p></div>
        <p className={`code__down text-normal ${darkMode ? 'text-primary': 'text-primary-dark'}`}><b>NOTA: Estos nombres no deben de llevar tilde</b></p>
        <div className="response">
            <pre>
              <p>
              {`
{
"_id": "60ca45550212de2e70a33df3",
"name": "San Martin",
"poblacion": 906777,
"positivos": 44944,
"hombres_infectados": 21156,
"mujeres_infectados": 23788,
"fallecidos": 2823,
"hombres_fallecidos": 1832,
"mujeres_fallecidos": 991,     
"etapa_de_vida_fallecidos": {
"_id": "60ca45550212de2e70a33df4",
"primera_infancia": 17,
"infancia": 6,
"adolescencia": 11,
"juventud": 32,
"adultez": 803,
"persona_mayor": 1954
},
"fecha": 2021,
"mes": "Junio",
"dia": 16,
"__v": 0
}
              `}
              </p>
            </pre>
        </div>
      </div>

      <div className="code aleatorio-departamento">
        <h3 className={`text-normal-bg ${darkMode ? 'text-secondary': 'text-secondary-dark'}`} style={{letterSpacing: "3px"}}>Obtener departamento aleatorio</h3>
        <p className={`code__up text-normal ${darkMode ? 'text-primary': 'text-primary-dark'}`}>Endpoint para solicitar un departamento aleatorio.</p>
        <div className="request"><p>{process.env.REACT_APP_BACKEND_URL}/api/departamentos/random</p></div>
        <p className={`code__down text-normal ${darkMode ? 'text-primary': 'text-primary-dark'}`}><b>NOTA: Estos nombres no deben de llevar tilde</b></p>

        <div className="response">
            <pre>
              <p>
              {`
{
"_id": "60c831721dc61507443516f6",
"name": "Huanuco",
"poblacion": 756847,
"positivos": 3418,
"hombres_infectados": 1904,
"mujeres_infectados": 1514,
"fallecidos": 2531,
"hombres_fallecidos": 1601,
"mujeres_fallecidos": 930,
"etapa_de_vida_fallecidos": {
"_id": "60c831721dc61507443516f7",
"primera_infancia": 9,
"infancia": 2,
"adolescencia": 2,
"juventud": 17,
"adultez": 628,
"persona_mayor": 1873
},
"fecha": 2021,
"mes": "Junio",
"dia": 16
"__v": 0
}
              `}
              </p>
            </pre>
          </div>
      </div>

      <div className="code limit-departamento">
        <h3 className={`text-normal-bg ${darkMode ? 'text-secondary': 'text-secondary-dark'}`} style={{letterSpacing: "3px"}}>Limit</h3>
        <p className={`code__up text-normal ${darkMode ? 'text-primary': 'text-primary-dark'}`}>Utilice un parámetro query "limit" para obtener el estado del COVID19 en los últimos n°días del departamento especificado.</p>
        <div className="request"><p>{process.env.REACT_APP_BACKEND_URL}/api/departamentos/san martin?limit=10</p></div>
        <p className={`code__down text-normal ${darkMode ? 'text-primary': 'text-primary-dark'}`}><b>NOTA: La cantidad máxima de días que se puede especificar es de 10 por el momento</b></p>
      </div>

      
      <div className="code attributes-departamento">
        <h3 className={`text-normal-bg ${darkMode ? 'text-secondary': 'text-secondary-dark'}`} style={{letterSpacing: "3px"}}>Atributos del Departamento</h3>
        <table className={`text-normal ${darkMode ? 'text-primary': 'text-primary-dark'}`} style={{"textAlign": "left", "width": "100%", "display": "block"}} width="100%" cellSpacing="20">
          <thead>
          <tr>
            <th style={{"borderBottom": "2px solid white", "paddingBottom": "4px"}}>Atributo</th>
            <th style={{"borderBottom": "2px solid white", "paddingBottom": "4px"}}>Tipo</th>
            <th style={{"borderBottom": "2px solid white", "paddingBottom": "4px"}}>Descripción</th>                
          </tr>
          </thead>
          <tbody>
            <tr>
              <td>_id</td>
              <td>string</td>
              <td>Id único por departamento</td>
            </tr>
            <tr>
              <td>name</td>
              <td>string</td>
              <td>Nombre del Departamento</td>
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
              <td colSpan="3">
                <table className={`table-small ${darkMode ? 'text-primary': 'text-primary-dark'}`}width="100%" border="1" bordercolor="#fff" cellSpacing="0" style={{"textAlign": "center"}}>
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
              <td>integer</td>
              <td>Año de la información recopilada del departamento</td>
            </tr>
            <tr>
              <td>mes</td>
              <td>string</td>
              <td>Mes de la información recopilada del departamento</td>
            </tr>
            <tr>
              <td>dia</td>
              <td>integer</td>
              <td>Dia de la información recopilada del departamento</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div className="provincia-endpoint">
      <h2 className={`text-medium ${darkMode ? 'text-primary': 'text-primary-dark'}`} style={{letterSpacing: "6px"}}>Provincia Endpoints</h2>
      <hr className={`${darkMode ? '': 'dark-mode'}`} />
      <div className="all-provincia code">
        <h3 className={`text-normal-bg ${darkMode ? 'text-secondary': 'text-secondary-dark'}`} style={{letterSpacing: "3px"}}>Obtener todas los provincias</h3>
        <p className={`code__up text-normal ${darkMode ? 'text-primary': 'text-primary-dark'}`}>Endpoint para recuperar información de todas las provincias.</p>
        <div className="request"><p>{process.env.REACT_APP_BACKEND_URL}/api/provincias</p></div>
      </div>
      <div className="name-provincia code">
        <h3 className={`text-normal-bg ${darkMode ? 'text-secondary': 'text-secondary-dark'}`} style={{letterSpacing: "3px"}}>Obtener provincia por nombre</h3>
        <p className={`code__up text-normal ${darkMode ? 'text-primary': 'text-primary-dark'}`}>Endpoint para solicitar una provincia por nombre, como "Huaura" ó "Junin".</p>
        <div className="request"><p>{process.env.REACT_APP_BACKEND_URL}/api/provincias/san antonio de putina</p></div>
        <p className={`code__down text-normal ${darkMode ? 'text-primary': 'text-primary-dark'}`}><b>NOTA: Estos nombres no deben de llevar tilde</b></p>
        <div className="response">
            <pre>
              <p>
              {`
{
"_id": "60c831781dc6150744351722",
"name": "San Antonio de Putina",
"positivos": 48,
"poblacion": 56589,
"hombres_infectados": 28,
"mujeres_infectados": 20,
"fallecidos": 44,
"hombres_fallecidos": 32,
"mujeres_fallecidos": 12,
"type": "Provincia",
"etapa_de_vida_fallecidos": {
"_id": "60c831781dc6150744351723",
"primera_infancia": 0,
"infancia": 0,
"adolescencia": 1,
"juventud": 2,
"adultez": 19,
"persona_mayor": 22
},
"fecha": 2021,
"mes": "Junio",
"dia": 17,
}
              `}
              </p>
            </pre>
          </div>
      </div>

      <div className="code aleatorio-provincia">
        <h3 className={`text-normal-bg ${darkMode ? 'text-secondary': 'text-secondary-dark'}`} style={{letterSpacing: "3px"}}>Obtener provincia aleatorio</h3>
        <p className={`code__up text-normal ${darkMode ? 'text-primary': 'text-primary-dark'}`}>Endpoint para solicitar una provincia aleatorio.</p>
        <div className="request"><p>{process.env.REACT_APP_BACKEND_URL}/api/provincias/random</p></div>

        <div className="response">
            <pre>
              <p>
              {`
{
"_id": "60c832221dc61507443517d6",
"name": "Canas",
"positivos": 624,
"poblacion": 38696,
"hombres_infectados": 339,
"mujeres_infectados": 285,
"fallecidos": 68,
"hombres_fallecidos": 44,
"mujeres_fallecidos": 24,
"type": "Provincia",
"etapa_de_vida_fallecidos": {
"_id": "60c832221dc61507443517d7",
"primera_infancia": 0,
"infancia": 0,
"adolescencia": 0,
"juventud": 0,
"adultez": 16,
"persona_mayor": 52
},
"fecha": 2021,
"mes": "Junio",
"dia": 17
}
              `}
              </p>
            </pre>
          </div>
      </div>
      
      <div className="code attributes-provincia">
        <h3 className={`text-normal-bg ${darkMode ? 'text-secondary': 'text-secondary-dark'}`} style={{letterSpacing: "3px"}}>Atributos de la Provincia</h3>
        <table className={`text-normal ${darkMode ? 'text-primary': 'text-primary-dark'}`} style={{"textAlign": "left", "width": "100%", "display": "block"}} width="100%" cellSpacing="20">
          <thead>
            <tr>
              <th style={{"borderBottom": "2px solid white", "paddingBottom": "4px"}}>Atributo</th>
              <th style={{"borderBottom": "2px solid white", "paddingBottom": "4px"}}>Tipo</th>
              <th style={{"borderBottom": "2px solid white", "paddingBottom": "4px"}}>Descripción</th>                
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>_id</td>
              <td>string</td>
              <td>Id único por departamento</td>
            </tr>
            <tr>
              <td>name</td>
              <td>string</td>
              <td>Nombre del Departamento</td>
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
              <td colSpan="3">
                <table className={`table-small ${darkMode ? 'text-primary': 'text-primary-dark'}`}width="100%" border="1" bordercolor="#fff" cellSpacing="0" style={{"textAlign": "center"}}>
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
              <td>integer</td>
              <td>Año de la información recopilada del departamento</td>
            </tr>
            <tr>
              <td>mes</td>
              <td>string</td>
              <td>Mes de la información recopilada del departamento</td>
            </tr>
            <tr>
              <td>dia</td>
              <td>integer</td>
              <td>Dia de la información recopilada del departamento</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
 );
}
 
export default MainContent;