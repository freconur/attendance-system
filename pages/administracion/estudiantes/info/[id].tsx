import UpdateStudentConfirmationModal from "@/Modals/updateStudentConfirmationModal"
import PrivateRouteAdmin from "@/components/layouts/PrivateRouteAdmin"
import PrivateRoutes from "@/components/layouts/PrivateRoutes"
import UpdateFormStudnets from "@/components/updateFormStudents/updateFormStudnets"
import { useGlobalContext } from "@/features/context/GlobalContext"
import useAuthentication from "@/features/hooks/useAuthentication"
import useNavbarSearch from "@/features/hooks/useNavbarSearch"
import UseRegisterStudents from "@/features/hooks/useRegisterStudents"
import { StudentData } from "@/features/types/types"
import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { FaUserAlt } from "react-icons/fa"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialValue = {
  dni: "",
  firstname: "",
  name: "",
  lastname: "",
  firstContact: "",
  firstNumberContact: "",
  secondNumberContact: "",
  secondContact: "",
  grade: "",
}
const InfoStudent = () => {
  const { getUserData } = useAuthentication()
  const router = useRouter()
  const { dataStudent } = useNavbarSearch()
  const { getGrades } = UseRegisterStudents()
  const { studentData, userData, grades, updateStudentConfirmationModal } = useGlobalContext()
  const [student, setStudent] = useState<StudentData>(initialValue)
  const onChangeItem = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value
    })
  }

  useEffect(() => {
    // getUserData()
    getGrades()
    if (userData) {
      dataStudent(`${router.query.id}`)
    }
  }, [router.query.id])
  // }, [router.query.id, userData.name])

  useEffect(() => {
    setStudent(studentData)
  }, [studentData.dni])

  return (
    <div className="p-5 ">
      <ToastContainer />
      {
        updateStudentConfirmationModal &&
        <UpdateStudentConfirmationModal student={student} />
      }
      <div className="">
        <div className="my-5">
          <h3 className="text-2xl text-slate-500 uppercase text-center font-semibold">{studentData.name} {studentData.lastname} {studentData.firstname}</h3>
        </div>
        {
          studentData?.pictureProfile ?
            <div className="rounded-full w-[200px] h-[200px] overflow-hidden m-auto mb-5 mt-10">
              <Image
                className=''
                src={studentData.pictureProfile as string}
                // src={require(`assets/slider-web/biombos.jpg`).default}
                alt={studentData.name as string}
                width={200}
                height={200}
                priority
              />
            </div>
            :
            <div className='bg-blue-100 p-3 rounded-sm m-auto mb-3 flex items-center justify-center w-[200px] h-[200px]'>
              <FaUserAlt className='w-[60%] h-[60%] text-blue-200' />
            </div>
        }

        <UpdateFormStudnets grades={grades} student={student} onChangeItem={onChangeItem} />
        {/* <div className="w-full  flex justify-center items-center ">
          <div className="bg-white p-5 shadow-md w-full sm:w-[500px] rounded-md">
            <p className="text-slate-500 uppercase text-md font-semibold mb-3"><span className="text-slate-400 font-normal">dni:</span> {studentData.dni}</p>
            <p className="text-slate-500 uppercase text-md font-semibold mb-3"><span className="text-slate-400 font-normal">grado:</span> {convertGrade(studentData.grade as string)}</p>
            <p className="text-slate-500 uppercase text-md font-semibold mb-3"><span className="text-slate-400 font-normal">1er contacto:</span> {studentData.firstContact}</p>
            <p className="text-slate-500 uppercase text-md font-semibold mb-3"><span className="text-slate-400 font-normal">1er numero:</span> {studentData.firstNumberContact}</p>
            {
              studentData.secondContact && studentData.secondNumberContact ?
                <>
                  <p className="text-slate-500 uppercase text-md font-semibold mb-3"><span className="text-slate-400 font-normal">2do contacto:</span> {studentData.secondContact}</p>
                  <p className="text-slate-500 uppercase text-md font-semibold mb-3"><span className="text-slate-400 font-normal">2do numero:</span> {studentData.secondNumberContact}</p>
                </>
                : null
            }
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default InfoStudent

InfoStudent.Auth = PrivateRouteAdmin