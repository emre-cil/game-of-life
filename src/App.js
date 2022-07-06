import React, { useState } from 'react';
import styled from 'styled-components';
import { MdPause, MdPlayArrow } from 'react-icons/md';

const App = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <Wrapper>
      <Title>Game of Life</Title>
      <Controls>
        {isPlaying ? (
          <MdPause onClick={() => setIsPlaying(false)} />
        ) : (
          <MdPlayArrow onClick={() => setIsPlaying(true)} />
        )}
      </Controls>
      <GameField>
        {Array(25)
          .fill(0)
          .map((_, i) => {
            return (
              <Row key={i}>
                {Array(25)
                  .fill(0)
                  .map((_, j) => {
                    return <Cell key={j} />;
                  })}
              </Row>
            );
          })}
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
const Cell = styled.div`
  width: 18px;
  height: 18px;
  border: 1px solid #000;
  @media screen and (min-width: 1000px) {
    width: 28px;
    height: 28px;
  }
  @media screen and (max-width: 588px) {
    width: 10px;
    height: 10px;
  }
  &:hover {
    background-color: rgba(0, 100, 255, 0.35);
  }
`;
const Controls = styled.div`
  svg {
    font-size: 2rem;
    color: #fff;
    cursor: pointer;
    border: 1px solid #fff;
    border-radius: 50%;
    padding: 0.5rem;
    background-color: #000;
  }
  margin-bottom: 1rem;
`;

export default App;
