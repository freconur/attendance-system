import PrivateRouteAdmin from '@/components/layouts/PrivateRouteAdmin'
import PrivateRoutes from '@/components/layouts/PrivateRoutes'
import { useGlobalContext } from '@/features/context/GlobalContext'
import useAuthentication from '@/features/hooks/useAuthentication'
import UseRegisterStudents from '@/features/hooks/useRegisterStudents'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import styles from './registroEstudiante.module.css'

const EstudentsRegister = () => {
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm()
  const { registerNewStudent, getSections, getGrades, sendPictureProfile } = UseRegisterStudents()
  const { sections, grades, pictureProfileUrl, userData } = useGlobalContext()
  const { getUserData } = useAuthentication()
  const [gradeValue, setGradeValue] = useState(0)
  const [seccionActive, setSeccionActive] = useState<boolean>()
  
  const handleSubmitform = handleSubmit(data => {
    registerNewStudent(data, pictureProfileUrl)
    reset()
  })
  
  useEffect(() => {
    if (watch('pictureProfile') !== undefined) {
      sendPictureProfile(watch('pictureProfile')[0])
    }
  }, [watch('pictureProfile')])

  useEffect(() => {
    getUserData()
    if (userData) {
      getSections()
      getGrades()
    }
  }, [userData.name])
  
  useEffect(() => {
    if(gradeValue >= 0) {
      setSeccionActive(grades[gradeValue]?.gotSection)
    }
  },[gradeValue])
  
  return (
    <div className={styles.container}>
      <h1 className={styles.mainTitle}>Registro de Estudiantes</h1>
      
      <form onSubmit={handleSubmitform} className={styles.form}>
        {/* Sección de información del estudiante */}
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>Información del Estudiante</h3>
          
          <div className={styles.fieldContainer}>
            <label className={styles.label}>Nombre:</label>
            <input
              className={styles.input}
              type="text"
              placeholder="Nombres"
              {...register("name", {
                required: { value: true, message: "Nombre es requerido" },
                minLength: { value: 2, message: "Nombre debe tener un mínimo de 2 caracteres" },
                maxLength: { value: 20, message: "Nombre debe tener un máximo de 20 caracteres" },
              })}
            />
            {errors.name && <span className={styles.errorMessage}>{errors.name.message as string}</span>}
          </div>
          
          <div className={styles.fieldContainer}>
            <label className={styles.label}>Apellido Paterno:</label>
            <input
              className={styles.input}
              type="text"
              placeholder="Apellido paterno"
              {...register("lastname", {
                required: { value: true, message: "Apellido paterno es requerido" },
                minLength: { value: 2, message: "Apellido paterno debe tener un mínimo de 2 caracteres" },
                maxLength: { value: 20, message: "Apellido paterno debe tener un máximo de 20 caracteres" },
              })}
            />
            {errors.lastname && <span className={styles.errorMessage}>{errors.lastname.message as string}</span>}
          </div>
          
          <div className={styles.fieldContainer}>
            <label className={styles.label}>Apellido Materno:</label>
            <input
              className={styles.input}
              type="text"
              placeholder="Apellido materno"
              {...register("firstname", {
                required: { value: true, message: "Apellido materno es requerido" },
                minLength: { value: 2, message: "Apellido materno debe tener un mínimo de 2 caracteres" },
                maxLength: { value: 20, message: "Apellido materno debe tener un máximo de 20 caracteres" },
              })}
            />
            {errors.firstname && <span className={styles.errorMessage}>{errors.firstname.message as string}</span>}
          </div>
          
          <div className={styles.fieldContainer}>
            <label className={styles.label}>DNI:</label>
            <input
              className={styles.input}
              type="text"
              placeholder="DNI"
              {...register("dni", {
                required: { value: true, message: "DNI es requerido" },
                minLength: { value: 8, message: "DNI debe tener 8 caracteres" },
                maxLength: { value: 8, message: "DNI debe tener 8 caracteres" },
              })}
            />
            {errors.dni && <span className={styles.errorMessage}>{errors.dni.message as string}</span>}
          </div>
          
          <div className={styles.fieldContainer}>
            <label className={styles.label}>Grado:</label>
            <select
              className={styles.select}
              {...register("grade", {
                required: { value: true, message: "Grado es requerido" },
                onChange(event) {
                  setGradeValue(Number(event.target.value - 1))
                },
              })}
            >
              <option value="">-- Seleccionar --</option>
              {grades?.map((gr, index) => (
                <option key={index} value={gr.grade}>
                  {gr.traditionalGrade}{gr.gotSection}
                </option>
              ))}
            </select>
            {errors.grade && <span className={styles.errorMessage}>{errors.grade.message as string}</span>}
          </div>

          {seccionActive && (
            <div className={styles.fieldContainer}>
              <label className={styles.label}>Sección:</label>
              <select
                className={styles.select}
                {...register("section", {
                  required: { value: true, message: "Sección es requerida" }
                })}
              >
                <option value="">-- Seleccionar --</option>
                {sections?.map((sec, index) => (
                  <option key={index} value={sec.section}>
                    {sec.section}
                  </option>
                ))}
              </select>
              {errors.section && <span className={styles.errorMessage}>{errors.section.message as string}</span>}
            </div>
          )}
          
          <div className={styles.fieldContainer}>
            <label className={styles.label}>Foto de Perfil:</label>
            {!watch('pictureProfile') || watch('pictureProfile').length === 0 ? (
              <div className={styles.fileInput}>
                <input
                  type="file"
                  disabled={pictureProfileUrl ? true : false}
                  {...register("pictureProfile")}
                />
                <span>Selecciona una imagen</span>
              </div>
            ) : (
              <div className={styles.fileName}>
                {watch('pictureProfile')[0].name}
              </div>
            )}
            {errors.pictureProfile && <span className={styles.errorMessage}>* Foto de perfil es requerida</span>}
          </div>
          
          {pictureProfileUrl && (
            <div className={styles.imageContainer}>
              <div className={styles.imagePreview}>
                <Image
                  alt="Foto de perfil del estudiante"
                  src={pictureProfileUrl}
                  width={150}
                  height={150}
                />
              </div>
            </div>
          )}
        </div>

        {/* Sección de información de los padres */}
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>Información de los Padres</h3>
          
          <div className={styles.fieldContainer}>
            <label className={styles.label}>Nombre del Primer Contacto:</label>
            <input
              className={styles.input}
              type="text"
              placeholder="Nombre del primer contacto"
              {...register("firstContact", {
                required: { value: true, message: "Nombre del primer contacto es requerido" },
                minLength: { value: 2, message: "Nombre debe tener un mínimo de 2 caracteres" },
                maxLength: { value: 20, message: "Nombre debe tener un máximo de 20 caracteres" },
              })}
            />
            {errors.firstContact && <span className={styles.errorMessage}>{errors.firstContact.message as string}</span>}
          </div>
          
          <div className={styles.fieldContainer}>
            <label className={styles.label}>Celular del Primer Contacto:</label>
            <input
              className={styles.input}
              type="number"
              placeholder="Número de celular"
              {...register("firstNumberContact", {
                required: { value: true, message: "Celular del contacto es requerido" },
                minLength: { value: 9, message: "Celular debe tener 9 dígitos" },
                maxLength: { value: 9, message: "Celular debe tener 9 dígitos" },
              })}
            />
            {errors.firstNumberContact && <span className={styles.errorMessage}>{errors.firstNumberContact.message as string}</span>}
          </div>
          
          <div className={styles.fieldContainer}>
            <label className={styles.label}>Nombre del Segundo Contacto:</label>
            <input
              className={styles.input}
              type="text"
              placeholder="Nombre del segundo contacto"
              {...register("secondContact", {
                minLength: { value: 2, message: "Nombre debe tener un mínimo de 2 caracteres" },
                maxLength: { value: 20, message: "Nombre debe tener un máximo de 20 caracteres" },
              })}
            />
            {errors.secondContact && <span className={styles.errorMessage}>{errors.secondContact.message as string}</span>}
          </div>
          
          <div className={styles.fieldContainer}>
            <label className={styles.label}>Celular del Segundo Contacto:</label>
            <input
              className={styles.input}
              type="number"
              placeholder="Número de celular"
              {...register("secondNumberContact", {
                minLength: { value: 9, message: "Celular debe tener 9 dígitos" },
                maxLength: { value: 9, message: "Celular debe tener 9 dígitos" },
              })}
            />
            {errors.secondNumberContact && <span className={styles.errorMessage}>{errors.secondNumberContact.message as string}</span>}
          </div>
        </div>

        <button type="submit" className={styles.submitButton}>
          Registrar Estudiante
        </button>
      </form>
    </div>
  )
}

export default EstudentsRegister

EstudentsRegister.Auth = PrivateRouteAdmin