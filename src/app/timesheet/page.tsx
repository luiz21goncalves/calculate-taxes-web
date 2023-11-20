import { Button } from '@/components/button'

import { Workday } from './workday'

export default function TimesheetPage() {
  return (
    <>
      <h1 className="mb-8 text-center text-4xl font-bold  ">
        Calculo de horas extras
      </h1>
      <div className="space-y-4 divide-y divide-zinc-400">
        <div className="flex items-center justify-between">
          <div className="flex rounded border border-zinc-200">
            <label htmlFor="workday-value" className="bg-zinc-100 p-3">
              Valor do dia
            </label>
            <input
              type="number"
              className="w-16 rounded-e px-4 py-2 text-lg"
              defaultValue={0}
            />
          </div>

          <div className="flex flex-col gap-2">
            <span>total horas extras: 0</span>
            <span>valor total: 0</span>
          </div>

          <Button className="rounded-lg bg-blue-500 px-8 py-2 text-lg font-bold text-zinc-50 transition-colors hover:bg-blue-600">
            Adicionar dia
          </Button>
        </div>
        <Workday />
      </div>
    </>
  )
}
