import { app } from "@/firebase/firebaseConfig"
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage"
import { useGlobalContext, useGlobalContextDispatch } from "../context/GlobalContext"
import { addDoc, collection, doc, getDocs, getFirestore, onSnapshot, query, where } from "firebase/firestore"
import { currentDate, currentMonth, currentYear, monthToString } from "@/dates/date"
import { AulaVirtual } from "../types/types"
import { AttendanceRegister } from "../actions/actionAttendance"





export const useUploadFiles = () => {

  const storage = getStorage(app)
  const db = getFirestore(app)

  const { userData } = useGlobalContext()
  const dispatch = useGlobalContextDispatch()


  const getFilesPorFecha = async (fecha: number, mes: number) => {
    dispatch({ type: AttendanceRegister.LOADER_AULA_VIRTUAL, payload: true })
    const pathRef = collection(db, `/intituciones/${userData.idInstitution}/aula-virtual/${currentYear()}/${monthToString(Number(mes))}-${fecha}`)
    const archivosSubidos: AulaVirtual[] = []
    const q = query(pathRef, where("idProfesor", "==", `${userData.dni}`))
    await getDocs(q)
      .then(res => {
        if (res.size === 0) {
          dispatch({ type: AttendanceRegister.LOADER_AULA_VIRTUAL, payload: false })
          dispatch({ type: AttendanceRegister.ARCHIVOS_AULA_VIRTUAL, payload: [] })
        } else {
          res.forEach(doc => archivosSubidos.push({ ...doc.data(), id: doc.id }))
          console.log('archivosSubidos', archivosSubidos)
          dispatch({ type: AttendanceRegister.LOADER_AULA_VIRTUAL, payload: false })
          dispatch({ type: AttendanceRegister.ARCHIVOS_AULA_VIRTUAL, payload: archivosSubidos })
        }
      })
  }

  const uploadFiles = async (data: any, grado: string, curso: string) => {
    dispatch({ type: AttendanceRegister.LOADER_UPLOAD, payload: true })
    const archivoRef = ref(
      storage,
      `/2024/testing/${data.name}`
    );

    await uploadBytes(archivoRef, data)
      .then(async res => {
        console.log('res', res)
        await getDownloadURL(archivoRef)
          .then(async url => {
            console.log('userData', userData)
            const refFilesAulaVirtual = `/intituciones/${userData.idInstitution}/aula-virtual/${currentYear()}/${currentMonth()}-${currentDate()}`

            await addDoc(collection(db, refFilesAulaVirtual), {
              url: url,
              nombreCurso: curso,
              nombreArchivo: data.name,
              idProfesor: userData.dni,
              grado: grado
            })
              .then(res => dispatch({ type: AttendanceRegister.LOADER_UPLOAD, payload: false }))
            console.log('resultado de la url', res)
          })
      })
  }
  return {
    uploadFiles,
    getFilesPorFecha
  }
}