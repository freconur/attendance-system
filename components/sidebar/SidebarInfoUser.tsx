import React from 'react'

const SidebarInfoUser = () => {
  return (
    <div className='my-8 border-b-[1px] border-slate-200 pb-8'>
      <div><p className='capitalize text-center text-slate-600 text-2xl'>jose antonio encinas</p></div>
      <div className='mt-5'>
        <div className='bg-green-400 w-[100px] h-[100px] rounded-full m-auto flex justify-content items-center'><p className='text-center text-3xl uppercase font-semibold m-auto'>F</p></div>
      </div>
      <div className='mt-5'><p className='capitalize text-center text-slate-500'>franco condori huaraya</p></div>
      <div className='mt-5'><p className='capitalize text-center text-slate-400'>developer</p></div>
    </div>
  )
}

export default SidebarInfoUser