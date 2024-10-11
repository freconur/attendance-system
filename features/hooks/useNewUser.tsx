import { addDoc, collection, doc, getDocs, getFirestore, onSnapshot, query, setDoc, updateDoc, where } from "firebase/firestore";
import { AttendanceRegister } from "../actions/actionAttendance";
import { useGlobalContext, useGlobalContextDispatch } from "../context/GlobalContext"
import { app } from "@/firebase/firebaseConfig";
import { Curso, CreateUserData, Rol, UserData, UpdateDataUser } from "../types/types";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import axios from "axios";


const db = getFirestore(app)
export const useNewUser = () => {
  const dispatch = useGlobalContextDispatch()
  const { userData } = useGlobalContext()
  const URL_API = "https://whatsapp-asistencia-production.up.railway.app"
  const showNewUserModalValue = (value: boolean) => {
    dispatch({ type: AttendanceRegister.SHOW_CREATE_NEW_USER, payload: !value })
  }

  const getInstitution = async () => {
    const querySnapshot = collection(db, "intituciones");
    const q = await getDocs(querySnapshot)

    const instituciones: CreateUserData[] = []
    q.forEach((doc) => {
      instituciones.push({ ...doc.data(), id: doc.id })
      dispatch({ type: AttendanceRegister.INSTITUCIONES, payload: instituciones })

    })

  }
  const getRoles = (userData: UserData) => {
    if (userData) {
      const q = collection(db, `/intituciones/${userData.idInstitution}/roles/`);
      onSnapshot(q, (rolesArray) => {
        const roles: Rol[] = [];
        rolesArray.forEach((doc) => {
          roles.push(doc.data());
        });
        dispatch({ type: AttendanceRegister.GET_ROLES, payload: roles })
      });
    }
  }

  // const getCursos = (userData: UserData, employee:UpdateDataUser) => {
  const getCursos = (userData: UserData) => {
    if (userData) {
      const q = collection(db, `/intituciones/${userData.idInstitution}/cursos/`);
      onSnapshot(q, (cursos) => {
        const allCursos: Curso[] = [];
        cursos.forEach((doc) => {
          allCursos.push({ ...doc.data(), id: doc.id })
        });
        dispatch({ type: AttendanceRegister.GET_ALL_CURSOS, payload: allCursos })
      })
    }
  }

  const createNewUser = async (dataUser: UserData) => {
    // const name = dataUser.name?.replace(/\s/g, '')
    if (dataUser.extensionForUsers) {
      console.log('dataUser.extensionForUsers', dataUser?.extensionForUsers)
    }
    console.log('dataUser de creacion de usuario', dataUser)
    const email: string = `${dataUser.dni}@${dataUser.extensionForUsers}.com`
    const password: string = "contrasena"
    const auth = getAuth(app);
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in 
        const user = userCredential.user;

        // await setDoc(doc(db, "cities", "new-city-id"), data);
        await setDoc(doc(db, 'users', `${user.uid}`), {
          acc: `${dataUser.dni}@${dataUser.extensionForUsers}.com`,
          dni: `${dataUser.dni}`,
          name: `${dataUser.name}`,
          lastname: `${dataUser.lastname}`,
          firstname: `${dataUser.firstname}`,
          rol: Number(dataUser.rol),
          idInstitution: `${dataUser.idInstitution}`,
          extensionForUsers: `${dataUser.extensionForUsers}`,
          institutionName: `${dataUser.institutionName}`,
          celular: `${dataUser.celular}`
        })
        await setDoc(doc(db, `intituciones/${dataUser.idInstitution}/usuarios`, `${user.uid}`), {
          acc: `${dataUser.dni}@${dataUser.extensionForUsers}.com`,
          dni: `${dataUser.dni}`,
          name: `${dataUser.name}`,
          lastname: `${dataUser.lastname}`,
          firstname: `${dataUser.firstname}`,
          rol: Number(dataUser.rol),
          idInstitution: `${dataUser.idInstitution}`,
          extensionForUsers: `${dataUser.extensionForUsers}`,
          institutionName: `${dataUser.institutionName}`,
          celular: `${dataUser.celular}`
        });
        // tambien debo crear un documento de empleado con su dni como id en la coleccion de employee
        // pendiente crear la funcion de verificacion de ya existe el empleado a crear
        const q = query(collection(db, `intituciones/${dataUser.idInstitution}/employee`), where("dni", "==", dataUser.dni));

        const querySnapshot = await getDocs(q)

        console.log('querySnapshot', querySnapshot)
        if (querySnapshot.empty) {
          //agrega un nuevo empleado con lo datos del nuevo usuario si el usuariono existe
          await setDoc(doc(db, `intituciones/${dataUser.idInstitution}/employee`, `${dataUser.dni}`), {
            dni: `${dataUser.dni}`,
            name: `${dataUser.name}`,
            lastname: `${dataUser.lastname}`,
            firstname: `${dataUser.firstname}`,
            rol: Number(dataUser.rol),
            misCursos: [],
            numberPhone: `${dataUser.celular}`
          })
        } else {
          //actualiza los datos del empleado si esque el usuario que se ha creado ya existia como empleado
          await updateDoc(doc(db, `intituciones/${dataUser.idInstitution}/employee`, `${dataUser.dni}`), {
            numberPhone: `${dataUser.celular}`,
            name: `${dataUser.name}`,
            lastname: `${dataUser.lastname}`,
            firstname: `${dataUser.firstname}`,
            misCursos:[],
            rol: Number(dataUser.rol),
          });
        }
      })
      .then(response => {
        try {
          axios
            .post(`${URL_API}/v1/messages`,
              {
                number: `51${dataUser.celular}`,
                message: `Hola ${dataUser.name} ${dataUser.lastname} ${dataUser.firstname},tu cuenta se creo correctamente. usuario: ${dataUser.dni}@${dataUser.extensionForUsers}.com, contraseña:contrasena`
              })
        } catch (error) {
          console.log('error', error)
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log('errorCode', errorCode)
        console.log('errorMessage', errorMessage)
        // ..
      });
  }
  return {
    showNewUserModalValue, getRoles, getCursos, createNewUser, getInstitution
  }
}