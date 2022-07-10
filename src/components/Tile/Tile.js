import React from 'react';
import styled from 'styled-components';
export const Tile = ({ value, setValue, rowIndex, tileIndex }) => {
  return (
    <TileWrapper
      onClick={() => {
        setValue(!value, rowIndex, tileIndex);
      }}
      style={value ? { backgroundColor: '#000' } : {}}
    />
  );
};

const TileWrapper = styled.div`
  width: 19px;
  height: 19px;
  border-top: 1px solid #000;
  border-left: 1px solid #000;

  @media screen and (min-width: 1000px) {
    width: 29px;
    height: 29px;
  }
  @media screen and (max-width: 588px) {
    width: 11px;
    height: 11px;
  }
  &:hover {
    background-color: rgba(0, 100, 255, 0.35);
  }
`;
