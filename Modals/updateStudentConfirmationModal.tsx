import React from 'react'
import { createPortal } from 'react-dom';
import styles from './ConfirmationSaveAttendanceByGradeSection.module.css'
import { useGlobalContext } from '@/features/context/GlobalContext';
import useAttendanceRegister from '@/features/hooks/useAttendanceRegister';
import { RiLoader4Line } from 'react-icons/ri';
import { StudentData } from '@/features/types/types';
import UseRegisterStudents from '@/features/hooks/useRegisterStudents';


interface Props {
  student: StudentData
}
const UpdateStudentConfirmationModal = ({student}:Props) => {
  const { saveAttendance, saveChangesFromAttendanceByGradeSecction } = useAttendanceRegister()

  const { updateStudentConfirmationModal } = useGlobalContext()
  const { updateStudentData, updateStudent } = UseRegisterStudents()
  let container;
  if (typeof window !== "undefined") {
    container = document.getElementById("portal-modal");
  }

  // const handleUpdateStudent = (student:StudentData) => {
  //   updateStudent(student)
  // }
  return container
    ? createPortal(
      <div className={styles.containerModal}>
        <div className={styles.containerSale}>
          <h3 className='text-slate-500 text-center'>estas seguro que quieres actualizar los datos del estudiante?</h3>
          <div className='flex items-center justify-center gap-5 mt-3'>
            <div onClick={() => updateStudentData(updateStudentConfirmationModal)} className='text-red-400 capitalize cursor-pointer'>cancelar</div>
            <div onClick={() => {updateStudent(student);updateStudentData(updateStudentConfirmationModal)} } className='bg-green-400 text-white font-semibold px-3 py-2 rounded-md cursor-pointer'>SI</div>
          </div>
        </div>
      </div>,
      container
    )
    : null
}

export default UpdateStudentConfirmationModal