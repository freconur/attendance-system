import { collection, getDocs, getFirestore } from 'firebase/firestore'
import { AttendanceRegister } from '../actions/actionAttendance'
import { app } from '../../firebase/firebaseConfig';
import { useGlobalContext, useGlobalContextDispatch } from '../context/GlobalContext';
import { currentMonth, currentYear, getDayFromDate, hoursUnixDateForDetailStudent, transformMonthToEnglish } from '@/dates/date';


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
      // doc.data() is never undefined for query doc snapshots
      // arrivalTimeFromStudent.push(doc.data().justification ? "justificado" : hoursUnixDateForDetailStudent(doc.data().arrivalTime))
      //debo de hacer el mes dinamico para esta ocasion
      arrivalTimeFromStudent.push(doc.data().justification ? getDayFromDate(new Date(`${transformMonthToEnglish(currentMonth())} ${doc.id}, ${currentYear()}`)) : hoursUnixDateForDetailStudent(doc.data().arrivalTime))
    });
    if (arrivalTimeFromStudent) {
      arrivalTimeFromStudent.sort((a: any, b: any) => {
        const fe = Number(a.date)
        const se = Number(b.date)
        if (fe > se) {
          return 1;
        }
        if (fe < se) {
          return -1;
        }
        return 0;
      })
      console.log('arrivalTimeFromStudent',arrivalTimeFromStudent)
      dispatch({ type: AttendanceRegister.RESUME_ATTENDANCE_STUDENT, payload: arrivalTimeFromStudent })
    }
  }

  return { getDetailsofAttendance }
}
export default useDetailsStudents