import { app } from '@/firebase/firebaseConfig';
import { browserSessionPersistence, getAuth, onAuthStateChanged, setPersistence, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { AuthenticationFormSignIn } from '../types/types';
import 'firebase/auth'
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { useGlobalContextDispatch } from '../context/GlobalContext';
import { AttendanceRegister } from '../actions/actionAttendance';
const useAuthentication = () => {

  const dispatch = useGlobalContextDispatch()
  const auth = getAuth(app)
  const db = getFirestore(app)
  const getUser = async (id: string) => {
    const refUser = doc(db, 'users', id as string)
    const user = await getDoc(refUser)

    console.log('users', user.data())
    if (user.exists()) {
      dispatch({
        type: AttendanceRegister.USER_DATA, payload: {
          firstname: user.data().firstname,
          pictureProfile: user.data().pictureProfile,
          institutionName: user.data().institutionName,
          idInstitution: user.data().idInstitution,
          lastname: user.data().lastname,
          name: user.data().name,
          rol: user.data().rol,
          id: user.id,
          acc: user.data().acc,
          born: user.data().fechaNacimiento,
          dni: user.data().dni,
        }
      })
    } else {
      console.log('usuario incorrecto o la contraseña no es valida.')
    }
  }
  const signIn = async (loginData: AuthenticationFormSignIn) => {
    dispatch({type:AttendanceRegister.WARNING_ACCOUNT, payload:""})
    dispatch({type:AttendanceRegister.LOADING_ACCOUNT, payload:true})
    let rta: any = {}
    try {
      await setPersistence(auth, browserSessionPersistence)
        .then(async () => {
          return await signInWithEmailAndPassword(auth, loginData.email, loginData.password)
            .then(response => getUser(response.user.uid))
          // if (rta) {
          //   console.log('rta', rta)
          // }
        })
        dispatch({type:AttendanceRegister.LOADING_ACCOUNT, payload:false})
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      if(error) {
        dispatch({type:AttendanceRegister.LOADING_ACCOUNT, payload:false})
        dispatch({type:AttendanceRegister.WARNING_ACCOUNT, payload:"nombre de usuario o contraseña incorrecto"})
      }
    }
  }

  const logout = () => {
    signOut(auth)
    // AsyncStorage.setItem(TOKEN_KEY, JSON.stringify({}))
    // dispatch({ type: AttendanceRegister.USER_TOKEN, payload: { token: "", isAuthenticated: false } })
  }

  const getUserData = () => {
    onAuthStateChanged(auth, currentUser => {
      if(currentUser) {
        getUser(currentUser.uid)
      }
    })
  }
  return { signIn, logout,getUserData }
}
export default useAuthentication
