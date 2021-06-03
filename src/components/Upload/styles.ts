import styled, { css } from 'styled-components';

type DropContainerProps = {
  isDragActive: boolean;
  isDragReject: boolean;
};
type UploadMessageProps = {
  type: 'default' | 'error' | 'success';
};

const dragActive = css`
  border-color: var(--blue-500);
`;

const dragReject = css`
  border-color: var(--red-500);
`;

export const DropContainer = styled.div<DropContainerProps>`
  width: 100%;
  padding: 2rem;
  background: var(--white);
  border-radius: 8px;

  border: 2px dashed #ddd;
  border-radius: 8px;
  cursor: pointer;
  transition: height 0.2s ease;

  ${(props) => props.isDragActive && dragActive};
  ${(props) => props.isDragReject && dragReject};
`;

const messageColors = {
  default: '#999',
  error: '#F25D27',
  success: ' #123952',
};

export const UploadMessage = styled.p<UploadMessageProps>`
  display: flex;
  color: ${(props) => messageColors[props.type]};
  justify-content: center;
  align-items: center;
  padding: 15px 0;
`;
