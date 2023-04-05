import React, {useMemo, useContext, Fragment} from 'react';
import styled from '@emotion/styled';
import { DarkModeContext } from '../context/DarkModeContext';

const Leyenda = ({departamento}) => {

  const { darkMode } = useContext(DarkModeContext);

  const LeyendaContainer = useMemo(() => {
      return styled.div`
        text-align: center;
        h4{
          transition: color .5s ease-in-out;
          font-family: "Rubik Bold", sans-serif;   
          text-transform: capitalize;      
        }
        .barra{
          height: 20px;
          border-radius: 15px;
          background: linear-gradient(to right, #E8DFDF, #EA7878, #E35050, #C42C2C, #880909);
          margin: .5rem 0;
        }
        .casos{
          display: flex;
          justify-content: space-between;
          transition: color .5s ease-in-out;
          span{
            font-family: "Rubik Medium", sans-serif;
          }
          span:nth-of-type(1){
            margin-left: -2rem;
          }
          span:nth-of-type(2){
            margin-right: -2rem;
          }
        }
      `
  }, [])  
  
  
  
  return (
    <LeyendaContainer className={`text-normal ${darkMode ? 'text-primary-dark' : ' text-primary'}`}>
      <h4>Total de Casos Positivos</h4>
      <div className="barra"></div>
      <div className="casos">
        {departamento
        ?
        <Fragment>
          <span>{"<2500"}</span>
          <span>{">25000"}</span>
        </Fragment>
        :
        <Fragment>
          <span>{"<10000"}</span>
          <span>{">100000"}</span>
        </Fragment>
        }
      </div>
    </LeyendaContainer>
  );
}
 
export default Leyenda;