import React, {useMemo} from 'react';
import styled from '@emotion/styled';

const LeyendaSmall = ({caso_menor, caso_mayor}) => {
   const LeyendaSmallContainer = useMemo(() => {
      return styled.div`
        text-align: center;
        font-size: 1rem;
        h4{
          transition: color .5s ease-in-out;
          font-family: "Rubik Medium", sans-serif;   
          text-transform: capitalize;      
        }
        .barra{
          height: 15px;
          border-radius: 15px;
          background: linear-gradient(to right, #E8DFDF, #EA7878, #E35050, #C42C2C, #880909);
          margin: .5rem 0;
        }
        .casos{
          display: flex;
          justify-content: space-between;
          transition: color .5s ease-in-out;
          span{
            font-family: "Rubik Bold", sans-serif;
          }
          span:nth-of-type(1){
            margin-left: -1rem;
          }
          span:nth-of-type(2){
            margin-right: -1rem;
          }

        }
      `
  }, [])  
  
  return (
    <LeyendaSmallContainer className={'text-primary'}>
          <h4>Total de Casos Positivos</h4>
          <div className="barra"></div>
          <div className="casos">
            <span>{"<2500"}</span>
            <span>{">25000"}</span>
          </div>
    </LeyendaSmallContainer>
  );
}
 
export default LeyendaSmall;