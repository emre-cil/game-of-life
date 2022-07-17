import React from 'react';
import styled from 'styled-components';
import { Tile } from '../Tile/Tile';
const GameField = ({
  tiles,
  setTiles,
  colCount,
  population,
  setPopulation,
}) => {
  //a function to check if the tile is alive or dead
  const setValue = (value, i, j) => {
    setTiles(
      tiles.map((row, rowIndex) =>
        row.map((tile, tileIndex) => {
          if (rowIndex === i && tileIndex === j) {
            if (value) {
              setPopulation(population + 1);
            } else {
              setPopulation(population - 1);
            }
            return value;
          }
          return tile;
        })
      )
    );
  };

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
  background-color: var(--secondary);
  width: 95vw;
  border-right: 1px solid var(--primary);
  border-bottom: 1px solid var(--primary);
`;
const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => props.colCount}, auto);
  @media screen and (max-width: 588px) {
    grid-template-columns: repeat(${(props) => props.colCount}, auto);
  }
`;

export default GameField;
