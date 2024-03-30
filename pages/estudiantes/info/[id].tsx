import PrivateRoutes from "@/components/layouts/PrivateRoutes"
import { useGlobalContext } from "@/features/context/GlobalContext"
import useAuthentication from "@/features/hooks/useAuthentication"
import useNavbarSearch from "@/features/hooks/useNavbarSearch"
import { convertGrade } from "@/utils/validateGrade"
import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { FaUserAlt } from "react-icons/fa"



const InfoStudent = () => {
  const { getUserData } = useAuthentication()
  const router = useRouter()
  const { dataStudent } = useNavbarSearch()
  const { studentData, userData } = useGlobalContext()

  useEffect(() => {
    getUserData()
    if (userData) {
      dataStudent(`${router.query.id}`)
    }
  }, [router.query.id, userData.name])
  return (
    <div className="p-5 ">
      <div className="">
        <div className="my-5">
          <h3 className="text-2xl text-slate-500 uppercase text-center font-semibold">{studentData.name} {studentData.lastname}</h3>
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

        <div className="w-full  flex justify-center items-center ">
          <div className="bg-white p-5 shadow-md w-full sm:w-[500px] rounded-md">
            <p className="text-slate-500 uppercase text-md font-semibold mb-3"><span className="text-slate-400 font-normal">dni:</span> {studentData.dni}</p>
            <p className="text-slate-500 uppercase text-md font-semibold mb-3"><span className="text-slate-400 font-normal">grado:</span> {convertGrade(studentData.grade as string)}</p>
            <p className="text-slate-500 uppercase text-md font-semibold mb-3"><span className="text-slate-400 font-normal">sección:</span> {studentData.section}</p>
            <p className="text-slate-500 uppercase text-md font-semibold mb-3"><span className="text-slate-400 font-normal">nombre del padre:</span> {studentData.firstContact}</p>
            <p className="text-slate-500 uppercase text-md font-semibold mb-3"><span className="text-slate-400 font-normal">numero:</span> {studentData.firstNumberContact}</p>
            <p className="text-slate-500 uppercase text-md font-semibold mb-3"><span className="text-slate-400 font-normal">nombre del madre:</span> {studentData.secondContact}</p>
            <p className="text-slate-500 uppercase text-md font-semibold mb-3"><span className="text-slate-400 font-normal">numero:</span> {studentData.secondNumberContact}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InfoStudent

InfoStudent.Auth = PrivateRoutes