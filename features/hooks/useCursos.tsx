'use client'
import { addDoc, collection, deleteDoc, doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import { useGlobalContext, useGlobalContextDispatch } from "../context/GlobalContext";
import { AttendanceRegister } from "../actions/actionAttendance";
import { CursoById } from "../types/types";
import { toast } from 'react-toastify';

const db = getFirestore()
export const useCursos = () => {
  const { userData } = useGlobalContext()
  const dispatch = useGlobalContextDispatch()

  const getCursoById = async (idCurso: string) => {
    console.log('idCurso', idCurso)
    console.log('userData', userData.idInstitution)
    console.log('userData', `intituciones/${userData.idInstitution}/cursos`)
    const docRef = doc(db, `intituciones/${userData.idInstitution}/cursos`, `${idCurso}`);
    await getDoc(docRef)
      .then(res => {
        console.log('data', res.data())
        if (res.exists()) {
          console.log('data2', res.data())

          dispatch({ type: AttendanceRegister.CURSO_BY_ID, payload: res.data() })
        }
      })
  }

  const updateCursoById = async (curso: CursoById) => {

    const newPromise = new Promise<boolean>(async (resolve, reject) => {
      try {
        dispatch({ type: AttendanceRegister.LOADER_AULA_VIRTUAL, payload: true })
        const pathRef = doc(db, `intituciones/${userData.idInstitution}/cursos`, `${curso.id}`);

        await updateDoc(pathRef, {
          name: curso.name
        })
          .then(res => {
            dispatch({ type: AttendanceRegister.LOADER_AULA_VIRTUAL, payload: false })
            resolve(true)
          })
      } catch (error) {
        console.log('error', error)
        reject()
      }
    })
    toast.promise(newPromise,
      {
        pending: 'actualizando curso',
        success: 'Se ha actualizado curso con exito 👌',
        error: 'Parece que algo fallo, intentalo despues 🤯'
      })
  }
  const cleanCursoById = () => {
    dispatch({ type: AttendanceRegister.CURSO_BY_ID, payload: {} })
  }

  const deleteCursoById = async (idCurso: string) => {
    console.log('idCurso', idCurso)

    const newPromise = new Promise<boolean>(async (resolve, reject) => {
      try {
        dispatch({ type: AttendanceRegister.LOADER_AULA_VIRTUAL, payload: true })
        await deleteDoc(doc(db, `intituciones/${userData.idInstitution}/cursos`, `${idCurso}`))
          .then(res => {
            dispatch({ type: AttendanceRegister.LOADER_AULA_VIRTUAL, payload: false })
            resolve(true)
          })
      } catch (error) {
        console.log('error', error)
        reject()
      }
    })
    toast.promise(newPromise,
      {
        pending: 'borrando curso',
        success: 'Se ha borrado curso con exito 👌',
        error: 'Parece que algo fallo, intentalo despues 🤯'
      })
  }

  const addCurso = async (curso: CursoById) => {

    const newPromise = new Promise<boolean>(async (resolve, reject) => {
      try {
        await addDoc(collection(db, `intituciones/${userData.idInstitution}/cursos`), {
          name: curso.name,
        })
          .then(res => resolve(true))
      } catch (error) {
        console.log('error', error)
        reject()
      }
    })
    // await addDoc(collection(db, `intituciones/${userData.idInstitution}/cursos`), {
    //   name: curso.name,
    // })
    toast.promise(newPromise,
      {
        pending: 'Creando curso',
        success: 'Se ha creado curso con exito 👌',
        error: 'Parece que algo fallo, intentalo despues 🤯'
      })
  }
  return {
    getCursoById,
    updateCursoById,
    cleanCursoById,
    deleteCursoById,
    addCurso
  }
}