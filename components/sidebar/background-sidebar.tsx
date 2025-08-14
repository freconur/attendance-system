import React from 'react'
import styles from './background-sidebar.module.css'

const BackgroundSidebar = () => {
  return (
    <div className={styles.backgroundContainer}>
      {/* Formas geométricas modernas */}
      <div className={styles.circle1}></div>
      <div className={styles.circle2}></div>
      <div className={styles.circle3}></div>
      <div className={styles.square1}></div>
      <div className={styles.square2}></div>
      <div className={styles.triangle1}></div>
      <div className={styles.triangle2}></div>
      <div className={styles.wave1}></div>
      <div className={styles.wave2}></div>
    </div>
  )
}

export default BackgroundSidebar