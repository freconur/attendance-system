import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./attendanceEmployee.module.css";
import { useGlobalContext } from "@/features/context/GlobalContext";
import useAttendanceRegister from "@/features/hooks/useAttendanceRegister";
import { RiLoader4Line } from "react-icons/ri";
import useAttendanceEmployee from "@/features/hooks/useAttendanceEmployee";
import useAuthentication from "@/features/hooks/useAuthentication";
import Image from "next/image";
import { FaUserAlt } from "react-icons/fa";
import { validateRol } from "@/utils/validateRolEmployee";

const AttendanceEmployeeModal = () => {
  const initialValueCode = { employee: "" };
  const focusRef = useRef<HTMLInputElement>(null);
  const { attendanceEmployee, employeeModal, getEmployeeAndAttendance } =
    useAttendanceEmployee();
  const [codeEmployee, setCodeEmployee] = useState(initialValueCode);
  const { getUserData } = useAuthentication();
  const { userData, employee, loaderGetEmployee, activeEmployeeModal } =
    useGlobalContext();

  let container;
  if (typeof window !== "undefined") {
    container = document.getElementById("portal-modal");
  }

  useEffect(() => {
    getUserData();
  }, [userData.name]);
  
  const onChangeCodeEmployee = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCodeEmployee({
      ...codeEmployee,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (codeEmployee.employee.length === 8) {
      console.log("estamos entrando en el bucle de 8 digitos de largo");
      getEmployeeAndAttendance(codeEmployee.employee);
      setCodeEmployee(initialValueCode);
    }
  }, [codeEmployee.employee]);

  useEffect(() => {
    if (focusRef.current) {
      focusRef.current.focus();
    }
  }, []);
  
  return container
    ? createPortal(
        <div className={styles.containerModal}>
          <div className={styles.containerSale}>
            <div className={styles.closeModalContainer}>
              <button 
                className={styles.closeModal} 
                onClick={() => employeeModal(activeEmployeeModal)}
              >
                cerrar
              </button>
            </div>
            
            <h2 className={styles.modalTitle}>
              ingreso y salida de profesores
            </h2>
            
            <div className={styles.inputContainer}>
              <input
                onChange={onChangeCodeEmployee}
                type="number"
                value={codeEmployee.employee}
                name="employee"
                className={styles.employeeInput}
                placeholder="CODIGO DE PROFESOR"
                ref={focusRef}
              />
            </div>

            {loaderGetEmployee ? (
              <div className={styles.loaderContainer}>
                <RiLoader4Line className={styles.loaderIcon} />
                <p className={styles.loaderText}>buscando resultados...</p>
              </div>
            ) : null}
            
            {employee?.dni ? (
              <div className={styles.employeeInfoContainer}>
                <div className={styles.employeeInfoCard}>
                  {employee.pictureProfile ? (
                    <div className={styles.employeeImageContainer}>
                      <Image
                        alt="foto de perfil"
                        src={`${employee.pictureProfile}`}
                        width={350}
                        height={350}
                        className={styles.employeeImage}
                      />
                    </div>
                  ) : null}
                  
                  <div className={styles.employeeDetails}>
                    <div className={styles.employeeDetailItem}>
                      <span className={styles.employeeDetailLabel}>DNI:</span>
                      <span className={styles.employeeDetailValue}>
                        {employee.dni}
                      </span>
                    </div>
                    
                    <div className={styles.employeeDetailItem}>
                      <span className={styles.employeeDetailLabel}>NOMBRE:</span>
                      <span className={styles.employeeDetailValue}>
                        {employee.name}
                      </span>
                    </div>
                    
                    <div className={styles.employeeDetailItem}>
                      <span className={styles.employeeDetailLabel}>APELLIDOS:</span>
                      <span className={styles.employeeDetailValue}>
                        {employee.lastname} {employee.firstname}
                      </span>
                    </div>
                    
                    <div className={styles.employeeDetailItem}>
                      <span className={styles.employeeDetailLabel}>CARGO:</span>
                      <span className={styles.employeeDetailValue}>
                        {validateRol(employee?.rol)}
                      </span>
                    </div>
                    
                    <div className={styles.employeeDetailItem}>
                      <span className={styles.employeeDetailLabel}>HORA:</span>
                      <span className={styles.employeeDetailValue}>
                        {employee?.currentlyHour}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className={styles.warning}>
                no se encontro resultados
              </div>
            )}
          </div>
        </div>,
        container
      )
    : null;
};

export default AttendanceEmployeeModal;
