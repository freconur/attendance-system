import { app } from "@/firebase/firebaseConfig";
import { OrderByDirection, QuerySnapshot, Timestamp, addDoc, collection, deleteDoc, doc, endAt, endBefore, getDoc, getDocs, getFirestore, increment, limit, onSnapshot, orderBy, query, setDoc, startAfter, updateDoc, where } from "firebase/firestore";
import { useGlobalContext, useGlobalContextDispatch } from "../context/GlobalContext";
import { AttendanceRegister } from "../actions/actionAttendance";
import { currentDate, currentMonth, currentYear, dateConvertObject, dateConvertObjectStudent, hoursUnixDate } from "@/dates/date";
import { Employee, StudentData, UserData } from "../types/types";
import axios from 'axios'
import { attendanceDepartureTime, attendanceState } from "@/utils/attendanceState";
const db = getFirestore(app)



const URL_API = "https://whatsapp-asistencia-production.up.railway.app"


export const useMensajeria = () => {
  const dispatch = useGlobalContextDispatch()
  const { showModalConfirmationSendMessageWhatsapp } = useGlobalContext()
  const mensajeriaEmpleados = async (sendMessageWhatsappLoader: boolean, valuesEmplooyes: string[], userData: UserData, message: string) => {

    dispatch({ type: AttendanceRegister.LOADER_SENDMESSAGEWHATSAPP, payload: !sendMessageWhatsappLoader })
    //primero necesito traerme la relacion de todos los empleados

    console.log('valuesEmplooyes', valuesEmplooyes)

    if (valuesEmplooyes) {
      // const newPromise = new Promise((resolve, reject) => {
      const newPromise = new Promise<boolean>((resolve, reject) => {
        // setTimeout(() => { 
        //   resolve(true)
          
        // }, 10000)
        try {
          valuesEmplooyes.forEach(async value => {
              if (Number(value) === 1) {
                const collectionRef = collection(db, `/intituciones/${userData.idInstitution}/employee`)
                const querySnapshot = await getDocs(collectionRef)
                const employeeArray: Employee[] = []
                querySnapshot?.forEach((doc) => {
                  employeeArray.push(doc.data())
                });
                if (employeeArray) {
                  // console.log('employeeArray', employeeArray)
                  //esta promesa cargara el loader hasta que se termine de enviar los mensajes a todos los usuarios
                  const newPromise = new Promise((resolve, reject) => {
                    try {
                      employeeArray.forEach(emplooye => {
                        if (emplooye.numberPhone) {
                          try {
                            axios
                              .post(`${URL_API}/v1/messages`,
                                {
                                  number: `51${emplooye.numberPhone}`,
                                  message: `*De*: ${userData.name?.toUpperCase()} ${userData.lastname?.toUpperCase()}
                  *Institucion:* ${userData.institutionName}                      
                  *Mensaje*: ${message}`
                                })
                          } catch (error) {
                            console.log('error', error)
                          }
                        }
                      })
                      resolve(true)
                      // dispatch({type:AttendanceRegister.LOADER_SENDMESSAGEWHATSAPP, payload: false})
                      // confirmationSendMessageWhatsapp(showModalConfirmationSendMessageWhatsapp)
                    } catch (error) {
                      console.log('error', error)
                      reject(error)
                    }
                  })
                  console.log('newPromise', newPromise)
                }
              }

              if (Number(value) === 5) {
                const collectionRef = collection(db, `/intituciones/${userData.idInstitution}/students`)
                const querySnapshot = await getDocs(collectionRef)
                const studentsArray: StudentData[] = []

                querySnapshot?.forEach((doc) => {
                  studentsArray.push(doc.data())
                });
                //validacion de cada array

                if (studentsArray) {
                  studentsArray.forEach(student => {
                    try {
                      if (student.firstNumberContact) {
                        axios
                          .post(`${URL_API}/v1/messages`,
                            {
                              number: `51${student.firstNumberContact}`,
                              message: `*De*: ${userData.name?.toUpperCase()} ${userData.lastname?.toUpperCase()}
            *Institucion:* ${userData.institutionName}                      
            *Mensaje*: ${message}`
                            })
                      }
                      if (student.secondNumberContact) {
                        axios
                          .post(`${URL_API}/v1/messages`,
                            {
                              number: `51${student.secondNumberContact}`,
                              message: `*De*: ${userData.name?.toUpperCase()} ${userData.lastname?.toUpperCase()}
            *Institucion:* ${userData.institutionName}                      
            *Mensaje*: ${message}`
                            })
                      }
                    } catch (error) {
                      console.log('error', error)
                    }
                  })
                }
              }

          })
          //asqui aun se debe de hacer algunos ajuste al time de loader, se cierra de inmediato o asi parece, queda pendiente revisar.
          return resolve(true)
          // dispatch({type:AttendanceRegister.LOADER_SENDMESSAGEWHATSAPP, payload: false})
          // confirmationSendMessageWhatsapp(showModalConfirmationSendMessageWhatsapp)
        } catch (error) {
          reject(error)
          console.log('error', error)
        }

      })
      console.log('newPromise', newPromise)
      newPromise.then(rta => {
        console.log('rta', rta)
        if (rta === true) {
          dispatch({ type: AttendanceRegister.LOADER_SENDMESSAGEWHATSAPP, payload: false })
          confirmationSendMessageWhatsapp(showModalConfirmationSendMessageWhatsapp)
        }
      })

      // valuesEmplooyes.forEach(async value => {

      //   if (Number(value) === 5) {
      //     const collectionRef = collection(db, `/intituciones/${userData.idInstitution}/students`)
      //     const querySnapshot = await getDocs(collectionRef)
      //     const employeeArray: Employee[] = []
      //     querySnapshot?.forEach((doc) => {
      //       employeeArray.push(doc.data())
      //     });
      //     if (employeeArray) {
      //       // console.log('employeeArray', employeeArray)
      //       //esta promesa cargara el loader hasta que se termine de enviar los mensajes a todos los usuarios
      //       const newPromise = new Promise((resolve, reject) => {
      //         try {
      //           employeeArray.forEach(emplooye => {
      //             if (emplooye.numberPhone) {
      //               try {
      //                 axios
      //                   .post(`${URL_API}/v1/messages`,
      //                     {
      //                       number: `51${emplooye.numberPhone}`,
      //                       message: `*De*: ${userData.name?.toUpperCase()} ${userData.lastname?.toUpperCase()}
      //     *Institucion:* ${userData.institutionName}                      
      //     *Mensaje*: ${message}`
      //                     })
      //               } catch (error) {
      //                 console.log('error', error)
      //               }
      //             }
      //           })
      //           resolve(true)
      //           dispatch({ type: AttendanceRegister.LOADER_SENDMESSAGEWHATSAPP, payload: false })
      //           confirmationSendMessageWhatsapp(showModalConfirmationSendMessageWhatsapp)
      //         } catch (error) {
      //           console.log('error', error)
      //           reject(error)
      //         }
      //       })
      //       console.log('newPromise', newPromise)
      //     }
      //   }

      // })
    }
  }

  const confirmationSendMessageWhatsapp = (value: boolean) => {
    dispatch({ type: AttendanceRegister.SHOW_MODAL_CONFIRMATION_SENDMESSAGEWHATSAPP, payload: !value })
  }
  return { mensajeriaEmpleados, confirmationSendMessageWhatsapp }
}
