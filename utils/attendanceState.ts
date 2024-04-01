import { AttendanceDepartureTime } from "@/features/types/types"

export const attendanceState = (attendance?: string) => {
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
  if (attendance) {
    if (attendance[0].toString() === "0" && attendance[1].toString() === "7") {
      return { attendance: true, departure: false } as AttendanceDepartureTime
    } else if (attendance[0].toString() === "0" && attendance[1].toString() === "6") {
      return { attendance: true, departure: false } as AttendanceDepartureTime
    } else if (attendance === "14") {
      return { attendance: false, departure: true } as AttendanceDepartureTime
    }else if (attendance === "13") {
      return { departure: false, attendance: true } as AttendanceDepartureTime
    }else if (attendance === "15") {
      return { departure: false, attendance: true } as AttendanceDepartureTime
    }else {
      return
    }
  }
}

export const attendanceDepartureTimeEmployee = (attendance?:string) => {
  console.log('attendance', attendance)

  if(attendance) {
    
  }

}