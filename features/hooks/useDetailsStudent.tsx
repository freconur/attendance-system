import { collection, getDocs, getFirestore } from 'firebase/firestore'
import { AttendanceRegister } from '../actions/actionAttendance'
import { app } from '../../firebase/firebaseConfig';
import { useGlobalContext, useGlobalContextDispatch } from '../context/GlobalContext';
import { currentMonth, currentYear, getDayFromDate, getDayFromDateFalta, hoursUnixDateForDetailStudent, hoursUnixDateForDetailStudentWithoutArrivalTime, transformMonthToEnglish } from '@/dates/date';


const useDetailsStudents = () => {
  const dispatch = useGlobalContextDispatch()
  const db = getFirestore(app)
  const { userData } = useGlobalContext()
  const getDetailsofAttendance = async (id: string, month: string) => {
    // const pathRef = doc(db,`/attendance-student/${id}/${currentYear()}/${currentMonth()}/${currentMonth()}`)
    const querySnapshot = await getDocs(collection(db, `/intituciones/${userData.idInstitution}/attendance-student/${id}/${currentYear()}/${month}/${month}`));
    const arrivalTimeFromStudent: any = []

    querySnapshot.forEach((doc) => {
      //debo de hacer el mes dinamico para esta ocasion

      if (doc.data().justification) {
        arrivalTimeFromStudent.push(getDayFromDate(new Date(`${transformMonthToEnglish(currentMonth())},${doc.id}, ${currentYear()}`)))
      } else if (doc.data().falta) {
        arrivalTimeFromStudent.push(getDayFromDateFalta(new Date(`${transformMonthToEnglish(currentMonth())},${doc.id}, ${currentYear()}`)))
      } else if (!doc.data().arrivalTime && doc.data().departure) {
        //entra a esta condicional cuando soloregsitro la salida y no su ingreso
        arrivalTimeFromStudent.push(hoursUnixDateForDetailStudentWithoutArrivalTime(doc.data().departure))
      } else {
        arrivalTimeFromStudent.push(hoursUnixDateForDetailStudent(doc.data().arrivalTime, doc.data().departure))

      }
    });
    if (arrivalTimeFromStudent) {
      arrivalTimeFromStudent.sort((a: any, b: any) => {
        const fe = Number(a?.date)
        const se = Number(b?.date)
        if (fe > se) {
          return 1;
        }
        if (fe < se) {
          return -1;
        }
        return 0;
      })
      console.log('arrivalTimeFromStudent', arrivalTimeFromStudent)
      dispatch({ type: AttendanceRegister.RESUME_ATTENDANCE_STUDENT, payload: arrivalTimeFromStudent })
    }
  }

  return { getDetailsofAttendance }
}
export default useDetailsStudents