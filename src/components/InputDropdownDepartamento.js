import styled from '@emotion/styled';
import React, { useMemo, useState, useRef, useEffect, useContext } from 'react';
import {DepartamentoContext} from  '../context/DepartamentoContext';

const InputDropdownDepartamento = ({ darkMode, setLoading}) => {
  const [inputValue, setInputValue] = useState('');
  const [matches, setMatches] = useState([]);
  const containerSearchRef = useRef();
  const {departamento, setProvincia} = useContext(DepartamentoContext);
  
  useEffect(()=>{
    if(matches.length >= 6){
      containerSearchRef.current.classList.add('limit')
    }else{
      containerSearchRef.current.classList.remove('limit')
    }
  }, [matches])


  const FormStyled = useMemo(
    () => styled.form`
      width: 100%;
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
  const findMatchesProvincias = (word, provincias) => {
    return provincias.filter((provincia) => {
      const regex = new RegExp(word, 'i');
      return provincia.name.match(regex);
    });
  };

  const handleFocus = () => {
    const matchesProvincias = departamento.provincias;
    setMatches([...matchesProvincias]);
  }
  
  const handleChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setInputValue(value);
    const matchesProvincias = findMatchesProvincias(value, departamento.provincias);
    setMatches([...matchesProvincias]);
  };

  const handleClick = (e, element) => {
    const value = e.currentTarget.firstChild.textContent;
    setInputValue(value);
    setMatches([]);
    setProvincia(element);
    setLoading(true);
    setTimeout(()=>{
      setLoading(false);
    }, 2000)
  };

  return (
    <FormStyled>
      <input
        className={`text-normal ${darkMode ? 'darkth' : 'lightth'}`}
        type="text"
        placeholder="Seleccione una provincia"
        value={inputValue}
        onFocus={handleFocus}
        onChange={handleChange}
      />
      <div className="wrapper-suggestions">
        <ul ref={containerSearchRef} className={`suggestions`}>
         
          {matches.map((element, i) => (
            <li
              key={i}
              className={`text-normal ${
                darkMode ? 'text-primary-dark dark-mode' : 'text-primary'
              }`}
              onClick={(e) => handleClick(e, element)}
            >
              <span>{element.name}</span>
              <span
                className={`${
                  darkMode ? 'text-secondary-dark' : 'text-secondary'
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

export default InputDropdownDepartamento;
