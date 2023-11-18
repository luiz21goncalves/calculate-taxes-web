'use server'

import { redirect, RedirectType } from 'next/navigation'

import { api } from '@/services/api'

type UploadFileResponse = {
  id: string
}

export async function handleSendFile(formData: FormData) {
  const response = await api.post<UploadFileResponse>('xml', formData)

  const fileId = response.data.id

  return redirect(`/import/${fileId}`, RedirectType.push)
}
