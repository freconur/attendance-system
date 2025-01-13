'use client'

import { app } from "@/firebase/firebaseConfig"
import { doc, getDoc, getFirestore } from "firebase/firestore"
import { useGlobalContext, useGlobalContextDispatch } from "../context/GlobalContext"
import { UserAulaVirtual } from "../types/types"



const db = getFirestore(app)

export const useAulaVirtual = () => {


  const dispatch = useGlobalContextDispatch()

  const {  } = useGlobalContext()


  const validateUserAulaVirutal = async (data: UserAulaVirtual) => {
    console.log('data', data)
    console.log(`/intituciones/${data.institucion}/students`, `${data.dni}`)
    const docRef = doc(db, `/intituciones/${data.institucion}/students`, `${data.dni}`);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());

      //debo ejecutar logica despues de validar el usuario
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }

  }


  return {
    validateUserAulaVirutal
  } 
}