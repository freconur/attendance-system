import React from 'react'


interface Props {
  children: JSX.Element | JSX.Element[]
}
const LayoutContentCenter = ({ children }: Props) => {
  return (
    <div className='p-2'>
      <div className=' w-full'>
        <div className='m-auto  w-[100%] md:w-[81%] '>
          {children}
        </div>
      </div>
    </div>
  )
}

export default LayoutContentCenter