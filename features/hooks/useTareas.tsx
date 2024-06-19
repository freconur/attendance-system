import { app } from "@/firebase/firebaseConfig"
import { collection, doc, getDoc, getDocs, getFirestore, orderBy, query, setDoc } from "firebase/firestore"
import { useGlobalContext, useGlobalContextDispatch } from "../context/GlobalContext"
import { Cursos, DateTarea, PicturesTareasArray, TareasPrev, tareasPorDia } from "../types/types"
import { AttendanceRegister } from "../actions/actionAttendance"
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage"
import { currentDate, currentMonth, currentYear, monthToString } from "@/dates/date"







const useTareas = () => {
  const db = getFirestore(app)
  const storage = getStorage()
  const dispatch = useGlobalContextDispatch()
  const { userData } = useGlobalContext()

  const verTareas = async (grado:string, fecha:string, mes:string, ano:string) => {
    const docRef = collection(db, `/intituciones/l2MjRJSZU2K6Qdyc3lUz/tareas/${grado}/${grado}/${monthToString(Number(mes))}-${ano}/${fecha}`)
    const data: tareasPorDia[] = []
    const getAllDocRef = await getDocs(docRef)
    getAllDocRef.forEach(doc => {
      data.push({ ...doc.data(), id: doc.id })
    })
    dispatch({type:AttendanceRegister.GET_ALL_TAREAS, payload:data})
    console.log('data',data)
    // data.length > 1 ? console.log('data', data) : null

  }
  const getCursosDocente = async () => {
    const docRef = doc(db, `/intituciones/${userData?.idInstitution}/employee/`, `${userData.dni}`)

    const docDocente = await getDoc(docRef);
    // const q = query(docRef, orderBy("name"))
    // const docSnap = await getDocs(q)
    // const cursos: Cursos[] = []
    const cursosArray: string[] = []
    docDocente.data()?.cursos.forEach((doc: any) => {
      cursosArray.push(doc)
    })
    dispatch({ type: AttendanceRegister.GET_CURSOS, payload: cursosArray })
  }
  const sendPictureTareas = async (archivoLocal: any, pictureTareasArray: PicturesTareasArray[]) => {
    console.log('pictureTareasArray', pictureTareasArray)
    if (archivoLocal?.name) {
      const filesRef = ref(storage, `${currentYear()}/${archivoLocal.name}`);
      await uploadBytes(filesRef, archivoLocal);
      //obtener url de descarga
      // const pictureTareasArray:PicturesTareasArray[] = []
      const pictureProfileUrl = await getDownloadURL(filesRef)
      console.log(pictureProfileUrl)
      if (pictureProfileUrl) {
        pictureTareasArray.push({ url: pictureProfileUrl })
        console.log('pictureTareasArray', pictureTareasArray)
        dispatch({ type: AttendanceRegister.PICTURE_TAREAS, payload: pictureTareasArray })
      }
    }
  }

  const addNuevaTarea = async (nuevaTarea: TareasPrev, pictureTareas: PicturesTareasArray[], startDate: DateTarea) => {
    // const dataRef =doc(db, `/intituciones/${userData?.idInstitution}/tareas/${nuevaTarea.grade}/${nuevaTarea.grade}/${nuevaTarea.curso}/${currentMonth()}-${currentYear()}/`, currentDate())
    const dataRef = doc(db, `/intituciones/${userData?.idInstitution}/tareas/${nuevaTarea.grade}/${nuevaTarea.grade}/${currentMonth()}-${currentYear()}/${currentDate()}/${nuevaTarea.curso}`)
    await setDoc(dataRef, {
      observaciones: nuevaTarea.observaciones,
      pictures: pictureTareas,
      fechaDeEntrega: `${startDate.date}/${startDate.month + 1}/${startDate.year}`
    });
  }
  return {
    getCursosDocente, sendPictureTareas, addNuevaTarea, verTareas
  }
}

export default useTareas