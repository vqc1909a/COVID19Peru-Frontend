import React, {useContext} from 'react';
import {DarkModeContext} from '../../context/DarkModeContext';

const Aside = ({scrollDown}) => {
  const {darkMode} = useContext(DarkModeContext);

 return (

   <aside className={`sidebar ${darkMode ? 'background-dark': 'background'}`} style={{"overflowY": "scroll", "height": "100vh"}}>
        <div>
          <h2 onClick={(e) => scrollDown(e)} without="true" data-class="introduccion" className={`text-medium ${darkMode ? 'text-primary-dark': 'text-primary'}`}>Introducción</h2>
          <p onClick={(e) => scrollDown(e)} without="true" data-class="limit"><span className={`${darkMode ? 'text-secondary-dark': 'text-secondary'}`}>Limite de Peticiones</span></p>
          <p onClick={(e) => scrollDown(e)} without="true" data-class="base-url"><span className={`${darkMode ? 'text-secondary-dark': 'text-secondary'}`}>Base URL</span></p>
        </div>

        <div>
          <h2 onClick={(e) => scrollDown(e)} without="true" data-class="pais-endpoint" className={`text-medium ${darkMode ? 'text-primary-dark': 'text-primary'}`}>País</h2>
          <p onClick={(e) => scrollDown(e)} without="true" data-class="pais"><span className={`${darkMode ? 'text-secondary-dark': 'text-secondary'}`}>Obtener estado actual</span></p>
          <p onClick={(e) => scrollDown(e)} without="true" data-class="limit-pais"> <span className={`${darkMode ? 'text-secondary-dark': 'text-secondary'}`}>Estado hace n° días</span></p>
          <p onClick={(e) => scrollDown(e)} without="true" data-class="attributes-pais"> <span className={`${darkMode ? 'text-secondary-dark': 'text-secondary'}`}>Atributos del país</span></p>
        </div>

        <div>
          <h2 onClick={(e) => scrollDown(e)} without="true" data-class="departamento-endpoint" className={`text-medium ${darkMode ? 'text-primary-dark': 'text-primary'}`}>Departamento</h2>
          <p onClick={(e) => scrollDown(e)} without="true" data-class="all-departamento"><span className={`${darkMode ? 'text-secondary-dark': 'text-secondary'}`}>Obtener todos los departamentos</span></p>
          <p onClick={(e) => scrollDown(e)} without="true" data-class="name-departamento"> <span className={`${darkMode ? 'text-secondary-dark': 'text-secondary'}`}>Obtener departamento por nombre</span></p>
          <p onClick={(e) => scrollDown(e)} without="true" data-class="aleatorio-departamento"> <span className={`${darkMode ? 'text-secondary-dark': 'text-secondary'}`}>Obtener departamento aleatorio</span></p>
          <p onClick={(e) => scrollDown(e)} without="true" data-class="limit-departamento"> <span className={`${darkMode ? 'text-secondary-dark': 'text-secondary'}`}>Estado hace n° días</span></p>
          <p onClick={(e) => scrollDown(e)} without="true" data-class="attributes-departamento"> <span className={`${darkMode ? 'text-secondary-dark': 'text-secondary'}`}>Atributos del departamento</span></p>
        </div>

        <div>
          <h2 onClick={(e) => scrollDown(e)} without="true" data-class="provincia-endpoint" className={`text-medium ${darkMode ? 'text-primary-dark': 'text-primary'}`}>Provincia</h2>
          <p onClick={(e) => scrollDown(e)} without="true" data-class="all-provincia"><span className={`${darkMode ? 'text-secondary-dark': 'text-secondary'}`}>Obtener todas las provincias</span></p>
          <p onClick={(e) => scrollDown(e)} without="true" data-class="name-provincia"> <span className={`${darkMode ? 'text-secondary-dark': 'text-secondary'}`}>Obtener provincia por nombre</span></p>
          <p onClick={(e) => scrollDown(e)} without="true" data-class="aleatorio-provincia"> <span className={`${darkMode ? 'text-secondary-dark': 'text-secondary'}`}>Obtener provincia aleatorio</span></p>
          <p onClick={(e) => scrollDown(e)} without="true" data-class="attributes-provincia"> <span className={`${darkMode ? 'text-secondary-dark': 'text-secondary'}`}>Atributos de la provincia</span></p>
        </div>

      </aside>
 );
}
 
export default Aside;