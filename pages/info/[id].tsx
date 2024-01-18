import { useGlobalContext } from "@/features/context/GlobalContext"
import useNavbarSearch from "@/features/hooks/useNavbarSearch"
import { convertGrade } from "@/utils/validateGrade"
import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect } from "react"



const InfoStudent = () => {
  const router = useRouter()
  const { searchStudent } = useNavbarSearch()
  const { studentData } = useGlobalContext()
  console.log('routerrouter', router)

  useEffect(() => {
    searchStudent(`${router.query.id}`)
  }, [router.query.id])
  return (
    <div className="p-5 ">
      <div className="">
        <div className="my-5">
          <h3 className="text-2xl text-slate-500 uppercase text-center font-semibold">{studentData.name} {studentData.lastname}</h3>
        </div>
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
        <div className="w-full  flex justify-center items-center ">
          <div className="bg-white p-5 shadow-md w-full sm:w-[500px] rounded-md">
            <p className="text-slate-500 uppercase text-md font-semibold mb-3"><span className="text-slate-400 font-normal">dni:</span> {studentData.dni}</p>
            <p className="text-slate-500 uppercase text-md font-semibold mb-3"><span className="text-slate-400 font-normal">grado:</span> {convertGrade(studentData.grade as string)}</p>
            <p className="text-slate-500 uppercase text-md font-semibold mb-3"><span className="text-slate-400 font-normal">sección:</span> {studentData.section}</p>
            <p className="text-slate-500 uppercase text-md font-semibold mb-3"><span className="text-slate-400 font-normal">nombre del padre:</span> {studentData.nameFather}</p>
            <p className="text-slate-500 uppercase text-md font-semibold mb-3"><span className="text-slate-400 font-normal">numero:</span> {studentData.numberFather}</p>
            <p className="text-slate-500 uppercase text-md font-semibold mb-3"><span className="text-slate-400 font-normal">nombre del madre:</span> {studentData.nameMother}</p>
            <p className="text-slate-500 uppercase text-md font-semibold mb-3"><span className="text-slate-400 font-normal">numero:</span> {studentData.numberMother}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InfoStudent