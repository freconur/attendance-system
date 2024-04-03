import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom';
import styles from './departureStudentModal.module.css'
import { useGlobalContext } from '@/features/context/GlobalContext';
import useAttendanceRegister from '@/features/hooks/useAttendanceRegister';
import { RiLoader4Line } from 'react-icons/ri';
import { useAttendance } from '@/features/hooks/useAttendance';
import Image from 'next/image';
import { FaUserAlt } from 'react-icons/fa';
import { convertGrade } from '@/utils/validateGrade';
import ConfirmationDepartureStudent from './confirmationDepartureStudent';

const DepartureStudentModal = () => {
  const { studentforDeparture, showDepartureManualModal, confirmationDepartureStudentModal } = useGlobalContext()
  const { getStudentDepartureManual,activeDepartureManualModal, confirmationDepartureModal } = useAttendance()
  const focusRef = useRef<HTMLInputElement>(null)
  const initialState = { studentCode: "" }
  const initialStateSalida = { motivo: "" }
  const [studenCode, setStudenCode] = useState(initialState)
  const [motivoSalida, setMotivoSalida] = useState(initialStateSalida)
  let container;
  if (typeof window !== "undefined") {
    container = document.getElementById("portal-modal");
  }

  const handleChangeMotivoSalida = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMotivoSalida({
      ...motivoSalida,
      [e.target.name]: e.target.value
    })
  }
  const onChangeStudentCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudenCode({
      ...studenCode,
      [e.target.name]: e.target.value
    })
  }
  useEffect(() => {
    if (studenCode.studentCode.length === 8) {
      getStudentDepartureManual(studenCode.studentCode)
      setStudenCode(initialState)
    }
  }, [studenCode.studentCode])
  useEffect(() => {
    if (focusRef.current) {
      focusRef.current.focus();
    }
  }, [])

  console.log('motivoSalida', motivoSalida)
  return container
    ? createPortal(
      <div className={styles.containerModal}>
        <div className={styles.containerSale}>
          <div className='flex justify-end'>
            <p onClick={() => activeDepartureManualModal(showDepartureManualModal)} className='cursor-pointer text-slate-400'>cerrar</p>
          </div>
          {
            confirmationDepartureStudentModal &&
            <ConfirmationDepartureStudent motivoSalida={motivoSalida.motivo} studentforDeparture={studentforDeparture}/>
          }
          <div className='w-full'>
            <div className='w-full'>
              <div className='text-slate-600 text-sm uppercase mb-2'>codigo de estudiante:</div>
              <input
                ref={focusRef}
                value={studenCode.studentCode}
                onChange={onChangeStudentCode}
                name="studentCode"
                type="text"
                className='w-full p-3 outline-none shadow-md rounded-md'
                placeholder='escanea o digita el codigo' />
            </div>
          </div>
          {
            studentforDeparture?.dni ?
              <div className='w-full xs:w-[520px] tablet:w-[660px] m-auto'>
                <div className='grid grid-cols-2 gap-5 mt-5 bg-white p-2 rounded-md'>
                  {/* <div className='w-[50%]'> */}
                  {studentforDeparture.pictureProfile ?
                    <div className="overflow-hidden  rounded-md">
                      <Image
                        alt="foto de perfil"
                        src={`${studentforDeparture.pictureProfile}`}
                        width={350}
                        height={350}
                      />
                    </div>
                    :
                    <div className='bg-blue-100 p-3 rounded-sm  flex items-center justify-center w-full'>
                      <FaUserAlt className='w-[40%] h-[100px] text-blue-200' />
                    </div>
                  }
                  {/* </div> */}
                  <div className='flex items-center text-[10px] xsm:text-[12px] xm:text-[15px] md:text-[20px]'>
                    <div>
                      <p className='text-slate-400'>DNI: </p>
                      <span className='uppercase font-semibold text-slate-500'> {studentforDeparture.dni}</span>
                      <p className='text-slate-400'>NOMBRE: </p>
                      <span className='uppercase font-semibold text-slate-500'> {studentforDeparture.name}</span>
                      <p className='text-slate-400'>APELLIDOS: </p>
                      <span className='uppercase font-semibold text-slate-500'>{studentforDeparture.lastname} {studentforDeparture.firstname}</span>
                      <p className='text-slate-400'>GRADO: </p>
                      <span className='uppercase font-semibold text-slate-500'>{convertGrade(`${studentforDeparture.grade}`)}</span>
                    </div>

                  </div>
                </div>
              </div>
              : null
          }

          <div className='w-full'>
            <p className='capitalize text-slate-500'>motivo de salida:</p>
            <input className='w-full p-1 text-slate-400 border-[1px]' onChange={handleChangeMotivoSalida} type="text" placeholder="motivo de salida" name="motivo" />
          </div>

          <button onClick={() => confirmationDepartureModal(confirmationDepartureStudentModal)} disabled={motivoSalida.motivo.length > 5 ? false : true} className={`w-full rounded-md shadow-md  p-3 text-white   text-center uppercase mt-2 font-semibold ${motivoSalida.motivo.length > 5 ? "bg-blue-500 cursor-pointer" : "bg-gray-200"}`}>registrar salida</button>
        </div>
      </div>,
      container
    )
    : null
}

export default DepartureStudentModal