import React from 'react'
import { createPortal } from 'react-dom';
import styles from './ConfirmationSaveAttendanceByGradeSection.module.css'
import { useGlobalContext } from '@/features/context/GlobalContext';
import useAttendanceRegister from '@/features/hooks/useAttendanceRegister';
import { RiLoader4Line } from 'react-icons/ri';
const ConfirmationSaveAttendanceByGradeSection = () => {
  const { saveAttendance, saveChangesFromAttendanceByGradeSecction } = useAttendanceRegister()
  const { confirmationSaveAttendanceByGradeSectionModal, studentsForAttendance, loadingSaveAttendanceByGradeSectionModal } = useGlobalContext()
  let container;
  if (typeof window !== "undefined") {
    container = document.getElementById("portal-modal");
  }

  const handleCancelAttendance = () => {
    saveAttendance(confirmationSaveAttendanceByGradeSectionModal)
  }
  return container
    ? createPortal(
      <div className={styles.containerModal}>
        <div className={styles.containerSale}>
          {
            loadingSaveAttendanceByGradeSectionModal ?
              <div className="flex w-full mt-5 items-center m-auto justify-center">
                <RiLoader4Line className="animate-spin text-3xl text-slate-500 " />
                <p className="text-slate-500">guardando asistencia...</p>
              </div>
              :
              <>
                <h2 className='text-center text-slate-500'>Quieres guardar la asistencia?</h2>
                <div className='w-full flex justify-center items-center mt-5 gap-5'>
                  <div onClick={handleCancelAttendance} className=' text-red-400 font-semibold duration-300 cursor-pointer bg-white w-[100px] flex items-center justify-center rounded-md p-3 '><span>Cancelar</span></div>
                  <div onClick={() => saveChangesFromAttendanceByGradeSecction(studentsForAttendance)} className=' text-white font-semibold hover:bg-blue-300 duration-300 cursor-pointer bg-blue-400 w-[100px] flex items-center justify-center rounded-md p-3 '><span>Si</span></div>
                </div>
              </>
          }
        </div>
      </div>,
      container
    )
    : null
}

export default ConfirmationSaveAttendanceByGradeSection