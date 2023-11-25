'use client'

import { useEffect, useMemo, useState } from 'react'

import dayjs from 'dayjs'

import 'dayjs/locale/pt-br'
import { useTimesheet } from '@/contexts/timesheet-context'
import { convertHoursInMinutes, convertMinutesInHours } from '@/utils'

const FULL_WORKER_MINUTES = 8 * 60
const SATURDAY_MINUTES = 5 * 60

type WorkdayProps = {
  date: Date
}

type Total = {
  value: string
  hours: string
  minutes: number
}

export function Workday(props: WorkdayProps) {
  const { date } = props

  const { workdayValue, setOvertime } = useTimesheet()

  const [entranceTime, setEntranceTime] = useState('')
  const [exitLunchTime, setExitLunchTime] = useState('')
  const [returnLunchTime, setReturnLunchTime] = useState('')
  const [exitTime, setExitTime] = useState('')

  const formattedWeekday = dayjs(date).locale('pt-br').format('dddd')
  const formattedDate = dayjs(date).locale('pt-br').format('DD/MM/YYYY')
  const weekday = dayjs(date).format('dddd').toLowerCase()

  const total = useMemo<Total>(() => {
    const workdayValueInMinutes = workdayValue / FULL_WORKER_MINUTES

    const lunchInMinutes =
      convertHoursInMinutes(returnLunchTime) -
      convertHoursInMinutes(exitLunchTime)
    const workedMinutes =
      convertHoursInMinutes(exitTime) -
      convertHoursInMinutes(entranceTime) -
      lunchInMinutes

    if (workedMinutes <= 0) {
      return { hours: '00:00', value: '0.00', minutes: 0 }
    }

    if (weekday === 'saturday') {
      const overtimeMinutes = workedMinutes - SATURDAY_MINUTES
      const value = Number(overtimeMinutes * workdayValueInMinutes).toFixed(2)

      return {
        hours: convertMinutesInHours(overtimeMinutes),
        value,
        minutes: overtimeMinutes,
      }
    }

    const overtimeMinutes = workedMinutes - FULL_WORKER_MINUTES
    const value = Number(overtimeMinutes * workdayValueInMinutes).toFixed(2)

    return {
      hours: convertMinutesInHours(overtimeMinutes),
      value,
      minutes: overtimeMinutes,
    }
  }, [
    returnLunchTime,
    exitLunchTime,
    entranceTime,
    exitTime,
    workdayValue,
    weekday,
  ])

  useEffect(() => {
    setOvertime((prevState) => {
      return { ...prevState, [weekday]: total.minutes }
    })
  }, [total, setOvertime, weekday])

  return (
    <div className="flex w-full flex-col gap-4 py-4">
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col items-start gap-2">
          <span className="font-semibold capitalize">{formattedWeekday}</span>
          <span className="font-semibold capitalize">{formattedDate}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span>horas: {total.hours}</span>
          <span>valor: {total.value}</span>
        </div>
      </div>

      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col rounded border border-zinc-200">
          <label className="bg-zinc-100 px-4 py-2">entrada</label>
          <input
            type="time"
            className="rounded-b px-4 py-2"
            value={entranceTime}
            onChange={(event) => setEntranceTime(event.target.value)}
          />
        </div>
        <div className="flex flex-col rounded border border-zinc-200">
          <label className="bg-zinc-100 px-4 py-2">saída para almoço</label>
          <input
            type="time"
            className="rounded-b px-4 py-2"
            value={exitLunchTime}
            onChange={(event) => setExitLunchTime(event.target.value)}
          />
        </div>
        <div className="flex flex-col rounded border border-zinc-200">
          <label className="bg-zinc-100 px-4 py-2">retorno do almoço</label>
          <input
            type="time"
            className="rounded-b px-4 py-2"
            value={returnLunchTime}
            onChange={(event) => setReturnLunchTime(event.target.value)}
          />
        </div>
        <div className="flex flex-col rounded border border-zinc-200">
          <label className="bg-zinc-100 px-4 py-2">saída</label>
          <input
            type="time"
            className="rounded-b px-4 py-2"
            value={exitTime}
            onChange={(event) => setExitTime(event.target.value)}
          />
        </div>
      </div>
    </div>
  )
}
