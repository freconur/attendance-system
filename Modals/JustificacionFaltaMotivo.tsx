import React from 'react'
import styles from './JustificacionFaltaMotivoModal.module.css'
import { createPortal } from 'react-dom';
import { JustificacionStudent } from '@/features/types/types';
import useAttendanceRegister from '@/features/hooks/useAttendanceRegister';

interface Props {
  justificacionStudent: JustificacionStudent
}
const JustificacionFaltaMotivo = ({ justificacionStudent }: Props) => {

  const { showJustificacionMotivo } = useAttendanceRegister()
  let container;
  if (typeof window !== "undefined") {
    container = document.getElementById("portal-modal");
  }
  return container
    ? createPortal(
      <div className={styles.containerModal}>
        <div className={styles.containerSale}>
          <div className='flex justify-end items-center w-full'><p onClick={() => showJustificacionMotivo(false)} className='text-slate-400 cursor-pointer'>cerrar</p></div>
          <div className='text-slate-700'>Motivo de Falta</div>
          <h3 className='text-blue-600'>Estado: {justificacionStudent?.arrivalTime}</h3>
          <p className='text-slate-500'>Motivo: {justificacionStudent?.justificationMotive}</p>
        </div>
      </div>,
      container
    )
    : null
}

export default JustificacionFaltaMotivo