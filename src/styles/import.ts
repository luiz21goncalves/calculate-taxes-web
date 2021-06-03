import styled from 'styled-components';

export const Container = styled.main`
  max-width: 1120px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    margin: 1.5rem 0;
    width: 10rem;
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
