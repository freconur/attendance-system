import { app } from "@/firebase/firebaseConfig";
import { OrderByDirection, QuerySnapshot, Timestamp, addDoc, collection, deleteDoc, doc, endAt, endBefore, getDoc, getDocs, getFirestore, increment, limit, onSnapshot, orderBy, query, setDoc, startAfter, updateDoc, where } from "firebase/firestore";
import { useGlobalContextDispatch } from "../context/GlobalContext";
import { AttendanceRegister } from "../actions/actionAttendance";
import { currentDate, currentMonth, currentYear } from "@/dates/date";
import { StudentData } from "../types/types";
import axios from 'axios'
const db = getFirestore(app)
const URL_API = "https://whatsapp-api-production-da60.up.railway.app"
export const useAttendance = () => {
  const dispatch = useGlobalContextDispatch()


  const studentArrivalTime = async (studentCode: string) => {
    const arrivalTimeRef = doc(db, `/attendance-student/${studentCode}/${currentYear()}/${currentMonth()}/${currentMonth()}/${currentDate()}`)
    await setDoc(arrivalTimeRef, { arrivalTime: new Date() })
  }

  const getStudentData = async (studentCode: string, Data: StudentData[]) => {
    console.log('Data', Data)
    const refData = doc(db, "students", studentCode as string)
    const studentData = await getDoc(refData)
    console.log('studentData', studentData.data())
    if (studentData.exists()) {
      console.log('numberPhone', `51${studentData.data().numberFather}@c.us`)
      studentArrivalTime(studentCode)
      // const studentsData:StudentData[] = Data
      Data?.unshift(studentData.data())
      // POST DE ENVIO DE WHATYSAPP AL NUMERO DEL PADRE DE FAMILIA
      if(studentData.data().numberFather) {
        'use server'
        try {
          axios
            .post(`/api/whatsapp`,
            // .post(`${URL_API}/message`,
              {
                phoneNumber: `51${studentData.data().numberFather}@c.us`,
                message: `sr. ${studentData.data().nameFather}, el estudiante ${studentData.data().name} ${studentData.data().lastname}, acaba de ingresar al colegio a las 7 am.`
              })
        } catch (error) {
          console.log('error', error)
        }
      }
      if(studentData.data().numberMother) {
        try {
          axios
            .post(`${URL_API}/message`,
              {
                phoneNumber: `51${studentData.data().numberMother}@c.us`,
                message: `sra. ${studentData.data().nameMother}, el estudiante ${studentData.data().name} ${studentData.data().lastname}, acaba de ingresar al colegio a las 7 am.`
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

