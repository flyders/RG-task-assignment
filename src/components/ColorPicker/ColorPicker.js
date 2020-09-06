import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: flex-end;
  width: 100%;
  padding: 9px 0;
  border-top: 1px solid #bfc9d9;

  input[type='color'] {
    margin-right: 8px;
    -webkit-appearance: none;
    border: none;
    width: auto;
    height: auto;
    cursor: pointer;
    background: none;
    &::-webkit-color-swatch-wrapper {
      padding: 0;
      width: 14px;
      height: 14px;
    }
    &::-webkit-color-swatch {
      border: 1px solid #bfc9d9;
      border-radius: 4px;
      padding: 0;
    }
  }

  input[type='text'] {
    border: none;
    width: 100%;
    font-size: 14px;
  }
`;

const PickerWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 150px;
`;

const ColorPicker = (props) => {
  return (
    <Container>
      <PickerWrapper>
        <input type='color' {...props} />
        <input type='text' {...props} />
      </PickerWrapper>
    </Container>
  );
};

export default ColorPicker;
