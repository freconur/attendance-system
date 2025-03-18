import { app } from "@/firebase/firebaseConfig"
import { collection, doc, getDoc, getDocs, getFirestore, query, setDoc, updateDoc, where } from "firebase/firestore"
import { useGlobalContext, useGlobalContextDispatch } from "../context/GlobalContext"
import { Employee, TypesEmployee, UpdateDataUser } from "../types/types"
import { AttendanceRegister } from "../actions/actionAttendance"
import { currentDate, currentMonth, currentYear, currentlyHour, dateConvertObjectStudent, functionDateConvert, getDayFromDate, getDayFromDateFalta, hoursUnixDate, hoursUnixDateForDetailStudent, transformMonthToEnglish } from "@/dates/date"
import { attendanceDepartureTime } from "@/utils/attendanceState"
import { validateDepartureTime } from "@/utils/validateRolEmployee"
import axios from "axios"
import { toast } from 'react-toastify';


const useAttendanceEmployee = () => {
  const URL_API = "https://whatsapp-asistencia-production.up.railway.app"
  // const URL_API_GOOGLE = "http://localhost:3001"
  const URL_API_GOOGLE = "https://api-attendance-production-6be0.up.railway.app"
  const db = getFirestore(app)
  const { userData } = useGlobalContext()
  const dispatch = useGlobalContextDispatch()


  const employeeModal = (value: boolean) => {
    dispatch({ type: AttendanceRegister.ACTIVE_EMPLOYEE_MODAL, payload: !value })
  }
  const registerEmployee = async (data: Employee) => {
    console.log('userData', userData)

    const promiseNewEmployee = new Promise<boolean>((resolve, reject) => {
      try {
        axios
          .post(`${URL_API_GOOGLE}/crear-docente`,
            {
              dni: data.dni,
              email: `${data.dni}@${userData.extensionForUsers}.com`,
              password: data.dni,
              idInstitution: userData.idInstitution
            })
          .then(async (res) => {
            if (res.data.estado) {
              const employee = {
                name: data.name?.toLowerCase(),
                firstname: data.firstname?.toLowerCase(),
                lastname: data.lastname?.toLowerCase(),
                rol: Number(data.rol),
                dni: data.dni,
                idInstitution: userData.idInstitution,
                institutionName: userData.institutionName?.toLowerCase(),
                celular: data.numberPhone,
                extensionForUsers: `${userData.extensionForUsers?.toLowerCase()}`,
                misCursos: [],
                acc:`${data.dni}@${userData.extensionForUsers}.com`
              }
              await setDoc(doc(db, `/intituciones/${userData.idInstitution}/usuarios`, `${data.dni}`), employee)
              await setDoc(doc(db, `users`, `${data.dni}`), employee)
                .then(rta => {
                  resolve(true)
                })
            }
          })
      } catch (error) {
        console.log('error', error)
        reject()
      }
    })
    toast.promise(promiseNewEmployee,
      {
        pending: 'creando usuario',
        success: 'Se creo docente con exito 👌',
        error: 'Parece que algo fallo, intentalo despues 🤯'
      })
  }
  const getTypeEmployee = async () => {
    const typesEmployee: TypesEmployee[] = []
    const querySnapshot = await getDocs(collection(db, `/intituciones/${userData.idInstitution}/types-employee`))
    querySnapshot.forEach((doc) => {
      typesEmployee.push(doc.data())
    });
    // console.log('userData', userData.idInstitution)
    // console.log('typesEmployee', typesEmployee)
    dispatch({ type: AttendanceRegister.GET_TYPES_EMPLOYEE, payload: typesEmployee })
  }

  const getDataEmployeeByRol = async (employees: Employee[], date: string) => {
    const employeeArray: Employee[] = []
    await Promise.all(employees.map(async (employee) => {
      const refAttendance = doc(db, `/intituciones/${userData.idInstitution}/attendance-employee/${employee.dni}/${currentYear()}/${currentMonth()}/${currentMonth()}/${date}`)
      const attendanceEmployee = await getDoc(refAttendance)

      const newData = { ...employee, attendanceByDate: attendanceEmployee.exists() ? attendanceEmployee.data().justification ? "justificado" : attendanceEmployee.data().arrivalTime === null ? "falto" : attendanceEmployee.data().arrivalTime ? hoursUnixDate(attendanceEmployee.data().arrivalTime) : "falto" : "falto", departureByDate: attendanceEmployee.exists() ? attendanceEmployee?.data().departureTime ? hoursUnixDate(attendanceEmployee?.data().departureTime) : "sin registro" : "sin registro" }

      return employeeArray.push(newData)
    }))

    if (employeeArray) {
      employeeArray.sort((a: any, b: any) => {
        const fe: string = a && a.lastname
        const se: string = b && b.lastname

        if (fe > se) {
          return 1;
        }
        // if(fe && se) {}
        if (fe < se) {
          return -1;
        }
        return 0;
      })
    }
    return employeeArray
  }

  const getEmployees = async (rol: string, date: string) => {
    console.log('rol', rol)
    const employeeRef = collection(db, `/intituciones/${userData.idInstitution}/usuarios`);

    // Create a query against the collection.
    const q = query(employeeRef, where("rol", "==", Number(rol)));
    const docSnap = await getDocs(q)
    const employeeFilter: Employee[] = []
    docSnap.forEach(async (rta) => {
      const data = { ...rta.data() }
      employeeFilter.push(data)
    })


    const rta = await getDataEmployeeByRol(employeeFilter, date)
    if (rta) {
      dispatch({ type: AttendanceRegister.GET_EMPLOYEES, payload: rta })
    }
  }
  const employeeArrivalTime = async (employeeCode: string) => {
    const arrivalTimeRef = doc(db, `/intituciones/${userData.idInstitution}/attendance-employee/${employeeCode}/${currentYear()}/${currentMonth()}/${currentMonth()}/${currentDate()}`)

    //aqui deberia de condicionar segun la hora si registra la hora de ingreso o la salida o en todo caso si es la version de prueba quitar la validacion
    const currentHour = new Date()

    const data = attendanceDepartureTime(currentHour.getHours().toString().padStart(2, "0"))
    if (data?.attendance === true && data?.departure === false) {
      // const rta: AttendanceDepartureTime = attendanceDepartureTime(`${currentHour.getHours()}`)
      console.log('estamos en ingreso')
      await setDoc(arrivalTimeRef, { arrivalTime: new Date(), manualAttendance: true })//crea la hora de ingreso (el arrivaltime) del estudiante
    } else if (data?.attendance === false && data?.departure === true) {
      console.log('estamos en salida')
      await setDoc(arrivalTimeRef, { departure: new Date(), manualAttendance: true }, { merge: true })//crea la hora de salida (el arrivaltime) del estudiante
    }
  }

  const getEmployeeAndAttendance = async (employee: string) => {
    dispatch({ type: AttendanceRegister.LOADER_GET_EMPLOYEE, payload: true })
    const arrivalTimeRef = doc(db, `/intituciones/${userData.idInstitution}/attendance-employee/${employee}/${currentYear()}/${currentMonth()}/${currentMonth()}/${currentDate()}`)
    const refData = doc(db, `/intituciones/${userData.idInstitution}/usuarios`, `${employee}`)
    //creo una constante con la hora que esta marcando el ingreso o salida
    const hourAttendanDeparture = new Date()
    //los ingresos de los profesores no se enviaran al whatsapp, siemplemente quedaran registrados en la base de datos, para el libre acceso del los cargos superiores.
    const employeeData = await getDoc(refData)
    const employeeAttendanceData = await getDoc(arrivalTimeRef)
    if (employeeData.exists()) {//verificando si el usuario existe en la base de datos
      // employeeArrivalTime(employee)
      if (employeeAttendanceData.exists()) {//verificando si el usuario ya registro su ingreso para luego condicionar si registrara el ingreso o salida
        if (employeeAttendanceData.data().arrivalTime && employeeAttendanceData.data().departureTime === undefined) {
          //aqui deberia de verificar mediante una funcion para validar que no se haya marcado por error la hora de salida en caso haga una doble registro de ingreso.
          //1- primero me traigo el valor de arrivalTime
          console.log('sin registro de entrada')
          const validateDataEmployee = { hour: hourAttendanDeparture.getHours(), min: hourAttendanDeparture.getMinutes() }
          const rta = validateDepartureTime(employeeAttendanceData.data()?.arrivalTime, validateDataEmployee)

          //esperamos la respuesta de rta y segun la espuesta manjamos la funcionalidad
          rta
            ? await setDoc(arrivalTimeRef, { departureTime: hourAttendanDeparture, manualAttendance: true }, { merge: true })
            : console.log("ya no genera otra vez el ingreso")

          // await setDoc(arrivalTimeRef, { departureTime: hourAttendanDeparture, manualAttendance: true }, { merge: true })
        } else if (employeeAttendanceData.data().arrivalTime === undefined) {
          //AQUI DEBERIA DE CREAR LA FUNCION QUE ENVIARA EL MENSAJE DE WHATSAPPP A LOS NUMEROS TELEFONICOS DE LOS PROFESORES.
          console.log('sin registro de entrada')
          if (employeeData.data().celular) {

            try {
              axios
                .post(`${URL_API}/v1/messages`,
                  {
                    // phoneNumber: `51${studentData.data().firstNumberContact}@c.us`,
                    number: `51${employeeData.data().celular}`,
                    // phoneNumber: `51982752688@c.us`,
                    message: `Profesor *${employeeData.data().name} ${employeeData.data().lastname} ${employeeData.data().firstname}*, haz registrado tu ingreso a las  ${dateConvertObjectStudent(hourAttendanDeparture)}.`
                    // message: `I.E.P. Divino Maestro: este es un mensaje de prueba para aplicacion de registro de asistencia.`
                  })
            } catch (error) {
              console.log('error', error)
            }
          }
          await setDoc(arrivalTimeRef, { arrivalTime: hourAttendanDeparture, manualAttendance: true })
          dispatch({ type: AttendanceRegister.LOADER_GET_EMPLOYEE, payload: false })

        } else console.log('ya no se hace nada')
      } else {
        console.log('sin registro de entrada basico')
        if (employeeData.data().celular) {
          console.log('employeeData.data()', employeeData.data())
          try {
            axios
              .post(`${URL_API}/v1/messages`,
                {
                  // phoneNumber: `51${studentData.data().firstNumberContact}@c.us`,
                  number: `51${employeeData.data().celular}`,
                  // phoneNumber: `51982752688@c.us`,
                  message: `Profesor *${employeeData.data().name} ${employeeData.data().lastname} ${employeeData.data().firstname}*, haz registrado tu ingreso a las  ${dateConvertObjectStudent(hourAttendanDeparture)}.`
                  // message: `I.E.P. Divino Maestro: este es un mensaje de prueba para aplicacion de registro de asistencia.`
                })
          } catch (error) {
            console.log('error', error)
          }
        }
        
        await setDoc(arrivalTimeRef, { arrivalTime: hourAttendanDeparture, manualAttendance: true })
      }

      dispatch({ type: AttendanceRegister.GET_EMPLOYEE, payload: { ...employeeData.data(), currentlyHour: currentlyHour(hourAttendanDeparture) } })
      dispatch({ type: AttendanceRegister.LOADER_GET_EMPLOYEE, payload: false })

    } else {
      dispatch({ type: AttendanceRegister.GET_EMPLOYEE, payload: { ...employeeData.data(), currentlyHour: currentlyHour(hourAttendanDeparture) } })
      dispatch({ type: AttendanceRegister.LOADER_GET_EMPLOYEE, payload: false })
    }

  }

  const attendanceEmployee = async (dni: string) => {
    const docRef = doc(db, `/intituciones/${userData.idInstitution}/usuarios/`, `${dni}`);
    // const docRef = doc(db, `/intituciones/${userData.idInstitution}/employee/`, `${dni}`);
    console.log('dni', dni)
    const docSnap = await getDoc(docRef);

    let rta: Employee
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      rta = docSnap.data()
      dispatch({ type: AttendanceRegister.GET_EMPLOYEE, payload: rta })
      return true
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }

    //tengo que crear el registro de asistencia de cada personal que registre su asistencia
  }

  const getDetailAttendanceEmployee = async (dni: string, month: string) => {
    const querySnapshot = await getDocs(collection(db, `/intituciones/${userData.idInstitution}/attendance-employee/${dni}/${currentYear()}/${month}/${month}`));
    const arrivalTimeFromEmployee: any = []

    querySnapshot.forEach((doc) => {
      if (doc.data().justification) {
        arrivalTimeFromEmployee.push(getDayFromDate(new Date(`${transformMonthToEnglish(currentMonth())},${doc.id}, ${currentYear()}`)))
      } else if (doc.data().falta) {
        arrivalTimeFromEmployee.push(getDayFromDateFalta(new Date(`${transformMonthToEnglish(currentMonth())},${doc.id}, ${currentYear()}`)))
      } else {
        console.log('estamos en la tercera')
        arrivalTimeFromEmployee.push(hoursUnixDateForDetailStudent(doc.data().arrivalTime, doc.data().departureTime))

      }
    })
    if (arrivalTimeFromEmployee) {
      arrivalTimeFromEmployee.sort((a: any, b: any) => {
        const fe = Number(a?.date)
        const se = Number(b?.date)
        if (fe > se) {
          return 1;
        }
        if (fe < se) {
          return -1;
        }
        return 0;
      })
      // console.log('arrivalTimeFromEmployee', arrivalTimeFromEmployee)
      dispatch({ type: AttendanceRegister.GET_EMPLOYEE_RESUME_ATTENDANCE, payload: arrivalTimeFromEmployee })

    }
  }

  const getDetailAttendanceEmployeeConsultas = async (dni: string, month: string, id: string) => {
    const querySnapshot = await getDocs(collection(db, `/intituciones/${id}/attendance-employee/${dni}/${currentYear()}/${month}/${month}`));
    const arrivalTimeFromEmployee: any = []

    querySnapshot.forEach((doc) => {
      if (doc.data().justification) {
        arrivalTimeFromEmployee.push(getDayFromDate(new Date(`${transformMonthToEnglish(currentMonth())},${doc.id}, ${currentYear()}`)))
      } else if (doc.data().falta) {
        arrivalTimeFromEmployee.push(getDayFromDateFalta(new Date(`${transformMonthToEnglish(currentMonth())},${doc.id}, ${currentYear()}`)))
      } else {
        console.log('estamos en la tercera')
        arrivalTimeFromEmployee.push(hoursUnixDateForDetailStudent(doc.data().arrivalTime, doc.data().departureTime))

      }
    })
    if (arrivalTimeFromEmployee) {
      arrivalTimeFromEmployee.sort((a: any, b: any) => {
        const fe = Number(a?.date)
        const se = Number(b?.date)
        if (fe > se) {
          return 1;
        }
        if (fe < se) {
          return -1;
        }
        return 0;
      })
      // console.log('arrivalTimeFromEmployee', arrivalTimeFromEmployee)
      dispatch({ type: AttendanceRegister.GET_EMPLOYEE_RESUME_ATTENDANCE, payload: arrivalTimeFromEmployee })

    }
  }

  const confirmationUpdateEmployee = (value: boolean) => {
    dispatch({ type: AttendanceRegister.UPDATE_EMPLOYEE_CONFIRMATION_MODAL, payload: value })
  }
  const updateEmployee = async (data: UpdateDataUser) => {
    const employeeRef = doc(db, `/intituciones/${userData?.idInstitution}/usuarios`, data.dni as string);
    console.log('data', data)
    console.log('userData', userData)
    // Set the "capital" field of the city 'DC'
    const dataEmployee = {
      misCursos: data.misCursos,
      dni: data.dni,
      name: data.name,
      lastname: data.lastname,
      firstname: data.firstname,
      rol: data.rol,
      celular: data.celular ? data.celular : ""
    }
    await updateDoc(employeeRef, dataEmployee);
  }
  return { confirmationUpdateEmployee, updateEmployee, employeeModal, registerEmployee, getTypeEmployee, getEmployees, attendanceEmployee, getEmployeeAndAttendance, getDetailAttendanceEmployee, getDetailAttendanceEmployeeConsultas }
}

export default useAttendanceEmployee

