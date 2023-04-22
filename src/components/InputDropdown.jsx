import styled from '@emotion/styled';
import { useMemo, useState, useRef, useEffect, useContext} from 'react';
import {DepartamentoContext} from  '../context/DepartamentoContext';
import { DarkModeContext } from '../context/DarkModeContext';

import React from 'react';

let provincias = [];
const InputDropdown = ({ setResult, setCargando, searViewRef}) => {
  const { isDarkMode } = useContext(DarkModeContext);
  const [inputValue, setInputValue] = useState('');
  const [matches, setMatches] = useState([]);
  const containerSearchRef = useRef();
  const {departamentos} = useContext(DepartamentoContext);
  const inputDropdownRef = useRef();

  const FormStyled = useMemo(
    () => styled.form`
      width: 100%;
      @media (min-width: 992px){
        width: 60%;
        margin: 0 auto;
      }
      .wrapper-suggestions{
        position:relative;
        
        ul{
          position:absolute;
          top: 0;
          left:0;
          width: 100%;
          
          &.limit{
            height: 250px;
            overflow-y: scroll;
            border-bottom: 2px solid #b51d1d;
            /* border-radius: 0 0 6px 6px; */
           
            li{
              &:last-child {
                border-bottom: none;
                border-radius: none;
              }
            }
            &::-webkit-scrollbar {
                display: none;
            }
          }
          &.shown {
            display: initial;
          }

          &.hidden {
            display: none;
          }

          li {
            background-color: rgba(247, 245, 245, .8);
            transition: background-color .5s ease-in-out;
            padding: 1.5rem .8rem;
            border-right: 2px solid #b51d1d;
            border-left: 2px solid #b51d1d;
            display: flex;
            justify-content: space-between;
            cursor: pointer;
            &:last-child {
              border-bottom: 2px solid #b51d1d;
              border-radius: 0 0 6px 6px;
            }
            &.dark-mode{
              background-color: rgba(27, 24, 24, .8);
            }
            span{
              &:first-of-type {
                text-transform: capitalize;
              }
            }
          }
        }
      }

      input {
        width: 100%;
        padding: 12px 16px;
        border-radius: 6px;
        background-color: transparent;

        &:focus {
          outline: none;
        }

        &.darkth {
          color: #887c7c;
          border: 1px solid #887c7c;
          &:focus {
            border: 2px solid #df3333 !important;
            color: #f5f4f4 !important;
          }
          &:valid {
            color: #f5f4f4 !important;
          }
        }

        &.lightth {
          color: #877777;
          border: 1px solid #877777;
          &:focus {
            border: 2px solid #b51d1d !important;
            color: #100e0e !important;
          }
          &:valid {
            color: #100e0e !important;
          }
        }
      }
    `,
    []
  );

  const handleChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setInputValue(value);
    const matchesDepartamentos = findMatchesDepartamentos(value, departamentos);
    const matchesProvincias = findMatchesProvincias(value, provincias);
    setMatches([...matchesDepartamentos, ...matchesProvincias]);
  };

  const findMatchesDepartamentos = (word, departamentos) => {
    return departamentos.filter((departamento) => {
      const regex = new RegExp(word, 'i');
      return departamento.name.match(regex);
    });
  };
  const findMatchesProvincias = (word, provincias) => {
    return provincias.filter((provincia) => {
      const regex = new RegExp(word, 'i');
      return provincia.name.match(regex);
    });
  };

  const handleClick = (e, element) => {
    const value = e.currentTarget.firstChild.textContent;
    setInputValue(value);
    setMatches([]);
    setCargando(true);
    setResult(element);
    setTimeout(()=>{
      setCargando(false);
    }, 2000)
  };

  useEffect(()=>{
    if(matches.length >= 6){
      containerSearchRef.current.classList.add('limit')
    }else{
      containerSearchRef.current.classList.remove('limit')
    }
  }, [matches])

  useEffect(() => {
    provincias = [];
    if(!departamentos.length) return;
    departamentos.forEach((departamento)=>{
      departamento.provincias.forEach((provincia)=>{
        provincias.push(provincia)
      })
    })
  }, [departamentos])

  useEffect(() => {
    searViewRef.current.addEventListener('click', function(e){
      if(!inputDropdownRef.current.contains(e.target)){
        setMatches([])
      }
    })
    //eslint-disable-next-line
  }, [])
  return (
    <FormStyled ref={inputDropdownRef}>
      <input
        className={`text-normal ${isDarkMode ? 'darkth' : 'lightth'}`}
        type="text"
        placeholder="Ejemplo: Chanchamayo"
        value={inputValue}
        onChange={handleChange}
        onFocus={handleChange}
      />
      <div className="wrapper-suggestions">
        <ul ref={containerSearchRef} className={`suggestions ${inputValue === '' ? 'hidden' : 'shown'}`}>
          {matches.map((element, i) => (
            <li
              key={i}
              className={`text-normal ${
                isDarkMode ? 'text-primary-dark dark-mode' : 'text-primary'
              }`}
              onClick={(e) => handleClick(e, element)}
            >
              <span>{element.name}</span>
              <span
                className={`${
                  isDarkMode ? 'text-secondary-dark' : 'text-secondary'
                }`}
              >
                {element.type}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </FormStyled>
  );
};

export default InputDropdown;
