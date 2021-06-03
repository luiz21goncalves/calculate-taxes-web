import styled from 'styled-components';

export const Container = styled.main`
  max-width: 1120px;
  width: 100%;
  margin: 2.5rem auto;
`;

export const Content = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  justify-content: space-evenly;

  button {
    width: 10rem;
    margin: 0 auto;
    padding: 1rem;
    color: var(--blue-500);
    font-weight: 700;
    background: var(--gray-100);
    border: 1px solid var(--blue-500);
    border-radius: 4px;
    transition: background 0.2s;

    &:hover {
      background: var(--gray-300);
    }
  }
`;

export const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 2fr;
  padding: 1rem;
  align-items: center;
  justify-content: space-evenly;
  border: 1px solid var(--blue-500);
  margin-top: 2.5rem;

  > strong {
    text-align: center;
  }

  > div {
    width: 100%;
    border-left: 1px solid var(--blue-500);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    p {
      margin: 0.2rem 0;
    }
  }
`;

export const TableFooter = styled.div`
  margin: 2rem auto;

  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-items: center;

  p {
    text-align: center;
    padding: 0.75rem 0;
  }
`;
