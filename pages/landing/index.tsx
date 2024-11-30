import React from 'react'
import Image from 'next/image'
const LandingPageAttendance = () => {
  return (
    <div>
      <Image
        className='hover:opacity-95 duration-300 cursor-pointer'
        src="https://firebasestorage.googleapis.com/v0/b/attendance-system-d1f40.appspot.com/o/header-landingpage-attendance.jpg?alt=media&token=d07c49f8-8a9f-4e48-85fb-e7d493d6577d"
        alt="imagen de alumno usando la computadora"
        priority
        width="1920"
        height="600"
      />
      <div className=' w-[70%] m-auto'>

        <section className=' mt-10 gap-10'>
          <p className="text-lg font-montserrat text-slate-500">
            Mantener informados a los papás del rendimiento academico de sus hijos es una tarea que cada vez se esta haciendo más díficil, desviando la atención a los hijos en lo académico, en consecuencia muchos estudiantes bajan el rendimiento academico debido a que no hay un control adecuado para que los padres puedan intervenir y poder ayudar al hijo a mejorar y cubrir sus puntos debiles en su aprendizaje.
          </p>
          <p className=" mt-10 text-lg font-montserrat text-slate-500">
            Nuestro servicio ayudan a las instituciónes educativas que quieran tener un control eficiente de las asistencias, tardanzas y faltas de los estudiantes para notificar y mantener informados a los padres de familia sobre el historial de asistenicia de sus hijos en tiempo real.
          </p>
        </section>
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

      </div>
      <section className="bg-gradient-to-r from-cyan-400 to-blue-400 pb-10">
        <h3 className='text-2xl uppercase text-blue-950 text-center font-bold font-montserrat py-[50px]'>beneficios de usar nuestros productos</h3>
        <ul className=' text-xl grid gap-5 text-blue-950 justify-center p-5'>
          <li className='flex gap-3'>
            <div>
              1-
            </div>
            <div>
              Mejora la comunicación académica de tus estudiantes con los padres de familia.
            </div>
          </li>
          <li className='flex gap-3'>
            <div>
              2-
            </div>
            <div>
              Envia notificaciones a los padres de familia de manera inmediata.
            </div>
          </li>

          <li className='flex gap-3'>
            <div>
              3-
            </div>
            <div>
              Gestiona las asistencias de los estudiantes con mensajeria en whatsapp en tiempo real.
            </div>
          </li>

          <li className='flex gap-3'>
            <div>
              4-
            </div>
            <div>
              Gestiona el cuaderno de control de manera digital.
            </div>
          </li>

          <li className='flex gap-3'>
            <div>
              5-
            </div>
            <div>
              Gestiona y notifica las tareas de clases.
            </div>
          </li>

          <li className='flex gap-3'>
            <div>
              6-
            </div>
            <div>
              Dispondras de un chatbot para las consultas academicas de los estudiantes.
            </div>
          </li>

        </ul>
      </section>

      <section>
        <div>
          <h3>Quieres mejorar la comunicacion entre tu institución educativa, padres de familia y estudiantes?</h3>
          <div>Muchas veces una comunicacion efectiva en un entorno educativo no es facil de lograr, a veces puedes tonarse lento en hacer llegar comunicados a los padres de familia, brindar información académica de los estudiantes a los papas y casos como estos hay muchos, asi que en mirasoft hemos pensados en una manera de poder facilitar y acortar el tiempo de comunicación en ambientes academicos.
            hemos desarrollado un software diseñado para colegios de nivel primaria y secundaria para facilitar la gestion academica, con la ayuda de nuestra aplicacion lograrás faciliar informacion academica a los padres de familia y estudiantes de tu institución.
          </div>
        </div>
      </section>
    </div>
  )
}

export default LandingPageAttendance