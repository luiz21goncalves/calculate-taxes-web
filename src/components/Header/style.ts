import styled from 'styled-components';

export const Container = styled.header`
  background: var(--white);
  height: 5rem;
  box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2);

  > div {
    max-width: 1120px;
    margin: 0 auto;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: space-between;

    a {
      transition: color 0.2s;
      font-weight: 500;

      & + a {
        margin-left: 5rem;
      }

      &:hover {
        color: var(--blue-500);
      }
    }
  }
`;
