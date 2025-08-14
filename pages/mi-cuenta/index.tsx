import NewUserModal from "@/Modals/newUserModal";
import { useGlobalContext } from "@/features/context/GlobalContext";
import useAuthentication from "@/features/hooks/useAuthentication";
import { useNewUser } from "@/features/hooks/useNewUser";
import { validateRol } from "@/utils/validateRolEmployee";
import styles from "./mi-cuenta.module.css";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PiUserCircleLight } from "react-icons/pi";
import { HiIdentification, HiOfficeBuilding, HiCreditCard, HiPhone, HiAcademicCap } from "react-icons/hi";

const initialValuePassword = {
  newPassword: "",
  currentPassword: "",
  validateNewPassword: "",
  warningPassword: "",
};

const MyAccount = () => {
  const { userData, dataAulavirtual } = useGlobalContext();
  const { showNewUserModal, errorCurrentPassword, showChangePassword } =
    useGlobalContext();
  const { showNewUserModalValue } = useNewUser();
  const [changePasswordUser, setChangePasswordUser] = useState<boolean>(false);
  const [password, setPassword] = useState(initialValuePassword);
  const [agreePassword, setAgreePassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { changePassword, showOptionsChangePassword } = useAuthentication();

  const handleNewPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    });
  };

  const cancelPassword = () => {
    setPassword(initialValuePassword);
  };

  useEffect(() => {
    if (
      password.newPassword === password.validateNewPassword &&
      password.newPassword.length > 0 &&
      password.validateNewPassword.length > 0
    ) {
      setAgreePassword(true);
      setPassword({ ...password, warningPassword: "" });
    } else if (
      password.newPassword.length > 0 &&
      password.validateNewPassword.length > 0
    ) {
      setPassword({
        ...password,
        warningPassword: "contraseñas no coinciden, verifica que sean iguales",
      });
      setAgreePassword(false);
    } else {
      setAgreePassword(false);
    }
  }, [password.newPassword, password.validateNewPassword]);

  console.log("showChangePassword", showChangePassword);
  
  return (
    <>
      <ToastContainer />
      {userData.dni ? (
        <div className={styles.container}>
          <div className={styles.mainContent}>
            {/* Header Card */}
            <div className={styles.headerCard}>
              <div className={styles.avatarSection}>
                <div className={styles.avatar}>
                  <PiUserCircleLight />
                </div>
                <div className={styles.userInfo}>
                  <h1 className={styles.userName}>
                    {userData.name} {userData.lastname} {userData.firstname}
                  </h1>
                  <p className={styles.userRole}>
                    {validateRol(Number(userData.rol))}
                  </p>
                </div>
              </div>
            </div>

            {/* Info Card */}
            <div className={styles.infoCard}>
              <h2 className={styles.cardTitle}>Información Personal</h2>
              <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>
                    <HiIdentification />
                  </div>
                  <div className={styles.infoContent}>
                    <div className={styles.infoLabel}>ID de Usuario</div>
                    <div className={styles.infoValue}>{userData.dni}</div>
                  </div>
                </div>
                
                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>
                    <HiCreditCard />
                  </div>
                  <div className={styles.infoContent}>
                    <div className={styles.infoLabel}>Número de Cuenta</div>
                    <div className={styles.infoValue}>{userData.acc}</div>
                  </div>
                </div>
                
                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>
                    <HiPhone />
                  </div>
                  <div className={styles.infoContent}>
                    <div className={styles.infoLabel}>Número de Celular</div>
                    <div className={styles.infoValue}>{userData.celular}</div>
                  </div>
                </div>
                
                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>
                    <HiAcademicCap />
                  </div>
                  <div className={styles.infoContent}>
                    <div className={styles.infoLabel}>Institución</div>
                    <div className={styles.infoValue}>{userData.institutionName}</div>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => showOptionsChangePassword(showChangePassword)}
                className={styles.changePasswordButton}
              >
                🔐 Cambiar Mi Contraseña
              </button>
            </div>

            {/* Password Form */}
            {showChangePassword && (
              <div className={styles.passwordForm}>
                <h2 className={styles.cardTitle}>Cambiar Contraseña</h2>
                
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    Contraseña Actual
                  </label>
                  <input
                    value={password.currentPassword}
                    onChange={handleNewPassword}
                    name="currentPassword"
                    type="text"
                    placeholder="Escribe tu contraseña actual"
                    className={styles.formInput}
                  />
                  {errorCurrentPassword && (
                    <span className={styles.errorMessage}>
                      ⚠️ Tu contraseña no coincide o has alcanzado el límite de intentos
                    </span>
                  )}
                </div>
                
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    Nueva Contraseña
                  </label>
                  <div className={styles.inputRow}>
                    <input
                      value={password.newPassword}
                      onChange={handleNewPassword}
                      name="newPassword"
                      className={styles.formInput}
                      type={showPassword ? "text" : "password"}
                      placeholder="Nueva contraseña"
                    />
                    <input
                      value={password.validateNewPassword}
                      onChange={handleNewPassword}
                      name="validateNewPassword"
                      className={styles.formInput}
                      type={showPassword ? "text" : "password"}
                      placeholder="Confirma la nueva contraseña"
                    />
                  </div>
                </div>
                
                {password.warningPassword && (
                  <span className={styles.warningMessage}>
                    ⚠️ {password.warningPassword}
                  </span>
                )}
                
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className={styles.showPasswordButton}
                >
                  {showPassword ? "🙈 Ocultar Contraseña" : "👁️ Mostrar Contraseña"}
                </button>
                
                <div className={styles.buttonGroup}>
                  <button
                    onClick={() => {
                      setChangePasswordUser(!changePasswordUser),
                        cancelPassword();
                    }}
                    className={styles.cancelButton}
                  >
                    ❌ Cancelar
                  </button>
                  <button
                    onClick={() => {
                      changePassword(
                        password.newPassword,
                        userData,
                        password.currentPassword
                      ),
                        setPassword(initialValuePassword);
                    }}
                    disabled={
                      password.warningPassword.length > 0 ? true : false
                    }
                    className={styles.acceptButton}
                  >
                    ✅ Confirmar Cambio
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <p className={styles.loadingText}>⏳ Cargando información del usuario...</p>
      )}
    </>
  );
};

export default MyAccount;

