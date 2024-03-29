import { useGlobalContext, useGlobalContextDispatch } from '../context/GlobalContext'
import { app } from '@/firebase/firebaseConfig'
import { collection, doc, getDocs, getFirestore, orderBy, query, setDoc } from 'firebase/firestore'
import { Grades, Section, StudentData, UserData } from '../types/types'
import { AttendanceRegister } from '../actions/actionAttendance'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { currentYear } from '@/dates/date'

const UseRegisterStudents = () => {
  const db = getFirestore(app)
  const { userData } = useGlobalContext()
  const storage = getStorage()
  const dispatch = useGlobalContextDispatch()

  const registerNewStudent = async (dataFromStudent: StudentData, pictureProfileUrl: string) => {
    console.log('dataFromStudent', dataFromStudent)

    const data = {
      dni: dataFromStudent.dni,
      grade: dataFromStudent.grade,
      firstname:dataFromStudent.firstname,
      lastname: dataFromStudent.lastname,
      name: dataFromStudent.name,
      nameFather: dataFromStudent.nameFather,
      nameMother: dataFromStudent.nameMother,
      numberFather: dataFromStudent.numberFather,
      numberMother: dataFromStudent.numberMother,
      section: dataFromStudent.section !== undefined ? dataFromStudent.section : "",
    }
    console.log('data', data)
    if (pictureProfileUrl.length > 0) {
      console.log('con picture profile')
      await setDoc(doc(db, `/intituciones/${userData.idInstitution}/students`, `${dataFromStudent.dni}`), { ...dataFromStudent, pictureProfile: pictureProfileUrl });

    } else {
      console.log('sin foto de perfil')

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
  return { registerNewStudent, getSections, getGrades, sendPictureProfile }
}

export default UseRegisterStudents