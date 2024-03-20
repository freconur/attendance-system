import { app } from "@/firebase/firebaseConfig";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useGlobalContext, useGlobalContextDispatch } from "../context/GlobalContext";
import { AttendanceRegister } from "../actions/actionAttendance";



const useNavbarSearch = () => {
  const db = getFirestore(app)
  const { userData } = useGlobalContext()
  const dispatch = useGlobalContextDispatch()
  
  const searchStudent = async (dni: string) => {
    const studentRef = doc(db, `/intituciones/${userData.idInstitution}/students`, dni);
    const studentSnap = await getDoc(studentRef);
    if (studentSnap.exists()) {
      dispatch({ type: AttendanceRegister.DATA_STUDENT_BY_SEARCH, payload: studentSnap.data() })
    }
  }
  const cleanSearchStudent = () => {
    dispatch({ type: AttendanceRegister.DATA_STUDENT_BY_SEARCH, payload: {} })
  }
  const closeSearchStudent = () => {
    dispatch({ type: AttendanceRegister.DATA_STUDENT_BY_SEARCH, payload: {} })
  }
  const dataStudent = async (dni: string) => {
    const studentRef = doc(db, `/intituciones/${userData.idInstitution}/students`, dni);
    const studentSnap = await getDoc(studentRef);
    if (studentSnap.exists()) {
      dispatch({ type: AttendanceRegister.DATA_STUDENT, payload: studentSnap.data() })
    }
  }
  const dataEmployee = async (dni: string) => {
    const employeeRef = doc(db, `/intituciones/${userData.idInstitution}/employee`, dni);
    const employeeSnap = await getDoc(employeeRef);
    if (employeeSnap.exists()) {
      dispatch({ type: AttendanceRegister.DATA_EMPLOYEE, payload: employeeSnap.data() })
    }
  }
  return { searchStudent, closeSearchStudent, cleanSearchStudent,dataStudent,dataEmployee }
}

export default useNavbarSearch