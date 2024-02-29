import React, { useEffect } from 'react'

const AsistenciaEmpleados = () => {
  useEffect(() => {

  },[])
  return (
    <div className='p-5'>
      <h2 className='text-center text-xl text-slate-500 font-semibold uppercase'>asistencia de docentes</h2>
      <div>
        <form className='flex gap-2'>
          <input type="text" className='w-full rounded-sm p-2 outline-none border-blue-400 border-[1px] '/>
          <input type="text" className='w-full rounded-sm p-2 outline-green-400 border-blue-400 border-[1px] '/>
        </form>
      </div>
    </div>
  )
}

export default AsistenciaEmpleados