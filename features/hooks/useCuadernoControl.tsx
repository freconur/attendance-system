import { app } from "@/firebase/firebaseConfig";
import { OrderByDirection, QuerySnapshot, Timestamp, addDoc, collection, deleteDoc, doc, endAt, endBefore, getDoc, getDocs, getFirestore, increment, limit, onSnapshot, query, setDoc, startAfter, updateDoc, where, orderBy } from "firebase/firestore";
import { useGlobalContext, useGlobalContextDispatch } from "../context/GlobalContext";
import { AttendanceRegister } from "../actions/actionAttendance";
import { CuadernoControl, CuadernoControlCheckbox, Employee, Grades, StudentData, UserData } from "../types/types";
import axios from 'axios'
import { currentDate, currentMonth, currentYear, monthToString } from "@/dates/date";
import { TbTruckReturn } from "react-icons/tb";
const db = getFirestore(app)

export const useCuadernoControl = () => {
  const URL_API = "https://whatsapp-asistencia-production.up.railway.app"
  const { userData, showModalConfirmationCuadernoControl } = useGlobalContext()
  const dispatch = useGlobalContextDispatch()

  const verCuadernoControl = async (grado: string, fecha: string, mes: string, ano: string) => {
    console.log('grado:', grado, 'fecha:', fecha, 'mes:', mes, 'ano:', ano,)
    console.log(`/intituciones/l2MjRJSZU2K6Qdyc3lUz/cuaderno-control/${grado}/${grado}/${monthToString(Number(mes))}-${ano}/${fecha}`)
    const docRef = collection(db, `/intituciones/l2MjRJSZU2K6Qdyc3lUz/cuaderno-control/${grado}/${grado}/${monthToString(Number(mes))}-${ano}/${fecha}`)
    const data: CuadernoControl[] = []
    const getAllCuadernoControl = await getDocs(docRef)
    getAllCuadernoControl.forEach(doc => {
      data.push({ ...doc.data() })
    })
    dispatch({ type: AttendanceRegister.GET_ALL_CUADERNOCONTROL, payload: data })
  }

  const handleShowModalConfirmationCuadernoControl = (booelan: boolean) => {
    dispatch({ type: AttendanceRegister.SHOW_CONFIRMATION_CUADERNOCONTROL, payload: !booelan })
  }
  const sendNotificationCuadernoControl = (checkboxGrades: CuadernoControlCheckbox) => {
    //por ahora solo se va tener habilitado para alumnos de secundaria 
    if (Number(checkboxGrades.nivel) === 2) {
      // debe estar sincronizado para poder funcionar con el chatbot divi
      //entonces envio el mensaje a todos los estudiantes primaria
    }

  }
  const getGradesPrimaria = async () => {
    const docRef = (collection(db, `/intituciones/${userData?.idInstitution}/grades`));
    const q = query(docRef, where("nivel", "==", 1), orderBy("grade", "asc"));
    // const q = query(docRef, where("nivel", "==", 2));
    const docSnap = await getDocs(q)
    const grades: Grades[] = []
    docSnap.forEach((doc) => {
      grades.push({ ...doc.data(), checked: false })
    })
    dispatch({ type: AttendanceRegister.GRADES_PRIMARIA, payload: grades })
  }
  const getGradesSecundaria = async () => {

    // const citiesRef = collection(db, "cities");

    // Create a query against the collection.
    // const q = query(citiesRef, where("state", "==", "CA"));

    const docRef = (collection(db, `/intituciones/${userData?.idInstitution}/grades`));
    const q = query(docRef, where("nivel", "==", 2), orderBy("grade", "asc"));
    // const q = query(docRef, where("nivel", "==", 2));
    const docSnap = await getDocs(q)
    const grades: Grades[] = []
    docSnap.forEach((doc) => {
      grades.push(doc.data())
    })
    dispatch({ type: AttendanceRegister.GRADES_SECUNDARIA, payload: grades })
  }


  const nuevaNotificacionCuadernoControl = async (selectedItems: string[], messagesWhatsapp: CuadernoControl) => {

    //necesito colocar un loader basado en una promesa
    //esperar que el foreach termine para poder enviar o finalizar la tarea del loader
    // let arrayData:UserData[] = []
    let arrayData: string[] = []
    dispatch({ type: AttendanceRegister.LOADER_SENDMESSAGEWHATSAPP, payload: true })


    const newPromise = new Promise<boolean>((resolve, reject) => {
      try {
        selectedItems.forEach(async item => {
          const dataRef = collection(db, `/intituciones/${userData?.idInstitution}/cuaderno-control/${Number(item)}/${Number(item)}/${currentMonth()}-${currentYear()}/${currentDate()}`)
          await addDoc(dataRef, {
            subject: messagesWhatsapp.subject,
            message: messagesWhatsapp.message
            // fechaDeEntrega: `${startDate.date}/${startDate.month + 1}/${startDate.year}`
          })

          const studentsRef = collection(db, `/intituciones/${userData?.idInstitution}/students/`)
          const q = query(studentsRef, where("grade", "==", item))

          const querySnapshot = await getDocs(q)
          querySnapshot.forEach(doc => {
            doc.data().firstNumberContact.length === 9 && arrayData.push(doc.data().firstNumberContact)
            doc.data().secondNumberContact.length === 9 && arrayData.push(doc.data().secondNumberContact)

          })
          resolve(true)
          console.log('arrayData', arrayData)
        })
      } catch (error) {
        console.log('error', error)
        reject(error)
      }
    })

    newPromise.then(rta => {
      if (rta === true) {
        console.log('primero')


        const promiseArrayNumberPhone = new Promise<boolean>((resolve, reject) => {
          try {
            console.log('promesa de array numeros movil')
            arrayData?.forEach(numberPhone => {
              try {
                axios
                  .post(`${URL_API}/v1/messages`,
                    {
                      number: `51${numberPhone}`,
                      message: `tienes nuevas nofiticaciones en cuaderno de control, `
                      // message: `I.E.P. Divino Maestro: este es un mensaje de prueba para aplicacion de registro de asistencia.`
                    }
                  )
              } catch (error) {
                console.log('error', error)
              }
            })
            resolve(true)
          } catch (error) {
            console.log('error array phonenumber:', error)
            reject(false)
          }
        })
        promiseArrayNumberPhone.then((response) => {
          if (response === true) {
            dispatch({ type: AttendanceRegister.LOADER_SENDMESSAGEWHATSAPP, payload: false })
            handleShowModalConfirmationCuadernoControl(showModalConfirmationCuadernoControl)
          }
        })


      }
    })
  }
  return { sendNotificationCuadernoControl, nuevaNotificacionCuadernoControl, getGradesSecundaria, getGradesPrimaria, handleShowModalConfirmationCuadernoControl, verCuadernoControl }
}