//rules
//Any live cell with fewer than two live neighbours dies, as if by underpopulation.
//Any live cell with two or three live neighbours lives on to the next generation.
//Any live cell with more than three live neighbours dies, as if by overpopulation.
//Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { MdPause, MdPlayArrow } from 'react-icons/md';
import { FaDice, FaTrashAlt } from 'react-icons/fa';
import { BsChevronRight } from 'react-icons/bs';

import { Tile } from './components/Tile/Tile';

const neighborLocations = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

const App = () => {
  const [colCount, setColCount] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(200);
  const [generation, setGeneration] = useState(0);
  const [population, setPopulation] = useState(0);
  const [rowCount, setRowCount] = useState(
    Math.trunc(
      (window.innerHeight - 190) / ((window.innerWidth * 0.95) / colCount)
    )
  );
  const [tiles, setTiles] = useState(
    Array(rowCount).fill(Array(colCount).fill(false))
  );

  //randomize the map when the page loads
  useEffect(() => {
    generateSeed();
  }, []);

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        nextGeneration();
      }, speed);
      return () => clearInterval(interval);
    }
  }, [isPlaying, generation, speed, population, setPopulation]);

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

  //randomly generate a new tile array
  const generateSeed = () => {
    setGeneration(0);
    let populationTemp = 0;
    setTiles(
      tiles.map((row) =>
        row.map(() => {
          const random = Math.random() > 0.75;
          random && populationTemp++;
          return random;
        })
      )
    );
    setPopulation(populationTemp);
  };

  // a function to check the number of alive neighbors
  const getNeighbors = (rowIndex, colIndex, initalTiles) => {
    let neighbors = 0;
    neighborLocations.forEach(([i, j]) => {
      const row = rowIndex + i;
      const col = colIndex + j;
      if (row >= 0 && row < rowCount && col >= 0 && col < colCount) {
        neighbors += initalTiles[row][col] ? 1 : 0;
        if (neighbors === 3) {
        }
      }
    });
    return neighbors;
  };
  const cleanMap = () => {
    setTiles(Array(rowCount).fill(Array(colCount).fill(false)));
    setGeneration(0);
    setPopulation(0);
  };

  const recalculate = (col) => {
    let rowCountTemp = Math.trunc(
      (window.innerHeight - 190) / ((window.innerWidth * 0.95) / col)
    );
    setRowCount(rowCountTemp);
    setTiles(Array(rowCountTemp).fill(Array(col).fill(false)));
    setGeneration(0);
    setPopulation(0);
  };

  //returns next generation of tiles
  const nextGeneration = () => {
    setGeneration(generation + 1);
    let populationTemp = 0;
    let anyMove = false;
    setTiles((ntiles) => {
      const nextTiles = ntiles.map((row) => row.slice());
      for (let i = 0; i < rowCount; i++) {
        for (let j = 0; j < colCount; j++) {
          const neighbors = getNeighbors(i, j, ntiles);
          const isLive = ntiles[i][j];
          if (!isLive && neighbors === 3) {
            nextTiles[i][j] = true;
            populationTemp++;
            anyMove = true;
          } else if (isLive && (neighbors < 2 || neighbors > 3)) {
            nextTiles[i][j] = false;
            populationTemp--;
            anyMove = true;
          }
        }
      }
      //if no change in generation, stop the game
      if (!anyMove) {
        setIsPlaying(false);
      }
      setPopulation((p) => p + populationTemp);
      return nextTiles;
    });
  };

  return (
    <Wrapper>
      <h1>Game of Life</h1>
      <SettingsWrapper>
        <Controls>
          <Buttons>
            {isPlaying ? (
              <MdPause onClick={() => setIsPlaying(false)} />
            ) : (
              <MdPlayArrow onClick={() => setIsPlaying(true)} />
            )}
            {/* nextStep */}
            <BsChevronRight
              onClick={() => {
                nextGeneration();
              }}
            />

            <FaTrashAlt onClick={cleanMap} />
            <FaDice onClick={generateSeed} />
          </Buttons>
          <SpeedWrapper>
            <div>
              <h4>Column: {colCount}</h4>
              <input
                onChange={(e) => {
                  let value = parseInt(e.target.value);
                  setColCount(value);
                  recalculate(value);
                }}
                type="range"
                name="colCount"
                min={10}
                max={100}
                step={colCount < 50 ? 5 : 10}
                value={colCount}
              />
            </div>
            <div>
              <h4>Speed: {speed}ms</h4>
              <input
                onChange={(e) => {
                  setSpeed(e.target.value);
                }}
                type="range"
                name="speed"
                min={50}
                max={2750}
                step={speed < 1000 ? 50 : 150}
                value={speed}
              />
            </div>
          </SpeedWrapper>
        </Controls>
        <InfoWrapper>
          <h4>Generation: {generation}</h4>
          <h4>Population: {population}</h4>
        </InfoWrapper>
      </SettingsWrapper>

      <GameField>
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
      </GameField>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    color: white;
    width: 100%;
    background-color: #2d3436;
    text-align: center;
    padding: 12px;
    margin-bottom: 0.5rem;
  }
  h4 {
    color: white;
  }
`;

const SpeedWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  div {
    width: 48%;
  }
`;
const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: grey;
  padding: 20px 25px;
  border-radius: 0.5rem;
`;
const GameField = styled.div`
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

const SettingsWrapper = styled.div`
  width: 100%;
  user-select: none;
  display: flex;
  justify-content: center;
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
  margin-bottom: 0.5rem;
`;
const Controls = styled.div`
  margin-right: 1rem;
  width: 200px;
  input {
    width: 100%;
  }
  h4 {
    margin-top: 0.5rem;
    margin-bottom: 0.25rem;
  }
`;
const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  svg + svg {
    margin-left: 1rem;
  }
`;

export default App;
