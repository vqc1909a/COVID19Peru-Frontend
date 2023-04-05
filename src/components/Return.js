import React from 'react';
import styled from '@emotion/styled';
const Return = () => {

  const ReturnContainer = styled.div`
    position: fixed;
    top: 5%;
    left: 5%;
    z-index: 2;
    cursor: pointer;
    @media (min-width: 992px){
      display: none;
    }
  `
  const returnPage = () => {
    window.history.back();
  }
  return (
    <ReturnContainer>
      <img src={`/icons/return.svg`} alt="return-icon" onClick={() => returnPage()} />
    </ReturnContainer>
  );
}
 
export default Return;
