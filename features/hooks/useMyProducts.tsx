'use client'
import { app } from "@/firebase/firebaseConfig";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useGlobalContext, useGlobalContextDispatch } from "../context/GlobalContext";
import { AttendanceRegister } from "../actions/actionAttendance";
import { ValidateMyProducts } from "../types/types";
const db = getFirestore(app)

export const useMyProducts = () => {
  const dispatch = useGlobalContextDispatch()
  const { userData } = useGlobalContext()

  const valideteMyProducts = async () => {
    if(userData) {
      console.log('userData',userData)
      const docRef = doc(db, `/intituciones/${userData?.idInstitution}`);
      const docSnap = await getDoc(docRef);
      const rta = docSnap.data()
      if (docSnap.exists()) {
        dispatch({type:AttendanceRegister.VALIDATE_MY_PRODUCTS, payload: rta as ValidateMyProducts})
      } else {
        console.log("No such document!");
      }

    }

  }


  return { valideteMyProducts }
}
