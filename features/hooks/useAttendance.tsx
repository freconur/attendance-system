'use client'
import { app } from "@/firebase/firebaseConfig";
import { OrderByDirection, QuerySnapshot, Timestamp, addDoc, collection, deleteDoc, doc, endAt, endBefore, getDoc, getDocs, getFirestore, increment, limit, onSnapshot, orderBy, query, setDoc, startAfter, updateDoc, where } from "firebase/firestore";
import { useGlobalContext, useGlobalContextDispatch } from "../context/GlobalContext";
import { AttendanceRegister } from "../actions/actionAttendance";
import { currentDate, currentMonth, currentYear, dateConvertObject, dateConvertObjectStudent, hoursUnixDate } from "@/dates/date";
import { StudentData } from "../types/types";
import axios from 'axios'
const db = getFirestore(app)
const URL_API = "https://whatsapp-api-production-da60.up.railway.app"
export const useAttendance = () => {
  const dispatch = useGlobalContextDispatch()
  const { userData } = useGlobalContext()

  const studentArrivalTime = async (studentCode: string) => {
    const arrivalTimeRef = doc(db, `/intituciones/${userData.idInstitution}/attendance-student/${studentCode}/${currentYear()}/${currentMonth()}/${currentMonth()}/${currentDate()}`)
    await setDoc(arrivalTimeRef, { arrivalTime: new Date() , manualAttendance:true})
  }

  const getStudentData = async (studentCode: string, Data: StudentData[]) => {
    const refData = doc(db, `/intituciones/${userData.idInstitution}/students`, studentCode as string)
    const studentData = await getDoc(refData)
    if (studentData.exists()) {
      studentArrivalTime(studentCode)
      Data?.unshift(studentData.data())
      // POST DE ENVIO DE WHATYSAPP AL NUMERO DEL PADRE DE FAMILIA
      if (studentData.data().numberFather) {
        try {
          axios
            // .post(`/api/whatsapp`,
              .post(`${URL_API}/message`,
              {
                phoneNumber: `51${studentData.data().numberFather}@c.us`,
                message: `sr. ${studentData.data().nameFather}, el estudiante ${studentData.data().name} ${studentData.data().lastname}, acaba de ingresar al colegio a las ${dateConvertObjectStudent(new Date())}.`
              })
        } catch (error) {
          console.log('error', error)
        }
      }

      if (studentData.data().numberMother) {
        try {
          axios
            .post(`${URL_API}/message`,
              {
                phoneNumber: `51${studentData.data().numberMother}@c.us`,
                message: `sra. ${studentData.data().nameMother}, el estudiante ${studentData.data().name} ${studentData.data().lastname}, acaba de ingresar al colegio a las ${dateConvertObjectStudent(new Date())}.`
              })
        } catch (error) {
          console.log('error', error)
        }
      }
      dispatch({ type: AttendanceRegister.ATTENDANCE_REGISTER, payload: Data })
    }

  }
  return { getStudentData, studentArrivalTime }
}

