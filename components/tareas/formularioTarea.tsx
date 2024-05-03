import React from 'react'

const FormularioTarea = () => {
  return (
    <form className='mt-5'>
      <div id="container" className='grid grid-cols-2 gap-5'>
        <div className='w-full'>
          <p className='capitalize text-slate-400'>grado</p>
          <select className='w-full rounded-md uppercase p-2 bg-blue-50 shadow-md text-slate-400'>
            <option value="">grados</option>
          </select>
        </div>
        <div className='w-full'>
          <p className='capitalize text-slate-400'>nombre del curso</p>
          <select className='w-full rounded-md uppercase p-2 bg-blue-50 shadow-md text-slate-400'>
            <option value="">cursos</option>
          </select>
        </div>
        <div className='w-full'>
          <p className='capitalize text-slate-400'>fecha de entrega</p>
          <select className='w-full rounded-md uppercase p-2 bg-blue-50 shadow-md text-slate-400'>
            <option value="">fecha</option>
          </select>
        </div>
      </div>
      <div className='w-full mt-5'>
        <p className='capitalize text-slate-400'>observaciones</p>
        <textarea className='w-full rounded-md text-slate-500 mt-2 p-2' name="observaciones" placeholder="aqui puedes escribir algunas observaciones" />
      </div>
    </form>
  )
}

export default FormularioTarea