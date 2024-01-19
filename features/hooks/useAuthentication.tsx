import { app } from '@/firebase/firebaseConfig';
import { browserSessionPersistence, getAuth, setPersistence, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { AuthenticationFormSignIn } from '../types/types';
import 'firebase/auth'
const useAuthentication = () => {

  const auth = getAuth(app)

  const signIn = async (loginData: AuthenticationFormSignIn) => {
    let rta: any = {}
    try {
      await setPersistence(auth, browserSessionPersistence)
        .then(async () => {
          return await signInWithEmailAndPassword(auth, loginData.email, loginData.password)
            .then(response => console.log(response))
          // if (rta) {
          //   console.log('rta', rta)
          // }
        })

    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('errorCode', errorCode)
      console.log('errorMessage', errorMessage)
    }
  }

  const logout = () => {
    signOut(auth)
    // AsyncStorage.setItem(TOKEN_KEY, JSON.stringify({}))
    // dispatch({ type: AttendanceRegister.USER_TOKEN, payload: { token: "", isAuthenticated: false } })

  }
  return { signIn, logout }
}
export default useAuthentication
