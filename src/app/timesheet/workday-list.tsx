'use client'

import { useId } from 'react'

import dayjs from 'dayjs'

import { useTimesheet } from '@/contexts/timesheet-context'

import { Workday } from './workday'

const days = Array.from({ length: 6 }).map((_, index) => {
  if (index === 0) {
    return 7
  }

  return index - 1
})

export function WorkdayList() {
  const { selectedDate } = useTimesheet()
  const id = useId()

  return (
    <div className="flex flex-col gap-2 divide-y divide-zinc-400">
      {days.map((day, index) => {
        const key = `${id}-${day}`

        if (index === 0) {
          return (
            <Workday
              key={key}
              date={dayjs(selectedDate).subtract(2, 'days').toDate()}
            />
          )
        }

        return (
          <Workday
            key={key}
            date={dayjs(selectedDate).add(day, 'days').toDate()}
          />
        )
      })}
    </div>
  )
}
