import { hoursUnixDate, hoursUnixDateEmployeeValidate } from "@/dates/date"

export const validateRol = (rol: number | undefined) => {
  if (rol === 1) return "profesor"
  if (rol === 2) return "auxiliar"
  if (rol === 3) return "empleados"
  if (rol === 4) return "administracion"
  // if (rol === 5) return "director"
}
export const validateRolMessageWhatsapp = (rol: number | undefined) => {
  if (rol === 1) return "profesores"
  if (rol === 2) return "auxiliares"
  if (rol === 3) return "empleados"
  if (rol === 4) return "administracion"
  if (rol === 5) return "padres"
  // if (rol === 5) return "director"
}
export const validateDepartureTime = (arrivalTime: Date, validateArrivalTime: { hour: number, min: number }) => {
  // console.log('arrivalTime', arrivalTime)
  const currentlyData = hoursUnixDateEmployeeValidate(arrivalTime)
  // if (Number(currentlyData.hour) === validateArrivalTime.hour && Number(currentlyData.min) === validateArrivalTime.min) {
  if (Number(currentlyData.hour) === validateArrivalTime.hour) {//valida que no se haga un registro doble de ingreso
    return false
  } else {
    return true
  }
}

// export const roles = [1, 2, 3, 4, 5]

