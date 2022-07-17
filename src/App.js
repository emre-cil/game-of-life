//rules
//Any live cell with fewer than two live neighbours dies, as if by underpopulation.
//Any live cell with two or three live neighbours lives on to the next generation.
//Any live cell with more than three live neighbours dies, as if by overpopulation.
//Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

import React, { useState, useEffect } from 'react';
import { Wrapper } from './App.styles';
import GameField from './components/GameField/GameField';
import ControlPanel from './components/ControlPanel/ControlPanel';

const App = () => {
  const [population, setPopulation] = useState(0);
  const [colCount, setColCount] = useState(30);
  const [rowCount, setRowCount] = useState(
    Math.trunc(
      (window.innerHeight - 190) / ((window.innerWidth * 0.95) / colCount)
    )
  );
  const [tiles, setTiles] = useState(
    Array(rowCount).fill(Array(colCount).fill(false))
  );

  useEffect(() => {
    const handleWindowResize = () => {
      recalculate(colCount);
    };
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [colCount]);

  const recalculate = (col) => {
    let rowCountTemp = Math.trunc(
      (window.innerHeight - 190) / ((window.innerWidth * 0.95) / col)
    );
    setRowCount(rowCountTemp);
    setTiles(Array(rowCountTemp).fill(Array(col).fill(false)));
    setPopulation(0);
    //todo: generate a new seed
  };

  return (
    <Wrapper>
      <h1>Game of Life</h1>
      <ControlPanel
        tiles={tiles}
        setTiles={setTiles}
        rowCount={rowCount}
        colCount={colCount}
        setColCount={setColCount}
        population={population}
        setPopulation={setPopulation}
        recalculate={recalculate}
      />
      <GameField
        tiles={tiles}
        colCount={colCount}
        setTiles={setTiles}
        population={population}
        setPopulation={setPopulation}
      />
    </Wrapper>
  );
};

export default App;
