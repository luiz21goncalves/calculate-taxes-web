'use client'

import dayjs from 'dayjs'

import { useTimesheet } from '@/contexts/timesheet-context'
import { convertMinutesInHours } from '@/utils'

export function TimesheetHeader() {
  const {
    setWorkdayValue,
    workdayValue,
    selectedDate,
    setSelectedDate,
    total,
  } = useTimesheet()

  const date = dayjs(selectedDate).format('YYYY-MM-DD')

  return (
    <div className="flex items-center justify-between">
      <div className="flex rounded border border-zinc-200">
        <label htmlFor="workday-value" className="bg-zinc-100 p-3">
          Valor do dia
        </label>
        <input
          type="number"
          className="w-16 rounded-e px-4 py-2 text-lg"
          defaultValue={workdayValue}
          onChange={(event) => setWorkdayValue(Number(event.target.value))}
        />
      </div>
      <div className="flex rounded border border-zinc-200">
        <label className="bg-zinc-100 p-3">Selecione a segunda-feira</label>
        <input
          type="date"
          className="rounded-e px-2"
          value={date}
          onChange={(event) => {
            setSelectedDate(dayjs(event.target.value).toDate())
          }}
        />
      </div>

      <div className="flex flex-col gap-2">
        <span className="font-semibold">
          total horas: {convertMinutesInHours(total.minutes)}
        </span>
        <span className="font-semibold">valor total: {total.value}</span>
      </div>
    </div>
  )
}
