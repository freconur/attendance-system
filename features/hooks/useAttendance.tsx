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
    dispatch({type:AttendanceRegister.LOADING_GET_STUDENTS, payload:true})
    const refData = doc(db, `/intituciones/${userData.idInstitution}/students`, studentCode as string)
    const studentData = await getDoc(refData)
    if (studentData.exists()) {//primero verifico si la data existe
      studentArrivalTime(studentCode)
      Data?.unshift(studentData.data())
      console.log(studentData.data())
      // POST DE ENVIO DE WHATYSAPP AL NUMERO DEL PADRE DE FAMILIA
      if (studentData.data().firstContact) {
        console.log('entramos al primer contacto')
        console.log('studentData.data().firstContact', studentData.data().firstContact)
        console.log('studentData.data().firstContact', studentData.data().firstNumberContact)
        try {
          axios
            // .post(`/api/whatsapp`,
            .post(`${URL_API}/message`,
              {
                phoneNumber: `51${studentData.data().firstNumberContact}@c.us`,
                message: `Sr.(a) ${studentData.data().firstContact}, el estudiante ${studentData.data().name} ${studentData.data().lastname}, acaba de ingresar al colegio a las ${dateConvertObjectStudent(new Date())}.`
              })
        } catch (error) {
          console.log('error', error)
        }
      }

      if (studentData.data()?.secondContact?.length > 0) {
        console.log('entramos al segundo contacto')

        // try {
        //   axios
        //     .post(`${URL_API}/message`,
        //       {
        //         phoneNumber: `51${studentData.data().secondNumberContact}@c.us`,
        //         message: `Sr.(a). ${studentData.data().secondContact}, el estudiante ${studentData.data().name} ${studentData.data().lastname}, acaba de ingresar al colegio a las ${dateConvertObjectStudent(new Date())}.`
        //       })
        // } catch (error) {
        //   console.log('error', error)
        // }
      }
      dispatch({ type: AttendanceRegister.ATTENDANCE_REGISTER, payload: Data })
      dispatch({type:AttendanceRegister.LOADING_GET_STUDENTS, payload:false})
    }

  }
  return { getStudentData, studentArrivalTime }
}

