import { StaticTimePicker } from "@mui/x-date-pickers";
import { AttendanceRegister } from "../actions/actionAttendance";
import { AttendanceAction, Student } from "../types/types";


export const attendance = (state: Student, action: AttendanceAction) => {
  switch (action.type) {
    case AttendanceRegister.RECORD_ESTUDIANTES_MENSUAL:{
      return {
        ...state,
        reporteByGradeMensual:action.payload
      }
    }
    case AttendanceRegister.CURSO_BY_ID: {
      return {
        ...state,
        cursoById: action.payload
      }
    }
    case AttendanceRegister.LOADER_UPLOAD:
      return {
        ...state,
        loaderUpload: action.payload
      }
    case AttendanceRegister.LOADER_AULA_VIRTUAL:
      return {
        ...state,
        loaderAulaVirtual: action.payload
      }
    case AttendanceRegister.ARCHIVOS_AULA_VIRTUAL:
      return {
        ...state,
        archivosAulaVirtual: action.payload
      }
    case AttendanceRegister.SHOW_CURSOS_AULAVIRUTAL:
      return {
        ...state,
        showCursosAulavirtual: action.payload
      }
    case AttendanceRegister.INSTITUTION_DATA:
      return {
        ...state,
        institucionData: action.payload
      }
    case AttendanceRegister.ID_INSTITUCION:
      return {
        ...state,
        idInstitucion: action.payload
      }
    case AttendanceRegister.DATA_AULAVIRTUAL:
      return {
        ...state,
        dataAulavirtual: action.payload
      }
    case AttendanceRegister.VALIDATE_USER_AULAVIRTUAL:
      return {
        ...state,
        validateUserAulavirtual: action.payload
      }
    case AttendanceRegister.LOADER_COTIZACION:
      return {
        ...state,
        loaderCotizacion: action.payload
      }
    case AttendanceRegister.GET_ALL_CUADERNOCONTROL:
      return {
        ...state,
        getAllCuadernoControl: action.payload
      }
    case AttendanceRegister.SHOW_CONFIRMATION_CUADERNOCONTROL:
      return {
        ...state,
        showModalConfirmationCuadernoControl: action.payload
      }
    case AttendanceRegister.GRADES_PRIMARIA:
      return {
        ...state,
        gradesPrimaria: action.payload
      }
    case AttendanceRegister.GRADES_SECUNDARIA:
      return {
        ...state,
        gradesSecundaria: action.payload
      }
    case AttendanceRegister.ALL_STUDENTS:
      return {
        ...state,
        allStudents: action.payload
      }
    case AttendanceRegister.LOADER_SENDMESSAGEWHATSAPP:
      return {
        ...state,
        sendMessageWhatsappLoader: action.payload
      }
    case AttendanceRegister.SHOW_MODAL_CONFIRMATION_SENDMESSAGEWHATSAPP:
      return {
        ...state,
        showModalConfirmationSendMessageWhatsapp: action.payload
      }
    case AttendanceRegister.SHOW_CHANGE_PASSWORD:
      return {
        ...state,
        showChangePassword: action.payload
      }
    case AttendanceRegister.ERROR_CURRENT_PASSWORD:
      return {
        ...state,
        errorCurrentPassword: action.payload
      }
    case AttendanceRegister.INSTITUCIONES:

      return {
        ...state,
        instituciones: action.payload
      }
    case AttendanceRegister.LOADER_PICTURE_TASK:
      return {
        ...state,
        loaderPictureTask: action.payload
      }
    case AttendanceRegister.GET_ALL_CURSOS:
      return {
        ...state,
        allCursos: action.payload
      }
    case AttendanceRegister.GET_ROLES:
      return {
        ...state,
        roles: action.payload
      }
    case AttendanceRegister.SHOW_CREATE_NEW_USER:
      return {
        ...state,
        showNewUserModal: action.payload
      }
    case AttendanceRegister.UPDATE_EMPLOYEE_CONFIRMATION_MODAL:
      return {
        ...state,
        updateEmployeeConfirmationModal: action.payload
      }
    case AttendanceRegister.GET_EMPLOYEE_BY_SEARCH:
      return {
        ...state,
        employeeDataSearch: action.payload
      }
    case AttendanceRegister.GET_ALL_TAREAS:
      return {
        ...state,
        getAllTareas: action.payload
      }
    case AttendanceRegister.PICTURE_TAREAS:
      return {
        ...state,
        pictureTareas: action.payload
      }
    case AttendanceRegister.GET_CURSOS:
      return {
        ...state,
        cursos: action.payload
      }
    case AttendanceRegister.STUDENT_TALLER_LOADER:
      return {
        ...state,
        studentTallerLoader: action.payload
      }
    case AttendanceRegister.GET_STUDENT_TALLER:
      return {
        ...state,
        studentTaller: action.payload
      }
    case AttendanceRegister.CONFIRMATION_DEPARTURE_STUDENT_MODAL:
      return {
        ...state,
        confirmationDepartureStudentModal: action.payload
      }
    case AttendanceRegister.STUDENT_FOR_DEPARTURE:
      return {
        ...state,
        studentforDeparture: action.payload
      }
    case AttendanceRegister.SHOW_DEPARTURE_MANUAL_MODAL:
      return {
        ...state,
        showDepartureManualModal: action.payload
      }
    case AttendanceRegister.UPDATE_STUDENT_CONFIRMATION_MODAL:
      return {
        ...state,
        updateStudentConfirmationModal: action.payload
      }
    case AttendanceRegister.ACTIVE_EMPLOYEE_MODAL:
      return {
        ...state,
        activeEmployeeModal: action.payload
      }
    case AttendanceRegister.STUDENT_BY_GRADE:
      return {
        ...state,
        studentsByGrade: action.payload
      }
    case AttendanceRegister.LOADING_GET_STUDENTS:
      return {
        ...state,
        loadingGetStudents: action.payload
      }
    case AttendanceRegister.LOADER_GET_EMPLOYEE:
      return {
        ...state,
        loaderGetEmployee: action.payload
      }
    case AttendanceRegister.DATA_EMPLOYEE:
      return {
        ...state,
        employeeData: action.payload
      }
    case AttendanceRegister.GET_EMPLOYEE_RESUME_ATTENDANCE:
      return {
        ...state,
        resumenAttendanceEmployee: action.payload
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
        loadingSaveAttendanceByGradeSectionModal: action.payload
      }
    case AttendanceRegister.CONFIRMATION_SAVE_ATTENDANCE_GRADE_SECTION_MODAL:
      return {
        ...state,
        confirmationSaveAttendanceByGradeSectionModal: action.payload
      }
    case AttendanceRegister.STUDENTS_FOR_ATTENDANCE:
      return {
        ...state,
        studentsForAttendance: action.payload
      }
    case AttendanceRegister.LOADING_SEARCH_STUDENTS:
      return {
        ...state,
        loadingSearchStudents: action.payload
      }
    case AttendanceRegister.LOADING_ACCOUNT:
      return {
        ...state,
        loadingAccount: action.payload
      }
    case AttendanceRegister.WARNING_ACCOUNT:
      return {
        ...state,
        warningAccount: action.payload
      }
    case AttendanceRegister.VALIDATE_MY_PRODUCTS:
      return {
        ...state,
        validateMyProducts: action.payload
      }
    case AttendanceRegister.SHOW_JUSTIFICACION_MOTIVO:
      return {
        ...state,
        justificacionStudent: action.payload
      }
    case AttendanceRegister.SHOW_JUSTIFICACION_MOTIVO_MODAL:
      return {
        ...state,
        justificacionMotivoModal: action.payload
      }
    case AttendanceRegister.SHOW_JUSTIFICACION_FALTA_CONFIRMATION_MODAL:
      return {
        ...state,
        justificacionFaltaConfirmationModal: action.payload
      }
    case AttendanceRegister.SHOW_JUSTIFICACION_FALTA_MODAL:
      return {
        ...state,
        justificacionFaltaModal: action.payload
      }
    case AttendanceRegister.USER_DATA:
      return {
        ...state,
        userData: action.payload
      }
    case AttendanceRegister.DATA_STUDENT:
      return {
        ...state,
        studentData: action.payload
      }
    case AttendanceRegister.RESUME_ATTENDANCE_STUDENT:
      return {
        ...state,
        resumeAttendanceStudent: action.payload
      }
    case AttendanceRegister.DATA_STUDENT_BY_SEARCH:
      return {
        ...state,
        studentDataBySearch: action.payload
      }
    case AttendanceRegister.SHOW_SIDEBAR:
      return {
        ...state,
        showSidebar: action.payload
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
        studentsByGradeAndSection: action.payload
      }
    default:
      return state
  }
}