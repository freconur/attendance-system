import { AttendanceDepartureTime } from "@/features/types/types"

export const attendanceState = (attendance?: string) => {
  if (attendance) {
    const minutes = Number(`${attendance[3].concat(attendance[4])}`)
    if (attendance[0].toString() === "0" && attendance[1].toString() === "7") {
      if (minutes <= 30) {
        return true
      } else {
        return false
      }
    } else if (attendance[0].toString() === "0" && attendance[1].toString() === "6") {
      return true
    } else {
      return false
    }
  }
}

export const attendanceDepartureTime = (attendance?: string) => {
  if (attendance) {
    // if (attendance === "19") {
    if (attendance[0].toString() === "0" && attendance[1].toString() === "7") {
      console.log('ingreso')
      return { attendance: true, departure: false } as AttendanceDepartureTime
    } else if (attendance[0].toString() === "0" && attendance[1].toString() === "6") {
      console.log('ingreso')
      return { attendance: true, departure: false } as AttendanceDepartureTime
    } else if (attendance[0].toString() === "0" && attendance[1].toString() === "8") {
      console.log('ingreso')
      return { attendance: true, departure: false } as AttendanceDepartureTime
    } else if (attendance === "14") {
      console.log('salida')
      return { attendance: false, departure: true } as AttendanceDepartureTime
    } else if (attendance === "13") {
      console.log('salida')

      return { departure: true, attendance: false } as AttendanceDepartureTime
    } else if (attendance === "15") {
      console.log('salida')

      return { departure: true, attendance: false } as AttendanceDepartureTime
    } else if (attendance === "12") {
      console.log('salida')

      return { departure: true, attendance: false } as AttendanceDepartureTime
    } else {
      return
    }
  }
}

export const attendanceDepartureTimeEmployee = (attendance?: string) => {
  console.log('attendance', attendance)

  if (attendance) {

  }

}