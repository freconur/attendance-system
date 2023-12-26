import { ReactNode } from "react"
import { AttendanceRegister } from '../actions/actionAttendance'
export type AuthProviderProps = {
  children: React.ReactNode
}
export interface StudentData {
  nameFather?:string,
  nameMother?:string,
  numberFather?:string,
  numberMother?:string,
  dni?:string,
  pictureProfile?:string,
  grade?:string,
  name?:string,
  lastname?:string,
  qr?:string,
  section?:string
  cellPhone?:string
}
export type Student = {
  studentsData:StudentData[],
  testing:number
  // studentData:{},
  // testing: () => void
}

export type AttendanceAction= 
  | { type: AttendanceRegister.ATTENDANCE_REGISTER; payload: StudentData[] }

//   <div>
//   <p>DNI: </p>
//   <p>{studentData.dni}</p>
// </div>
// <div>
//   <p>NOMBRE: </p>
//   <p>{studentData.name}</p>
// </div>
// <div>
//   <p>APELLIDOS: </p>
//   <p>{studentData.lastname}</p>
// </div>
// <div>
//   <p>GRADO: </p>
//   <p>{studentData.grade}</p>
// </div>
// <div>
//   <p>SECCION: </p>
//   <p>{studentData.section}</p>
// </div>