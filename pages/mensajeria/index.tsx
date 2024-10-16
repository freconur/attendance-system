import { useGlobalContext } from '@/features/context/GlobalContext'
import { useMensajeria } from '@/features/hooks/useMensajeria'
import UseRegisterStudents from '@/features/hooks/useRegisterStudents'
import ConfirmationSendMessageWhatsapp from '@/Modals/confirmationSendMessageWhatsapp/confirmationSendMessageWhatsapp'
import React, { useEffect, useState } from 'react'

const initialValue = {
  message: "",
}
const Mensajeria = () => {
  const { getGrades } = UseRegisterStudents()
  const { userData, showModalConfirmationSendMessageWhatsapp } = useGlobalContext()
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [messagesWhatsapp, setMessagesWhatsapp] = useState(initialValue)
  const { confirmationSendMessageWhatsapp } = useMensajeria()
  useEffect(() => {
    getGrades()
  }, [])

  const selectedValueCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target
    if (checked) {
      setSelectedItems([...selectedItems, value])
    } else {
      setSelectedItems(selectedItems.filter(item => item !== value))
    }
  }

  const handleChangeMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessagesWhatsapp({
      ...messagesWhatsapp,
      [e.target.name]: e.target.value
    })
  }

  // console.log('selectedItems', selectedItems)
  return (
    <div className='p-3'>
      {
        showModalConfirmationSendMessageWhatsapp &&
        <ConfirmationSendMessageWhatsapp
          showModalConfirmationSendMessageWhatsapp={showModalConfirmationSendMessageWhatsapp}
          confirmationSendMessageWhatsapp={confirmationSendMessageWhatsapp}
          selectedItems={selectedItems}
          userData={userData}
          messagesWhatsapp={messagesWhatsapp}
        />
      }
      <div>
        <h3 className='text-xl font-semibold uppercase text-center text-slate-500 font-dmMono Mono'>Mensajeria Interna</h3>
        <div>
          <div className='mt-3'>
            <h3 className='text-lg text-slate-500 mb-3'>Selecciona a quienes quieres enviar el mensaje</h3>
            <div className='flex gap-5 mb-3'>
              <div className='flex  items-center mr-2'>
                {/* los valores de cada input estan hardcodeados, asi que necesito traer estos valores de la base de datos segun cada colegio */}
                <input
                  className='w-[20px] h-[20px] rounded-full mr-2'
                  type="checkbox"
                  name="profesores"
                  value="1"
                  onChange={selectedValueCheckbox}
                />
                <span className='capitalize text-slate-600'>profesores</span>

              </div>
              <div className='flex  items-center mr-2'>
                {/* los valores de cada input estan hardcodeados, asi que necesito traer estos valores de la base de datos segun cada colegio */}
                <input
                  className='w-[20px] h-[20px] rounded-full mr-2'
                  type="checkbox"
                  name="padres"
                  value="5"
                  onChange={selectedValueCheckbox}
                />
                <span className='capitalize text-slate-600'>padres de familia</span>

              </div>
              <div className='flex  items-center mr-2'>
                <input
                  className='w-[20px] h-[20px] rounded-full mr-2'
                  type="checkbox"
                  name="profesores"
                  value="2"
                  disabled={true}
                  onChange={selectedValueCheckbox}
                />
                <span className='capitalize text-slate-600'>auxiliares</span>

              </div>
              <div className='flex  items-center mr-2'>
                <input
                  className='w-[20px] h-[20px] rounded-full mr-2'
                  type="checkbox"
                  name="profesores"
                  value="4"
                  disabled={true}
                  onChange={selectedValueCheckbox}
                />
                <span className='capitalize text-slate-600'>administración</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className='text-slate-600 mb-3'>Escribe un mensaje a enviar</h3>
            <textarea placeholder='escribe el mensaje que quieres enviar' onChange={handleChangeMessage} rows={5} name="message" value={messagesWhatsapp.message} className='p-3 text-slate-500 w-full h-[200px]text-slate-600 shadow-sm'></textarea>
          </div>
          <button
            disabled={selectedItems?.length > 0 && messagesWhatsapp.message?.length > 0 ? false : true}
            className={`${selectedItems?.length > 0 && messagesWhatsapp.message?.length > 0 ? 'bg-green-400' : "bg-gray-400"} duration-300 transition cursor-pointer w-full p-3 uppercase rounded-md shadow-md text-white font-semibold`}
            onClick={() => confirmationSendMessageWhatsapp(showModalConfirmationSendMessageWhatsapp)}
          >enviar mensaje</button>
        </div>
      </div>
    </div>
  )
}

export default Mensajeria