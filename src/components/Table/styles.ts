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
          padding: 0 0;
          position: relative;
          transition: 0.2s;

          &:hover {
            background: var(--blue-500);

            span {
              display: initial;
            }

            button {
              color: var(--white);
            }
          }

          button {
            width: 100%;
            height: 100%;
            border: none;
            background: transparent;
            color: var(--blue-500);
            font-weight: 500;
            padding: 0.75rem;
          }

          span {
            position: absolute;
            display: none;
            background: var(--white);
            width: 300px;
            border: 1px dashed var(--blue-500);
            padding: 0.5rem;
            color: var(--blue-500);
            font-size: 1.1rem;

            top: 0;
            left: 9rem;
          }
        }

        & + td {
          border-left: 1px solid var(--blue-500);
        }
      }
    }
  }
`;

export const ModalContainer = styled.div`
  padding: 2rem;

  div {
    font-size: 1.2rem;
    & + div {
      margin-top: 1.5rem;
    }
  }
`;
