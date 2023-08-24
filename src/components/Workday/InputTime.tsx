import { Flex, Text, Input } from '@chakra-ui/react'

type InputTimeProps = {
  label: string
  value: string
  changeValue: (value: string) => void
}

export function InputTime(props: InputTimeProps) {
  const { label, value, changeValue } = props

  return (
    <Flex direction="column" align="center" justify="center">
      <Text mb="1">{label}</Text>
      <Input
        type="time"
        value={value}
        onChange={(event) => changeValue(event.target.value)}
      />
    </Flex>
  )
}
