import { useGlobalContext, useGlobalContextDispatch } from '../context/GlobalContext'
import { app } from '@/firebase/firebaseConfig'
import { collection, doc, getDoc, getDocs, getFirestore, orderBy, query, setDoc, updateDoc, where } from 'firebase/firestore'
import { Grades, JustificacionStudent, JustificationValue, Section, StudentData } from '../types/types'
import { AttendanceRegister } from '../actions/actionAttendance'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { currentDate, currentMonth, currentYear, hoursUnixDate } from '@/dates/date'


const useAttendanceRegister = () => {
  const db = getFirestore(app)
  const { userData } = useGlobalContext()
  const dispatch = useGlobalContextDispatch()

  async function getDataStudentsByDate(students: StudentData[], date: string) {
    const studentsArray: StudentData[] = []

    await Promise.all(students.map(async (student) => {
      const refAttendance = doc(db, `/intituciones/${userData.idInstitution}/attendance-student/${student.dni}/${currentYear()}/${currentMonth()}/${currentMonth()}/${date}`)
      const attendance = await getDoc(refAttendance)
      // const newData = { ...student, attendanceByDate: attendance.exists() ? hoursUnixDate(attendance.data().arrivalTime) : "falto" }
      const newData = { ...student, attendanceByDate: attendance.exists() ? attendance.data().justification ? "justificado" : hoursUnixDate(attendance.data().arrivalTime) : "falto" }
      return studentsArray.push(newData)
    }))
    if (studentsArray) {
      studentsArray.sort((a: any, b: any) => {
        const fe: string = a && a.lastname
        const se: string = b && b.lastname

        if (fe > se) {
          return 1;
        }
        // if(fe && se) {}
        if (fe < se) {
          return -1;
        }
        return 0;
      })
    }
    return studentsArray
  }
  const filterRegisterByGradeAndSection = async (grade: string, section: string, date: string) => {
    const refStudents = collection(db, `/intituciones/${userData.idInstitution}/students`)
    const q1 = query(refStudents, where("grade", "==", `${grade}`), where("section", "==", `${section}`));
    const docSnap = await getDocs(q1)
    const studentsFilter: StudentData[] = []

    docSnap.forEach(async (rta) => {
      // const refAttendance = doc(db, `/attendance-student/${rta.data().dni}/${currentYear()}/${currentMonth()}/${currentMonth()}/${currentDate()}`)
      // const attendance = await getDoc(refAttendance)
      // const newData = { ...rta.data(), attendanceByDate: attendance.exists() ? hoursUnixDate(attendance.data().arrivalTime) : "no ingreso" }
      studentsFilter.push(rta.data())
    })
    const rta = await getDataStudentsByDate(studentsFilter, date)

    dispatch({ type: AttendanceRegister.STUDENT_BY_GRADE_AND_SECTION, payload: rta })

  }

  const justificarFalta = async (id: string, date: string , justication:JustificationValue) => {
    const attendanceRef = doc(db, `/intituciones/${userData.idInstitution}/attendance-student/${id}/${currentYear()}/${currentMonth()}/${currentMonth()}/${date}`);
    //deberia crear un modal con campos para poner un motivo de la falta 
    await setDoc(attendanceRef, { arrivalTime: "justificado", justification: true, justificationMotive:justication.justification });
  }

  const justificacionInfoByStudent = async (id:string, date:string) => {
    const attendanceRef = doc(db, `/intituciones/${userData.idInstitution}/attendance-student/${id}/${currentYear()}/${currentMonth()}/${currentMonth()}/${date}`);
    const docSnap = await getDoc(attendanceRef);
    // console.log('docSnap',docSnap.data())
    const rta:JustificacionStudent = { ...docSnap.data(), id:docSnap.id}
    dispatch({type:AttendanceRegister.SHOW_JUSTIFICACION_MOTIVO, payload:rta})
  }
  const showJustificacionMotivo = (value:boolean) => {
    dispatch({type:AttendanceRegister.SHOW_JUSTIFICACION_MOTIVO_MODAL, payload:value})
  }
  const showJustificaconFaltaModal = (value: boolean) => {
    dispatch({ type: AttendanceRegister.SHOW_JUSTIFICACION_FALTA_MODAL, payload: value })
  }
  const showJustificaconFaltaConfirmationModal = (value: boolean) => {
    dispatch({ type: AttendanceRegister.SHOW_JUSTIFICACION_FALTA_CONFIRMATION_MODAL, payload: value })
  }

  return { showJustificacionMotivo,justificacionInfoByStudent,filterRegisterByGradeAndSection, justificarFalta, showJustificaconFaltaModal, showJustificaconFaltaConfirmationModal }
}

export default useAttendanceRegister