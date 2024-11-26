// 'use client'
import LayoutContentCenter from '@/components/layouts/LayoutContentCenter'

import LayoutLadingPage from '@/components/layouts/LayoutLandingPage'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
// import {videoss} from '../../assets/videos/video-chatbot.mp4'
const Chatbot = () => {

  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])
  return (
    <LayoutLadingPage>
      <div>
        <Image
          className='xm:block hidden'
          src="https://firebasestorage.googleapis.com/v0/b/attendance-system-d1f40.appspot.com/o/header-landing-page-1.jpg?alt=media&token=855b7c77-b00f-4c73-8b1d-916508c179d2"
          // src={require(`assets/slider-web/biombos.jpg`).default}
          alt="header"
          width={1920}
          height={720}
          priority
        />
        <Image
          className='xm:hidden block'
          src="https://firebasestorage.googleapis.com/v0/b/attendance-system-d1f40.appspot.com/o/header-movil-landing.jpg?alt=media&token=9fc37ca8-8eef-4d52-8b69-7927da0b8427"
          // src={require(`assets/slider-web/biombos.jpg`).default}
          alt="header"
          width={500}
          height={500}
          priority
        />
      </div>
      <div>
        <h3 className='text-center uppercase font-bold text-sky-500 text-2xl font-montserrat mt-10'>
          Chatbot para consultas
        </h3>
        <p className='mt-3 text-lg font-montserrat text-slate-500'>
          Te presentamos el chatbot para colegios, pensado para consultas de las actividades que se realizan en el salon de clases, como por ejemplo: las tareas del dia que el profesor asigna, asistencia del estudiante, notas de cuaderno de control. Todo esto y más por medio de la aplicación de mensajeria de whatsapp.
        </p>
      </div>

      <div>
        <div>
          <h4 className='text-center font-bold text-sky-500 text-xl font-montserrat mt-10'>
            ¿ cuál es el objetivo de usar el chatbot ?
          </h4>
          <p className='mt-3 text-lg font-montserrat text-slate-500'>
            Este chatbot fue creado con el objetivo de poder mantener una mejor comunicación con los padres de familia en el aspecto directamente académico de manera que tanto el padre de familia como el estudiante puedan accedar a su información académica de manera rápida e inmediata y al mismo puedan ser notificados al whatsapp cuando se agrega un nuevo contenido académico.
          </p>
        </div>
        <div>
          <h4 className='text-center font-bold text-sky-500 text-xl font-montserrat mt-10'>
            ¿ como usar el chatbot ?
          </h4>
          <p className='mt-3 text-lg font-montserrat text-slate-500'>
            Este chatbot fue desarrollado para ser usado por medio de la aplicación de whatsapp ya que es un medio accesible para la gran mayoría de usuarios, a continuación te indicaremos como puedes usar el chatbot para consultas.

          </p>
          <p className='mt-3 text-lg font-montserrat text-slate-500'>
            Sigue los pasos que indicaremos para puedas hacer un correcto uso del chatbot y tengas una buena experiencia al momento de usarlo.
          </p>
          <div className='flex cs:flex-nowrap flex-wrap-reverse gap-3 mt-10'>

            <ul className=' w-full cs:w-[60%] border-[1px] rounded-md border-tere'>
              <li className='mt-3 text-lg font-montserrat text-sky-500 border-b-[1px] p-5 border-tere'>
                1- Solicita a la administración del colegio el número de whatsapp del chatbot y agregalo a tu lista de contacto.
              </li>
              <li className='mt-3 text-lg font-montserrat text-sky-500 border-b-[1px] p-5 border-tere'>
                2- Escribele un mensaje al chatbot para que este pueda responderte.
              </li>
              <li className='mt-3 text-lg font-montserrat text-sky-500 border-b-[1px] p-5 border-tere'>
                3- El chatbot te pedirá el número de documento del estudiante, esto es necesario para poder identificar al usuario para esto el chatbot respondera con una lista de opciones disponibles donde podras seleccionarlas escribiendo el numero clave de cada una de ellas.
              </li>
              <li className='mt-3 text-lg font-montserrat text-sky-500 border-b-[1px] p-5 border-tere'>
                4- Una vez selecciones una de las opciones que te brinda el chatbot, solo queda esperar la respuesta segun tu consulta.
              </li>
              <li className='mt-3 text-lg font-montserrat text-sky-500 border-b-[1px] p-5 '>
                5- Por último si necesitas hacer otra consulta solo selecciona la opcion que corresponde de lo contrario puedes terminar la conversacion con la opcion terminar.
              </li>
            </ul>
            <div className='rounded-lg overflow-hidden  h-[100%] flex justify-center items-center w-full cs:w-auto'>
              <Image
                className='m-auto border-[1px] border-tere'
                src="https://firebasestorage.googleapis.com/v0/b/attendance-system-d1f40.appspot.com/o/video-chatbot-freeconvert.gif?alt=media&token=1288ff34-badb-4b2a-b3dd-7b120de26a64"
                // src={require(`assets/slider-web/biombos.jpg`).default}
                alt="header"
                // placeholder='blur'
                // quality={10}
                width={300}
                height={300}
                priority />
            </div>
          </div>
        </div>
      </div>
    </LayoutLadingPage>
  )
}

export default Chatbot