import { ReactNode } from "react"
import { AttendanceRegister } from '../actions/actionAttendance'
export type AuthProviderProps = {
  children: React.ReactNode
}

export interface PicturesTareasArray {
  url:string
}
export interface tareasPorDia {
  fechaDeEntrega?:Date,
  observaciones?:string,
  pictures?:PicturesTareasArray[],
  id?:string
} 
export interface Cursos {
  name?:string,
  id?:string,
  identificador?:string
}
export interface DateTarea {
  year:number,
  month:number,
  date:number
}
export interface TareasPrev {
  curso?:string,
  grade?:string,
  observaciones?:string,

}
export interface TypesEmployee {
  code?:number,
  name?:string
}
export interface StudentData {
  firstContact?:string,
  secondContact?:string,
  firstNumberContact?:string,
  secondNumberContact?:string,
  // nameFather?: string,
  // nameMother?: string,
  // numberFather?: string,
  // numberMother?: string,
  dni?: string,
  pictureProfile?: string,
  grade?: string,
  name?: string,
  firstname?:string,
  lastname?: string,
  qr?: string,
  section?: string,
  cellPhone?: string,
  currentAttendance?: Date,
  attendanceByDate?: string,
  falta?:boolean,
  presente?:boolean,
  tardanza?:boolean,
  manualAttendance?:boolean,
  departureByDate?:string
}
export interface Section {
  section?: string
}
export interface Grades {
  grade?: string,
  traditionalGrade?: string,
  gotSection?:boolean
}
export type Student = {
  studentsData: StudentData[],
  testing: number,
  sections: Section[],
  grades: Grades[],
  pictureProfileUrl: string,
  studentsByGradeAndSection: StudentData[]
  showSidebar: boolean,
  studentData: StudentData,
  studentDataBySearch: StudentData,
  resumeAttendanceStudent: DetailsPerDayOfStudent[],
  userData: UserData,
  justificacionFaltaModal: boolean
  justificacionFaltaConfirmationModal: boolean,
  justificacionMotivoModal: boolean,
  justificacionStudent: JustificacionStudent,
  validateMyProducts:ValidateMyProducts,
  warningAccount:string,
  loadingAccount:boolean,
  loadingSearchStudents:boolean,
  studentsForAttendance:StudentData[],
  confirmationSaveAttendanceByGradeSectionModal: boolean,
  loadingSaveAttendanceByGradeSectionModal: boolean,
  typesEmployee: TypesEmployee[],
  employees:Employee[],
  employee:Employee | undefined,
  resumenAttendanceEmployee:ResumenEmployeeAttendanceDeparture[],
  employeeData:Employee,
  loaderGetEmployee:boolean,
  loadingGetStudents:boolean,
  studentsByGrade:StudentData[],
  activeEmployeeModal:boolean,
  updateStudentConfirmationModal:boolean,
  showDepartureManualModal:boolean,
  studentforDeparture:StudentData,
  confirmationDepartureStudentModal:boolean,
  studentTaller: StudentData,
  studentTallerLoader:boolean,
  cursos:string[],
  pictureTareas:PicturesTareasArray[],
  getAllTareas:tareasPorDia[]
}
export interface DetailsPerDayOfStudent {
  day: string,
  date: string,
  attendance: string,
  departure: string
}

export interface UserData {
  firstname?: string,
  pictureProfile?: string,
  institutionName?: string,
  idInstitution?: string,
  lastname?: string,
  name?: string,
  rol?: string,
  id?: string,
  acc?: string,
  born?: string,
  dni?: string,
}

export interface JustificationValue {
  justification: string
}

export interface JustificacionStudent {
  arrivalTime?: string,
  justification?: boolean,
  justificationMotive?: string,
  id?: string
}

export interface ValidateMyProducts {
  attendance?: boolean,
  employeeAttendance?: boolean,
  comedor?: boolean,
  notas?: boolean,
  name?: string
}

export interface Employee {
  name?:string,
  firstname?:string,
  lastname?:string,
  dni?:string,
  rol?:number,
  pictureProfile?:string,
  attendanceByDate?:string,
  departureByDate?:string,
  manualAttendance?:boolean,
  phone?:string,
  currentlyHour?:string
}

export interface EmployeeAttendanceDeparture {
  arrivalTime?:string,
  departureTime?:string,
  manualAttendance?:boolean,

}

export interface ResumenEmployeeAttendanceDeparture {
  day: string,
  date: string,
  attendance: string,
  departure: string
}
export type AttendanceAction =
  | { type: AttendanceRegister.ATTENDANCE_REGISTER; payload: StudentData[] }
  | { type: AttendanceRegister.GRADES; payload: Grades[] }
  | { type: AttendanceRegister.SECTIONS; payload: Section[] }
  | { type: AttendanceRegister.PICTURE_PROFILE_URL; payload: string }
  | { type: AttendanceRegister.PICTURE_PROFILE_URL; payload: string }
  | { type: AttendanceRegister.STUDENT_BY_GRADE_AND_SECTION; payload: StudentData[] }
  | { type: AttendanceRegister.STUDENT_BY_GRADE; payload: StudentData[] }
  | { type: AttendanceRegister.SHOW_SIDEBAR; payload: boolean }
  | { type: AttendanceRegister.DATA_STUDENT_BY_SEARCH; payload: StudentData }
  | { type: AttendanceRegister.RESUME_ATTENDANCE_STUDENT; payload: DetailsPerDayOfStudent[] }
  | { type: AttendanceRegister.DATA_STUDENT; payload: StudentData }
  | { type: AttendanceRegister.USER_DATA; payload: UserData }
  | { type: AttendanceRegister.SHOW_JUSTIFICACION_FALTA_MODAL; payload: boolean }
  | { type: AttendanceRegister.SHOW_JUSTIFICACION_FALTA_CONFIRMATION_MODAL; payload: boolean }
  | { type: AttendanceRegister.SHOW_JUSTIFICACION_MOTIVO_MODAL; payload: boolean }
  | { type: AttendanceRegister.SHOW_JUSTIFICACION_MOTIVO; payload: JustificacionStudent }
  | { type: AttendanceRegister.VALIDATE_MY_PRODUCTS; payload: ValidateMyProducts }
  | { type: AttendanceRegister.WARNING_ACCOUNT; payload: string }
  | { type: AttendanceRegister.LOADING_ACCOUNT; payload: boolean }
  | { type: AttendanceRegister.LOADING_SEARCH_STUDENTS; payload: boolean }
  | { type: AttendanceRegister.STUDENTS_FOR_ATTENDANCE; payload: StudentData[] }
  | { type: AttendanceRegister.CONFIRMATION_SAVE_ATTENDANCE_GRADE_SECTION_MODAL; payload: boolean }
  | { type: AttendanceRegister.LOADING_SAVE_ATTENDANCE_GRADE_SECTION; payload: boolean }
  | { type: AttendanceRegister.GET_TYPES_EMPLOYEE; payload: TypesEmployee[] }
  | { type: AttendanceRegister.GET_EMPLOYEES; payload: Employee[] }
  | { type: AttendanceRegister.GET_EMPLOYEE; payload: Employee | undefined}
  // | { type: AttendanceRegister.GET_EMPLOYEE; payload: Employee}
  | { type: AttendanceRegister.GET_EMPLOYEE_RESUME_ATTENDANCE; payload: ResumenEmployeeAttendanceDeparture[]}
  | { type: AttendanceRegister.DATA_EMPLOYEE; payload: Employee}
  | { type: AttendanceRegister.LOADER_GET_EMPLOYEE; payload: boolean}
  | { type: AttendanceRegister.LOADING_GET_STUDENTS; payload: boolean}
  | { type: AttendanceRegister.ACTIVE_EMPLOYEE_MODAL; payload: boolean}
  | { type: AttendanceRegister.STUDENT_FOR_DEPARTURE; payload: StudentData}
  | { type: AttendanceRegister.SHOW_DEPARTURE_MANUAL_MODAL; payload: boolean}
  | { type: AttendanceRegister.CONFIRMATION_DEPARTURE_STUDENT_MODAL; payload: boolean}
  | { type: AttendanceRegister.UPDATE_STUDENT_CONFIRMATION_MODAL; payload: boolean}
  | { type: AttendanceRegister.GET_STUDENT_TALLER; payload: StudentData}
  | { type: AttendanceRegister.STUDENT_TALLER_LOADER; payload: boolean}
  | { type: AttendanceRegister.GET_CURSOS; payload: string[]}
  | { type: AttendanceRegister.PICTURE_TAREAS; payload: PicturesTareasArray[]}
  | { type: AttendanceRegister.GET_ALL_TAREAS; payload: tareasPorDia[]}

  

export type AuthenticationFormSignIn = {
  email: string,
  password: string
}

export type AttendanceDepartureTime = {
  attendance?:boolean,
  departure?:boolean,
}