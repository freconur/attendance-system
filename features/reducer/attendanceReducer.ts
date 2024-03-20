import { AttendanceRegister } from "../actions/actionAttendance";
import { AttendanceAction, Student } from "../types/types";


export const attendance = (state: Student, action: AttendanceAction) => {
  switch (action.type) {
    case AttendanceRegister.LOADER_GET_EMPLOYEE:
      return {
        ...state,
        loaderGetEmployee:action.payload
      }
    case AttendanceRegister.DATA_EMPLOYEE:
      return {
        ...state,
        employeeData:action.payload
      }
    case AttendanceRegister.GET_EMPLOYEE_RESUME_ATTENDANCE: 
    return {
      ...state,
      resumenAttendanceEmployee:action.payload
    }
    case AttendanceRegister.GET_EMPLOYEE:
      return {
        ...state,
        employee: action.payload
      }
    case AttendanceRegister.GET_EMPLOYEES:
      return {
        ...state,
        employees: action.payload
      }
    case AttendanceRegister.GET_TYPES_EMPLOYEE:
      return {
        ...state,
        typesEmployee: action.payload
      }

    case AttendanceRegister.LOADING_SAVE_ATTENDANCE_GRADE_SECTION:
      return {
        ...state,
        loadingSaveAttendanceByGradeSectionModal:action.payload
      }
    case AttendanceRegister.CONFIRMATION_SAVE_ATTENDANCE_GRADE_SECTION_MODAL:
    return {
      ...state,
      confirmationSaveAttendanceByGradeSectionModal:action.payload
    }
    case AttendanceRegister.STUDENTS_FOR_ATTENDANCE:
      return {
        ...state,
        studentsForAttendance:action.payload
      }
    case AttendanceRegister.LOADING_SEARCH_STUDENTS:
      return {
      ...state,
      loadingSearchStudents:action.payload
      }
      case AttendanceRegister.LOADING_ACCOUNT:
      return {
        ...state,
        loadingAccount:action.payload
      }
      case AttendanceRegister.WARNING_ACCOUNT:
      return {
        ...state,
        warningAccount:action.payload
      }
    case AttendanceRegister.VALIDATE_MY_PRODUCTS:
      return {
        ...state,
        validateMyProducts:action.payload
      }
      case AttendanceRegister.SHOW_JUSTIFICACION_MOTIVO:
      return {
        ...state,
        justificacionStudent:action.payload
      }
      case AttendanceRegister.SHOW_JUSTIFICACION_MOTIVO_MODAL:
      return {
        ...state,
        justificacionMotivoModal:action.payload
      }
      case AttendanceRegister.SHOW_JUSTIFICACION_FALTA_CONFIRMATION_MODAL:
      return {
        ...state,
        justificacionFaltaConfirmationModal:action.payload
      }
      case AttendanceRegister.SHOW_JUSTIFICACION_FALTA_MODAL:
      return {
        ...state,
        justificacionFaltaModal: action.payload
      }
    case AttendanceRegister.USER_DATA:
      return {
        ...state,
        userData:action.payload
      }
    case AttendanceRegister.DATA_STUDENT:
      return {
        ...state,
        studentData:action.payload
      }
    case AttendanceRegister.RESUME_ATTENDANCE_STUDENT:
      return {
        ...state,
        resumeAttendanceStudent:action.payload
      }
    case AttendanceRegister.DATA_STUDENT_BY_SEARCH:
      return {
        ...state,
        studentDataBySearch:action.payload
      }
    case AttendanceRegister.SHOW_SIDEBAR:
      return {
        ...state,
        showSidebar:action.payload
      }
    case AttendanceRegister.ATTENDANCE_REGISTER:
      return {
        ...state,
        studentsData: action.payload
      }

    case AttendanceRegister.GRADES:
      return {
        ...state,
        grades: action.payload
      }
    case AttendanceRegister.SECTIONS:
      return {
        ...state,
        sections: action.payload
      }
    case AttendanceRegister.PICTURE_PROFILE_URL:
      return {
        ...state,
        pictureProfileUrl: action.payload
      }
    case AttendanceRegister.STUDENT_BY_GRADE_AND_SECTION:
      return {
        ...state,
        studentsByGradeAndSection:action.payload
      }
    default:
      return state
  }
}