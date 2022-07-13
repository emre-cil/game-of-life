import React from 'react';
import styled from 'styled-components';
export const Tile = ({ value, setValue, rowIndex, tileIndex, colWidth }) => {
  return (
    <TileWrapper
      colWidth={colWidth}
      onClick={() => {
        setValue(!value, rowIndex, tileIndex);
      }}
      style={value ? { backgroundColor: '#000' } : {}}
    />
  );
};

const TileWrapper = styled.div`
  width: 100%;
  height: ${(props) => props.colWidth}px;
  border-top: 1px solid #000;
  border-left: 1px solid #000;

  @media screen and (min-width: 1000px) {
  }
  @media screen and (max-width: 588px) {
  }
  &:hover {
    background-color: rgba(0, 100, 255, 0.35);
  }
`;
