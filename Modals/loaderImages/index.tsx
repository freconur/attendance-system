import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom';
import styles from '../loaderImages/loaderImages.module.css'
import { useGlobalContext } from '@/features/context/GlobalContext';
import useAttendanceEmployee from '@/features/hooks/useAttendanceEmployee';
import useAuthentication from '@/features/hooks/useAuthentication';
import { RiLoader4Line } from 'react-icons/ri';

const LoaderImageTareaModal = () => {
  const initialValueCode = { employee: "" }
  const focusRef = useRef<HTMLInputElement>(null)
  const { attendanceEmployee, employeeModal, getEmployeeAndAttendance } = useAttendanceEmployee()
  const [codeEmployee, setCodeEmployee] = useState(initialValueCode)
  const { getUserData } = useAuthentication()
  const { userData, employee, loaderGetEmployee, activeEmployeeModal } = useGlobalContext()

  let container;
  if (typeof window !== "undefined") {
    container = document.getElementById("portal-modal");
  }

  return container
    ? createPortal(
      <div className={styles.containerModal}>
        <div className={styles.containerSale}>
          {/* <h3 className={styles.title}>cargando imagen ...</h3> */}
          <div className="flex w-full mt-5 items-center m-auto justify-center">
          <RiLoader4Line className="animate-spin text-3xl text-slate-500 " />
          <p className="text-slate-500">subiendo imagen...</p>
        </div>
        </div>
      </div>,
      container
    )
    : null
}

export default LoaderImageTareaModal