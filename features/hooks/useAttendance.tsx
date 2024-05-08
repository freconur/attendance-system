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
// const URL_API = "https://whatsapp-api-production-2059.up.railway.app"
const URL_API = "https://chatbot-typescript-miguel-production.up.railway.app"

export const useAttendance = () => {
  const dispatch = useGlobalContextDispatch()
  const { userData } = useGlobalContext()


  const studentDepartureTime = async (studentCode: string, motivoSalida: string) => {
    const arrivalTimeRef = doc(db, `/intituciones/${userData.idInstitution}/attendance-student/${studentCode}/${currentYear()}/${currentMonth()}/${currentMonth()}/${currentDate()}`)
    const refData = doc(db, `/intituciones/${userData.idInstitution}/students`, studentCode as string)
    const studentData = await getDoc(refData)
    const currentlyHour = new Date()

    await setDoc(arrivalTimeRef, { departure: currentlyHour, manualAttendance: true }, { merge: true })
    if (studentData.exists()) {//primero verifico si la data existe
      studentArrivalTime(studentCode)
      // POST DE ENVIO DE WHATYSAPP AL NUMERO DEL PADRE DE FAMILIA
      if (studentData.data().firstContact?.length > 0 && studentData.data().firstNumberContact?.length === 9) {
        try {
          axios
            // .post(`/api/whatsapp`,
            .post(`${URL_API}/v1/messages`,
              {
                // phoneNumber: `51${studentData.data().firstNumberContact}@c.us`,
                number: `51${studentData.data().firstNumberContact}`,
                // phoneNumber: `51982752688@c.us`,
                message: `Sr.(a) ${studentData.data().firstContact}, el estudiante ${studentData.data().name} ${studentData.data().lastname} ${studentData.data().firstname}, 'acaba de retirar del colegio a las' ${dateConvertObjectStudent(currentlyHour)}. Motivo: ${motivoSalida}`
                // message: `I.E.P. Divino Maestro: este es un mensaje de prueba para aplicacion de registro de asistencia.`
              })
        } catch (error) {
          console.log('error', error)
        }
      }

      if (studentData.data()?.secondContact?.length > 0 && studentData.data()?.secondNumberContact?.length === 9) {
        console.log('entramos al segundo contacto')

        try {
          axios
            .post(`${URL_API}/v1/messages`,
              {
                // phoneNumber: `51${studentData.data().secondNumberContact}@c.us`,
                number: `51${studentData.data().secondNumberContact}`,
                // phoneNumber: `51982752688@c.us`,
                // message: `I.E.P. Divino Maestro: este es un mensaje de prueba para aplicacion de registro de asistencia.`
                message: `Sr.(a) ${studentData.data().secondContact}, el estudiante ${studentData.data().name} ${studentData.data().lastname} ${studentData.data().firstname}, 'acaba de retirar del colegio a las' ${dateConvertObjectStudent(currentlyHour)}. Motivo: ${motivoSalida}`
              })
        } catch (error) {
          console.log('error', error)
        }
      }
    }

  }

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

  const getStudentDepartureManual = async (studentCode: string) => {
    const refData = doc(db, `/intituciones/${userData.idInstitution}/students`, studentCode as string)
    const studentData = await getDoc(refData)
    const currentlyHour = new Date()
    if (studentData.exists()) {
      dispatch({ type: AttendanceRegister.STUDENT_FOR_DEPARTURE, payload: studentData.data() })
    }
    // if (studentData.exists()) {
    //   const arrivalTimeRef = doc(db, `/intituciones/${userData.idInstitution}/attendance-student/${studentCode}/${currentYear()}/${currentMonth()}/${currentMonth()}/${currentDate()}`)
    // }

  }
  const getStudentData = async (studentCode: string, Data: StudentData[]) => {
    dispatch({ type: AttendanceRegister.LOADING_GET_STUDENTS, payload: true })
    const refData = doc(db, `/intituciones/${userData.idInstitution}/students`, studentCode as string)
    const studentData = await getDoc(refData)
    const currentlyHour = new Date()

    const rta = () => {
      if (currentlyHour.getHours() === 12 || currentlyHour.getHours() === 13 || currentlyHour.getHours() === 14 || currentlyHour.getHours() === 15) {
        return true
      } else return false
    }
    console.log('rta', rta())
    if (studentData.exists()) {//primero verifico si la data existe
      studentArrivalTime(studentCode)
      Data?.unshift(studentData.data())
      // POST DE ENVIO DE WHATYSAPP AL NUMERO DEL PADRE DE FAMILIA
      if (studentData.data().firstContact?.length > 0 && studentData.data().firstNumberContact?.length === 9) {
        try {
          axios
            // .post(`/api/whatsapp`,
            .post(`${URL_API}/v1/messages`,
              {
                // phoneNumber: `51${studentData.data().firstNumberContact}@c.us`,
                number: `51${studentData.data().firstNumberContact}`,
                // phoneNumber: `51982752688@c.us`,
                message: `Sr.(a) ${studentData.data().firstContact}, el estudiante ${studentData.data().name} ${studentData.data().lastname}, ${rta() ? 'se retiro del colegio a las' : 'acaba de ingresar al colegio a las'} ${dateConvertObjectStudent(currentlyHour)}.`
                // message: `I.E.P. Divino Maestro: este es un mensaje de prueba para aplicacion de registro de asistencia.`
              })
        } catch (error) {
          console.log('error', error)
        }
      }

      if (studentData.data()?.secondContact?.length > 0 && studentData.data()?.secondNumberContact?.length === 9) {
        console.log('entramos al segundo contacto')

        try {
          axios
            .post(`${URL_API}/v1/messages`,
              {
                // phoneNumber: `51${studentData.data().secondNumberContact}@c.us`,
                number: `51${studentData.data().secondNumberContact}`,
                // message: `I.E.P. Divino Maestro: este es un mensaje de prueba para aplicacion de registro de asistencia.`
                message: `Sr.(a) ${studentData.data().secondContact}, el estudiante ${studentData.data().name} ${studentData.data().lastname}, ${rta() ? 'se retiro del colegio a las' : 'acaba de ingresar al colegio a las'} ${dateConvertObjectStudent(currentlyHour)}.`
              })
        } catch (error) {
          console.log('error', error)
        }
      }
      dispatch({ type: AttendanceRegister.ATTENDANCE_REGISTER, payload: Data.slice(0, 5) })
      dispatch({ type: AttendanceRegister.LOADING_GET_STUDENTS, payload: false })
    }
  }
  const activeDepartureManualModal = (value: boolean) => {
    dispatch({ type: AttendanceRegister.SHOW_DEPARTURE_MANUAL_MODAL, payload: !value })
  }
  const confirmationDepartureModal = (value: boolean) => {
    dispatch({ type: AttendanceRegister.CONFIRMATION_DEPARTURE_STUDENT_MODAL, payload: !value })
  }

  //////////////////////////////////////////////////ASISTENCIA DE TALLERES///////////////////////////////////////////////
  const attendanceArrivalStudentsTalleres = async (dni: string) => {
    dispatch({ type: AttendanceRegister.STUDENT_TALLER_LOADER, payload: true })
    const arrivalTimeRef = doc(db, `/intituciones/${userData.idInstitution}/attendance-student-talleres/${dni}/${currentYear()}/${currentMonth()}/${currentMonth()}/${currentDate()}`)

    const refData = doc(db, `/intituciones/${userData.idInstitution}/students`, `${dni}`)
    const currentHour = new Date()

    const studentData = await getDoc(refData)
    const studentAttendanceData = await getDoc(arrivalTimeRef)

    if (studentData.exists()) {
      console.log('existe el estudiante')
      if (studentAttendanceData.exists()) {
        if (studentAttendanceData.data().arrivalTime && studentAttendanceData.data().departureTime === undefined) {
          await setDoc(arrivalTimeRef, { departureTime: currentHour, manualAttendance: true }, { merge: true })
        } else if (studentAttendanceData.data().arrivalTime === undefined) {
          await setDoc(arrivalTimeRef, { arrivalTime: currentHour, manualAttendance: true })
          dispatch({ type: AttendanceRegister.STUDENT_TALLER_LOADER, payload: false })
        } else { console.log('no se hace nada') }
      } else {
        await setDoc(arrivalTimeRef, { arrivalTime: currentHour, manualAttendance: true })
      }
      dispatch({ type: AttendanceRegister.GET_STUDENT_TALLER, payload: studentData.data() })
      dispatch({ type: AttendanceRegister.STUDENT_TALLER_LOADER, payload: false })
    }else {
      dispatch({ type: AttendanceRegister.GET_STUDENT_TALLER, payload: {} })
      dispatch({ type: AttendanceRegister.STUDENT_TALLER_LOADER, payload: false })
      
    }
  }
  //////////////////////////////////////////////////ASISTENCIA DE TALLERES///////////////////////////////////////////////

  return { attendanceArrivalStudentsTalleres, getStudentData, studentArrivalTime, activeDepartureManualModal, getStudentDepartureManual, confirmationDepartureModal, studentDepartureTime }
}

