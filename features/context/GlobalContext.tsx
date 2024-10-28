'use client'
import { createContext, useContext, useReducer, ReactNode, Dispatch } from "react";
import { Student, AttendanceAction } from "../types/types";
import { attendance } from "../reducer/attendanceReducer";

interface Props {
  children: ReactNode
}
const initialState: Student = {
  studentsData: [],
  testing: 23,
  sections: [],
  grades: [],
  pictureProfileUrl: "",
  studentsByGradeAndSection: [],
  showSidebar: false,
  studentData: {},
  resumeAttendanceStudent: [],
  studentDataBySearch: {},
  userData: {},
  justificacionFaltaModal: false,
  justificacionFaltaConfirmationModal: false,
  justificacionMotivoModal: false,
  justificacionStudent: {},
  validateMyProducts: {},
  warningAccount: "",
  loadingAccount: false,
  loadingSearchStudents: false,
  studentsForAttendance: [],
  confirmationSaveAttendanceByGradeSectionModal: false,
  loadingSaveAttendanceByGradeSectionModal: false,
  typesEmployee: [],
  employees: [],
  employee: {},
  resumenAttendanceEmployee: [],
  employeeData: {},
  loaderGetEmployee: false,
  loadingGetStudents: false,
  studentsByGrade: [],
  activeEmployeeModal: false,
  updateStudentConfirmationModal: false,
  showDepartureManualModal: false,
  studentforDeparture: {},
  confirmationDepartureStudentModal: false,
  studentTaller: {},
  studentTallerLoader: false,
  cursos: [],
  pictureTareas: [],
  getAllTareas: [],
  employeeDataSearch: {},
  updateEmployeeConfirmationModal: false,
  showNewUserModal: false,
  roles: [],
  allCursos: [],
  loaderPictureTask: false,
  instituciones: [],
  showChangePassword:false,
  errorCurrentPassword:false,
  showModalConfirmationSendMessageWhatsapp: false,
  sendMessageWhatsappLoader:false,
  allStudents:[],
  gradesSecundaria:[],
  gradesPrimaria:[],
  showModalConfirmationCuadernoControl:false,
  getAllCuadernoControl:[]
}

export const GlobalContext = createContext<[Student, Dispatch<AttendanceAction>]>([initialState, () => { }])
// export const Attendance = createContext<Student>({studentData: {}})

export const useGlobalContext = () => useContext(GlobalContext)[0]
export const useGlobalContextDispatch = () => useContext(GlobalContext)[1]

export const GlobalContextProvider = ({ children }: Props) => {

  return (
    <GlobalContext.Provider value={useReducer(attendance, initialState)}>
      {children}
    </GlobalContext.Provider>
  )
}