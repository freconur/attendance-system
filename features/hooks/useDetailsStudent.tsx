import { collection, getDocs, getFirestore } from 'firebase/firestore'
import { AttendanceRegister } from '../actions/actionAttendance'
import { app } from '../../firebase/firebaseConfig';
import { useGlobalContext, useGlobalContextDispatch } from '../context/GlobalContext';
import { currentMonth, currentYear, getDayFromDate, getDayFromDateFalta, hoursUnixDateForDetailStudent, transformMonthToEnglish } from '@/dates/date';


const useDetailsStudents = () => {
  const dispatch = useGlobalContextDispatch()
  const db = getFirestore(app)
  const { userData } = useGlobalContext()
  // const findStudentForDetails = async (id: string) => {
  //   const docRef = doc(db, `/intituciones/${userData?.idInstitution}/students`, `${id}`);
  //   const docSnap = await getDoc(docRef);

  //   if (docSnap.exists()) {
  //     console.log("Document data:", docSnap.data());
  //     dispatch({ type: AttendanceRegister.STUDENT_DETAILS, payload: docSnap.data() })
  //   } else {
  //     // docSnap.data() will be undefined in this case
  //     console.log("No such document!");
  //   }
  // }

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
      } else {
        arrivalTimeFromStudent.push(hoursUnixDateForDetailStudent(doc.data().arrivalTime))

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