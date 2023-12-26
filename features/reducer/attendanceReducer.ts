import { AttendanceRegister } from "../actions/actionAttendance";
import { AttendanceAction, Student } from "../types/types";


export const attendance = (state:Student, action:AttendanceAction) => {
  switch(action.type) {
    case AttendanceRegister.ATTENDANCE_REGISTER:{
      return{
        ...state,
        studentsData:action.payload
      }
    }
    default: 
    return state
  }
}