import { registerOTel } from '@vercel/otel'

export function register() {
  registerOTel('calculate-taxes-web')
}
