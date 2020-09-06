import React from 'react';
import styled from 'styled-components';
import device from '../../utils/device';

const Card = (props) => {
  const CardBody = styled.div`
    position: relative;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    margin-bottom: 20px;
    flex-direction: column;
    padding-bottom: 40px;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.35);
    border-radius: 4px;
    background-color: ${props.backgroundColor};
    overflow: hidden;

    @media ${device.mobileL} {
      height: 100%;
      margin-bottom: 0;
    }
  `;

  return <CardBody>{props.children}</CardBody>;
};

export default Card;
