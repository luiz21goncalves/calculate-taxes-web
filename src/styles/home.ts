import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1120px;
  width: 100%;
  height: 80vh;
  margin: 0 auto;
  padding: 0 2rem;
  color: var(--blue-500);

  h1 {
    font-size: 2.5rem;
    margin: 1.5rem 0;
    text-align: center;
  }

  p {
    font-size: 1.25rem;
    line-height: 2.25rem;

    & + p {
      margin-top: 2rem;
    }
  }
`;
