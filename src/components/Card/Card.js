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
    border-radius: 10px;
    background-color: ${props.backgroundColor};
    overflow: hidden;
    transform: perspective(3000px) rotateY(0deg);
    box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
    transition: transform 0.5s ease 0s;

    @media ${device.mobileL} {
      height: 100%;
      margin-bottom: 0;

      // &:hover {
      //   transform: perspective(1500px) rotateY(10deg);
      // }
    }
  `;

  return <CardBody>{props.children}</CardBody>;
};

export default Card;
