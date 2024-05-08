import { app } from "@/firebase/firebaseConfig"
import { collection, doc, getDocs, getFirestore, orderBy, query, setDoc } from "firebase/firestore"
import { useGlobalContext, useGlobalContextDispatch } from "../context/GlobalContext"
import { Cursos, DateTarea, PicturesTareasArray, TareasPrev } from "../types/types"
import { AttendanceRegister } from "../actions/actionAttendance"
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage"
import { currentDate, currentMonth, currentYear } from "@/dates/date"







const useTareas = () => {
  const db = getFirestore(app)
  const storage = getStorage()
  const dispatch = useGlobalContextDispatch()
  const { userData } = useGlobalContext()
  const getCursos = async () => {
    const docRef = collection(db, `/intituciones/${userData?.idInstitution}/cursos`)
    const q = query(docRef, orderBy("name"))
    const docSnap = await getDocs(q)
    const cursos: Cursos[] = []
    docSnap.forEach((doc) => {
      cursos.push({ ...doc.data(), id: doc.id })
    })
    dispatch({ type: AttendanceRegister.GET_CURSOS, payload: cursos })
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

  const addNuevaTarea = async (nuevaTarea:TareasPrev,pictureTareas:PicturesTareasArray[],startDate:DateTarea) => {
    // const dataRef =doc(db, `/intituciones/${userData?.idInstitution}/tareas/${nuevaTarea.grade}/${nuevaTarea.grade}/${nuevaTarea.curso}/${currentMonth()}-${currentYear()}/`, currentDate())
    const dataRef = doc(db,`/intituciones/${userData?.idInstitution}/tareas/${nuevaTarea.grade}/${nuevaTarea.grade}/${currentMonth()}-${currentYear()}/${currentDate()}/${nuevaTarea.curso}`)
      await setDoc(dataRef, {
        observaciones:nuevaTarea.observaciones,
        pictures:pictureTareas,
        fechaDeEntrega:`${startDate.date}/${startDate.month + 1}/${startDate.year}`
      });
  }
  return {
    getCursos, sendPictureTareas, addNuevaTarea
  }
}

export default useTareas