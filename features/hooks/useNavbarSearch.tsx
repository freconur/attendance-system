import { app } from "@/firebase/firebaseConfig";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useGlobalContextDispatch } from "../context/GlobalContext";
import { AttendanceRegister } from "../actions/actionAttendance";



const useNavbarSearch = () => {
  const db = getFirestore(app)
  const dispatch = useGlobalContextDispatch()
  const searchStudent = async (dni: string) => {
    const studentRef = doc(db, "students", dni);
    const studentSnap = await getDoc(studentRef);
    if (studentSnap.exists()) {
      dispatch({ type: AttendanceRegister.DATA_STUDENT_BY_SEARCH, payload: studentSnap.data() })
    }
  }
  const closeSearchStudent = () => {
    dispatch({ type: AttendanceRegister.DATA_STUDENT_BY_SEARCH, payload: {} })
  }

  return { searchStudent, closeSearchStudent }
}

export default useNavbarSearch