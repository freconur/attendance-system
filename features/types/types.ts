import { ReactNode } from "react"
import { AttendanceRegister } from '../actions/actionAttendance'
export type AuthProviderProps = {
  children: React.ReactNode
}

export interface PicturesTareasArray {
  url: string
}


export interface DataStudentAulaVirtual {
  firstContact?: string,
  secondContact?: string,
  firstNumberContact?: string,
  secondNumberContact?: string,
  rol?: string,
  dni?: string,
  pictureProfile?: string,
  grade?: string,
  name?: string,
  firstname?: string,
  lastname?: string,
  qr?: string,
  section?: string,
  cellPhone?: string,
}
export interface UserAulaVirtual {
  dni?: string,
  institucion?: string
}
export interface SendFormCotizacion {
  nombres?: string,
  cargo?: string,
  nombreDeColegio?: string,
  cantidadDeAlumnos?: string,
  numeroDeCelular?: string,
}
export interface GradesCheckbox {
  nivel: string[],
  grades: string[]
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
  celular?: string,
  cursos?: string[],
  numberPhone?: string
  extensionForUsers?: string,
  
}
export interface CreateUserData {
  id?: string,
  attendance?: boolean,
  comedor?: boolean,
  employeeAttendance?: boolean,
  name?: string,
  notas?: boolean,
  roles?: number[],
  extensionForUsers?: string,
  // lastname?:string
  // firstname?:string,
  // dni?:number,
  // institucion?: string,
  rol?: number
}
export interface tareasPorDia {
  fechaDeEntrega?: Date,
  observaciones?: string,
  pictures?: PicturesTareasArray[],
  id?: string
}
export interface Cursos {
  name?: string,
  id?: string,
  identificador?: string
}
export interface DateTarea {
  year: number,
  month: number,
  date: number
}
export interface TareasPrev {
  curso?: string,
  grade?: string,
  observaciones?: string,

}
export interface TypesEmployee {
  code?: number,
  name?: string
}
export interface StudentData {
  firstContact?: string,
  secondContact?: string,
  firstNumberContact?: string,
  secondNumberContact?: string,
  rol?: string,
  dni?: string,
  pictureProfile?: string,
  grade?: string,
  name?: string,
  firstname?: string,
  lastname?: string,
  qr?: string,
  section?: string,
  cellPhone?: string,
  currentAttendance?: Date,
  attendanceByDate?: string,
  falta?: boolean,
  presente?: boolean,
  tardanza?: boolean,
  manualAttendance?: boolean,
  departureByDate?: string
}
export interface Section {
  section?: string
}
export interface Grades {
  grade?: string,
  traditionalGrade?: string,
  gotSection?: boolean,
  nivel?: number,
  checked?: boolean
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
  validateMyProducts: ValidateMyProducts,
  warningAccount: string,
  loadingAccount: boolean,
  loadingSearchStudents: boolean,
  studentsForAttendance: StudentData[],
  confirmationSaveAttendanceByGradeSectionModal: boolean,
  loadingSaveAttendanceByGradeSectionModal: boolean,
  typesEmployee: TypesEmployee[],
  employees: Employee[],
  employee: Employee | undefined,
  resumenAttendanceEmployee: ResumenEmployeeAttendanceDeparture[],
  employeeData: Employee,
  loaderGetEmployee: boolean,
  loadingGetStudents: boolean,
  studentsByGrade: StudentData[],
  activeEmployeeModal: boolean,
  updateStudentConfirmationModal: boolean,
  showDepartureManualModal: boolean,
  studentforDeparture: StudentData,
  confirmationDepartureStudentModal: boolean,
  studentTaller: StudentData,
  studentTallerLoader: boolean,
  cursos: string[],
  pictureTareas: PicturesTareasArray[],
  getAllTareas: tareasPorDia[],
  employeeDataSearch: {},
  updateEmployeeConfirmationModal: boolean,
  showNewUserModal: boolean,
  roles: Rol[],
  allCursos: Curso[],
  loaderPictureTask: boolean,
  instituciones: CreateUserData[],
  showChangePassword: boolean,
  errorCurrentPassword: boolean,
  showModalConfirmationSendMessageWhatsapp: boolean,
  sendMessageWhatsappLoader: boolean,
  allStudents: StudentData[],
  gradesSecundaria: Grades[]
  gradesPrimaria: Grades[],
  showModalConfirmationCuadernoControl: boolean,
  getAllCuadernoControl: CuadernoControl[],
  loaderCotizacion: boolean,
  validateUserAulavirtual: boolean,
  dataAulavirtual: DataStudentAulaVirtual,
  idInstitucion: string,
  institucionData: CreateUserData,
  showCursosAulavirtual: boolean,
  archivosAulaVirtual: AulaVirtual[],
  loaderAulaVirtual:boolean,
  loaderUpload:boolean,
  cursoById:CursoById,
  reporteByGradeMensual: RecordEstudiante[],
  reporteByGradeDaily:RecordReporteDiario[]
}
export interface DetailsPerDayOfStudent {
  day: string,
  date: string,
  attendance: string,
  departure: string
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
  name?: string,
  firstname?: string,
  lastname?: string,
  dni?: string,
  rol?: number,
  pictureProfile?: string,
  attendanceByDate?: string,
  departureByDate?: string,
  manualAttendance?: boolean,
  phone?: string,
  numberPhone?: string,
  currentlyHour?: string,
  misCursos?: Curso[]
}

export interface UpdateDataUser {
  firstContact?: string,
  secondContact?: string,
  firstNumberContact?: string,
  secondNumberContact?: string,
  rol?: string,
  dni?: string,
  pictureProfile?: string,
  grade?: string,
  name?: string,
  firstname?: string,
  lastname?: string,
  qr?: string,
  section?: string,
  numberPhone?: string,
  cellPhone?: string,
  misCursos?: Curso[],
  celular?:string
}
export interface EmployeeAttendanceDeparture {
  arrivalTime?: string,
  departureTime?: string,
  manualAttendance?: boolean,

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
  | { type: AttendanceRegister.DATA_STUDENT; payload: UpdateDataUser }
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
  | { type: AttendanceRegister.GET_EMPLOYEE; payload: Employee | undefined }
  // | { type: AttendanceRegister.GET_EMPLOYEE; payload: Employee}
  | { type: AttendanceRegister.GET_EMPLOYEE_RESUME_ATTENDANCE; payload: ResumenEmployeeAttendanceDeparture[] }
  | { type: AttendanceRegister.DATA_EMPLOYEE; payload: Employee }
  | { type: AttendanceRegister.LOADER_GET_EMPLOYEE; payload: boolean }
  | { type: AttendanceRegister.LOADING_GET_STUDENTS; payload: boolean }
  | { type: AttendanceRegister.ACTIVE_EMPLOYEE_MODAL; payload: boolean }
  | { type: AttendanceRegister.STUDENT_FOR_DEPARTURE; payload: StudentData }
  | { type: AttendanceRegister.SHOW_DEPARTURE_MANUAL_MODAL; payload: boolean }
  | { type: AttendanceRegister.CONFIRMATION_DEPARTURE_STUDENT_MODAL; payload: boolean }
  | { type: AttendanceRegister.UPDATE_STUDENT_CONFIRMATION_MODAL; payload: boolean }
  | { type: AttendanceRegister.GET_STUDENT_TALLER; payload: StudentData }
  | { type: AttendanceRegister.STUDENT_TALLER_LOADER; payload: boolean }
  | { type: AttendanceRegister.GET_CURSOS; payload: string[] }
  | { type: AttendanceRegister.PICTURE_TAREAS; payload: PicturesTareasArray[] }
  | { type: AttendanceRegister.GET_ALL_TAREAS; payload: tareasPorDia[] }
  | { type: AttendanceRegister.GET_EMPLOYEE_BY_SEARCH; payload: Employee }
  | { type: AttendanceRegister.UPDATE_EMPLOYEE_CONFIRMATION_MODAL; payload: boolean }
  | { type: AttendanceRegister.SHOW_CREATE_NEW_USER; payload: boolean }
  | { type: AttendanceRegister.GET_ROLES; payload: Rol[] }
  | { type: AttendanceRegister.GET_ALL_CURSOS; payload: Curso[] }
  | { type: AttendanceRegister.LOADER_PICTURE_TASK; payload: boolean }
  | { type: AttendanceRegister.INSTITUCIONES; payload: CreateUserData[] }
  | { type: AttendanceRegister.ERROR_CURRENT_PASSWORD; payload: boolean }
  | { type: AttendanceRegister.SHOW_CHANGE_PASSWORD; payload: boolean }
  | { type: AttendanceRegister.LOADER_SENDMESSAGEWHATSAPP; payload: boolean }
  | { type: AttendanceRegister.SHOW_MODAL_CONFIRMATION_SENDMESSAGEWHATSAPP; payload: boolean }
  | { type: AttendanceRegister.ALL_STUDENTS; payload: StudentData[] }
  | { type: AttendanceRegister.GRADES_SECUNDARIA; payload: Grades[] }
  | { type: AttendanceRegister.GRADES_PRIMARIA; payload: Grades[] }
  | { type: AttendanceRegister.SHOW_CONFIRMATION_CUADERNOCONTROL; payload: boolean }
  | { type: AttendanceRegister.GET_ALL_CUADERNOCONTROL; payload: CuadernoControl[] }
  | { type: AttendanceRegister.LOADER_COTIZACION; payload: boolean }
  | { type: AttendanceRegister.VALIDATE_USER_AULAVIRTUAL; payload: boolean }
  | { type: AttendanceRegister.DATA_AULAVIRTUAL; payload: DataStudentAulaVirtual }
  | { type: AttendanceRegister.ID_INSTITUCION; payload: string }
  | { type: AttendanceRegister.INSTITUTION_DATA; payload: CreateUserData }
  | { type: AttendanceRegister.SHOW_CURSOS_AULAVIRUTAL; payload: boolean }
  | { type: AttendanceRegister.ARCHIVOS_AULA_VIRTUAL; payload: AulaVirtual[] }
  | { type: AttendanceRegister.LOADER_AULA_VIRTUAL; payload: boolean }
  | { type: AttendanceRegister.LOADER_UPLOAD; payload: boolean }
  | { type: AttendanceRegister.CURSO_BY_ID; payload: CursoById }
  | { type: AttendanceRegister.RECORD_ESTUDIANTES_MENSUAL; payload: RecordEstudiante[] }
  | { type: AttendanceRegister.RECORD_ESTUDIANTES_DAILY; payload: RecordReporteDiario[] }

export type CuadernoControl = {
  message?: string
  subject?: string
}

export type AuthenticationFormSignIn = {
  email: string,
  password: string
}

export type CursoById = {
  id?:string,
  name?:string,
  nivel?:string
}
export type AttendanceDepartureTime = {
  attendance?: boolean,
  departure?: boolean,
}

export type Rol = {
  id?: string,
  name?: string
}
export type Curso = {
  name?: string,
  nivel?: string,
  id?: string,
  newCurso?: boolean
}

export type CuadernoControlCheckbox = {
  nivel: string[]
  grades: string[]
}

export type AulaVirtual = {
  id?: string,
  url?: string,
  nombreCurso?: string,
  nombreArchivo?: string,
  idProfesor?: string,
  grado?:string
}

export type RecordEstudiante = {
  falta?:number,
  id?:string,
  manualAttendance?:boolean,
  puntual?:number,
  tardanza?:number
  nombres?:string,
  apellidoMaterno?:string,
  apellidoPaterno?:string
}
export type RecordReporteDiario = {
  estudiante:StudentData
  asistencia:ReporteDiario[]
}
export type ReporteDiario = {
  // arrayAsistencia?: {
    arrivalTime?:boolean,
    falta?:boolean,
    id?:string,
    day?:string
  // }
}

export type attendanceStudentType = {
  departure?: Date,
  arrivalTime?: Date,
  falta?: boolean,
  id?:string,
  manualAttendance:boolean
}