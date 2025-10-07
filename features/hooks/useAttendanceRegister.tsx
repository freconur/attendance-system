import {
  useGlobalContext,
  useGlobalContextDispatch,
} from "../context/GlobalContext";
import { app } from "@/firebase/firebaseConfig";
import {
  Timestamp,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  attendanceStudentType,
  Grades,
  JustificacionStudent,
  JustificationValue,
  RecordEstudiante,
  RecordReporteDiario,
  Section,
  StudentData,
} from "../types/types";
import { AttendanceRegister } from "../actions/actionAttendance";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  currentDate,
  currentMonth,
  currentYear,
  dateConvertObjectStudent,
  days,
  getDayUnixDate,
  hoursUnixDate,
} from "@/dates/date";
import axios from "axios";
import { attendanceState } from "@/utils/attendanceState";
const URL_API = "https://whatsapp-api-production-da60.up.railway.app";

const useAttendanceRegister = () => {
  const db = getFirestore(app);
  const { userData } = useGlobalContext();
  const dispatch = useGlobalContextDispatch();

  async function getDataStudentsByDate(
    students: StudentData[],
    date: string,
    month: string
  ) {
    const studentsArray: StudentData[] = [];
    await Promise.all(
      students.map(async (student) => {
        const refAttendance = doc(
          db,
          `/intituciones/${userData.idInstitution}/attendance-student/${student.dni
          }/${currentYear()}/${month}/${month}/${date}`
        );
        const attendance = await getDoc(refAttendance); //iteramos cada estudiante del grado y seccion
        // const newData = { ...student, attendanceByDate: attendance.exists() ? hoursUnixDate(attendance.data().arrivalTime) : "falto" }
        const newData = {
          ...student,
          attendanceByDate: attendance.exists()
            ? attendance.data().justification
              ? "justificado"
              : // : attendance.data().arrivalTime === null
              attendance.data().falta
                ? "falto"
                : attendance.data().arrivalTime
                  ? hoursUnixDate(attendance.data().arrivalTime)
                  : "falto"
            : "falto",
          departureByDate: attendance.exists()
            ? attendance?.data().departure
              ? hoursUnixDate(attendance?.data().departure)
              : "sin registro"
            : "sin registro",
        };
        // const newData = { ...student, attendanceByDate: attendance.exists() ? attendance.data().justification ? "justificado" : attendance.data().arrivalTime === null ? "falto" : hoursUnixDate(attendance.data().arrivalTime) : "falto" }
        return studentsArray.push(newData);
      })
    );
    if (studentsArray) {
      studentsArray.sort((a: any, b: any) => {
        const fe: string = a && a.lastname;
        const se: string = b && b.lastname;

        if (fe > se) {
          return 1;
        }
        // if(fe && se) {}
        if (fe < se) {
          return -1;
        }
        if (a.lastname === b.lastname) {
          if (a.firstname > b.firstname) return 1;
          if (a.firstname < b.firstname) return -1;
          return 0;
        }
        return 0;
      });
    }
    return studentsArray;
  }
  const saveChangesFromAttendanceByGradeSecction = (
    students: StudentData[]
  ) => {
    //activo el loader
    dispatch({
      type: AttendanceRegister.LOADING_SAVE_ATTENDANCE_GRADE_SECTION,
      payload: true,
    });
    //configuro la fecha para toma de asistencia
    const currentlyDate = new Date();

    //itero cada estudiante del grado y seccion
    students.map(async (student) => {
      //la ruta de la base de datos del estudiante
      const pathRef = `/intituciones/${userData.idInstitution
        }/attendance-student/${student.dni
        }/${currentYear()}/${currentMonth()}/${currentMonth()}`;
      // await setDoc(doc(db, pathRef, currentDate()), { arrivalTime: new Date() })
      const docRef = doc(
        db,
        `/intituciones/${userData.idInstitution}/attendance-student/${student.dni
        }/${currentYear()}/${currentMonth()}/${currentMonth()}/${currentDate()}`
      );
      // await setDoc(docRef,{manualAttendance:false})

      const dataStudent = await getDoc(docRef);
      if (dataStudent.exists()) {
        dispatch({
          type: AttendanceRegister.LOADING_SAVE_ATTENDANCE_GRADE_SECTION,
          payload: false,
        });
        dispatch({
          type: AttendanceRegister.CONFIRMATION_SAVE_ATTENDANCE_GRADE_SECTION_MODAL,
          payload: false,
        });
      } else {
        if (student.presente) {
          await setDoc(doc(db, pathRef, currentDate()), {
            arrivalTime: Timestamp.fromDate(
              new Date(
                currentlyDate.getFullYear(),
                currentlyDate.getMonth(),
                currentlyDate.getDate(),
                7,
                59,
                1
              )
            ),
          }).then((response) => {
            if (student.firstNumberContact) {
              try {
                axios
                  // .post(`/api/whatsapp`,
                  .post(`${URL_API}/message`, {
                    phoneNumber: `51${student.firstNumberContact}@c.us`,
                    message: `sr. ${student.firstContact}, el estudiante ${student.name
                      } ${student.lastname
                      }, acaba de ingresar al colegio a las ${dateConvertObjectStudent(
                        new Date(
                          currentlyDate.getFullYear(),
                          currentlyDate.getMonth(),
                          currentlyDate.getDate(),
                          7,
                          59,
                          1
                        )
                      )}.`,
                  });
              } catch (error) {
                console.log("error", error);
              }
            }
            dispatch({
              type: AttendanceRegister.LOADING_SAVE_ATTENDANCE_GRADE_SECTION,
              payload: false,
            });
          });
        }
        if (student.tardanza) {
          await setDoc(doc(db, pathRef, currentDate()), {
            arrivalTime: new Date(
              currentlyDate.getFullYear(),
              currentlyDate.getMonth(),
              currentlyDate.getDate(),
              8,
              1,
              1
            ),
          }).then((response) => {
            if (student.firstNumberContact) {
              try {
                axios
                  // .post(`/api/whatsapp`,
                  .post(`${URL_API}/message`, {
                    phoneNumber: `51${student.firstNumberContact}@c.us`,
                    message: `sr. ${student.firstContact}, el estudiante ${student.name
                      } ${student.lastname
                      }, acaba de ingresar al colegio a las ${dateConvertObjectStudent(
                        new Date(
                          currentlyDate.getFullYear(),
                          currentlyDate.getMonth(),
                          currentlyDate.getDate(),
                          8,
                          1,
                          1
                        )
                      )}.`,
                  });
              } catch (error) {
                console.log("error", error);
              }
            }
            dispatch({
              type: AttendanceRegister.LOADING_SAVE_ATTENDANCE_GRADE_SECTION,
              payload: false,
            });
          });
        }
        if (student.falta) {
          await setDoc(doc(db, pathRef, currentDate()), {
            arrivalTime: null,
            falta: true,
          }).then((response) => {
            if (student.firstNumberContact) {
              try {
                axios
                  // .post(`/api/whatsapp`,
                  .post(`${URL_API}/message`, {
                    phoneNumber: `51${student.firstNumberContact}@c.us`,
                    message: `sr. ${student.firstContact}, el estudiante ${student.name
                      } ${student.lastname
                      } no asistio al colegio ${dateConvertObjectStudent(
                        new Date(
                          currentlyDate.getFullYear(),
                          currentlyDate.getMonth(),
                          currentlyDate.getDate(),
                          8,
                          0,
                          0
                        )
                      )}.`,
                  });
              } catch (error) {
                console.log("error", error);
              }
            }
            dispatch({
              type: AttendanceRegister.LOADING_SAVE_ATTENDANCE_GRADE_SECTION,
              payload: false,
            });
          });
        }
        dispatch({
          type: AttendanceRegister.CONFIRMATION_SAVE_ATTENDANCE_GRADE_SECTION_MODAL,
          payload: false,
        });
      }
    });
  };
  const changeAttendanceFromStudent = (
    id: string,
    students: StudentData[],
    attendance: string
  ) => {
    students.map((student) => {
      if (student.dni === id) {
        if (attendance === "presente") {
          student.presente = true;
          student.tardanza = false;
          student.falta = false;
        }
        if (attendance === "tardanza") {
          student.presente = false;
          student.tardanza = true;
          student.falta = false;
        }
        if (attendance === "falta") {
          student.presente = false;
          student.tardanza = false;
          student.falta = true;
        }
      }
    });
    dispatch({
      type: AttendanceRegister.STUDENTS_FOR_ATTENDANCE,
      payload: students,
    });
  };
  const filterRegisterByGradeAndSection = async (
    grade: string,
    section: string,
    date: string,
    tipoDeAsistencia?: string,
    month?: string
  ) => {
    dispatch({
      type: AttendanceRegister.LOADING_SEARCH_STUDENTS,
      payload: true,
    });
    const refStudents = collection(
      db,
      `/intituciones/${userData.idInstitution}/students`
    );
    const q1 = query(
      refStudents,
      where("grade", "==", `${grade}`),
      where("section", "==", `${section}`)
    );
    const docSnap = await getDocs(q1);
    const studentsFilter: StudentData[] = [];

    docSnap.forEach(async (rta) => {
      const data = {
        ...rta.data(),
        tardanza: false,
        presente: false,
        falta: true,
      };
      studentsFilter.push(data);
    });

    if (month) {
      const rta = await getDataStudentsByDate(studentsFilter, date, month);
      if (rta && tipoDeAsistencia === "asistencia-grado") {
        dispatch({
          type: AttendanceRegister.STUDENTS_FOR_ATTENDANCE,
          payload: rta,
        });
        dispatch({
          type: AttendanceRegister.LOADING_SEARCH_STUDENTS,
          payload: false,
        });
      } else if (rta && tipoDeAsistencia === "registros") {
        dispatch({
          type: AttendanceRegister.STUDENT_BY_GRADE_AND_SECTION,
          payload: rta,
        });
        dispatch({
          type: AttendanceRegister.LOADING_SEARCH_STUDENTS,
          payload: false,
        });
      } else {
        dispatch({
          type: AttendanceRegister.LOADING_SEARCH_STUDENTS,
          payload: false,
        });
      }
    }
  };

  const orderDailyReport = (rta: RecordReporteDiario[]) => {
    rta.sort((a: any, b: any) => {
      const fe: string = a && a.estudiante.lastname;
      const se: string = b && b.estudiante.lastname;

      if (fe > se) {
        return 1;
      }
      if (fe < se) {
        return -1;
      }
      if (a.estudiante.lastname === b.estudiante.lastname) {
        if (a.estudiante.firstname > b.estudiante.firstname) return 1;
        if (a.estudiante.firstname < b.estudiante.firstname) return -1;
        return 0;
      }
      return 0;
    });
    return rta;
  };

  const dataStudentsTablaDaily = async (month: string, grade: string, mes: number) => {
    try {
      // Obtener estudiantes del grado
      const estudiantesDelGrado = await obtenerEstudiantesDelGrado(grade);
      
      // Obtener datos de asistencia para cada estudiante
      const arrayEstudiantesAsistencia = await obtenerAsistenciaEstudiantes(
        estudiantesDelGrado, 
        month, 
        mes
      );
      
      // Ordenar y despachar los datos
      const orderedData = orderDailyReport(arrayEstudiantesAsistencia);
      dispatch({ 
        type: AttendanceRegister.RECORD_ESTUDIANTES_DAILY, 
        payload: orderedData 
      });
      
    } catch (error) {
      console.log("Error en dataStudentsTablaDaily:", error);
    }
  };

  // Función auxiliar para obtener estudiantes del grado
  const obtenerEstudiantesDelGrado = async (grade: string): Promise<StudentData[]> => {
    try {
      const refStudents = collection(
        db,
        `/intituciones/${userData.idInstitution}/students`
      );
      const q = query(
        refStudents, 
        where("grade", "==", grade), 
        orderBy("lastname")
      );
      
      const estudiantesSnapshot = await getDocs(q);
      const estudiantesDelGrado: StudentData[] = [];
      
      estudiantesSnapshot.forEach((estudiante) => {
        estudiantesDelGrado.push(estudiante.data());
      });
      
      return estudiantesDelGrado;
    } catch (error) {
      console.log("Error obteniendo estudiantes:", error);
      throw error;
    }
  };

  // Función auxiliar para obtener asistencia de un estudiante
  const obtenerAsistenciaEstudiante = async (
    estudiante: StudentData, 
    month: string, 
    mes: number
  ): Promise<any[]> => {
    try {
      const pathMesRef = collection(
        db, 
        `/intituciones/${userData.idInstitution}/attendance-student/${estudiante.dni}/${currentYear()}/${month}/${month}`
      );
      
      const asistenciaSnapshot = await getDocs(pathMesRef);
      const arrayAsistencia: any[] = [];
      
      asistenciaSnapshot.forEach((doc) => {
        if (doc.data().falta) {
          arrayAsistencia.push({ 
            falta: true, 
            id: doc.id, 
            day: days[new Date(Number(currentYear()), mes, Number(doc.id), 7, 30, 0).getDay()]
          });
        } else if (doc.data().arrivalTime) {
          arrayAsistencia.push({ 
            arrivalTime: attendanceState(hoursUnixDate(doc.data().arrivalTime)), 
            id: doc.id, 
            day: getDayUnixDate(doc.data().arrivalTime)
          });
        }
      });
      
      return arrayAsistencia;
    } catch (error) {
      console.log("Error obteniendo asistencia del estudiante:", error);
      return [];
    }
  };

  // Función auxiliar para obtener asistencia de todos los estudiantes
  const obtenerAsistenciaEstudiantes = async (
    estudiantesDelGrado: StudentData[], 
    month: string, 
    mes: number
  ): Promise<RecordReporteDiario[]> => {
    try {
      const arrayEstudiantesAsistencia: RecordReporteDiario[] = [];
      
      // Procesar cada estudiante de forma secuencial para evitar problemas de concurrencia
      for (const estudiante of estudiantesDelGrado) {
        const asistencia = await obtenerAsistenciaEstudiante(estudiante, month, mes);
        arrayEstudiantesAsistencia.push({ estudiante, asistencia });
      }
      
      return arrayEstudiantesAsistencia;
    } catch (error) {
      console.log("Error obteniendo asistencia de estudiantes:", error);
      throw error;
    }
  };

  const dataStudentForTableReport = async (month: string, grade: string) => {
    console.log('month', month);
    try {
      // 1. Obtener estudiantes del grado de forma optimizada
      const estudiantesDelGrado = await obtenerEstudiantesDelGrado(grade);
      
      // 2. Procesar asistencia de forma secuencial para evitar race conditions
      const arrayDataEstudiante: RecordEstudiante[] = [];
      
      for (const estudiante of estudiantesDelGrado) {
        const dataAcumulado = await procesarAsistenciaEstudiante(estudiante, month);
        arrayDataEstudiante.push(dataAcumulado);
      }
      
      // 3. Despachar resultado
      dispatch({
        type: AttendanceRegister.RECORD_ESTUDIANTES_MENSUAL,
        payload: arrayDataEstudiante,
      });
      
    } catch (error) {
      console.log("Error en dataStudentForTableReport:", error);
    }
  };

  // Función auxiliar optimizada para procesar asistencia de un estudiante
  const procesarAsistenciaEstudiante = async (
    estudiante: StudentData, 
    month: string
  ): Promise<RecordEstudiante> => {
    try {
      const refPathAsistencia = collection(
        db,
        `/intituciones/${userData.idInstitution}/attendance-student/${estudiante.dni}/${currentYear()}/${month}/${month}`
      );
      
      const dataEstudianteDelMes = await getDocs(refPathAsistencia);
      
      // Inicializar contadores con valores explícitos
      const dataAcumulado: RecordEstudiante = { 
        falta: 0, 
        puntual: 0, 
        tardanza: 0,
        nombres: estudiante.name || '',
        apellidoMaterno: estudiante.firstname || '',
        apellidoPaterno: estudiante.lastname || '',
        id: estudiante.dni || ''
      };
      
      // Procesar cada documento de asistencia
      dataEstudianteDelMes.forEach((doc) => {
        const docData = doc.data();
        
        // Contar faltas
        if (docData.falta) {
          dataAcumulado.falta = (dataAcumulado.falta || 0) + 1;
          /* console.log(`Falta encontrada para ${estudiante.name}:`, doc.id, 'Total faltas:', dataAcumulado.falta); */
        }
        
        // Contar puntualidad y tardanzas (solo si no es falta)
        if (!docData.falta && docData.arrivalTime) {
          if (attendanceState(hoursUnixDate(docData.arrivalTime))) {
            dataAcumulado.puntual = (dataAcumulado.puntual || 0) + 1;
            /* console.log(`Puntualidad encontrada para ${estudiante.name}:`, doc.id, 'Total puntual:', dataAcumulado.puntual); */
          } else {
            dataAcumulado.tardanza = (dataAcumulado.tardanza || 0) + 1;
            /* console.log(`Tardanza encontrada para ${estudiante.name}:`, doc.id, 'Total tardanzas:', dataAcumulado.tardanza); */
          }
        }
      });
      
      console.log(`Resumen final para ${estudiante.name}:`, {
        falta: dataAcumulado.falta,
        puntual: dataAcumulado.puntual,
        tardanza: dataAcumulado.tardanza,
        totalDocs: dataEstudianteDelMes.size
      });
      
      return dataAcumulado;
      
    } catch (error) {
      console.log("Error procesando asistencia del estudiante:", error);
      // Retornar datos por defecto en caso de error
      return {
        falta: 0,
        puntual: 0,
        tardanza: 0,
        nombres: estudiante.name,
        apellidoMaterno: estudiante.firstname,
        apellidoPaterno: estudiante.lastname,
        id: estudiante.dni
      };
    }
  };
  const filterRegisterByGrade = async (
    grade: string,
    date: string,
    month: string
  ) => {
    dispatch({
      type: AttendanceRegister.LOADING_SEARCH_STUDENTS,
      payload: true,
    });
    const refStudents = collection(
      db,
      `/intituciones/${userData.idInstitution}/students`
    );
    const q = query(refStudents, where("grade", "==", grade));
    const docSnap = await getDocs(q);
    const studentsFilter: StudentData[] = [];
    docSnap.forEach((rta) => {
      studentsFilter.push(rta.data());
    });
    //aqui hago un get de los ingresos y salidas de los estudiantes con esta funcion
    const rta = await getDataStudentsByDate(studentsFilter, date, month);
    if (rta) {
      dispatch({ type: AttendanceRegister.STUDENT_BY_GRADE, payload: rta });
      dispatch({
        type: AttendanceRegister.LOADING_SEARCH_STUDENTS,
        payload: false,
      });
    }
  };
  const justificarFalta = async (
    id: string,
    date: string,
    justication: JustificationValue
  ) => {
    const attendanceRef = doc(
      db,
      `/intituciones/${userData.idInstitution
      }/attendance-student/${id}/${currentYear()}/${currentMonth()}/${currentMonth()}/${date}`
    );
    //deberia crear un modal con campos para poner un motivo de la falta
    await setDoc(attendanceRef, {
      arrivalTime: "justificado",
      justification: true,
      justificationMotive: justication.justification,
    });
  };

  const justificacionInfoByStudent = async (id: string, date: string) => {
    const attendanceRef = doc(
      db,
      `/intituciones/${userData.idInstitution
      }/attendance-student/${id}/${currentYear()}/${currentMonth()}/${currentMonth()}/${date}`
    );
    const docSnap = await getDoc(attendanceRef);
    // console.log('docSnap',docSnap.data())
    const rta: JustificacionStudent = { ...docSnap.data(), id: docSnap.id };
    dispatch({
      type: AttendanceRegister.SHOW_JUSTIFICACION_MOTIVO,
      payload: rta,
    });
  };
  const showJustificacionMotivo = (value: boolean) => {
    dispatch({
      type: AttendanceRegister.SHOW_JUSTIFICACION_MOTIVO_MODAL,
      payload: value,
    });
  };
  const showJustificaconFaltaModal = (value: boolean) => {
    dispatch({
      type: AttendanceRegister.SHOW_JUSTIFICACION_FALTA_MODAL,
      payload: value,
    });
  };
  const showJustificaconFaltaConfirmationModal = (value: boolean) => {
    dispatch({
      type: AttendanceRegister.SHOW_JUSTIFICACION_FALTA_CONFIRMATION_MODAL,
      payload: value,
    });
  };

  const saveAttendance = (value: boolean) => {
    dispatch({
      type: AttendanceRegister.CONFIRMATION_SAVE_ATTENDANCE_GRADE_SECTION_MODAL,
      payload: !value,
    });
  };
  return {
    saveAttendance,
    showJustificacionMotivo,
    justificacionInfoByStudent,
    filterRegisterByGradeAndSection,
    justificarFalta,
    showJustificaconFaltaModal,
    showJustificaconFaltaConfirmationModal,
    changeAttendanceFromStudent,
    saveChangesFromAttendanceByGradeSecction,
    filterRegisterByGrade,
    dataStudentForTableReport,
    dataStudentsTablaDaily
  };
};

export default useAttendanceRegister;
