import { ReactNode } from "react"
import { AttendanceRegister } from '../actions/actionAttendance'
export type AuthProviderProps = {
  children: React.ReactNode
}
export interface StudentData {
  nameFather?: string,
  nameMother?: string,
  numberFather?: string,
  numberMother?: string,
  dni?: string,
  pictureProfile?: string,
  grade?: string,
  name?: string,
  lastname?: string,
  qr?: string,
  section?: string,
  cellPhone?: string,
  currentAttendance?: Date,
  attendanceByDate?: string
}
export interface Section {
  section?: string
}
export interface Grades {
  grade?: string,
  traditionalGrade?: string
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
  resumeAttendanceStudent: DetailsPerDayOfStudent[]
}
export interface DetailsPerDayOfStudent {
  day: string,
  date: string,
  attendance: string,
}
export type AttendanceAction =
  | { type: AttendanceRegister.ATTENDANCE_REGISTER; payload: StudentData[] }
  | { type: AttendanceRegister.GRADES; payload: Grades[] }
  | { type: AttendanceRegister.SECTIONS; payload: Section[] }
  | { type: AttendanceRegister.PICTURE_PROFILE_URL; payload: string }
  | { type: AttendanceRegister.PICTURE_PROFILE_URL; payload: string }
  | { type: AttendanceRegister.STUDENT_BY_GRADE_AND_SECTION; payload: StudentData[] }
  | { type: AttendanceRegister.SHOW_SIDEBAR; payload: boolean }
  | { type: AttendanceRegister.DATA_STUDENT_BY_SEARCH; payload: StudentData }
  | { type: AttendanceRegister.RESUME_ATTENDANCE_STUDENT; payload: DetailsPerDayOfStudent[] }
  | { type: AttendanceRegister.DATA_STUDENT; payload: StudentData }

export type AuthenticationFormSignIn = {
  email: string,
  password: string
}