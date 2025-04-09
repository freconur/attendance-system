import { useGlobalContext, useGlobalContextDispatch } from '../context/GlobalContext'
import { app } from '@/firebase/firebaseConfig'
import { collection, deleteDoc, doc, getDocs, getFirestore, orderBy, query, setDoc, updateDoc } from 'firebase/firestore'
import { Grades, Section, StudentData, UserData } from '../types/types'
import { AttendanceRegister } from '../actions/actionAttendance'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { currentYear } from '@/dates/date'
import { toast } from 'react-toastify';
import { useRouter } from 'next/router'
import axios from 'axios'
const UseRegisterStudents = () => {
  const db = getFirestore(app)
  const { userData } = useGlobalContext()
  const storage = getStorage()
  const dispatch = useGlobalContextDispatch()
  const router = useRouter()
  const URL_API = "https://whatsapp-asistencia-production.up.railway.app";
  const registerNewStudent = async (dataFromStudent: StudentData, pictureProfileUrl: string) => {
    console.log('dataFromStudent', dataFromStudent)

    const data = {
      dni: dataFromStudent.dni,
      grade: dataFromStudent.grade,
      firstname: dataFromStudent.firstname?.toLowerCase(),
      lastname: dataFromStudent.lastname?.toLowerCase(),
      name: dataFromStudent.name?.toLowerCase(),
      firstContact: dataFromStudent.firstContact?.toLowerCase(),
      firstNumberContact: dataFromStudent.firstNumberContact,
      secondContact: dataFromStudent.secondContact !== undefined ? dataFromStudent.secondContact?.toLowerCase() : "",
      secondNumberContact: dataFromStudent.secondNumberContact !== undefined ? dataFromStudent.secondNumberContact : "",
      section: dataFromStudent.section !== undefined ? dataFromStudent.section : "",
    }
    if (pictureProfileUrl.length > 0) {
      console.log('con picture profile')
      await setDoc(doc(db, `/intituciones/${userData.idInstitution}/students`, `${dataFromStudent.dni}`), { ...dataFromStudent, pictureProfile: pictureProfileUrl });

    } else {
      await setDoc(doc(db, `/intituciones/${userData.idInstitution}/students`, `${data.dni}`), data);
    }
  }
  const getGrades = async () => {
    const docRef = (collection(db, `/intituciones/${userData?.idInstitution}/grades`));
    const q = query(docRef, orderBy("grade"));
    const docSnap = await getDocs(q)
    const grades: Grades[] = []
    docSnap.forEach((doc) => {
      grades.push(doc.data())
    })
    dispatch({ type: AttendanceRegister.GRADES, payload: grades })
  }

  const getSections = async () => {
    if (userData) {
      const docRef = collection(db, `/intituciones/${userData?.idInstitution}/sections`);
      const q = query(docRef, orderBy("section"))
      const docSnap = await getDocs(q)

      const sections: Section[] = []
      docSnap.forEach((doc) => {
        sections.push(doc.data())
      });
      dispatch({ type: AttendanceRegister.SECTIONS, payload: sections })
    }
  }

  const sendPictureProfile = async (archivoLocal: any) => {
    console.log('archivoLocal', archivoLocal)
    if (archivoLocal?.name) {
      const filesRef = ref(storage, `${currentYear()}/${archivoLocal.name}`);
      await uploadBytes(filesRef, archivoLocal);
      //obtener url de descarga
      const pictureProfileUrl = await getDownloadURL(filesRef)
      console.log(pictureProfileUrl)
      if (pictureProfileUrl) dispatch({ type: AttendanceRegister.PICTURE_PROFILE_URL, payload: pictureProfileUrl })
    }
  }

  const updateStudentData = (value: boolean) => {
    dispatch({ type: AttendanceRegister.UPDATE_STUDENT_CONFIRMATION_MODAL, payload: !value })
  }

  const updateStudent = async (data: StudentData) => {
    const studentRef = doc(db, `/intituciones/${userData?.idInstitution}/students`, data.dni as string);

    // Set the "capital" field of the city 'DC'
    const dataStudent = {
      dni: data.dni,
      name: data.name,
      lastname: data.lastname,
      firstname: data.firstname,
      firstContact: data.firstContact,
      secondContact: data.secondContact,
      firstNumberContact: data.firstNumberContact,
      secondNumberContact: data.secondNumberContact,
      grade: data.grade,
    }
    await updateDoc(studentRef, dataStudent);
  }


  const deleteEstudiante = async (idEstudiante: string) => {
    await deleteDoc(doc(db, `/intituciones/${userData?.idInstitution}/students`, `${idEstudiante}`));


    const newPromise = new Promise<boolean>(async (resolve, reject) => {
      try {
        await deleteDoc(doc(db, `/intituciones/${userData?.idInstitution}/students`, `${idEstudiante}`))
          .then(res => {
            resolve(true)
          })
      } catch (error) {
        console.log('error', error)
        reject(false)
      }
    })

    toast.promise(newPromise,
      {
        pending: 'borrando estudiante',
        success: 'Se ha borrado estudiante con exito 👌',
        error: 'Parece que algo fallo, intentalo despues 🤯'
      })
      .then(res => {
        router.push('/administracion/estudiantes/registros-de-asistencias')
      })
  }

  const falsearTodosEstudiantes = async () => {
    const estudiantesRef = collection(db, `/intituciones/${userData.idInstitution}/students`)
    let size = 0
    const promiseConvertFalse = new Promise<string[]>(async (resolve, reject) => {
      try {
        await getDocs(estudiantesRef)
          .then((rta) => {
            const arrayDniEstudiante: string[] = []
            let index = 0
            rta.forEach((doc) => {
              index = index + 1
              if (doc.data().active === true) {
                arrayDniEstudiante.push(doc.data().dni)

              }
            });
            if (rta.size === index) {
              size = rta.size
              resolve(arrayDniEstudiante)
            }
          })
      } catch (error) {
        console.log(error)
        reject()
      }
    })


    // const promiseEstudiantesActivos = new Promise<boolean>((resolve, reject) => {
    promiseConvertFalse.then(dni => {
      // debugger
      // if(dni.length === size) {
      console.log('dni', dni.length)
      console.log('activos', dni.length)
      // debugger
      // dni?.forEach(async (d) => {
      //   console.log('d', d)
      //   // if (d === '00000001') {
      //     const estudianteRef = doc(db, `/intituciones/${userData.idInstitution}/students`, d)
      //     // Set the "capital" field of the city 'DC'
      //     await updateDoc(estudianteRef, {
      //       active: false
      //     });
      //   // }
      // })
      // }
    })
    // })
  }

  const actualizarEstudiantesActivos = (estudiantes: StudentData[]) => {

    estudiantes.forEach(async (estudiante) => {
      const estudianteRef = doc(db, `intituciones/${userData.idInstitution}/students`, `${estudiante.dni}`)
      // await updateDoc(estudianteRef, {
      //   active: true
      // });
      if (estudiante.active === true) {
        try {
          if (estudiante.firstNumberContact) {
            axios.post(`${URL_API}/v1/messages`, {
              number: `51${estudiante.firstNumberContact}`,
              message: `I.E.P. DIVINO MAESTRO: 
              Sr(a). *${estudiante.firstContact}* , Se ha habilitado la cuenta del estudiante *${estudiante.name} ${estudiante.lastname}* para el ingreso a la intranet, puedes ingresar a la intranet con el número de *DNI del ESTUDIANTE* ,ingresa a la plataforma en el siguiente link: https://www.tuescuelagestiona.online/aula-virtual?idInstitucion=l2MjRJSZU2K6Qdyc3lUz  `
            });
          }
          if (estudiante.secondNumberContact) {
            axios.post(`${URL_API}/v1/messages`, {
              number: `51${estudiante.secondNumberContact}`,
              message: `I.E.P. DIVINO MAESTRO: 
              Sr(a). *${estudiante.secondContact}* , Se ha habilitado la cuenta del estudiante *${estudiante.name} ${estudiante.lastname}* para el ingreso a la intranet, puedes ingresar a la intranet con el número de *DNI del ESTUDIANTE* ,ingresa a la plataforma en el siguiente link: https://www.tuescuelagestiona.online/aula-virtual?idInstitucion=l2MjRJSZU2K6Qdyc3lUz  `
            });
          }
        } catch (error) {
          console.log('error', error)
        }
      }
    })

  }
  return { actualizarEstudiantesActivos, falsearTodosEstudiantes, registerNewStudent, getSections, getGrades, sendPictureProfile, updateStudentData, updateStudent, deleteEstudiante }
}

export default UseRegisterStudents