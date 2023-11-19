export function Workday() {
  return (
    <div className="flex w-full flex-col gap-4 py-4">
      <div className="flex w-full items-center justify-between">
        <div className="flex rounded border border-zinc-200">
          <label className="bg-zinc-100 p-3">Segunda-feira</label>
          <input type="date" className="rounded-e px-2" />
        </div>
        <label className="flex items-center justify-center gap-4">
          horário de almoço
          <input type="checkbox" className="h-5 w-5" />
        </label>
        <label className="flex items-center justify-center gap-4">
          meio expediente
          <input type="checkbox" className="h-5 w-5" />
        </label>
      </div>

      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col rounded border border-zinc-200">
          <label className="bg-zinc-100 px-4 py-2">entrada</label>
          <input type="time" className="rounded-b px-4 py-2" />
        </div>
        <div className="flex flex-col rounded border border-zinc-200">
          <label className="bg-zinc-100 px-4 py-2">saída para almoço</label>
          <input type="time" className="rounded-b px-4 py-2" />
        </div>
        <div className="flex flex-col rounded border border-zinc-200">
          <label className="bg-zinc-100 px-4 py-2">retorno do almoço</label>
          <input type="time" className="rounded-b px-4 py-2" />
        </div>
        <div className="flex flex-col rounded border border-zinc-200">
          <label className="bg-zinc-100 px-4 py-2">saída</label>
          <input type="time" className="rounded-b px-4 py-2" />
        </div>

        <div className="flex flex-col gap-2">
          <span>horas extras: 0</span>
          <span>valor: 0</span>
        </div>
      </div>
    </div>
  )
}
