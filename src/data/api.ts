import { ENV } from '@/env'

export function api(path: string, init?: RequestInit) {
  const url = new URL(path, ENV.NEXT_PUBLIC_API_URL)

  return fetch(url, init)
}
