'use client'

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react'

type Overtime = {
  [key: string]: number
}

type Total = {
  minutes: number
  value: string
}

type TimesheetContextType = {
  selectedDate: Date
  workdayValue: number
  overtime: Overtime
  total: Total
  setSelectedDate: (date: Date) => void
  setWorkdayValue: (amount: number) => void
  setOvertime: Dispatch<SetStateAction<Overtime>>
}

const TimesheetContext = createContext({} as TimesheetContextType)

type TimesheetProviderProps = {
  children: ReactNode
}

export function TimesheetProvider(props: TimesheetProviderProps) {
  const { children } = props

  const [workdayValue, setWorkdayValue] = useState(50)
  const [overtime, setOvertime] = useState<Overtime>({})
  const [selectedDate, setSelectedDate] = useState(new Date())

  const total = useMemo<Total>(() => {
    const minutes = Object.values(overtime).reduce(
      (amount, value) => amount + value,
      0,
    )

    const workMinutesValue = workdayValue / (8 * 60)

    const value = Number(minutes * workMinutesValue).toFixed(2)

    return { minutes, value }
  }, [overtime, workdayValue])

  return (
    <TimesheetContext.Provider
      value={{
        total,
        overtime,
        workdayValue,
        selectedDate,
        setOvertime,
        setSelectedDate,
        setWorkdayValue,
      }}
    >
      {children}
    </TimesheetContext.Provider>
  )
}

export function useTimesheet() {
  return useContext(TimesheetContext)
}
