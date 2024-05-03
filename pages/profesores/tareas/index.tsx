import FormularioTarea from '@/components/tareas/formularioTarea'
import React from 'react'

const Tareas = () => {
  return (
    <div className='p-2 m-auto'>
      <div className='max-w-[1280px] m-auto '>
        <h1 className='text-xl font-semibold uppercase text-slate-500 text-center'>tareas</h1>
        <FormularioTarea />
      </div>
    </div>
  )
}

export default Tareas