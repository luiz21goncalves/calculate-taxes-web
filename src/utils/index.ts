export const priceFormatter = (value: number) =>
  new Intl.NumberFormat('pt-br', {
    style: 'currency',
    currency: 'BRL',
  }).format(value / 100)

export function convertHoursInMinutes(time: string) {
  const [hours, minutes] = time.split(':')

  const formattedHours = Number(hours)
  const formattedMinutes = Number(minutes)

  if (Number.isNaN(formattedHours) || Number.isNaN(formattedMinutes)) {
    return 0
  }

  return formattedHours * 60 + formattedMinutes
}

export function convertMinutesInHours(time: number) {
  const convertedMinutes = time % 60
  const convertedHour = Math.floor(time / 60)

  const formatedHour = convertedHour > 10 ? convertedHour : `0${convertedHour}`
  const formetedMinute =
    convertedMinutes > 10 ? convertedMinutes : `0${convertedMinutes}`

  return `${formatedHour}:${formetedMinute}`
}
