import { useGlobalContext, useGlobalContextDispatch } from '../context/GlobalContext'
import { app } from '@/firebase/firebaseConfig'
import { Timestamp, collection, doc, getDoc, getDocs, getFirestore, orderBy, query, setDoc, updateDoc, where } from 'firebase/firestore'
import { Grades, JustificacionStudent, JustificationValue, Section, StudentData } from '../types/types'
import { AttendanceRegister } from '../actions/actionAttendance'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { currentDate, currentMonth, currentYear, dateConvertObjectStudent, hoursUnixDate } from '@/dates/date'
import axios from 'axios'
const URL_API = "https://whatsapp-api-production-da60.up.railway.app"

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
      const newData = { ...student, attendanceByDate: attendance.exists() ? attendance.data().justification ? "justificado" : attendance.data().arrivalTime === null ? "falto" : hoursUnixDate(attendance.data().arrivalTime) : "falto" }
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
  const saveChangesFromAttendanceByGradeSecction = (students: StudentData[]) => {
    dispatch({ type: AttendanceRegister.LOADING_SAVE_ATTENDANCE_GRADE_SECTION, payload: true })
    const currentlyDate = new Date()
    students.map(async (student) => {
      const pathRef = `/intituciones/${userData.idInstitution}/attendance-student/${student.dni}/${currentYear()}/${currentMonth()}/${currentMonth()}`
      // await setDoc(doc(db, pathRef, currentDate()), { arrivalTime: new Date() })
      const docRef = doc(db, `/intituciones/${userData.idInstitution}/attendance-student/${student.dni}/${currentYear()}/${currentMonth()}/${currentMonth()}/${currentDate()}`);
      const dataStudent = await getDoc(docRef)
      console.log('dataStudent', dataStudent?.data())
      if (dataStudent.exists()) {
        if (dataStudent.data().manualAttendance === true) {
              // no haremos nada
        } else {
          if (student.presente) {
            await setDoc(doc(db, pathRef, currentDate()), { arrivalTime: Timestamp.fromDate(new Date(currentlyDate.getFullYear(), currentlyDate.getMonth(), currentlyDate.getDate(), 7, 59, 1)) })
              .then(response => {

                if (student.numberFather) {
                  try {
                    axios
                      // .post(`/api/whatsapp`,
                      .post(`${URL_API}/message`,
                        {
                          phoneNumber: `51${student.numberFather}@c.us`,
                          message: `sr. ${student.nameFather}, el estudiante ${student.name} ${student.lastname}, acaba de ingresar al colegio a las ${dateConvertObjectStudent(new Date(currentlyDate.getFullYear(), currentlyDate.getMonth(), currentlyDate.getDate(), 7, 59, 1))}.`
                        })
                  } catch (error) {
                    console.log('error', error)
                  }
                }
                dispatch({ type: AttendanceRegister.LOADING_SAVE_ATTENDANCE_GRADE_SECTION, payload: false })

              })
          }
          if (student.tardanza) {
            await setDoc(doc(db, pathRef, currentDate()), { arrivalTime: new Date(currentlyDate.getFullYear(), currentlyDate.getMonth(), currentlyDate.getDate(), 8, 1, 1) })
              .then(response => {
                if (student.numberFather) {
                  try {
                    axios
                      // .post(`/api/whatsapp`,
                      .post(`${URL_API}/message`,
                        {
                          phoneNumber: `51${student.numberFather}@c.us`,
                          message: `sr. ${student.nameFather}, el estudiante ${student.name} ${student.lastname}, acaba de ingresar al colegio a las ${dateConvertObjectStudent(new Date(currentlyDate.getFullYear(), currentlyDate.getMonth(), currentlyDate.getDate(), 8, 1, 1))}.`
                        })
                  } catch (error) {
                    console.log('error', error)
                  }
                }
                dispatch({ type: AttendanceRegister.LOADING_SAVE_ATTENDANCE_GRADE_SECTION, payload: false })
              })
          }
          if (student.falta) {
            await setDoc(doc(db, pathRef, currentDate()), { arrivalTime: null, falta: true })
              .then(response => {
                if (student.numberFather) {
                  try {
                    axios
                      // .post(`/api/whatsapp`,
                      .post(`${URL_API}/message`,
                        {
                          phoneNumber: `51${student.numberFather}@c.us`,
                          message: `sr. ${student.nameFather}, el estudiante ${student.name} ${student.lastname} no asistio al colegio ${dateConvertObjectStudent(new Date(currentlyDate.getFullYear(), currentlyDate.getMonth(), currentlyDate.getDate(), 8, 0, 0))}.`
                        })
                  } catch (error) {
                    console.log('error', error)
                  }
                }
                dispatch({ type: AttendanceRegister.LOADING_SAVE_ATTENDANCE_GRADE_SECTION, payload: false })
              })
          }
          dispatch({ type: AttendanceRegister.CONFIRMATION_SAVE_ATTENDANCE_GRADE_SECTION_MODAL, payload: false })
        }
      }
    })
  }
  const changeAttendanceFromStudent = (id: string, students: StudentData[], attendance: string) => {
    students.map(student => {
      if (student.dni === id) {
        if (attendance === "presente") {
          student.presente = true
          student.tardanza = false
          student.falta = false
        }
        if (attendance === "tardanza") {
          student.presente = false
          student.tardanza = true
          student.falta = false
        }
        if (attendance === "falta") {
          student.presente = false
          student.tardanza = false
          student.falta = true
        }
      }
    })
    dispatch({ type: AttendanceRegister.STUDENTS_FOR_ATTENDANCE, payload: students })
  }
  const filterRegisterByGradeAndSection = async (grade: string, section: string, date: string, tipoDeAsistencia?: string) => {
    dispatch({ type: AttendanceRegister.LOADING_SEARCH_STUDENTS, payload: true })
    const refStudents = collection(db, `/intituciones/${userData.idInstitution}/students`)
    const q1 = query(refStudents, where("grade", "==", `${grade}`), where("section", "==", `${section}`));
    const docSnap = await getDocs(q1)
    const studentsFilter: StudentData[] = []

    docSnap.forEach(async (rta) => {
      const data = { ...rta.data(), tardanza: false, presente: false, falta: true }
      studentsFilter.push(data)
    })
    const rta = await getDataStudentsByDate(studentsFilter, date)
    if (rta && tipoDeAsistencia === "asistencia-grado") {
      dispatch({ type: AttendanceRegister.STUDENTS_FOR_ATTENDANCE, payload: rta })
      dispatch({ type: AttendanceRegister.LOADING_SEARCH_STUDENTS, payload: false })
    } else if (rta && tipoDeAsistencia === "registros") {
      dispatch({ type: AttendanceRegister.STUDENT_BY_GRADE_AND_SECTION, payload: rta })
      dispatch({ type: AttendanceRegister.LOADING_SEARCH_STUDENTS, payload: false })
    } else {
      dispatch({ type: AttendanceRegister.LOADING_SEARCH_STUDENTS, payload: false })
    }
  }

  const justificarFalta = async (id: string, date: string, justication: JustificationValue) => {
    const attendanceRef = doc(db, `/intituciones/${userData.idInstitution}/attendance-student/${id}/${currentYear()}/${currentMonth()}/${currentMonth()}/${date}`);
    //deberia crear un modal con campos para poner un motivo de la falta 
    await setDoc(attendanceRef, { arrivalTime: "justificado", justification: true, justificationMotive: justication.justification });
  }

  const justificacionInfoByStudent = async (id: string, date: string) => {
    const attendanceRef = doc(db, `/intituciones/${userData.idInstitution}/attendance-student/${id}/${currentYear()}/${currentMonth()}/${currentMonth()}/${date}`);
    const docSnap = await getDoc(attendanceRef);
    // console.log('docSnap',docSnap.data())
    const rta: JustificacionStudent = { ...docSnap.data(), id: docSnap.id }
    dispatch({ type: AttendanceRegister.SHOW_JUSTIFICACION_MOTIVO, payload: rta })
  }
  const showJustificacionMotivo = (value: boolean) => {
    dispatch({ type: AttendanceRegister.SHOW_JUSTIFICACION_MOTIVO_MODAL, payload: value })
  }
  const showJustificaconFaltaModal = (value: boolean) => {
    dispatch({ type: AttendanceRegister.SHOW_JUSTIFICACION_FALTA_MODAL, payload: value })
  }
  const showJustificaconFaltaConfirmationModal = (value: boolean) => {
    dispatch({ type: AttendanceRegister.SHOW_JUSTIFICACION_FALTA_CONFIRMATION_MODAL, payload: value })
  }

  const saveAttendance = (value: boolean) => {
    console.log('value', value)
    dispatch({ type: AttendanceRegister.CONFIRMATION_SAVE_ATTENDANCE_GRADE_SECTION_MODAL, payload: !value })
  }
  return { saveAttendance, showJustificacionMotivo, justificacionInfoByStudent, filterRegisterByGradeAndSection, justificarFalta, showJustificaconFaltaModal, showJustificaconFaltaConfirmationModal, changeAttendanceFromStudent, saveChangesFromAttendanceByGradeSecction }
}

export default useAttendanceRegister