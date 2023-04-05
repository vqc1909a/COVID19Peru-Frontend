import styled from '@emotion/styled';
import { useMemo } from 'react';
import BigSpinner from '../BigSpinner';
import {numberWithComas} from '../../helpers';
import React from 'react';
 
const TableDesktop = ({ darkMode, provinciasOrdenadas, departamento}) => {

  const SectionStyled = useMemo(
    () => styled.section`
      display: none;
      width: 100%;
      @media (min-width: 768px) {
        display: block;
      }

      p {
        margin: 3rem 0 1rem;
      }

      table {
        text-align: right;
        width: 100%;
        thead {
          transition: all 0.5s ease-in-out;
          display: table;
          width: 100%;
          table-layout: fixed;

          
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
          display: block;
          height: 30vh;
          @media (min-width: 992px){
            height: 20vh;
          }
          overflow: auto;
          &::-webkit-scrollbar {
              display: none;
          }
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
            display: table;
            width: 100%;
            table-layout: fixed;
            &:first-of-type {
              font-weight: bold;
            }
          }
        }
      }
     
    `,
    []
  );

  return (
    <SectionStyled className="search-table-container-desktop">
      <p
        className={`text-medium ${
          darkMode ? 'text-primary-dark' : 'text-primary'
        }`}
      >
        Provincias más infectadas de {departamento.name}
      </p>
      {provinciasOrdenadas.length !== 0
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
            <th>Provincia</th>
            <th>Casos Positivos</th>
          </tr>
        </thead>
        <tbody>
          {provinciasOrdenadas.map((provincia, i) => (
            <tr key={i}>
              <td>{numberWithComas(provincia.name)}</td>
              <td>{numberWithComas(provincia.positivos)}</td>
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
