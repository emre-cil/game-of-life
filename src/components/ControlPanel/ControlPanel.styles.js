import styled from 'styled-components';
export const Wrapper = styled.div`
  width: 100%;
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    font-size: 2rem;
    color: #fff;
    cursor: pointer;
    border: 1px solid var(--quaternary);
    border-radius: 50%;
    padding: 0.5rem;
    background-color: var(--secondary);
    transition: all 0.2s ease-in;
    &:hover {
      background-color: var(--tertiary);
      color: var(--quaternary);
      border-color: var(--tertiary);
    }
  }
  margin-bottom: 0.5rem;
`;
export const Controls = styled.div`
  margin-right: 1rem;
  width: 220px;
  @media screen and (max-width: 389px) {
    max-width: 190px;
  }
  input {
    width: 100%;
  }
  input[type='range'] {
    -webkit-appearance: none;
    background-color: var(--secondary);
    &::-webkit-slider-thumb {
      appearance: none;
      width: 0.75rem;
      height: 0.75rem;
      background-color: var(--tertiary);
      cursor: pointer;
    }
  }

  h4 {
    margin-top: 0.5rem;
    margin-bottom: 0.25rem;
  }
`;
export const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  svg + svg {
    margin-left: 1rem;
  }
`;

export const RangeWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  div {
    width: 48%;
  }
`;
export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--secondary);
  padding: 20px;
  border-radius: 0.5rem;
`;
