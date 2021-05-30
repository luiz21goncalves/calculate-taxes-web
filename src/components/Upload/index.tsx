import Dropzone from 'react-dropzone';

import styles from './styles.module.scss';

interface UploadProps {
  onUpload: (files: File[]) => void;
}

export default function Upload({ onUpload }: UploadProps) {
  const renderDragMessage = (isDragActive: boolean, isDragReject: boolean) => {
    if (!isDragActive) {
      return <p className={styles.text__default}>Arraste xml aqui...</p>;
    }

    if (isDragReject) {
      return <p className={styles.text__error}>Arquivo não suportado</p>;
    }

    return <p className={styles.text__success}>Solte o xml aqui</p>;
  };

  return (
    <div className={styles.container}>
      <Dropzone accept="text/xml" onDropAccepted={onUpload}>
        {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
          <div className={styles.content} {...getRootProps()}>
            <input {...getInputProps()} multiple={false} />
            {renderDragMessage(isDragActive, isDragReject)}
          </div>
        )}
      </Dropzone>
    </div>
  );
}
