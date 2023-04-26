import React, {useContext} from 'react';
import {DarkModeContext} from '../../context/DarkModeContext';

const Aside = ({scrollDown}) => {
  const {isDarkMode} = useContext(DarkModeContext);

 return (

  <aside className={`sidebar ${isDarkMode ? 'background-dark': 'background'}`}>
    <div>
      <h2 onClick={(e) => scrollDown(e)} without="true" data-class="introduccion" className={`text-medium ${isDarkMode ? 'text-primary-dark': 'text-primary'}`}>Introducción</h2>
      <p onClick={(e) => scrollDown(e)} without="true" data-class="limit"><span className={`${isDarkMode ? 'text-secondary-dark': 'text-secondary'}`}>Limite de Peticiones</span></p>
      <p onClick={(e) => scrollDown(e)} without="true" data-class="base-url"><span className={`${isDarkMode ? 'text-secondary-dark': 'text-secondary'}`}>Base URL</span></p>
    </div>

    <div>
      <h2 onClick={(e) => scrollDown(e)} without="true" data-class="pais-endpoint" className={`text-medium ${isDarkMode ? 'text-primary-dark': 'text-primary'}`}>País</h2>
      <p onClick={(e) => scrollDown(e)} without="true" data-class="pais"><span className={`${isDarkMode ? 'text-secondary-dark': 'text-secondary'}`}>Estado actual</span></p>
      <p onClick={(e) => scrollDown(e)} without="true" data-class="date-pais"> <span className={`${isDarkMode ? 'text-secondary-dark': 'text-secondary'}`}>Estado en fecha específica</span></p>
      <p onClick={(e) => scrollDown(e)} without="true" data-class="limit-pais"> <span className={`${isDarkMode ? 'text-secondary-dark': 'text-secondary'}`}>Estado hace n° días</span></p>
      <p onClick={(e) => scrollDown(e)} without="true" data-class="attributes-pais"> <span className={`${isDarkMode ? 'text-secondary-dark': 'text-secondary'}`}>Atributos</span></p>
    </div>

    <div>
      <h2 onClick={(e) => scrollDown(e)} without="true" data-class="departamento-endpoint" className={`text-medium ${isDarkMode ? 'text-primary-dark': 'text-primary'}`}>Departamento</h2>
      <p onClick={(e) => scrollDown(e)} without="true" data-class="all-departamento"><span className={`${isDarkMode ? 'text-secondary-dark': 'text-secondary'}`}>Estado de todos los departamentos</span></p>
      <p onClick={(e) => scrollDown(e)} without="true" data-class="name-departamento"> <span className={`${isDarkMode ? 'text-secondary-dark': 'text-secondary'}`}>Estado de un departamento por nombre</span></p>
      <p onClick={(e) => scrollDown(e)} without="true" data-class="aleatorio-departamento"> <span className={`${isDarkMode ? 'text-secondary-dark': 'text-secondary'}`}>Estado de un departamento aleatorio</span></p>
      <p onClick={(e) => scrollDown(e)} without="true" data-class="limit-departamento"> <span className={`${isDarkMode ? 'text-secondary-dark': 'text-secondary'}`}>Estado hace n° días</span></p>
      <p onClick={(e) => scrollDown(e)} without="true" data-class="attributes-departamento"> <span className={`${isDarkMode ? 'text-secondary-dark': 'text-secondary'}`}>Atributos</span></p>
    </div>

    <div>
      <h2 onClick={(e) => scrollDown(e)} without="true" data-class="provincia-endpoint" className={`text-medium ${isDarkMode ? 'text-primary-dark': 'text-primary'}`}>Provincia</h2>
      <p onClick={(e) => scrollDown(e)} without="true" data-class="all-provincia"><span className={`${isDarkMode ? 'text-secondary-dark': 'text-secondary'}`}>Estado de todas las provincias</span></p>
      <p onClick={(e) => scrollDown(e)} without="true" data-class="name-provincia"> <span className={`${isDarkMode ? 'text-secondary-dark': 'text-secondary'}`}>Estado de una provincia por nombre</span></p>
      <p onClick={(e) => scrollDown(e)} without="true" data-class="aleatorio-provincia"> <span className={`${isDarkMode ? 'text-secondary-dark': 'text-secondary'}`}>Estado de una provincia aleatoria</span></p>
      <p onClick={(e) => scrollDown(e)} without="true" data-class="limit-provincia"> <span className={`${isDarkMode ? 'text-secondary-dark': 'text-secondary'}`}>Estado hace n° días</span></p>
      <p onClick={(e) => scrollDown(e)} without="true" data-class="attributes-provincia"> <span className={`${isDarkMode ? 'text-secondary-dark': 'text-secondary'}`}>Atributos</span></p>
    </div>
  </aside>
 );
}
 
export default Aside;