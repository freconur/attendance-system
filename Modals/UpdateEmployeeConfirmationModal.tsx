import React from 'react'
import { createPortal } from 'react-dom';
import styles from './ConfirmationSaveAttendanceByGradeSection.module.css'
import { useGlobalContext } from '@/features/context/GlobalContext';
import useAttendanceRegister from '@/features/hooks/useAttendanceRegister';
import { RiLoader4Line } from 'react-icons/ri';
import { Employee, StudentData, UpdateDataUser } from '@/features/types/types';
import UseRegisterStudents from '@/features/hooks/useRegisterStudents';
import useAttendanceEmployee from '@/features/hooks/useAttendanceEmployee';


interface Props {
  employee: UpdateDataUser
}
const UpdateEmployeeConfirmationModal = ({employee}:Props) => {
  const { saveAttendance, saveChangesFromAttendanceByGradeSecction } = useAttendanceRegister()

  const { updateEmployeeConfirmationModal } = useGlobalContext()
  const { updateStudentData, updateStudent } = UseRegisterStudents()
  const { confirmationUpdateEmployee, updateEmployee } = useAttendanceEmployee()
  let container;
  if (typeof window !== "undefined") {
    container = document.getElementById("portal-modal");
  }

  // const handleUpdateStudent = (employee:StudentData) => {
  //   updateStudent(employee)
  // }

  console.log('employee modal',employee)
  return container
    ? createPortal(
      <div className={styles.containerModal}>
        <div className={styles.containerSale}>
          <h3 className='text-slate-500 text-center'>estas seguro que quieres actualizar los datos del usuario?</h3>
          <div className='flex items-center justify-center gap-5 mt-3'>
            <div onClick={() => confirmationUpdateEmployee(false)} className='text-red-400 capitalize cursor-pointer'>cancelar</div>
            <div onClick={() => {updateEmployee(employee);confirmationUpdateEmployee(false)} } className='bg-green-400 text-white font-semibold px-3 py-2 rounded-md cursor-pointer'>SI</div>
          </div>
        </div>
      </div>,
      container
    )
    : null
}

export default UpdateEmployeeConfirmationModal