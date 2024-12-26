import Image from 'next/image'
import React from 'react'

const BeneficiosSection = () => {
  return (
    <section className="  grid lg:flex ">

      <div className='lg:w-[50%] relative w-full xl:h-[700px]'>
        <Image
          className='block xl:hidden  w-[50%] lg:w-full relative '
          src="https://firebasestorage.googleapis.com/v0/b/attendance-system-d1f40.appspot.com/o/landingpage%2Fbeneficios-landing.jpg?alt=media&token=ed837900-ed15-44f6-a2d6-61c5916878da"
          alt="imagen de la seccion de beneficios"
          width="1000"
          height="1000" 
          // fill={true}
          />
        <Image
          className='block w-full lg:w-full '
          src="https://firebasestorage.googleapis.com/v0/b/attendance-system-d1f40.appspot.com/o/landingpage%2Fbeneficios-landing-pc.jpg?alt=media&token=01a2a241-090d-4abb-8fc4-0da17f6470eb"
          alt="imagen de la seccion de beneficios"
          // width="1920"
          // height="1200"
          // style={{objectFit: "contain"}}
          fill={true}
        />

      </div>
      <div className='lg:w-[50%] w-full bg-gradient-to-r from-beneficios from-30% to-beneficios-1 grid justify-center items-center '>
        <div>
          <h3 className='text-2xl uppercase text-blue-950 text-center font-bold font-montserrat p-5'>beneficios de usar nuestros productos</h3>
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
        </div>

      </div>
    </section>
  )
}

export default BeneficiosSection