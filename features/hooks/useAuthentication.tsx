import { app } from '@/firebase/firebaseConfig';
import { AuthCredential, browserSessionPersistence, EmailAuthProvider, getAuth, onAuthStateChanged, reauthenticateWithCredential, setPersistence, signInWithEmailAndPassword, signOut, updatePassword } from 'firebase/auth'
import { AuthenticationFormSignIn, UserData } from '../types/types';
import 'firebase/auth'
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { useGlobalContextDispatch } from '../context/GlobalContext';
import { AttendanceRegister } from '../actions/actionAttendance';
import axios from 'axios';
import { toast } from 'react-toastify';
const useAuthentication = () => {

  const dispatch = useGlobalContextDispatch()
  const auth = getAuth(app)
  const db = getFirestore(app)
  const URL_API = "https://whatsapp-asistencia-production.up.railway.app"
  const URL_API1 = "https://whatsapp-asistencia-production.up.railway.appaa"
  const getUser = async (id: string) => {
    const refUser = doc(db, 'users', id as string)
    const user = await getDoc(refUser)

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
          extensionForUsers: user.data().extensionForUsers,
          celular: user.data().celular
        }
      })
    } else {
      console.log('usuario incorrecto o la contraseña no es valida.')
    }
  }
  const signIn = async (loginData: AuthenticationFormSignIn) => {
    dispatch({ type: AttendanceRegister.WARNING_ACCOUNT, payload: "" })
    dispatch({ type: AttendanceRegister.LOADING_ACCOUNT, payload: true })
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
      dispatch({ type: AttendanceRegister.LOADING_ACCOUNT, payload: false })
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (error) {
        dispatch({ type: AttendanceRegister.LOADING_ACCOUNT, payload: false })
        dispatch({ type: AttendanceRegister.WARNING_ACCOUNT, payload: "nombre de usuario o contraseña incorrecto" })
      }
    }
  }

  const logout = () => {
    signOut(auth)
    // AsyncStorage.setItem(TOKEN_KEY, JSON.stringify({}))
    // dispatch({ type: AttendanceRegister.USER_TOKEN, payload: { token: "", isAuthenticated: false } })
  }

  const changePassword = (newPassword: string, userData: UserData, currentPassword: string) => {

    const auth = getAuth();
    const user = auth.currentUser;

    //funcion que ayudata a verificar si el usuario y la contrasena son correctas para poder proceder con el cambio de contrasena
    if (user?.email) {
      const credential = EmailAuthProvider.credential(
        user?.email,
        currentPassword
      )

      reauthenticateWithCredential(user, credential).then(() => {
        // User re-authenticated
        console.log('se acepto las credenciales')

        updatePassword(user, newPassword)
          .then((response) => {
            const promesa = new Promise((resolve, reject) => {
              try {
                axios
                  .post(`${URL_API}/v1/messages`,
                    {
                      number: `51${userData.celular}`,
                      message: `Hola ${userData.name} ${userData.lastname} ${userData.firstname}, tu contraseña ha sido cambiado con exito a *${newPassword}*.`
                    })
                  .then(response => {
                    console.log('response', response)
                    if (response.status === 200) {
                      resolve(true)
                    } else {
                      reject(true)
                    }
                  })
                // .catch(response => {
                //   console.log('catch', response)
                // })
              } catch (error) {
                console.log('ocurrio un error:', error)
                reject(error)
              }
            })

            toast.promise(promesa,
              {
                pending: 'Actualizando contraseña',
                success: 'Se actualizo contrasena con exito 👌',
                error: 'Parece que algo fallo, intentalo despues 🤯'
              })

            //mostrare un alerta tipo notificacion en la misma pagina de usuario https:localhost/mi-cuenta m m
            //api para enviar notificvacion de whatsapp de cambio de nueva contrasena
          })

      }).catch((error: any) => {
        // An error ocurred
        console.log('errorcito de credenciales', error)
        // ...
      });

    }

    // if (user) {
    //   updatePassword(auth.currentUser, newPassword)
    //     .then((response) => {
    //       const promesa = new Promise((resolve, reject) => {
    //         try {
    //           axios
    //             .post(`${URL_API}/v1/messages`,
    //               {
    //                 number: `51${userData.celular}`,
    //                 message: `Hola ${userData.name} ${userData.lastname} ${userData.firstname}, 'tu contraseña ha sido cambiado con exito a ' *${newPassword}*.`
    //               })
    //             .then(response => {
    //               console.log('response', response)
    //               if (response.status === 200) {
    //                 resolve(true)
    //               } else {
    //                 reject(true)
    //               }
    //             })
    //           // .catch(response => {
    //           //   console.log('catch', response)
    //           // })
    //         } catch (error) {
    //           console.log('ocurrio un error:', error)
    //           reject(error)
    //         }
    //       })

    //       toast.promise(promesa,
    //         {
    //           pending: 'Actualizando contraseña',
    //           success: 'Se actualizo contrasena con exito 👌',
    //           error: 'Parece que algo fallo, intentalo despues 🤯'
    //         })

    //       //mostrare un alerta tipo notificacion en la misma pagina de usuario https:localhost/mi-cuenta m m
    //       //api para enviar notificvacion de whatsapp de cambio de nueva contrasena
    //     })


    //   // .catch((error) => {
    //   //   console.log('error contrasena', error)
    //   // });
    // }
  }
  const getUserData = () => {
    onAuthStateChanged(auth, currentUser => {
      if (currentUser) {
        getUser(currentUser.uid)
      }
    })
  }
  return { signIn, logout, getUserData, changePassword }
}
export default useAuthentication
