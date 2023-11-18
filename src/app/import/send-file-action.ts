'use server'

import { redirect, RedirectType } from 'next/navigation'

import { api } from '@/data/api'

type UploadFileResponse = {
  id: string
}

export async function handleSendFile(formData: FormData) {
  const response = await api('xml', {
    method: 'POST',
    body: formData,
  })

  const data = (await response.json()) as UploadFileResponse

  return redirect(`/import/${data.id}`, RedirectType.push)
}
