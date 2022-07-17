import React, { useState, useEffect } from 'react';
import { MdPause, MdPlayArrow } from 'react-icons/md';
import { FaDice, FaTrashAlt } from 'react-icons/fa';
import { BsChevronRight } from 'react-icons/bs';
import {
  Wrapper,
  Controls,
  Buttons,
  RangeWrapper,
  InfoWrapper,
} from './ControlPanel.styles';
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
const ControlPanel = ({
  tiles,
  setTiles,
  rowCount,
  colCount,
  setColCount,
  population,
  setPopulation,
  recalculate,
}) => {
  const [speed, setSpeed] = useState(200);
  const [generation, setGeneration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

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
  }, [isPlaying, generation, speed, population]);

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

  const nextGeneration = () => {
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
      } else {
        setGeneration(generation + 1);
        setPopulation((p) => p + populationTemp);
      }
      return nextTiles;
    });
  };

  const cleanMap = () => {
    setTiles(Array(rowCount).fill(Array(colCount).fill(false)));
    setGeneration(0);
    setPopulation(0);
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

  return (
    <Wrapper>
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
        <RangeWrapper>
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
        </RangeWrapper>
      </Controls>
      <InfoWrapper>
        <h4>Generation: {generation}</h4>
        <h4>Population: {population}</h4>
      </InfoWrapper>
    </Wrapper>
  );
};

export default ControlPanel;
