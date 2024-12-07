import React from 'react'
import Image from 'next/image'
const NuestroproductocardSection = () => {
  return (
    <div className='my-20'>
          <h3 className='text-center font-bold text-sky-500 text-2xl font-montserrat mt-10 uppercase mb-10'>Nuestros productos digitales</h3>
          <div className='grid justify-around items-center gap-5 md:grid-cols-gridCardStudent xl:grid-cols-gridFeature'>
            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow ">
              {/* <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"> */}
              <a href="#">
                <Image
                  className="rounded-t-lg"
                  src="https://firebasestorage.googleapis.com/v0/b/attendance-system-d1f40.appspot.com/o/landingpage%2Fasistencia-image-card-1.jpg?alt=media&token=50e86ed9-f46e-489c-8f83-40fa57ccbf79"
                  alt=""
                  width="500"
                  height="300"
                />
              </a>
              <div className="p-5">
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold  text-gray-900 ">Asistencia de estudiantes</h5>
                  {/* <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Asistencia de estudiantes</h5> */}
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Registro de asistencia de estudiantes con mensajeria de whatsapp en tiempo real a los padres de familia.</p>
              </div>
            </div>
            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow ">
              {/* <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"> */}
              <a href="#">
                <Image
                  className="rounded-t-lg"
                  src="https://firebasestorage.googleapis.com/v0/b/attendance-system-d1f40.appspot.com/o/landingpage%2Fagenda-escolar.jpg?alt=media&token=b0d4f21c-8412-4e98-8797-18618568a219"
                  alt=""
                  width="500"
                  height="300"
                />
              </a>
              <div className="p-5">
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">Cuaderno de control</h5>
                  {/* <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Asistencia de estudiantes</h5> */}
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Registro de asistencia de estudiantes con mensajeria de whatsapp en tiempo real a los padres de familia.</p>
              </div>
            </div>
            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow ">
              {/* <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"> */}
              <a href="#">
                <Image
                  className="rounded-t-lg"
                  src="https://firebasestorage.googleapis.com/v0/b/attendance-system-d1f40.appspot.com/o/landingpage%2Ftareas-card.jpg?alt=media&token=8d299f91-b983-4b95-ac26-5b5754be6b4d"
                  alt=""
                  width="500"
                  height="300"
                />
              </a>
              <div className="p-5">
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">Tareas</h5>
                  {/* <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Asistencia de estudiantes</h5> */}
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Registro de asistencia de estudiantes con mensajeria de whatsapp en tiempo real a los padres de familia.</p>
              </div>
            </div>
            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow ">
              {/* <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"> */}
              <a href="#">
                <Image
                  className="rounded-t-lg"
                  src="https://firebasestorage.googleapis.com/v0/b/attendance-system-d1f40.appspot.com/o/landingpage%2Faula-virtual-card.jpg?alt=media&token=4fa60532-5351-459c-b7d7-8de3684d4ff2"
                  alt=""
                  width="500"
                  height="300"
                />
              </a>
              <div className="p-5">
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">Aula virtual</h5>
                  {/* <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Asistencia de estudiantes</h5> */}
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Registro de asistencia de estudiantes con mensajeria de whatsapp en tiempo real a los padres de familia.</p>
              </div>
            </div>
            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow ">
              {/* <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"> */}
              <a href="#">
                <Image
                  className="rounded-t-lg"
                  src="https://firebasestorage.googleapis.com/v0/b/attendance-system-d1f40.appspot.com/o/landingpage%2Fwhatsapp-mensajeria-card.jpg?alt=media&token=d6459c02-e387-4bf7-9913-2f1dcccbe23e"
                  alt=""
                  width="500"
                  height="300"
                />
              </a>
              <div className="p-5">
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">Mensajeria whatsapp</h5>
                  {/* <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Asistencia de estudiantes</h5> */}
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Registro de asistencia de estudiantes con mensajeria de whatsapp en tiempo real a los padres de familia.</p>
              </div>
            </div>
          </div>



        </div>
  )
}

export default NuestroproductocardSection