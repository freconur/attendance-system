const months = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "setiembre", "octubre", "noviembre", "diciembre"]
const monthNumber = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
const days = ["domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"]

export const todayDateArray = () => {
  const date: Date = new Date()
  const today = {
    momth: months[date.getMonth()],
    year: date.getFullYear()
  }
  return today
}

export const todayDate = () => {
  const date = new Date()
  return `${days[date.getDay()]}, ${date.getDate()} de ${months[date.getMonth()]} del ${date.getFullYear()}`
}

export const currentMonth = () => {
  const date = new Date()
  return months[date.getMonth()]
}
export const currentYear = () => {
  const date = new Date()
  return `${date.getFullYear()}`
}
export const currentDate = () => {
  const date = new Date()
  return `${date.getDate()}`
}
export const functionDateConvert = (date: Date) => {
  // console.log(`${date.getDate()}/${monthNumber[date.getMonth()]}/${date.getFullYear().toString().slice(2, 4)}`)
  return `${date.getDate()}/${monthNumber[date.getMonth()]}/${date.getFullYear().toString().slice(2, 4)}`
}
export const functionDateToPrinter = (date: Date) => {
  // console.log(`${date.getDate()} de ${months[date.getMonth()]} del ${date.getFullYear()}`)
  // console.log(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`)
  return (`Fecha: ${date.getDate()} de ${months[date.getMonth()]} del ${date.getFullYear()}  Hora: ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`)
}
export const functionBirthdayDate = (date: Date) => {
  const seconds = date.toString().slice(18, 27)
  const nanoseconds = date.toString().slice(42, 49)
  const rta = (Number(seconds) + Number(nanoseconds) / 1000000000) * 1000
  const birthdayUser = new Date(rta)
  return `${birthdayUser.getDate()} de ${months[birthdayUser.getMonth()]} del ${birthdayUser.getFullYear()}`
}
export const hoursUnixDate = (date: Date) => {
  const seconds = date.toString().slice(18, 28)
  const nanoseconds = date.toString().slice(42, 49)
  const rta = (Number(seconds) + Number(nanoseconds) / 1000000000) * 1000
  const hour = new Date(rta)
  return `${hour.getHours()}:${hour.getMinutes()}:${hour.getSeconds()}`
}
export const dateConvertObject = (date: Date) => {
  return {
    date: date.getDate(),
    month: months[date.getMonth()],
    year: Number(date.getFullYear())
  }
}
export const numberToNameMonth = (value: number) => {
  // const date = new Date()
  return months[value]
}