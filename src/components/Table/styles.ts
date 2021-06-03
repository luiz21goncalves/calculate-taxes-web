import styled from 'styled-components';

export const Container = styled.table`
  width: 100%;
  border-spacing: 0;

  thead {
    th {
      padding: 0.75rem;
      background: var(--blue-500);
      color: var(--white);
      text-transform: uppercase;

      & + th {
        border-left: 1px solid var(--white);
      }
    }
  }

  tbody {
    tr {
      td {
        text-align: center;
        padding: 0.5rem;
        border-bottom: 1px solid var(--blue-500);

        &:nth-child(1) {
          border-left: 1px solid var(--blue-500);
        }

        &:last-child {
          border-right: 1px solid var(--blue-500);
        }

        & + td {
          border-left: 1px solid var(--blue-500);
        }
      }
    }
  }
`;
