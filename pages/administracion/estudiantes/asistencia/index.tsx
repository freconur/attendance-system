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
const Asistencia = () => {
  const initialState = { studentCode: "" };
  const { getUserData } = useAuthentication();
  const [studenCode, setStudenCode] = useState(initialState);
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
    if (focusRef.current) {
      focusRef.current.focus();
    }
  }, []);
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

  console.log("cargando");
  // console.log('userData', userData)
  // console.log('studentsData', studentsData)
  // console.log('allStudents', allStudents)
  return (
    <div className="relative ">
      <Image
        className="fixed xm:hidden opacity-5 z-[5] h-[100%] w-full top-0 bottom-0 "
        src={hands}
        alt="imagen de cabecera"
        // objectFit='fill
        priority
      />
      {/* <div className="w-full h-[200px]  absolute bottom-0">
            </div> */}
      {/* <div className='flex xs:hidden justify-start'>
      </div> */}
      <div className="bg-gradient-to-r relative z-[20] from-sky-500 from-10% to-emerald-500 to-90% p-2">
        <div className="flex xs:hidden justify-between ">
          <div
            onClick={() => activeDepartureManualModal(showDepartureManualModal)}
            className="bg-buttonColor drop-shadow-lg text-white p-1 rounded-full cursor-pointer"
          >
            <p className="text-white font-semibold uppercase">sm</p>
          </div>
          <div
            onClick={() => employeeModal(activeEmployeeModal)}
            className="bg-buttonLogin drop-shadow-lg text-white p-1 rounded-full w-[30px] h-[30px] cursor-pointer flex justify-center items-center"
          >
            <FaUserTie className="text-lg" />
          </div>
        </div>
        {activeEmployeeModal ? <AttendanceEmployeeModal /> : null}
        {showDepartureManualModal ? <DepartureStudentModal /> : null}
        <div>
          <h1 className="text-textTitulos uppercase font-antonsc  text-3xl my-5 text-center">
            tomar asistencia
          </h1>

          <div className="w-full">
            <div className="w-full">
              {/* <div className='text-slate-600 text-sm uppercase mb-2'>codigo de estudiante:</div> */}
              <input
                ref={focusRef}
                value={studenCode.studentCode}
                onChange={onChangeStudentCode}
                name="studentCode"
                type="number"
                className="w-full p-3 outline-none drop-shadow-lg rounded-md"
                placeholder="ESCANEA EL CODIGO DE ESTUDIANTE"
              />
            </div>
          </div>
        </div>
      </div>
      <>
        {loadingGetStudents ? (
          <div className="flex w-full mt-5 items-center m-auto justify-center">
            <RiLoader4Line className="animate-spin text-3xl text-slate-500 " />
            <p className="text-slate-500">buscando resultados...</p>
          </div>
        ) : null}
      </>
      <div className="w-full relative z-[20] flex justify-center items-center">
        {/* <div className="mx-auto w-full max-w-sm rounded-md border border-slate-300 p-4">
          <div className="flex animate-pulse space-x-4">
            <div className="size-10 rounded-full bg-gray-200"></div>
            <div className="flex-1 space-y-6 py-1">
              <div className="h-2 rounded bg-gray-200"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2 h-2 rounded bg-gray-200"></div>
                  <div className="col-span-1 h-2 rounded bg-gray-200"></div>
                </div>
                <div className="h-2 rounded bg-gray-200"></div>
              </div>
            </div>
          </div>
        </div> */}
        <ul className="w-full xs:w-[520px] tablet:w-[660px] p-2">
          {studentsData?.map((student, index) => {
            return (
              <li
                key={index}
                className="cursor-pointer mt-5 bg-white rounded-md overflow-hidden drop-shadow-xl"
              >
                {/* <div className='rounded-full shadow-md overflow-hidden w-[50%]'> */}
                {student?.pictureProfile ? (
                  <div className="overflow-hidden rounded-md">
                    <Image
                      alt="foto de perfil"
                      src={`${student.pictureProfile}`}
                      // fill
                      width={350}
                      height={350}
                    />
                  </div>
                ) : // <div className="bg-blue-100 p-3 rounded-sm  flex items-center justify-center">
                //   <FaUserAlt className="w-[50%] h-[50%] text-blue-200" />
                // </div>
                null}
                {/* </div> */}
                {/* <div className='flex flex-col gap-2 content-between h-full'> */}
                <div className="flex items-center text-[12px] xsm:text-[12px] xm:text-[15px] md:text-[20px]">
                  <div className="w-full overflow-hidden">
                    <p className="text-slate-400 border-b-[1px] p-2 ">
                      DNI:
                      <span className="uppercase font-semibold ml-3 text-slate-500">
                        {student.dni}
                      </span>
                    </p>
                    <p className="text-slate-400 px-2">
                      NOMBRE:
                      <span className="ml-3 uppercase font-semibold text-slate-500">
                        {student.name}
                      </span>
                    </p>
                    <p className="text-slate-400 px-2">
                      APELLIDOS:
                      <span className="ml-3 uppercase font-semibold text-slate-500">
                        {student.lastname} {student.firstname}
                      </span>
                    </p>

                    <p className="text-slate-400 px-2">
                      GRADO:
                      <span className="uppercase font-semibold ml-3 text-slate-500">
                        {convertGrade(`${student.grade}`)}
                      </span>
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Asistencia;
Asistencia.Auth = PrivateRouteAdmin;
