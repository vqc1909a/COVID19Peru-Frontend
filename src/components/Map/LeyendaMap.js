import React, {useMemo} from 'react';
import styled from '@emotion/styled';

const LeyendaMap = () => {


  const LeyendaMapContainer = useMemo(() => {
      return styled.div`
        padding: 2rem;
        background-color: rgba(27, 24, 24, .6);
        color: #f5f3f3;
        border-radius: 5px;

        h3{
          letter-spacing: 5px;
          margin-bottom: 1rem;
          text-align: center;
        }
        .casos-positivos{
          display: flex;
          justify-content: space-between;
          .caja{
            &:last-child{
              margin-left: 3rem;
            }
            h4{
              letter-spacing: 3px;
              font-family: "Rubik Regular", sans-serif;
            }
            .leyenda{
              flex: 1;
              .etapa{
                margin: .5rem 0;
                display:flex;
                justify-content: space-between;
                align-items: center;
                p{
                  text-align: left;
                  transition: color .5s ease-ease-in-out;
                  margin-right: 2rem;
                }
                .color{
                  height: 25px;
                  width: 25px;
                  border-radius: 50%
                }
              }
            }
          }
        }
      `
  }, [])  
  
  const etapas1 = [
    {etapa: "> 100 000", color: "#880909"},
    {etapa: "> 40 000", color: "#C42C2C"},
    {etapa: "> 20 000", color: "#E35050"},
    {etapa: "> 10 000", color: "#EA7878"},
    {etapa: "> 0", color: "#E8DFDF"}
  ]
  const etapas2 = [
    {etapa: "> 25 000", color: "#880909"},
    {etapa: "> 10 000", color: "#C42C2C"},
    {etapa: "> 5 000", color: "#E35050"},
    {etapa: "> 2 500", color: "#EA7878"},
    {etapa: "> 0", color: "#E8DFDF"}
  ]
  
  
  return (
    <LeyendaMapContainer className={`text-normal`}>
      <h3 className="text-medium" >Total de Casos <br></br>Positivos</h3>
      <div className="casos-positivos">
        <div className="caja">
          <h4 className="text-normal">Departamento</h4>
          <div className="leyenda">
              {etapas1.map((etapa, key) => (
                <div className="etapa" key={key}>
                  <p className="text-primary-dark">{etapa.etapa}</p>
                  <span className="color" style={{backgroundColor: etapa.color}}></span>
                </div>
              ))}
          </div>
        </div>

        <div className="caja">
          <h4 className="text-normal">Provincia</h4>
          <div className="leyenda">
              {etapas2.map((etapa, key) => (
              <div className="etapa" key={key}>
                <p className="text-primary-dark">{etapa.etapa}</p>
                <span className="color" style={{backgroundColor: etapa.color}}></span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </LeyendaMapContainer>
  );
}
 
export default LeyendaMap;