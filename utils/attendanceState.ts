import { AttendanceDepartureTime } from "@/features/types/types"

export const attendanceState = (attendance?: string) => {
  console.log('attendance', attendance)
  if (attendance) {
    if (attendance[0].toString() === "0" && attendance[1].toString() === "7") {
      return true
    } else if (attendance[0].toString() === "0" && attendance[1].toString() === "6") {
      return true
    } else {
      return false
    }
  }
}

export const attendanceDepartureTime = (attendance?: string) => {
  console.log('attendance', attendance)
  if (attendance) {
    if (attendance[0].toString() === "0" && attendance[1].toString() === "7") {
      return { attendance: true, departure: false } as AttendanceDepartureTime
    } else if (attendance[0].toString() === "0" && attendance[1].toString() === "9") {
      return { attendance: true, departure: false } as AttendanceDepartureTime
    } else if (attendance === "14") {
      console.log('attendance', attendance)
      return { attendance: true, departure: false } as AttendanceDepartureTime
    }else if (attendance === "22") {
      console.log('estamos en la hora de salida')
      return { departure: true, attendance: false } as AttendanceDepartureTime
    }
  }
}

export const attendanceDepartureTimeEmployee = (attendance?:string) => {
  console.log('attendance', attendance)

  if(attendance) {
    
  }

}