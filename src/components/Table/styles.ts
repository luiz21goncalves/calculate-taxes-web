import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1120px;
  width: 100%;
  height: 100%;
  margin: 0 auto;

  .header {
    margin: 1.5rem 0;

    display: flex;
    align-items: center;
    justify-content: space-between;

    div {
      border: 1px solid var(--gray-300);
      padding: 1rem;

      strong {
        margin-left: 0.5rem;
      }
    }
  }

  table {
    width: 100%;

    thead {
      th {
        padding: 0.75rem 0;
        border-top: 1px solid var(--blue-500);
        border-bottom: 1px solid var(--blue-500);
      }
    }

    tbody {
      tr {
        td {
          text-align: center;
          padding: 0.5rem;
          border-bottom: 1px solid var(--blue-500);
        }
      }
    }
  }

  .footer {
    margin-top: 2rem;
    display: grid;
    grid-template-rows: repeat(3, 1fr);
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    align-items: center;
    justify-content: center;

    p {
      text-align: center;
      strong {
        margin-left: 5px;
      }
    }
  }
`;
