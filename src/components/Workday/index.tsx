import { useState, Dispatch, SetStateAction } from 'react';

import 'dayjs/locale/pt-br';
import dayjs from 'dayjs';
import {
  Box,
  Text,
  Input,
  InputGroup,
  InputLeftAddon,
  Stack,
  Button,
} from '@chakra-ui/react';

import { convertHoursInMinutes, convertMinutesInHours } from '../../utils';

type Overtime = {
  [key: string]: number;
};

type WorkdayProps = {
  date: Date;
  workdayValue: number;
  setTotalOvertime: Dispatch<SetStateAction<Overtime>>;
};

const FULL_WORKER_MINUTES = 480;
const SATURDAY_MINUTES = 300;

export function Workday({
  date,
  workdayValue,
  setTotalOvertime,
}: WorkdayProps) {
  const [entrance, setEntrance] = useState('00:00');
  const [exit, setExit] = useState('00:00');
  const [exitLunch, setExitLunch] = useState('00:00');
  const [returnLunch, setReturnLunch] = useState('00:00');
  const [overtime, setOvertime] = useState('00:00');
  const [overtimeValue, setOvertimeValue] = useState('0');

  const formatedDate = dayjs(date).locale('pt-br').format('dddd DD/MM/YYYY');
  const weekday = dayjs(date).format('dddd');

  function getOvertime(
    entranceMinutes: number,
    exitLunchMinutes: number,
    returnLunchMinutes: number,
    exitMinutes: number,
    defaultWorkMinutes: number,
  ) {
    const lunchMinutes = returnLunchMinutes - exitLunchMinutes;
    const workedMinutes = exitMinutes - entranceMinutes;

    if (workedMinutes <= 0) return;

    const overtimeMinutes = workedMinutes - lunchMinutes - defaultWorkMinutes;

    const result = convertMinutesInHours(overtimeMinutes);

    const workMinutesValue = workdayValue / (8 * 60);

    setTotalOvertime((prevState) => ({
      ...prevState,
      [weekday.toLowerCase()]: overtimeMinutes,
    }));

    setOvertimeValue(Number(overtimeMinutes * workMinutesValue).toFixed(2));

    setOvertime(result);
  }

  function handleCalculateOvertime() {
    const entranceMinutes = convertHoursInMinutes(entrance);
    const exitMinutes = convertHoursInMinutes(exit);
    const exitLunchMinutes = convertHoursInMinutes(exitLunch);
    const returnLunchMinutes = convertHoursInMinutes(returnLunch);

    if (
      weekday.toLowerCase() !== 'saturday' &&
      weekday.toLowerCase() !== 'sunday'
    ) {
      getOvertime(
        entranceMinutes,
        exitLunchMinutes,
        returnLunchMinutes,
        exitMinutes,
        FULL_WORKER_MINUTES,
      );
    } else {
      getOvertime(
        entranceMinutes,
        exitLunchMinutes,
        returnLunchMinutes,
        exitMinutes,
        SATURDAY_MINUTES,
      );
    }
  }

  return (
    <Box>
      <Stack direction="row" spacing="8" margin="2" mb="4">
        <Text fontWeight="bold" textTransform="capitalize">
          {formatedDate}
        </Text>
        <Text>
          horas extras {overtime} - correspondem a {overtimeValue}
        </Text>
      </Stack>
      <Stack direction="row">
        <InputGroup>
          <InputLeftAddon>entrada</InputLeftAddon>
          <Input
            type="time"
            w="28"
            value={entrance}
            onChange={(event) => setEntrance(event.target.value)}
          />
        </InputGroup>

        <InputGroup>
          <InputLeftAddon>almoço saida</InputLeftAddon>
          <Input
            type="time"
            w="28"
            value={exitLunch}
            onChange={(event) => setExitLunch(event.target.value)}
          />
        </InputGroup>

        <InputGroup>
          <InputLeftAddon>almoço retorno</InputLeftAddon>
          <Input
            type="time"
            w="28"
            value={returnLunch}
            onChange={(event) => setReturnLunch(event.target.value)}
          />
        </InputGroup>

        <InputGroup>
          <InputLeftAddon>saida</InputLeftAddon>
          <Input
            type="time"
            w="28"
            value={exit}
            onChange={(event) => setExit(event.target.value)}
          />
        </InputGroup>

        <Button w="2xl" colorScheme="blue" onClick={handleCalculateOvertime}>
          calcular
        </Button>
      </Stack>
    </Box>
  );
}
