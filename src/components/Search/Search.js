import React from 'react';
import device from '../../utils/device';
import styled, { keyframes } from 'styled-components';

const borderAnimation = keyframes`
    0%{background-position:0 0}
    100%{background-position:100% 0}
`;

const FilterWrapper = styled.form`
  position: relative;
  display: block;
  align-items: center;
  border-radius: 2px 2px 0 0;
  padding: 8px 35px;
  background: rgba(57, 63, 84, 0.4);
  margin-bottom: 30px;

  @media ${device.mobileL} {
    position: absolute;
    top: 50px;
    right: 0;
    margin-bottom: 0;
  }

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
    height: 3px;
    border-bottom-left-radius: 2px;
    border-bottom-right-radius: 2px;
    background-position: 0 0;
    background: linear-gradient(
      to right,
      #f1f1f1,
      #57e6e6,
      #feffb8,
      #57e6e6,
      #b294ff,
      #57e6e6
    );
    background-size: 500% auto;
    animation: ${borderAnimation} 3s linear infinite;
  }
  input {
    outline: none;
    font-size: 14px;
    line-height: 2;
    vertical-align: middle;
    background-color: transparent;
    color: #ffffff;
    border: 0;

    &::placeholder {
      color: #ffffff;
      font-size: 16px;
    }
  }
`;

const Search = (props) => {
  return (
    <FilterWrapper>
      <input placeholder='Search for employees...' type='text' {...props} />
    </FilterWrapper>
  );
};

export default Search;
