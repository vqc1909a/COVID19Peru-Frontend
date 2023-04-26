import React, { useMemo, useContext } from 'react';
import styled from '@emotion/styled';
import { DarkModeContext } from '../../context/DarkModeContext';
import { PeruContext } from '../../context/PeruContext';


const FooterMobile = () => {
  const { isDarkMode } = useContext(DarkModeContext);
  const { peru } = useContext(PeruContext);

  const FooterMobileContainer = useMemo(() => {
    return styled.footer`
      p {
        font-size: var(--text-small);
        margin: 1.5rem 0;
        text-align: center;
        transition: all 0.5s ease-in-out;
        letter-spacing: .5px
      }
    `;
  }, []);
  
  let partsDate = peru?.fecha?.slice(0, 10).split("-") || [0, 0, 0];
  let year = partsDate[0];
  let month = partsDate[1];
  let day = partsDate[2];

  return (
    <FooterMobileContainer>
      <p
        className={`text-normal ${
          isDarkMode ? 'text-secondary-dark' : 'text-secondary'
        }`}
      >
        Actualizado el {day}/{month}/{year}
      </p>
    </FooterMobileContainer>
  );
};

export default FooterMobile;
