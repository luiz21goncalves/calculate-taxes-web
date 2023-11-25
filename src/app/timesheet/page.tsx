import { TimesheetProvider } from '@/contexts/timesheet-context'

import { TimesheetHeader } from './timesheet-header'
import { WorkdayList } from './workday-list'

export default function TimesheetPage() {
  return (
    <TimesheetProvider>
      <h1 className="mb-8 text-center text-4xl font-bold">
        Calculo de horas extras
      </h1>
      <div className="space-y-4">
        <TimesheetHeader />
        <WorkdayList />
      </div>
    </TimesheetProvider>
  )
}
