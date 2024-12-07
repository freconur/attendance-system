import React from 'react'

const BeneficiosSection = () => {
  return (
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
  )
}

export default BeneficiosSection