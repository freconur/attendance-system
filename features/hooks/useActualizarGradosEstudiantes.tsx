import { collection, doc, getDocs, getFirestore, updateDoc } from "firebase/firestore"
import { useGlobalContextDispatch } from "../context/GlobalContext"
import { AttendanceRegister } from "../actions/actionAttendance"
import { StudentData } from "../types/types"


export const useActualizarGradosDeEstudiantes = () => {

  const db = getFirestore()
  const dispatch = useGlobalContextDispatch()
  const getAllEstudiantes = async () => {


    const pathRef = collection(db, `/intituciones/l2MjRJSZU2K6Qdyc3lUz/students/`)
    const estudiantes = await getDocs(pathRef)

    const arrayEstudiantes: StudentData[] = []
    estudiantes.forEach(doc => {
      arrayEstudiantes.push(doc.data())
    })

    dispatch({ type: AttendanceRegister.ALL_STUDENTS, payload: arrayEstudiantes })
  }

  const actualizarGradosDeEstudiantes = async (estudiantes: StudentData[]) => {
    // const estudianteRef = doc(db, `/intituciones/l2MjRJSZU2K6Qdyc3lUz/students/`, `12345678`);
    // await updateDoc(estudianteRef, {
    //   grade: 10
    // })

    estudiantes.forEach(async (estudiante) => {
      const estudianteRef = doc(db, `/intituciones/l2MjRJSZU2K6Qdyc3lUz/students/`, `${estudiante.dni}`);
      await updateDoc(estudianteRef, {
        grade: `${Number(estudiante.grade) + 1}`
      })
    })
  }

  return {
    getAllEstudiantes,
    actualizarGradosDeEstudiantes
  }
}