'use client'

import { ChangeEvent, useState } from 'react'

import { handleSendFile } from './send-file-action'

export function Upload() {
  const [file, setFile] = useState<null | File>(null)

  function handleSelectFile(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files?.length) {
      const files = Array.from(event.target.files)
      setFile(files[0])
    }
  }

  const label = file ? file.name : 'Clique para adicionar um xml'

  const hasFile = Boolean(file)

  return (
    <form className="flex w-full justify-between" action={handleSendFile}>
      <label
        htmlFor="file"
        className="flex w-9/12 cursor-pointer items-center justify-center truncate rounded-lg border-2 border-dashed border-blue-950 p-3 text-lg font-semibold"
      >
        {label}
        <input
          type="file"
          name="file"
          id="file"
          className="sr-only"
          accept="text/xml"
          onChange={handleSelectFile}
        />
      </label>
      <button
        type="submit"
        disabled={!hasFile}
        className="rounded-lg bg-blue-500 px-8 text-lg font-bold text-zinc-50 transition-colors active:hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Calcular
      </button>
    </form>
  )
}
