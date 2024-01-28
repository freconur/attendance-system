import { AttendanceRegister } from "../actions/actionAttendance";
import { AttendanceAction, Student } from "../types/types";


export const attendance = (state: Student, action: AttendanceAction) => {
  switch (action.type) {
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