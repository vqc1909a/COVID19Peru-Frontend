import React, { useMemo, useContext } from 'react';
import styled from '@emotion/styled';
import { DarkModeContext } from '../../context/DarkModeContext';

const FooterMobile = () => {
  const { darkMode } = useContext(DarkModeContext);

  const FooterMobileContainer = useMemo(() => {
    return styled.footer`
      position: sticky;
      top: 100vh;
      width: 100%;
      p {
        margin: 1rem 0;
        text-align: center;
        transition: all 0.5s ease-in-out;
      }
    `;
  }, []);
  const fecha = new Date();
  return (
    <FooterMobileContainer>
      <p
        className={`text-normal ${
          darkMode ? 'text-secondary-dark' : 'text-secondary'
        }`}
      >
        Actualizado el {fecha.getDate() < 10 ? `0${fecha.getDate()}` : fecha.getDate()} / {fecha.getMonth() + 1 <= 9 ? `0${fecha.getMonth() + 1}` : fecha.getMonth() + 1} /{' '}
        {fecha.getFullYear()}
      </p>
    </FooterMobileContainer>
  );
};

export default FooterMobile;
