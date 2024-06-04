import UpdateEmployeeConfirmationModal from "@/Modals/UpdateEmployeeConfirmationModal"
import UpdateStudentConfirmationModal from "@/Modals/updateStudentConfirmationModal"
import PrivateRoutes from "@/components/layouts/PrivateRoutes"
import UpdateFormEmployee from "@/components/updateFormEmployee/UpdateFormEmployee"
import UpdateFormStudnets from "@/components/updateFormStudents/updateFormStudnets"
import { useGlobalContext } from "@/features/context/GlobalContext"
import useAuthentication from "@/features/hooks/useAuthentication"
import useNavbarSearch from "@/features/hooks/useNavbarSearch"
import UseRegisterStudents from "@/features/hooks/useRegisterStudents"
import { Employee, StudentData, UpdateDataUser } from "@/features/types/types"
import { convertGrade } from "@/utils/validateGrade"
import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { FaUserAlt } from "react-icons/fa"


const initialValue = {
  dni:"",
  firstname:"",
  name:"",
  lastname:"",
  numberPhone:"",
}
const InfoStudent = () => {
  const { getUserData } = useAuthentication()
  const router = useRouter()
  const { dataStudent } = useNavbarSearch()
  const { getGrades } = UseRegisterStudents()
  const { studentData, userData, updateEmployeeConfirmationModal } = useGlobalContext()
const [employee, setEmployee] = useState<UpdateDataUser>(initialValue)
  const onChangeItem = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value
    })
  }

  useEffect(() => {
    getUserData()
    getGrades()
    if (userData) {
      dataStudent(`${router.query.id}`)
    }
  }, [router.query.id, userData.name])

  useEffect(() => {
    setEmployee(studentData)
  },[studentData.dni])
  return (
    <div className="p-5 ">
      {
        updateEmployeeConfirmationModal && 
        <UpdateEmployeeConfirmationModal employee={employee}/>
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
          {/* esto tengo que cambiarlo por un form dise;ado para employee*/}
        <UpdateFormEmployee  employee={employee} onChangeItem={onChangeItem}/>
        {/* // <UpdateFormEmployee grades={grades} student={student} onChangeItem={onChangeItem}/> */}
      </div>
    </div>
  )
}

export default InfoStudent

InfoStudent.Auth = PrivateRoutes