//rules
//Any live cell with fewer than two live neighbours dies, as if by underpopulation.
//Any live cell with two or three live neighbours lives on to the next generation.
//Any live cell with more than three live neighbours dies, as if by overpopulation.
//Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

import React, { useState } from 'react';
import { Wrapper } from './App.styles';
import GameField from './components/GameField/GameField';
import ControlPanel from './components/ControlPanel/ControlPanel';
const App = () => {
  const [population, setPopulation] = useState(0);
  const [colCount, setColCount] = useState(30);
  const [rowCount, setRowCount] = useState(
    Math.trunc(
      (window.innerHeight - 170) / ((window.innerWidth * 0.95) / colCount)
    )
  );
  const [tiles, setTiles] = useState(
    Array(rowCount).fill(Array(colCount).fill(false))
  );

  return (
    <Wrapper>
      <h1>Game of Life</h1>
      <ControlPanel
        tiles={tiles}
        setTiles={setTiles}
        colCount={colCount}
        setColCount={setColCount}
        population={population}
        setPopulation={setPopulation}
        rowCount={rowCount}
        setRowCount={setRowCount}
      />
      <GameField
        tiles={tiles}
        setTiles={setTiles}
        colCount={colCount}
        population={population}
        setPopulation={setPopulation}
      />
    </Wrapper>
  );
};

export default App;
