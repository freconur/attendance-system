'use client'
import { app } from "@/firebase/firebaseConfig";
import { OrderByDirection, QuerySnapshot, Timestamp, addDoc, collection, deleteDoc, doc, endAt, endBefore, getDoc, getDocs, getFirestore, increment, limit, onSnapshot, orderBy, query, setDoc, startAfter, updateDoc, where } from "firebase/firestore";
import { useGlobalContext, useGlobalContextDispatch } from "../context/GlobalContext";
import { AttendanceRegister } from "../actions/actionAttendance";
import { currentDate, currentMonth, currentYear, dateConvertObject, dateConvertObjectStudent, hoursUnixDate } from "@/dates/date";
import { StudentData } from "../types/types";
import axios from 'axios'
import { attendanceDepartureTime, attendanceState } from "@/utils/attendanceState";
const db = getFirestore(app)
// const URL_API = "https://whatsapp-api-production-da60.up.railway.app"
const URL_API = "https://whatsapp-api-production-2059.up.railway.app"

export const useAttendance = () => {
  const dispatch = useGlobalContextDispatch()
  const { userData } = useGlobalContext()

  const studentArrivalTime = async (studentCode: string) => {
    const arrivalTimeRef = doc(db, `/intituciones/${userData.idInstitution}/attendance-student/${studentCode}/${currentYear()}/${currentMonth()}/${currentMonth()}/${currentDate()}`)

    //aqui deberia de condicionar segun la hora si registra la hora de ingreso o la salida o en todo caso si es la version de prueba quitar la validacion
    const currentHour = new Date()

    const data = attendanceDepartureTime(currentHour.getHours().toString().padStart(2, "0"))
    if (data?.attendance === true && data?.departure === false) {
      // const rta: AttendanceDepartureTime = attendanceDepartureTime(`${currentHour.getHours()}`)
      console.log('estamos en ingreso')
      await setDoc(arrivalTimeRef, { arrivalTime: new Date(), manualAttendance: true })//crea la hora de ingreso (el arrivaltime) del estudiante
    } else if (data?.attendance === false && data?.departure === true) {
      console.log('estamos en salida')
      await setDoc(arrivalTimeRef, { departure: new Date(), manualAttendance: true }, { merge: true })//crea la hora de salida (el arrivaltime) del estudiante
    }
  }

  const getStudentData = async (studentCode: string, Data: StudentData[]) => {
    dispatch({ type: AttendanceRegister.LOADING_GET_STUDENTS, payload: true })
    const refData = doc(db, `/intituciones/${userData.idInstitution}/students`, studentCode as string)
    const studentData = await getDoc(refData)
    if (studentData.exists()) {//primero verifico si la data existe
      studentArrivalTime(studentCode)
      Data?.unshift(studentData.data())
      // const testspice = Data.slice(0,5)
      // console.log('resultado de memoria',Data.slice(0,5))
      // console.log('ver como resultado de una constante',testspice)
      // console.log('ver si se modifica la data o solo lo hace en memoria',Data)
      // POST DE ENVIO DE WHATYSAPP AL NUMERO DEL PADRE DE FAMILIA
      if (studentData.data().firstContact?.length > 0 && studentData.data().firstNumberContact?.length === 9) {
        try {
          axios
            // .post(`/api/whatsapp`,
            .post(`${URL_API}/message`,
              {
                // phoneNumber: `51${studentData.data().firstNumberContact}@c.us`,
                phoneNumber: `51982752688@c.us`,
                message: `Sr.(a) ${studentData.data().firstContact}, el estudiante ${studentData.data().name} ${studentData.data().lastname}, acaba de ingresar al colegio a las ${dateConvertObjectStudent(new Date())}.`
              })
        } catch (error) {
          console.log('error', error)
        }
      }

      if (studentData.data()?.secondContact?.length > 0 && studentData.data()?.secondNumberContact?.length === 9) {
        console.log('entramos al segundo contacto')

        try {
          axios
            .post(`${URL_API}/message`,
              {
                // phoneNumber: `51${studentData.data().secondNumberContact}@c.us`,
                phoneNumber: `51982752688@c.us`,
                message: `Sr.(a). ${studentData.data().secondContact}, el estudiante ${studentData.data().name} ${studentData.data().lastname}, acaba de ingresar al colegio a las ${dateConvertObjectStudent(new Date())}.`
              })
        } catch (error) {
          console.log('error', error)
        }
      }
      dispatch({ type: AttendanceRegister.ATTENDANCE_REGISTER, payload: Data.slice(0,5) })
      dispatch({ type: AttendanceRegister.LOADING_GET_STUDENTS, payload: false })
    }

  }
  return { getStudentData, studentArrivalTime }
}

