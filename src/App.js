//rules
//Any live cell with fewer than two live neighbours dies, as if by underpopulation.
//Any live cell with two or three live neighbours lives on to the next generation.
//Any live cell with more than three live neighbours dies, as if by overpopulation.
//Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { MdPause, MdPlayArrow } from 'react-icons/md';
import { Tile } from './components/Tile/Tile';
const App = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [tiles, setTiles] = useState(Array(25).fill(Array(25).fill(false)));

  //randomize the map when the page loads
  useEffect(() => {
    generateSeed();
  }, []);

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setTiles(nextGeneration());
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  //a function to check if the tile is alive or dead
  const setValue = (value, i, j) => {
    setTiles(
      tiles.map((row, rowIndex) =>
        row.map((tile, tileIndex) => {
          if (rowIndex === i && tileIndex === j) {
            return value;
          }
          return tile;
        })
      )
    );
  };

  //randomly generate a new tile array
  const generateSeed = () => {
    setTiles(
      tiles.map((row) =>
        row.map(() => {
          return Math.random() > 0.75;
        })
      )
    );
  };

  const getNeighbors = (rowIndex, tileIndex) => {
    let neighbors = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) {
          continue;
        }
        const row = rowIndex + i;
        const tile = tileIndex + j;
        if (row >= 0 && row < 25 && tile >= 0 && tile < 25) {
          neighbors += tiles[row][tile] ? 1 : 0;
        }
      }
    }
    return neighbors;
  };

  //returns next generation of tiles
  const nextGeneration = () => {
    const nextTiles = [...tiles];
    for (let i = 0; i < 25; i++) {
      for (let j = 0; j < 25; j++) {
        const neighbors = getNeighbors(i, j);
        const alive = tiles[i][j];
        if (alive) {
          if (neighbors < 2 || neighbors > 3) {
            nextTiles[i][j] = false;
          }
        } else {
          if (neighbors === 3) {
            nextTiles[i][j] = true;
          }
        }
      }
    }
    return nextTiles;
  };

  return (
    <Wrapper>
      <Title>Game of Life</Title>
      <Controls>
        <StyledButton
          onClick={() => setTiles(Array(25).fill(Array(25).fill(false)))}
        >
          Reset
        </StyledButton>
        {isPlaying ? (
          <MdPause onClick={() => setIsPlaying(false)} />
        ) : (
          <MdPlayArrow onClick={() => setIsPlaying(true)} />
        )}
        {/* nextStep */}
        <StyledButton
          onClick={() => {
            setTiles(nextGeneration());
          }}
        >
          Next
        </StyledButton>

        <StyledButton onClick={generateSeed}>Random</StyledButton>
      </Controls>
      <GameField>
        {tiles.map((row, rowIndex) => (
          <Row key={rowIndex}>
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
      </GameField>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h1`
  color: #fff;
  font-size: 2rem;
  text-align: center;
  margin: 2rem 0;
`;
const GameField = styled.div`
  background-color: #fff;
  border-right: 1px solid #000;
  border-bottom: 1px solid #000;
`;
const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(25, 19px);
  grid-gap: 1px;
  @media screen and (min-width: 1000px) {
    grid-template-columns: repeat(25, 29px);
  }
  @media screen and (max-width: 588px) {
    grid-template-columns: repeat(25, 11px);
  }
`;

const Controls = styled.div`
  user-select: none;
  width: 300px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  svg {
    font-size: 2rem;
    color: #fff;
    cursor: pointer;
    border: 1px solid #fff;
    border-radius: 50%;
    padding: 0.5rem;
    background-color: #000;
    transition: all 0.2s ease-in;
    &:hover {
      background-color: white;
      color: black;
      border-color: black;
    }
  }
  margin-bottom: 1rem;
`;
const StyledButton = styled.button`
  transition: all 0.2s ease-in-out;
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 1rem;
  cursor: pointer;
  &:hover {
    background-color: #fff;
    color: #000;
  }
  &:active {
    position: relative;
    top: 1px;
  }
`;

export default App;
