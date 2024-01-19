import useAuthentication from "@/features/hooks/useAuthentication";
import { NextApiRequest, NextApiResponse } from "next";
import { browserSessionPersistence, getAuth, setPersistence, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { OrderByDirection, QuerySnapshot, Timestamp, addDoc, collection, deleteDoc, doc, endAt, endBefore, getDoc, getDocs, getFirestore, increment, limit, onSnapshot, orderBy, query, setDoc, startAfter, updateDoc, where } from "firebase/firestore";
import { app } from "@/firebase/firebaseConfig";
const { signIn } = useAuthentication()
const auth = getAuth(app)

export default async function LoginHandler(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body
  console.log('req.body', req.body)
  // signIn(req.body)
  let rta: any = {}
  try {
    setPersistence(auth, browserSessionPersistence)
    .then(() => {
      rta = signInWithEmailAndPassword(auth, email, password)
      if (rta) {
        console.log('rta', rta)
      }
    })
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log('errorCode',errorCode)
    console.log('errorMessage',errorMessage)
  }
  return res.json(req.body)

}