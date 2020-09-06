import React from 'react';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import { Nav } from './Nav';
import { EmployeeList } from './EmployeeList';
import device from '../utils/device';

const GlobalStyle = createGlobalStyle`
  ${reset}
  /* other styles */
  
  body {
    box-sizing: border-box;
    background:linear-gradient(limegreen,transparent),
                linear-gradient(90deg,skyblue,transparent),
                linear-gradient(-90deg,coral,transparent);
    background-blend-mode: screen;
    background-attachment: fixed;
    font-family: Arial, sans-serif;
  }
`;
const PageWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: flex-start;
  height: 100vh;
  max-width: 95%;
  margin: 0 auto;

  @media ${device.laptopL} {
    max-width: 1200px;
  }
`;

const Footer = styled.footer`
  grid-area: footer;
  display: flex;
  min-height: 150px;
  justify-content: center;
  align-items: center;
  font-size: 20px;
`;

const App = () => {
  return (
    <>
      <GlobalStyle />
      <PageWrapper>
        <Nav></Nav>
        <EmployeeList />
        <Footer>All rights reserved ®</Footer>
      </PageWrapper>
    </>
  );
};

export default App;
