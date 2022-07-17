import React from 'react';
import styled from 'styled-components';
import { Tile } from '../Tile/Tile';
const GameField = ({ tiles, colCount, setValue }) => {
  return (
    <Wrapper>
      {tiles.map((row, rowIndex) => (
        <Row key={rowIndex} colCount={colCount}>
          {row.map((tile, tileIndex) => (
            <Tile
              key={tileIndex}
              value={tile}
              setValue={setValue}
              rowIndex={rowIndex}
              tileIndex={tileIndex}
            />
          ))}
        </Row>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: #fff;
  width: 95vw;
  border-right: 1px solid #000;
  border-bottom: 1px solid #000;
`;
const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => props.colCount}, auto);
  @media screen and (max-width: 588px) {
    grid-template-columns: repeat(${(props) => props.colCount}, auto);
  }
`;

export default GameField;
