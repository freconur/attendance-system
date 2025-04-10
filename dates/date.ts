
const months = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "setiembre", "octubre", "noviembre", "diciembre"]
const monthNumber = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
// const monthNumber = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
export const days = ["domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"]

export const todayDateArray = () => {
  const date: Date = new Date()
  const today = {
    momth: months[date.getMonth()],
    year: date.getFullYear()
  }
  return today
}
export const transformMonthToEnglish = (mes: string) => {
  if (mes === "enero") return "january"
  if (mes === "febrero") return "February"
  if (mes === "marzo") return "March"
  if (mes === "abril") return "April"
  if (mes === "mayo") return "May"
  if (mes === "junio") return "June"
  if (mes === "julio") return "July"
  if (mes === "agosto") return "August"
  if (mes === "setiembre") return "September"
  if (mes === "octubre") return "October"
  if (mes === "noviembre") return "November"
  if (mes === "diciembre") return "December"

}
export const EnableMonths = () => {
  const date = new Date()
  return months.slice(0, date.getMonth() + 1)
}
export const todayDate = () => {
  const date = new Date()
  return `${days[date.getDay()]}, ${date.getDate()} de ${months[date.getMonth()]} del ${date.getFullYear()}`
}
export const monthToString = (month:number) => {
  return months[month]
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
export const currentlyHour = (date:Date) => {
  return `${date.getHours().toString().padStart(2, "0")}: ${date.getMinutes().toString().padStart(2, "0")}: ${date.getSeconds().toString().padStart(2, "0")} ${date.getHours() < 12 ? "am" : "pm"}`
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
export const hoursUnixDateEmployeeValidate = (date: Date) => {
  // console.log('hoursUnixDate', date.toString())
  console.log('date', Number(date?.toString().slice(18, 28)))
  const hourSeconds = new Date(Number(date?.toString().slice(18, 28)) * 1000)
  console.log('hourSeconds', hourSeconds.getDay())
  const seconds = date?.toString().slice(18, 28)
  const nanoseconds = date?.toString().slice(42, 49)
  if (seconds?.length > 0 && Number(nanoseconds[0]) === 0) {

    return {
      hour: hourSeconds.getHours().toString(),
      min: hourSeconds.getMinutes().toString(),
    }
    // console.log(`${hourSeconds.getHours().toString().padStart(2, "0")}:${hourSeconds.getMinutes().toString().padStart(2, "0")}:${hourSeconds.getSeconds().toString().padStart(2, "0")}${hourSeconds.getHours() < 12 ? "am" : "pm"}`)
    // return `${hourSeconds.getHours().toString().padStart(2, "0")}:${hourSeconds.getMinutes().toString().padStart(2, "0")}:${hourSeconds.getSeconds().toString().padStart(2, "0")}${hourSeconds.getHours() < 12 ? "am" : "pm"}`
  } else {
    const rta = (Number(seconds) + Number(nanoseconds) / 1000000000) * 1000
    const hour = new Date(rta)
    const numDays = (y: any, m: any) => new Date(y, m, 0).getDate();
    // console.log('numDays', numDays(2024,3))
    return {
      hour: hourSeconds.getHours().toString(),
      min: hourSeconds.getMinutes().toString(),
    }
    // console.log(`${hour.getHours().toString().padStart(2, "0")}:${hour.getMinutes().toString().padStart(2, "0")}:${hour.getSeconds().toString().padStart(2, "0")}${hour.getHours() < 12 ? "am" : "pm"}`)
    // return `${hour.getHours().toString().padStart(2, "0")}:${hour.getMinutes().toString().padStart(2, "0")}:${hour.getSeconds().toString().padStart(2, "0")}${hour.getHours() < 12 ? "am" : "pm"}`
  }
}
export const hoursUnixDate = (date: Date) => {
  const hourSeconds = new Date(Number(date?.toString().slice(18, 28)) * 1000)
  const seconds = date?.toString().slice(18, 28)
  const nanoseconds = date?.toString().slice(42, 49)
  if (seconds?.length > 0 && Number(nanoseconds[0]) === 0) {
    return `${hourSeconds.getHours().toString().padStart(2, "0")}:${hourSeconds.getMinutes().toString().padStart(2, "0")}:${hourSeconds.getSeconds().toString().padStart(2, "0")}${hourSeconds.getHours() < 12 ? "am" : "pm"}`
  } else {
    const rta = (Number(seconds) + Number(nanoseconds) / 1000000000) * 1000
    const hour = new Date(rta)
    
    const numDays = (y: any, m: any) => new Date(y, m, 0).getDate();
    return `${hour.getHours().toString().padStart(2, "0")}:${hour.getMinutes().toString().padStart(2, "0")}:${hour.getSeconds().toString().padStart(2, "0")}${hour.getHours() < 12 ? "am" : "pm"}`
  }
}

export const getDayUnixDate = (date: Date) => {
  const hourSeconds = new Date(Number(date?.toString().slice(18, 28)) * 1000)
  const seconds = date?.toString().slice(18, 28)
  const nanoseconds = date?.toString().slice(42, 49)
  if (seconds?.length > 0 && Number(nanoseconds[0]) === 0) {
    return `${hourSeconds.getHours().toString().padStart(2, "0")}:${hourSeconds.getMinutes().toString().padStart(2, "0")}:${hourSeconds.getSeconds().toString().padStart(2, "0")}${hourSeconds.getHours() < 12 ? "am" : "pm"}`
  } else {
    const rta = (Number(seconds) + Number(nanoseconds) / 1000000000) * 1000
    const hour = new Date(rta)
    return days[new Date(rta).getDay()]
}}
export const  convertTZ = (date:string, tzString:string) => {
  return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString}));   
}
export const hoursUnixDateForDetailStudent = (date: any, dateDeparture?: Date) => {
  // console.log('date', new Date(date.seconds * 1000))
  const hourSeconds = convertTZ(`${new Date(date?.seconds * 1000)}`, "America/Lima")
  // console.log('testinghour', testinghour)
  const seconds = date?.toString().slice(18, 28)
  const nanoseconds = date?.toString().slice(42, 49)
  // const hourSeconds = new Date(`${Number(date?.toString().slice(18, 28)) * 1000}`)
  const hourSecondsDeparture = new Date(Number(dateDeparture?.toString().slice(18, 28)) * 1000)

  // console.log('hourSecondsksk', hourSeconds)
  if (seconds?.length > 0 && Number(nanoseconds[0]) === 0) {
    const detailsPerDayOfStudent = {
      day: days[hourSeconds.getDay()],
      date: `${hourSeconds.getDate()}`,
      attendance: hourSeconds.getHours() ? `${hourSeconds.getHours().toString().padStart(2, "0")}:${hourSeconds.getMinutes().toString().padStart(2, "0")}:${hourSeconds.getSeconds().toString().padStart(2, "0")}${hourSeconds.getHours() < 12 ? "am" : "pm"}` : "sin registro",
      departure: hourSecondsDeparture.getHours() ? `${hourSecondsDeparture.getHours().toString().padStart(2, "0")}:${hourSecondsDeparture.getMinutes().toString().padStart(2, "0")}:${hourSecondsDeparture.getSeconds().toString().padStart(2, "0")}${hourSecondsDeparture.getHours() < 12 ? "am" : "pm"}` : "sin registro",
    }
    return detailsPerDayOfStudent
  } else {
    const rta = (Number(seconds) + Number(nanoseconds) / 1000000000) * 1000
    const fecha = new Date(rta)
    const detailsPerDayOfStudent = {
      day: days[fecha.getDay()],
      date: `${fecha.getDate()}`,
      attendance: `${fecha.getHours().toString().padStart(2, "0")}:${fecha.getMinutes().toString().padStart(2, "0")}:${fecha.getSeconds().toString().padStart(2, "0")}${fecha.getHours() < 12 ? "am" : "pm"}`,
      departure: hourSecondsDeparture.getHours() ? `${hourSecondsDeparture.getHours().toString().padStart(2, "0")}:${hourSecondsDeparture.getMinutes().toString().padStart(2, "0")}:${hourSecondsDeparture.getSeconds().toString().padStart(2, "0")}${hourSecondsDeparture.getHours() < 12 ? "am" : "pm"}` : "sin registro",
    }
    return detailsPerDayOfStudent
  }
}

export const hoursUnixDateForDetailStudentWithoutArrivalTime = (dateDeparture: Date) => {
  const seconds = dateDeparture?.toString().slice(18, 28)
  const nanoseconds = dateDeparture?.toString().slice(42, 49)
  const hourSeconds = new Date(Number(dateDeparture?.toString().slice(18, 28)) * 1000)
  const hourSecondsDeparture = new Date(Number(dateDeparture?.toString().slice(18, 28)) * 1000)

  // console.log('hourSecondsksk', hourSeconds)
  if (seconds?.length > 0 && Number(nanoseconds[0]) === 0) {
    const detailsPerDayOfStudent = {
      day: days[hourSeconds.getDay()],
      date: `${hourSeconds.getDate()}`,
      attendance: `sin registro`,
      departure: hourSecondsDeparture.getHours() ? `${hourSecondsDeparture.getHours().toString().padStart(2, "0")}:${hourSecondsDeparture.getMinutes().toString().padStart(2, "0")}:${hourSecondsDeparture.getSeconds().toString().padStart(2, "0")}${hourSecondsDeparture.getHours() < 12 ? "am" : "pm"}` : "sin registro",
    }
    return detailsPerDayOfStudent
  } else {
    const rta = (Number(seconds) + Number(nanoseconds) / 1000000000) * 1000
    const fecha = new Date(rta)
    const detailsPerDayOfStudent = {
      day: days[fecha.getDay()],
      date: `${fecha.getDate()}`,
      attendance: `sin registro`,
      departure: hourSecondsDeparture.getHours() ? `${hourSecondsDeparture.getHours().toString().padStart(2, "0")}:${hourSecondsDeparture.getMinutes().toString().padStart(2, "0")}:${hourSecondsDeparture.getSeconds().toString().padStart(2, "0")}${hourSecondsDeparture.getHours() < 12 ? "am" : "pm"}` : "sin registro",
    }
    return detailsPerDayOfStudent
  }
}
export const getDayFromDate = (date: Date) => {
  const detailsPerDayOfStudent = {
    day: days[date.getDay()],
    date: `${date.getDate()}`,
    attendance: "justificado"
  }
  return detailsPerDayOfStudent
}
export const getDayFromDateFalta = (date: Date) => {
  const detailsPerDayOfStudent = {
    day: days[date.getDay()],
    date: `${date.getDate()}`,
    attendance: "falta"
  }
  return detailsPerDayOfStudent
}
export const dateConvertObject = (date: Date) => {
  return {
    date: date.getDate(),
    month: months[date.getMonth()],
    year: Number(date.getFullYear())
  }
}

export const dateConvertObjectStudent = (date: Date) => {
  console.log('tiempo de marcacion', `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}${date.getHours() < 12 ? "am" : "pm"} el dia ${days[date.getDay()]}, ${date.getDate()} de ${months[date.getMonth()]} del ${date.getFullYear()}`)
  return `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}${date.getHours() < 12 ? "am" : "pm"} el dia ${days[date.getDay()]}, ${date.getDate()} de ${months[date.getMonth()]} del ${date.getFullYear()}`
}

export const validacionPuntualTardanza = (date: Date) => {
  if(date.getHours() === 7 && date.getMinutes() <= 30) {
    console.log('se esta llegando temprano')
    return true
  }else if(date.getHours() === 8){
    return true
  }else if(date.getHours() === 6){
    return true
  }else {
    console.log('se esta llegando tarde')
    return false
  }
}
export const numberToNameMonth = (value: number) => {
  // const date = new Date()
  return months[value]
}