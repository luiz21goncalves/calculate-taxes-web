import { Box, Text } from '@chakra-ui/react';
import Dropzone from 'react-dropzone';

interface UploadProps {
  onUpload: (files: File[]) => void;
  file: File;
}

export default function Upload({ onUpload, file }: UploadProps) {
  const renderDragMessage = (isDragActive: boolean, isDragReject: boolean) => {
    if (!isDragActive) {
      return (
        <Text fontSize="lg" fontWeight="bold">
          Arraste xml aqui ...
        </Text>
      );
    }

    if (isDragReject) {
      return (
        <Text fontSize="lg" fontWeight="bold" color="red.600">
          Arquivo não suportado
        </Text>
      );
    }

    return (
      <Text fontSize="lg" fontWeight="bold">
        Solte o xml aqui
      </Text>
    );
  };

  return (
    <Dropzone accept="text/xml" onDropAccepted={onUpload}>
      {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
        <Box
          {...getRootProps()}
          p="3"
          border="2px"
          borderRadius={8}
          borderColor={isDragReject ? 'red.500' : 'blue.900'}
          borderStyle="dashed"
          w="70%"
          align="center"
          justify="center"
        >
          <input {...getInputProps()} multiple={false} />
          {file ? (
            <Text fontSize="lg" fontWeight="bold">
              {file.name}
            </Text>
          ) : (
            renderDragMessage(isDragActive, isDragReject)
          )}
        </Box>
      )}
    </Dropzone>
  );
}
