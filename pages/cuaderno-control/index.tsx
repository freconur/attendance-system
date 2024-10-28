import PrivateRouteUser from '@/components/layouts/PrivateRouteUser'
import { useGlobalContext } from '@/features/context/GlobalContext'
import { useCuadernoControl } from '@/features/hooks/useCuadernoControl'
import UseRegisterStudents from '@/features/hooks/useRegisterStudents'
import { CuadernoControl as control, CuadernoControlCheckbox, Grades } from '@/features/types/types'
import React, { useEffect, useRef, useState } from 'react'
import styles from './cuaderno-control.module.css'
import LayoutContentCenter from '@/components/layouts/LayoutContentCenter'
import ConfirmationCuadernoControl from '@/Modals/cuaderno-control/confirmationCuadernoControl'
const initialValueChecbox = {
  nivel: [],
  grades: []
}
const initialValueCheckbox = {
  primaria: false,
  secundaria: false
}
const initialValueMessage = {
  message: "",
  subject: ""
}
const CuadernoControl = () => {

  const { userData, gradesSecundaria, gradesPrimaria, showModalConfirmationCuadernoControl } = useGlobalContext()
  const { getGradesSecundaria, getGradesPrimaria, handleShowModalConfirmationCuadernoControl } = useCuadernoControl()
  const [messagesWhatsapp, setMessagesWhatsapp] = useState(initialValueMessage)
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  useEffect(() => {
    getGradesSecundaria()
    getGradesPrimaria()

  }, [userData.name])

  const handleChangeMessage = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setMessagesWhatsapp({
      ...messagesWhatsapp,
      [e.target.name]: e.target.value
    })
  }
  const selectedValueCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked, name } = e.target
    checked
      ? setSelectedItems([...selectedItems, value])
      : setSelectedItems(selectedItems?.filter(item => item !== value))
  }
  // console.log('gradesSecundaria', gradesSecundaria)
  // console.log('messagesWhatsapp', messagesWhatsapp)
  return (
    <LayoutContentCenter>
      <div className='p-3 grid justify-center items-center'>
        {
          showModalConfirmationCuadernoControl
          && <ConfirmationCuadernoControl
            setMessagesWhatsapp={setMessagesWhatsapp}
            messagesWhatsapp={messagesWhatsapp}
            selectedItems={selectedItems}
          />
        }
        <h2 className='mb-3 text-xl font-montserrat font-semibold text-slate-500 text-center uppercase'>cuaderno de control</h2>
        <div className='bg-white rounded-3xl shadow-md w-full p-3'>
          <div className='border-b-[1px] border-green-400 pb-3'>

            <h3 className='text-slate-400 text-lg mb-3'>Destinatarios:</h3>
            {/* los valores de cada input estan hardcodeados, asi que necesito traer estos valores de la base de datos segun cada colegio */}
            <div className={styles.continerCheckbox}>
              {/* los valores de cada input estan hardcodeados, asi que necesito traer estos valores de la base de datos segun cada colegio */}
              {
                gradesSecundaria?.map(grade => {
                  return (
                    <div key={grade.grade} >
                      <div >
                        <input
                          className='w-[20px] h-[20px] rounded-full mr-2'
                          onChange={selectedValueCheckbox}
                          key={grade.grade}
                          type="checkbox"
                          value={grade.grade}
                        />
                        <span className='text-slate-600'>{grade.traditionalGrade}</span>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
          <div className={styles.asuntoContainer}>
            <h4 className='text-slate-400 '>Asunto:</h4>
            <input
              className={styles.textarea}
              value={messagesWhatsapp.subject}
              // placeholder='escribe un mensaje para el cuaderno de control'
              onChange={handleChangeMessage}
              name="subject"
            />
          </div>
          <textarea
            className={styles.textareaMessage}
            onChange={handleChangeMessage}
            name="message"
            value={messagesWhatsapp.message}
          />
          <button
            disabled={messagesWhatsapp?.message?.length > 0 && messagesWhatsapp?.subject?.length > 0 && selectedItems.length > 0 ? false : true}
            className={`p-3 rounded-2xl w-full shadow-md text-white font-semibold font-montserrat duration-300 ${messagesWhatsapp.message && messagesWhatsapp.subject && selectedItems.length > 0 ? 'bg-indigo-500 ' : 'bg-gray-400'}  `}
            onClick={
              () => {
                handleShowModalConfirmationCuadernoControl(showModalConfirmationCuadernoControl);
              }

            }
          >enviar mensaje</button>
        </div>
      </div>
    </LayoutContentCenter>
  )
}

export default CuadernoControl
CuadernoControl.Auth = PrivateRouteUser