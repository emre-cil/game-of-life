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
export const Controls = styled.div`
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
  background-color: grey;
  padding: 20px 25px;
  border-radius: 0.5rem;
`;
