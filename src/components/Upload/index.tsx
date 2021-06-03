import Dropzone from 'react-dropzone';

import { DropContainer, UploadMessage } from './styles';

interface UploadProps {
  onUpload: (files: File[]) => void;
}

export default function Upload({ onUpload }: UploadProps) {
  const renderDragMessage = (isDragActive: boolean, isDragReject: boolean) => {
    if (!isDragActive) {
      return <UploadMessage type="default">Arraste xml aqui...</UploadMessage>;
    }

    if (isDragReject) {
      return <UploadMessage type="error">Arquivo não suportado</UploadMessage>;
    }

    return <UploadMessage type="success">Solte o xml aqui</UploadMessage>;
  };

  return (
    <Dropzone accept="text/xml" onDropAccepted={onUpload}>
      {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
        <DropContainer
          {...getRootProps()}
          isDragActive={isDragActive}
          isDragReject={isDragReject}
        >
          <input {...getInputProps()} multiple={false} />
          {renderDragMessage(isDragActive, isDragReject)}
        </DropContainer>
      )}
    </Dropzone>
  );
}
