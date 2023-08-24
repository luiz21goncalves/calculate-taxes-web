import { ChangeEvent, useCallback } from 'react'

import { Input, Text } from '@chakra-ui/react'

type UploadProps = {
  onUpload: (files: File[]) => void
  file: File
}

export default function Upload({ onUpload, file }: UploadProps) {
  const handleFileSelected = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files?.length) {
        const files = Array.from(event.target.files)
        onUpload(files)
      }
    },
    [onUpload],
  )

  return (
    <Text
      as="label"
      htmlFor="file"
      p="3"
      border="2px"
      borderColor="blue.900"
      borderRadius={8}
      borderStyle="dashed"
      w="70%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      fontSize="lg"
      fontWeight="bold"
    >
      {file ? file.name : 'Clique para importar xml'}
      <Input
        type="file"
        name="file"
        id="file"
        position="absolute"
        width="1px"
        height="1px"
        padding={0}
        overflow="hidden"
        clipPath="rect(0, 0, 0, 0)"
        whiteSpace="nowrap"
        borderWidth={0}
        onChange={handleFileSelected}
        accept="text/xml"
      />
    </Text>
  )
}
