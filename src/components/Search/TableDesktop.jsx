import React from 'react';
import styled from '@emotion/styled';
import { useMemo, useContext } from 'react';
import BigSpinner from '../BigSpinner';
import {numberWithComas} from '../../helpers';
import {DepartamentoContext} from '../../context/DepartamentoContext.js';
import {useHistory} from 'react-router-dom';
const TableDesktop = ({ darkMode, departamentosOrdenados }) => {
  const history = useHistory();
  const {setDepartamento, setProvincia} = useContext(DepartamentoContext);
  const SectionStyled = useMemo(
    () => styled.section`
      display: none;
      width: 100%;
      margin-top: 10rem;
      p {
        margin-bottom: 32px;
      }

      table {
        width: 100%;
        text-align: right;

        thead {
          transition: all 0.5s ease-in-out;

          &.light-back {
            background-color: #fee0e0;
          }

          &.dark-back {
            background-color: #341010;
          }
          th {
            padding: 24px 16px;
            border: none !important;
            &:first-of-type {
              text-align: left;
            }
          }
        }

        tbody {
          td {
            padding: 24px 16px;
            &:first-of-type {
              text-align: left;
            }

            button {
              padding: 8px 12px;
            }
          }

          tr {
            &:first-of-type {
              font-weight: bold;
            }
          }
        }
      }
      .table-wrapper{
        height: 30vh;
        margin: 3rem 0;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      @media (min-width: 992px) {
        display: initial;
      }
    `,
    []
  );
  const redirigirMapa = (e, departamento) => {
    e.currentTarget.textContent = "...Cargando"
    setDepartamento(departamento);
    setProvincia({});
    setTimeout(() => {
      history.push(`/departamento/${departamento.url}`);
    }, 1000);
  }
  return (
    <SectionStyled className="search-table-container-desktop">
      <p
        className={`text-medium ${
          darkMode ? 'text-primary-dark' : 'text-primary'
        }`}
      >
        Estado del covid-19 por departameto
      </p>
      {departamentosOrdenados.length !== 0
      ?
        <table
        className={`text-normal ${
          darkMode ? 'text-primary-dark' : 'text-primary'
        }`}
      >
        <thead
          className={`${darkMode ? 'special-color-dark' : 'special-color'} ${
            darkMode ? 'dark-back' : 'light-back'
          }`}
        >
          <tr>
            <th>Departamento</th>
            <th>Casos Positivos</th>
            <th>Fallecimientos</th>
            <th>Mortalidad</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {departamentosOrdenados.map((departamento, i) => (
            <tr key={i}>
              <td>{numberWithComas(departamento.name)}</td>
              <td>{numberWithComas(departamento.positivos)}</td>
              <td>{numberWithComas(departamento.fallecidos)}</td>
              <td>{((departamento.positivos / departamento.poblacion) * 1000).toFixed(2)}%</td>
              <td>
             
              <button type="button" data-name={departamento.name} onClick={(e) => redirigirMapa(e, departamento)} className={darkMode ? 'button-dark' : ''}>
                Más detalles
              </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      :
      <BigSpinner></BigSpinner>
      }
    
    </SectionStyled>
  );
};

export default TableDesktop;
