import React from 'react';
import device from '../../utils/device';
import styled from 'styled-components';

const CommonNav = styled.div`
  display: flex;
  grid-area: nav;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;

  @media ${device.mobileL} {
    flex-direction: row;
    margin-bottom: 30px;
  }

  img {
    display: block;
    width: 130px;

    @media ${device.tablet} {
      width: 150px;
    }
  }
`;

const Nav = () => {
  return (
    <CommonNav>
      <img src={process.env.PUBLIC_URL + '/company_logo.png'} alt='' />
    </CommonNav>
  );
};

export default Nav;
