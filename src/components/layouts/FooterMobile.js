import React, { useMemo, useContext } from 'react';
import styled from '@emotion/styled';
import { DarkModeContext } from '../../context/DarkModeContext';

const FooterMobile = () => {
  const { isDarkMode } = useContext(DarkModeContext);

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
  const fecha = new Date();
  return (
    <FooterMobileContainer>
      <p
        className={`text-normal ${
          isDarkMode ? 'text-secondary-dark' : 'text-secondary'
        }`}
      >
        Actualizado el {fecha.getDate() < 10 ? `0${fecha.getDate()}` : fecha.getDate()} / {fecha.getMonth() + 1 <= 9 ? `0${fecha.getMonth() + 1}` : fecha.getMonth() + 1} /{' '}
        {fecha.getFullYear()}
      </p>
    </FooterMobileContainer>
  );
};

export default FooterMobile;
