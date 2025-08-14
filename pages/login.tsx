import React, { useEffect, useState } from 'react'
import useAuthentication from '@/features/hooks/useAuthentication'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { app } from '@/firebase/firebaseConfig'
import { useRouter } from 'next/router'
import { useGlobalContext } from '@/features/context/GlobalContext'
import { RiLoader4Line } from 'react-icons/ri'
import { validateRol } from '@/utils/validateRolEmployee'
import { useNewUser } from '@/features/hooks/useNewUser'
import NewUserModal from '@/Modals/newUserModal'
import Image from 'next/image'
import image from '../assets/login-main.jpg'
import styles from './login.module.css'

const Login = () => {
  const router = useRouter()
  const auth = getAuth(app)
  const { loadingAccount, warningAccount, userData, showNewUserModal } = useGlobalContext()
  const { signIn } = useAuthentication()
  const initialValue = { email: "", password: "" }
  const [formValue, setFormValue] = useState(initialValue)
  const { showNewUserModalValue } = useNewUser()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (validateRol(Number(userData.rol)) === "profesor") {
          router.push('/profesores/aula-virtual')
        }
        if (validateRol(Number(userData.rol)) === "administracion") {
          router.push('/mi-cuenta');
        }
      }
    })
  }, [userData.rol])
  
  const handleValueUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    signIn(formValue)
  }
  
  return (
    <div className={styles.loginContainer}>
      {/* Animated Background Shapes */}
      <div className={`${styles.animatedShape} ${styles.shape1}`}></div>
      <div className={`${styles.animatedShape} ${styles.shape2}`}></div>
      <div className={`${styles.animatedShape} ${styles.shape3}`}></div>
      <div className={`${styles.animatedShape} ${styles.shape4}`}></div>
      <div className={`${styles.animatedShape} ${styles.shape5}`}></div>
      
      {/* Floating Particles */}
      <div className={`${styles.particle} ${styles.particle1}`}></div>
      <div className={`${styles.particle} ${styles.particle2}`}></div>
      <div className={`${styles.particle} ${styles.particle3}`}></div>
      <div className={`${styles.particle} ${styles.particle4}`}></div>
      <div className={`${styles.particle} ${styles.particle5}`}></div>
      <div className={`${styles.particle} ${styles.particle6}`}></div>
      
      {/* Geometric Shapes */}
      <div className={`${styles.geometricShape} ${styles.triangle}`}></div>
      <div className={`${styles.geometricShape} ${styles.square}`}></div>
      <div className={`${styles.geometricShape} ${styles.diamond}`}></div>
      
      <Image
        className={styles.backgroundImage}
        src={image}
        alt="Imagen de fondo del colegio"
        priority
        fill
      />
      <div className={styles.backgroundOverlay}></div>
      
      <div className={styles.loginContent}>
        <div className={styles.loginCard}>
          {showNewUserModal && <NewUserModal userData={userData}/>}
          
          <div className={styles.loginHeader}>
            <h1 className={styles.loginTitle}>Inicio de Sesión</h1>
          </div>
          
          <form onSubmit={handleSubmit} className={styles.loginForm}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Usuario:</label>
              <input 
                className={styles.formInput}
                onChange={handleValueUser} 
                type="email" 
                name="email" 
                placeholder="Correo electrónico" 
              />
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Contraseña:</label>
              <input 
                type="password" 
                className={styles.formInput}
                onChange={handleValueUser} 
                name="password" 
                placeholder="Contraseña" 
              />
            </div>
            
            <button className={styles.submitButton} type="submit">
              Ingresar
            </button>
            
            {loadingAccount && (
              <div className={styles.loadingContainer}>
                <RiLoader4Line className={styles.loadingSpinner} />
                <p className={styles.loadingText}>Validando datos...</p>
              </div>
            )}
            
            {warningAccount.length > 1 && (
              <p className={styles.errorMessage}>*{warningAccount}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login