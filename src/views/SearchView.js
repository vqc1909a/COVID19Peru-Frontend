import styled from '@emotion/styled';
import React, { useContext, useMemo, useEffect, useState, useRef } from 'react';
import DarkMode from '../components/DarkMode';
import FooterMobile from '../components/layouts/FooterMobile';
import SearchPart from '../components/Search/SearchPart';
import TableDesktop from '../components/Search/TableDesktop';
import TableMobile from '../components/Search/TableMobile';
import { DarkModeContext } from '../context/DarkModeContext';
import { DepartamentoContext } from '../context/DepartamentoContext';
import useSeo from '../hooks/useSeo';

const SearchView = () => {
  const {departamentos} = useContext(DepartamentoContext);
  const [departamentosOrdenados, setDepartamentosOrdenados] = useState([]);
  const { isDarkMode } = useContext(DarkModeContext);

  useSeo({title: "Búsqueda | API Covid19 - Perú"})

  const searViewRef = useRef();
  const SearchViewContainer = useMemo(
    () => styled.div`
      transition: background-color 0.5s ease-in-out;
      min-height: 90vh;
      position: relative;

      .desktop-back {
        display: none;

        @media (min-width: 992px) {
          display: initial;
          position: relative;
          z-index: 0;
        }
      }
    `,
    []
  );

  useEffect(() => {
    if(departamentos.length !== 0){
       setDepartamentosOrdenados(departamentos.sort((a, b) => b.positivos - a.positivos));
    }
  }, [departamentos])

  return (
    <SearchViewContainer
      className={`${isDarkMode ? 'background-dark' : 'background'}`}
      ref={searViewRef}
    >
      <DarkMode />
      {/* <svg
        className={`desktop-back ${darkMode ? 'desktop-back' : ''}`}
        width="100%"
        height="100%"
        viewBox="0 0 1440 508"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M-0.239014 0.984863H1439.76V368.478C1439.76 368.478 1002.54 507.985 719.761 507.985C436.985 507.985 -0.239014 368.478 -0.239014 368.478V0.984863Z"
          fill="#EFEBEB"
        />
      </svg> */}
      <div className="container">
        <SearchPart isDarkMode={isDarkMode} searViewRef={searViewRef}/>
        {/* <InputDropdown darkMode={darkMode} /> */}
        <TableMobile isDarkMode={isDarkMode} departamentosOrdenados={departamentosOrdenados} />
        <TableDesktop isDarkMode={isDarkMode} departamentosOrdenados={departamentosOrdenados} />
        <FooterMobile />
      </div>
    </SearchViewContainer>
  );
};

export default SearchView;
