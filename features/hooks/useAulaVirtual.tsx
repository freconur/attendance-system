'use client'

import { app } from "@/firebase/firebaseConfig"
import { collection, doc, getDoc, getDocs, getFirestore } from "firebase/firestore"
import { useGlobalContext, useGlobalContextDispatch } from "../context/GlobalContext"
import { CreateUserData, DataStudentAulaVirtual, UserAulaVirtual } from "../types/types"
import { AttendanceRegister } from "../actions/actionAttendance"
import { currentMonth, currentYear, getDayFromDate, getDayFromDateFalta, hoursUnixDateForDetailStudent, hoursUnixDateForDetailStudentWithoutArrivalTime, transformMonthToEnglish } from "@/dates/date"



const db = getFirestore(app)

export const useAulaVirtual = () => {


  const dispatch = useGlobalContextDispatch()

  const showListCursosAulavirutal = (value:boolean) => {
    dispatch({type:AttendanceRegister.SHOW_CURSOS_AULAVIRUTAL, payload:!value})
  }
  const validateUserAulaVirutal = async (data: UserAulaVirtual) => {
    console.log('asd', `/intituciones/${data.institucion}/students`, `${data.dni}`)
    // console.log(`/intituciones/${data.institucion}/students`, `${data.dni}`)
    const docRef = doc(db, `/intituciones/${data.institucion}/students`, `${data.dni}`);
    const docSnap = await getDoc(docRef);


    const docRefInstitucion = doc(db, `/intituciones`, `${data.institucion}`);
    const docSnapInstitucion = await getDoc(docRefInstitucion);
    if (docSnap.exists()) {
      const dataStudent: DataStudentAulaVirtual = docSnap.data()
      dispatch({ type: AttendanceRegister.DATA_AULAVIRTUAL, payload: dataStudent })
      dispatch({ type: AttendanceRegister.VALIDATE_USER_AULAVIRTUAL, payload: true })

      docSnapInstitucion.exists() &&
        dispatch({ type: AttendanceRegister.INSTITUTION_DATA, payload: docSnapInstitucion.data() })

      // data.institucion &&
      //   dispatch({ type: AttendanceRegister.ID_INSTITUCION, payload: data.institucion })
      //debo ejecutar logica despues de validar el usuario


    }
  }
const getDetailsofAttendanceAulaVirtual = async (id: string, month: string, idInstitucion:string) => {
    // const pathRef = doc(db,`/attendance-student/${id}/${currentYear()}/${currentMonth()}/${currentMonth()}`)
    console.log(`/intituciones/${idInstitucion}/attendance-student/${id}/${currentYear()}/${month}/${month}`)
    const querySnapshot = await getDocs(collection(db, `/intituciones/${idInstitucion}/attendance-student/${id}/${currentYear()}/${month}/${month}`));
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

  return {
    validateUserAulaVirutal,
    getDetailsofAttendanceAulaVirtual,
    showListCursosAulavirutal
  }
}