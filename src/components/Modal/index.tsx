import { ReactNode } from 'react';

import ReactModal from 'react-modal';

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: () => void;
}

export default function Modal({ children, isOpen, setIsOpen }: ModalProps) {
  return (
    <ReactModal
      shouldCloseOnOverlayClick
      onRequestClose={setIsOpen}
      isOpen={isOpen}
      ariaHideApp={false}
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          background: '#F5F8FA',
          color: '#123a52',
          borderRadius: '8px',
          width: '736px',
          border: 'none',
        },
        overlay: {
          backgroundColor: '#123a5239',
        },
      }}
    >
      {children}
    </ReactModal>
  );
}
