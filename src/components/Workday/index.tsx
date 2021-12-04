import { useState, Dispatch, SetStateAction } from 'react';

import dayjs from 'dayjs';
import { Box, Text, Stack, Button, Flex } from '@chakra-ui/react';

import { convertHoursInMinutes, convertMinutesInHours } from '../../utils';
import { InputTime } from './InputTime';

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
  const [entrance, setEntrance] = useState('');
  const [exit, setExit] = useState('');
  const [exitLunch, setExitLunch] = useState('');
  const [returnLunch, setReturnLunch] = useState('');
  const [overtime, setOvertime] = useState('0');
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
    <Box borderTop="1px" borderTopStyle="solid" borderTopColor="gray.400">
      <Flex direction="row" justify="space-between" align="center" mt="8">
        <Text fontWeight="bold" textTransform="capitalize">
          {formatedDate}
        </Text>

        <Text>
          horas extras {overtime}, correspondem a {overtimeValue}
        </Text>
      </Flex>

      <Stack
        mt="6"
        alignItems="center"
        justifyContent="space-between"
        direction="row"
      >
        <InputTime
          label="horário de entrada"
          value={entrance}
          changeValue={setEntrance}
        />

        <InputTime
          label="saida para almoço"
          value={exitLunch}
          changeValue={setExitLunch}
        />

        <InputTime
          label="retorno do almoço"
          value={returnLunch}
          changeValue={setReturnLunch}
        />

        <InputTime
          label="horário de saida"
          value={exit}
          changeValue={setExit}
        />

        <Button
          py="4"
          px="8"
          colorScheme="blue"
          onClick={handleCalculateOvertime}
          textTransform="uppercase"
          fontSize="sm"
        >
          calcular
        </Button>
      </Stack>
    </Box>
  );
}
