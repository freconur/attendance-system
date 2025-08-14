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
          {/* Botón cerrar siempre visible en la parte superior */}
          <button 
            onClick={() => activeDepartureManualModal(showDepartureManualModal)} 
            className={styles.closeButton}
          >
            cerrar
          </button>
          
          {/* Contenido principal del modal */}
          <div className={styles.modalContent}>
            {
              confirmationDepartureStudentModal &&
              <ConfirmationDepartureStudent motivoSalida={motivoSalida.motivo} studentforDeparture={studentforDeparture}/>
            }
            
            <div className={styles.inputContainer}>
              <input
                ref={focusRef}
                value={studenCode.studentCode}
                onChange={onChangeStudentCode}
                name="studentCode"
                type="number"
                className={styles.studentCodeInput}
                placeholder='CODIGO DE ESTUDIANTE' />
            </div>
            
            {
              studentforDeparture?.dni ?
                <div className={styles.studentInfoContainer}>
                  <div className={styles.studentInfoGrid}>
                    {studentforDeparture.pictureProfile ?
                      <div className={styles.studentImageContainer}>
                        <Image
                          alt="foto de perfil"
                          src={`${studentforDeparture.pictureProfile}`}
                          width={350}
                          height={350}
                          className={styles.studentImage}
                        />
                      </div>
                      :
                      <div className={styles.studentPlaceholder}>
                        <FaUserAlt className={styles.studentPlaceholderIcon} />
                      </div>
                    }
                    
                    <div className={styles.studentDetails}>
                      <div className={styles.studentDetailItem}>
                        <span className={styles.studentDetailLabel}>DNI:</span>
                        <span className={styles.studentDetailValue}>{studentforDeparture.dni}</span>
                      </div>
                      
                      <div className={styles.studentDetailItem}>
                        <span className={styles.studentDetailLabel}>NOMBRE:</span>
                        <span className={styles.studentDetailValue}>{studentforDeparture.name}</span>
                      </div>
                      
                      <div className={styles.studentDetailItem}>
                        <span className={styles.studentDetailLabel}>APELLIDOS:</span>
                        <span className={styles.studentDetailValue}>{studentforDeparture.lastname} {studentforDeparture.firstname}</span>
                      </div>
                      
                      <div className={styles.studentDetailItem}>
                        <span className={styles.studentDetailLabel}>GRADO:</span>
                        <span className={styles.studentDetailValue}>{convertGrade(`${studentforDeparture.grade}`)}</span>
                      </div>
                    </div>
                  </div>
                </div>
                : null
            }

            <input 
              className={styles.motivoInput} 
              onChange={handleChangeMotivoSalida} 
              type="text" 
              placeholder="MOTIVO DE SALIDA" 
              name="motivo" 
            />

            <button 
              onClick={() => confirmationDepartureModal(confirmationDepartureStudentModal)} 
              disabled={motivoSalida.motivo.length > 5 ? false : true} 
              className={`${styles.registerButton} ${motivoSalida.motivo.length > 5 ? styles.registerButtonEnabled : styles.registerButtonDisabled}`}
            >
              registrar salida
            </button>
          </div>
        </div>
      </div>,
      container
    )
    : null
}

export default DepartureStudentModal