import React from 'react';
import styled from 'styled-components';
export const Tile = ({ value, setValue, rowIndex, tileIndex }) => {
  return (
    <TileWrapper
      onClick={() => {
        setValue(!value, rowIndex, tileIndex);
      }}
      style={value ? { backgroundColor: '#EEEEEE' } : {}}
    />
  );
};

const TileWrapper = styled.div`
  width: 100%;
  aspect-ratio: 1;
  border-top: 1px solid var(--primary);
  border-left: 1px solid var(--primary);

  @media screen and (min-width: 1000px) {
  }
  @media screen and (max-width: 588px) {
  }
  &:hover {
    background-color: var(--tertiary);
  }
`;
