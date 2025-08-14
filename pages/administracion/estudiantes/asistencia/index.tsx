"use client";
import PrivateRoutes from "@/components/layouts/PrivateRoutes";
import { useGlobalContext } from "@/features/context/GlobalContext";
import { useAttendance } from "@/features/hooks/useAttendance";
import useAuthentication from "@/features/hooks/useAuthentication";
import { convertGrade } from "@/utils/validateGrade";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { RiLoader4Line } from "react-icons/ri";
import { FaUserAlt } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa";
import AttendanceEmployeeModal from "@/Modals/attendanceEmployeeModal";
import useAttendanceEmployee from "@/features/hooks/useAttendanceEmployee";
import DepartureStudentModal from "@/Modals/departureStudentModal";
import PrivateRouteAdmin from "@/components/layouts/PrivateRouteAdmin";
import hands from "../../../../assets/bg-attendance.png";
import styles from "./asistencia.module.css";

const Asistencia = () => {
  const initialState = { studentCode: "" };
  const { getUserData } = useAuthentication();
  const [studenCode, setStudenCode] = useState(initialState);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const {
    getStudentData,
    studentArrivalTime,
    activeDepartureManualModal,
    getAllStudents,
  } = useAttendance();
  const { employeeModal } = useAttendanceEmployee();
  const {
    studentsData,
    userData,
    loadingGetStudents,
    activeEmployeeModal,
    showDepartureManualModal,
    allStudents,
  } = useGlobalContext();
  const focusRef = useRef<HTMLInputElement>(null);
  
  const onChangeStudentCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudenCode({
      ...studenCode,
      [e.target.name]: e.target.value,
    });
  };
  
  useEffect(() => {
    // Simular carga inicial
    const timer = setTimeout(() => {
      setIsPageLoaded(true);
      setTimeout(() => setShowContent(true), 200);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    if (focusRef.current && showContent) {
      focusRef.current.focus();
    }
  }, [showContent]);
  
  useEffect(() => {
    if (studenCode.studentCode.length === 8) {
      getStudentData(studenCode.studentCode, studentsData);
      setStudenCode(initialState);
    }
  }, [studenCode.studentCode]);

  useEffect(() => {
    getUserData();
    getAllStudents();
  }, [userData.dni]);

  if (!isPageLoaded) {
    return (
      <div className={styles.container}>
        <div className={styles.loader}>
          <RiLoader4Line className={styles.loaderIcon} />
          <p className={styles.loaderText}>Cargando sistema de asistencia...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.container} ${showContent ? styles.showContent : ''}`}>
      <Image
        className={styles.backgroundImage}
        src={hands}
        alt="imagen de cabecera"
        priority
      />
      
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.actionButtons}>
            <div
              onClick={() => activeDepartureManualModal(showDepartureManualModal)}
              className={styles.actionButton}
            >
              <p>SM</p>
            </div>
            <div
              onClick={() => employeeModal(activeEmployeeModal)}
              className={`${styles.actionButton} ${styles.employee}`}
            >
              <FaUserTie />
            </div>
          </div>
          
          {activeEmployeeModal ? <AttendanceEmployeeModal /> : null}
          {showDepartureManualModal ? <DepartureStudentModal /> : null}
          
          <h1 className={styles.title}>
            Asistencia
          </h1>

          <div className={styles.inputContainer}>
            <input
              ref={focusRef}
              value={studenCode.studentCode}
              onChange={onChangeStudentCode}
              name="studentCode"
              type="number"
              className={styles.input}
              placeholder="ESCANEA EL CÓDIGO DE ESTUDIANTE"
            />
          </div>
        </div>
      </div>
      
      {loadingGetStudents && (
        <div className={styles.loader}>
          <RiLoader4Line className={styles.loaderIcon} />
          <p className={styles.loaderText}>Buscando resultados...</p>
        </div>
      )}
      
      <div className={styles.studentsList}>
        <ul>
          {studentsData?.map((student, index) => (
            <li 
              key={index} 
              className={styles.studentCard}
              style={{ animationDelay: `${(index + 1) * 0.1}s` }}
            >
              {student?.pictureProfile ? (
                <div>
                  <Image
                    alt="foto de perfil"
                    src={`${student.pictureProfile}`}
                    width={350}
                    height={350}
                    className={styles.studentImage}
                  />
                </div>
              ) : null}
              
              <div className={styles.studentInfo}>
                <div className={styles.studentField}>
                  <span className={styles.fieldLabel}>DNI:</span>
                  <span className={styles.fieldValue}>{student.dni}</span>
                </div>
                
                <div className={styles.studentField}>
                  <span className={styles.fieldLabel}>Nombre:</span>
                  <span className={styles.fieldValue}>{student.name}</span>
                </div>
                
                <div className={styles.studentField}>
                  <span className={styles.fieldLabel}>Apellidos:</span>
                  <span className={styles.fieldValue}>
                    {student.lastname} {student.firstname}
                  </span>
                </div>

                <div className={styles.studentField}>
                  <span className={styles.fieldLabel}>Grado:</span>
                  <span className={styles.fieldValue}>
                    {convertGrade(`${student.grade}`)}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Asistencia;
Asistencia.Auth = PrivateRouteAdmin;
