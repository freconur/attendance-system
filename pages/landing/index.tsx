import React from 'react'

import ParaquienesSection from '@/components/landingPage/ParaquieneSection'
import BeneficiosSection from '@/components/landingPage/BeneficiosSection'
import NuestroproductocardSection from '@/components/landingPage/NuestroproductocardSection'
import HeaderSection from '@/components/landingPage/HeaderSection'
import IntroducctionSection from '@/components/landingPage/IntroducctionSection'
import AyudaFormSection from '@/components/landingPage/AyudaFormSection'
const LandingPageAttendance = () => {
  return (
    <div>
      <HeaderSection />
      <div className=' w-[100%] m-auto lg:w-[60%] p-3'>
        <IntroducctionSection />
        <NuestroproductocardSection />
      </div>
      <ParaquienesSection />
      <BeneficiosSection />
      <AyudaFormSection/>
    </div>
  )
}

export default LandingPageAttendance