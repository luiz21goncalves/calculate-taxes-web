import { useState, useEffect, useCallback } from 'react'

import {
  Box,
  Heading,
  Stack,
  Input,
  InputGroup,
  InputAddon,
  Text,
} from '@chakra-ui/react'
import dayjs from 'dayjs'

import { Header } from '../components/Header'
import { Workday } from '../components/Workday'
import { convertMinutesInHours } from '../utils'

type Overtime = {
  [key: string]: number
}

export default function Timesheet() {
  const [workdayValue, setWorkdayValue] = useState(50)
  const [selectedDay, setSelectedDay] = useState('')
  const [overtime, setOvertime] = useState<Overtime>({})
  const [totalOvertime, setTotalOvertime] = useState(0)
  const [overtimeValue, setOvertimeValue] = useState('0.00')

  useEffect(() => {
    const sum = Object.values(overtime).reduce((acc, value) => acc + value, 0)

    setTotalOvertime(sum)
  }, [overtime])

  const calculateOvertimeValue = useCallback(() => {
    const workMinutesValue = workdayValue / (8 * 60)

    setOvertimeValue(Number(totalOvertime * workMinutesValue).toFixed(2))
  }, [totalOvertime, workdayValue])

  useEffect(() => {
    calculateOvertimeValue()
  }, [calculateOvertimeValue])

  return (
    <>
      <Header />

      <Box as="main" maxW="container.lg" mx="auto" my="16" px="4">
        <Heading as="h1" textAlign="center" mb="8">
          Calculo de horas extras
        </Heading>

        <Stack spacing="4" direction="row" mb="8" mt="8">
          <InputGroup>
            <InputAddon>Valor do dia</InputAddon>
            <Input
              width="14"
              type="number"
              onChange={(event) => setWorkdayValue(Number(event.target.value))}
              value={workdayValue}
            />
          </InputGroup>

          <InputGroup>
            <InputAddon>Selecione a segunda-feira</InputAddon>
            <Input
              type="date"
              value={selectedDay}
              onChange={(event) => setSelectedDay(event.target.value)}
            />
          </InputGroup>

          <Stack alignItems="flex-end" justifyContent="center" w="full">
            <Text fontWeight="bold">
              Total de horas extras {convertMinutesInHours(totalOvertime)}
            </Text>
            <Text fontWeight="bold">
              Valor das horas extras {overtimeValue}
            </Text>
          </Stack>
        </Stack>

        <Stack spacing="8">
          <Workday
            date={dayjs(selectedDay).subtract(2, 'day').toDate()}
            workdayValue={workdayValue}
            setTotalOvertime={setOvertime}
          />
          <Workday
            date={dayjs(selectedDay).toDate()}
            workdayValue={workdayValue}
            setTotalOvertime={setOvertime}
          />
          <Workday
            date={dayjs(selectedDay).set('day', 2).toDate()}
            workdayValue={workdayValue}
            setTotalOvertime={setOvertime}
          />
          <Workday
            date={dayjs(selectedDay).set('day', 3).toDate()}
            workdayValue={workdayValue}
            setTotalOvertime={setOvertime}
          />
          <Workday
            date={dayjs(selectedDay).set('day', 4).toDate()}
            workdayValue={workdayValue}
            setTotalOvertime={setOvertime}
          />
          <Workday
            date={dayjs(selectedDay).set('day', 5).toDate()}
            workdayValue={workdayValue}
            setTotalOvertime={setOvertime}
          />
        </Stack>
      </Box>
    </>
  )
}
