import React from 'react'
import { createPortal } from 'react-dom';
import styles from './ConfirmationSaveAttendanceByGradeSection.module.css'
import { useGlobalContext } from '@/features/context/GlobalContext';
import useAttendanceRegister from '@/features/hooks/useAttendanceRegister';
import { RiLoader4Line } from 'react-icons/ri';
import { useAttendance } from '@/features/hooks/useAttendance';
import { StudentData } from '@/features/types/types';


interface Props {
  studentforDeparture: StudentData,
  motivoSalida:string
}
const ConfirmationDepartureStudent = ({ studentforDeparture, motivoSalida }: Props) => {

  const { confirmationDepartureStudentModal } = useGlobalContext()
  const { studentDepartureTime, confirmationDepartureModal } = useAttendance()
  let container;
  if (typeof window !== "undefined") {
    container = document.getElementById("portal-modal");
  }

  console.log('xxx',motivoSalida )
  return container
    ? createPortal(
      <div className={styles.containerModal}>
        <div className={styles.containerSale}>
          <h2 className='text-center text-slate-500'>Quieres guardar la salida del estudiante?</h2>
          <div className='w-full flex justify-center items-center mt-5 gap-5'>
            <div onClick={() => confirmationDepartureModal(confirmationDepartureStudentModal)} className=' text-red-400 font-semibold duration-300 cursor-pointer bg-white w-[100px] flex items-center justify-center rounded-md p-3 '><span>Cancelar</span></div>
            <div onClick={() => studentDepartureTime(`${studentforDeparture.dni}`, motivoSalida)} className=' text-white font-semibold hover:bg-blue-300 duration-300 cursor-pointer bg-blue-400 w-[100px] flex items-center justify-center rounded-md p-3 '><span>Si</span></div>
          </div>
        </div>
      </div>,
      container
    )
    : null
}

export default ConfirmationDepartureStudent