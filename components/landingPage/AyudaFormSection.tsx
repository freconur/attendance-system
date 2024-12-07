import React from 'react'

const AyudaFormSection = () => {
  return (
    <section className='py-10 bg-white text-center'>
      <h3 className='uppercase text-2xl font-montserrat font-semibold'>quiero cotizar un presupuesto?</h3>
      <div className=' grid justify-center items-center'>
        {/* <label>cargo</label> */}
        <input className='border-[1px] border-blue-500 h-[30px] rounded-md p-3 box-content w-full' type="text" placeholder='Cargo'  />
        <input className='h-[30px] w-[100%] rounded-md' type="text" placeholder='cargo'/>
      </div>
    </section>
  )
}

export default AyudaFormSection