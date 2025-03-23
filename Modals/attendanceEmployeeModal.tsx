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
            {/* <div onClick={() => employeeModal(activeEmployeeModal)} className='text-right w-full text-slate-500 font-semibold '>X</div> */}
            <div
              
              className={styles.closeModalContainer}
            >
              <div className={styles.closeModal} onClick={() => employeeModal(activeEmployeeModal)}>cerrar</div>
            </div>
            <h2 className="text-xl text-slate-400 font-antonsc text-center uppercase ">
              ingreso y salida de profesores
            </h2>
            <div className="w-full p-1 mt-2">
              <input
                onChange={onChangeCodeEmployee}
                type="number"
                value={codeEmployee.employee}
                name="employee"
                className="w-full rounded-md border-[1px] p-3 shadow-md focus:border-sky-500 focus:ring-[0.5] focus:ring-sky-500 focus:outline-none"
                placeholder="CODIGO DE PROFESOR"
                ref={focusRef}
              />
            </div>

            {loaderGetEmployee ? (
              <div className="flex w-full mt-5 items-center m-auto justify-center">
                <RiLoader4Line className="animate-spin text-3xl text-slate-500 " />
                <p className="text-slate-500">buscando resultados...</p>
              </div>
            ) : null}
            {employee?.dni ? (
              <div className="w-full xs:w-[520px] tablet:w-[660px] m-auto">
                <div className="mt-5 bg-textTitulos">
                  {/* <div className='w-[50%]'> */}
                  {employee.pictureProfile ? (
                    <div className="overflow-hidden  rounded-md">
                      <Image
                        alt="foto de perfil"
                        src={`${employee.pictureProfile}`}
                        width={350}
                        height={350}
                      />
                    </div>
                  ) : 
                  null
                  }
                  <div className="flex w-full items-center text-[12px] xsm:text-[13px] xm:text-[15px] md:text-[20px]">
                    <div className="w-full">
                      <p className="text-slate-400 py-2 pl-2 border-b-[1px] w-[100%] bg-textTitulos">
                        DNI:
                        <span className="ml-3  uppercase font-semibold text-slate-500">
                          {employee.dni}
                        </span>
                      </p>
                      <p className="text-slate-400 pl-2">
                        NOMBRE:
                        <span className="ml-3 uppercase font-semibold text-slate-500">
                          {employee.name}
                        </span>
                      </p>
                      <p className="text-slate-400 pl-2">
                        APELLIDOS:
                        <span className="ml-3 uppercase font-semibold text-slate-500">
                          {employee.lastname} {employee.firstname}
                        </span>
                      </p>
                      <p className="text-slate-400 pl-2">
                        CARGO:
                        <span className="ml-3 uppercase font-semibold text-slate-500">
                          {" "}
                          {validateRol(employee?.rol)}
                        </span>
                      </p>
                      <p className="text-slate-400 pl-2">
                        HORA:
                        <span className="ml-3 uppercase font-semibold text-slate-500">
                          {" "}
                          {employee?.currentlyHour}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full flex justify-center m-auto">
                <p className={styles.warning}>
                  no se encontro resultados
                </p>
              </div>
            )}
          </div>
        </div>,
        container
      )
    : null;
};

export default AttendanceEmployeeModal;
