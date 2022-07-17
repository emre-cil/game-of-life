import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    color: var(--quaternary);
    width: 100%;
    text-align: center;
    padding: 12px;
    margin-bottom: 0.5rem;
    border-bottom: 1px solid var(--quaternary);
  }
  h5 {
    margin-top: 0.5rem;
    color: var(--quaternary);
    @media screen and (max-width: 500px) {
      font-size: 0.75rem;
    }
  }
  h4 {
    color: var(--quaternary);
    @media screen and (max-width: 500px) {
      font-size: 0.8rem;
    }
  }
`;
