import styled from '@emotion/styled';
import { useMemo} from 'react';
import SmallSpinner from '../SmallSpinner';
import {numberWithComas} from '../../helpers'; 
import React from 'react';

const TableMobile = ({ darkMode, departamentosOrdenados }) => {

  const SectionStyled = useMemo(
    () => styled.section`
      margin: 4rem 0 2rem;
      width: 100%;
      table {
        width: 100%;
        border-spacing: 8px;

        tr {
          text-align: left;
          &:first-of-type {
            font-weight: bold;
          }
          td {
            &:last-child {
              text-align: right;
            }
          }
        }
      }
      .table-wrapper{
        height: 10vh;
        margin: 3rem 0;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      padding-bottom: 10vh;
      @media (min-width: 992px) {
        display: none;
        padding-bottom: 0;
      }
    `,
    []
  );

  return (
    <SectionStyled className="search-table-container-mobile">
      <p
        className={`text-normal ${
          darkMode ? 'text-primary-dark' : 'text-primary'
        }`}
      >
        Departamentos con más casos positivos
      </p>

      {departamentosOrdenados.length !== 0
      ?
      <table
        className={`text-normal ${
          darkMode ? 'text-primary-dark' : 'text-primary'
        }`}
      >
        <tbody>
          {departamentosOrdenados.slice(0,5).map((departamento, i)=> (
            <tr key={i}>
              <td>{i+1}</td>
              <td>{departamento.name}</td>
              <td>{numberWithComas(departamento.positivos)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      :
      <div className="table-wrapper">
        <SmallSpinner></SmallSpinner>
      </div>
      }
    </SectionStyled>
  );
};

export default TableMobile;
