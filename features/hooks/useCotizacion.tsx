import { useGlobalContext, useGlobalContextDispatch } from "../context/GlobalContext"
import { app } from "@/firebase/firebaseConfig"
import { OrderByDirection, QuerySnapshot, Timestamp, addDoc, collection, deleteDoc, doc, endAt, endBefore, getDoc, getDocs, getFirestore, increment, limit, onSnapshot, orderBy, query, setDoc, startAfter, updateDoc, where } from "firebase/firestore";
import axios from 'axios'
import { SendFormCotizacion } from "../types/types";
import { AttendanceRegister } from "../actions/actionAttendance";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const db = getFirestore(app)
const URL_API = "https://whatsapp-asistencia-production.up.railway.app"
export const useCotizacion = () => {
  const dispatch = useGlobalContextDispatch()

  const { } = useGlobalContext()

  const sendFormCotizacion = (data: SendFormCotizacion) => {

    dispatch({ type: AttendanceRegister.LOADER_COTIZACION, payload: true })
    console.log('cotizacion', data)
    //se colocara un loader para la experiencia de usuario
    if (data.numeroDeCelular?.length === 9) {
      const rtaPromise = new Promise((resolve, reject) => {
        try {

          axios.post(`${URL_API}/v1/messages`,
            {
              // phoneNumber: `51${studentData.data().firstNumberContact}@c.us`,
              number: `51${data.numeroDeCelular}`,
              // phoneNumber: `51982752688@c.us`,
              message: `El Sr.(a) ${data.nombres}, con el cargo de  ${data.cargo}, 'quiere una cotizacion para el colegio' ${data.nombreDeColegio} con un total de estudiantes de ${data.cantidadDeAlumnos}.`
              // message: `I.E.P. Divino Maestro: este es un mensaje de prueba para aplicacion de registro de asistencia.`
            }
          )
            .then(response => {
              console.log('response:', response)
              if (response.status === 200) {
                dispatch({ type: AttendanceRegister.LOADER_COTIZACION, payload: false })
                resolve(true)
              } else {
                reject(true)
              }
              //terminar el dispatch para el loader en el boolean debo colocar lo apuesto a la respuesta

            })

        } catch (error) {
          console.log("ocurrio un error", error)
          reject(error)
        }
      })

      toast.promise(rtaPromise,
        {
          pending: 'Enviando mensaje',
          success:'Se envió mensaje, te contactaremos lo mas pronto posible',
          error: ' Parece que hubo un error, intentalo denuevo'
        }
      )
    }
    //SE COMPLETO LA FEATURE DE ENVIO DE COTIZACION 
    //FALTA DAT DETALLES A LA UI DE LA PAGINA EN GENERAL
  }

  return {
    sendFormCotizacion
  }
}