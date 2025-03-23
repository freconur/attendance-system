import NewUserModal from "@/Modals/newUserModal";
import { useGlobalContext } from "@/features/context/GlobalContext";
import useAuthentication from "@/features/hooks/useAuthentication";
import { useNewUser } from "@/features/hooks/useNewUser";
import { validateRol } from "@/utils/validateRolEmployee";
import Image from "next/image";
import styles from "./mi-cuenta.module.css";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import header from "../../assets/fireworks.png";
import { TiUser } from "react-icons/ti";
import { HiUserCircle } from "react-icons/hi";
import { PiUserCircleLight } from "react-icons/pi";
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
  // const [validateNewPassword, setValidateNewPassword] = useState({})
  // console.log('mi cuenta', userData)

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
        <div className="">
          <div className="w-full">
            <div className="w-full h-[200px] bg-headerMiCuenta relative">
              <Image
                className="absolute object-cover h-[100%] w-full bottom-0 top-[0px] right-0 left-0 z-[10] opacity-80"
                src={header}
                alt="imagen de cabecera"
                // objectFit='fill
                priority
              />
            </div>
            <div className="relative m-auto xs:w-[80%] w-full  p-3">
              {/* <div className="relative m-auto xs:w-[80%] w-full bg-textTitulos rounded-b-lg drop-shadow-lg p-3"> */}
              {showNewUserModal && <NewUserModal userData={userData} />}
                  <PiUserCircleLight className="bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 absolute md:fixed top-[-90px] md:top-[180px] z-[20] w-[150px] h-[150px] border-[0px] border-textTitulos rounded-full  text-white" />
              {/* <div className="fixed top-[180px] z-[20]">
                <div className="w-[150px] h-[150px] border-[5px] border-textTitulos rounded-full bg-blue-300 ">
                </div>
              </div> */}
              <h3
                className="uppercase  font-antonsc text-3xl text-headerMiCuenta mb-3 mt-[60px]
              md:mt-0 md:ml-[170px]
              "
              >
                {userData.name} {userData.lastname} {userData.firstname}
              </h3>
              <div className="">
                <h3 className="md:mt-[50px] uppercase font-semibold font-martianMono text-xl text-buttonLogin mb-3">
                  mis datos
                </h3>
                <div className="grid gap-3 border-b-[1px] border-t-[1px] p-3 border-buttonLogin">
                  {/* <h4 className="capitalize font-semibold text-blue-500">
                    mis datos
                  </h4> */}
                  {/* <p className="text-md text-slate-500 capitalize ">
                    <span className="font-bold">Nombre completo: </span>
                    {userData.name} {userData.lastname} {userData.firstname}
                  </p> */}
                  <p className="text-md font-martianMono text-loginForm capitalize ">
                    <span className="font-bold">id: </span>
                    {userData.dni}
                    {dataAulavirtual.dni}
                  </p>
                  <p className="text-md font-martianMono text-loginForm capitalize ">
                    <span className="font-bold">cargo: </span>
                    {validateRol(Number(userData.rol))}
                  </p>
                  <p className="text-md font-martianMono text-loginForm ">
                    <span className="font-bold capitalize">cuenta: </span>
                    {userData.acc}
                  </p>
                  <p className="text-md font-martianMono text-loginForm ">
                    <span className="font-bold capitalize">celular: </span>
                    {userData.celular}
                  </p>
                  <p className="text-md font-martianMono text-loginForm capitalize">
                    <span className="font-bold capitalize">
                      nombre de institución:{" "}
                    </span>
                    {userData.institutionName}
                  </p>
                </div>
              </div>
              <h4
                onClick={() => showOptionsChangePassword(showChangePassword)}
                className="p-3 w-auto cursor-pointer font-martianMono capitalize font-semibold text-pastel12 mb-2 duration-300 hover:text-blue-600"
              >
                cambiar mi contraseña
              </h4>

              {showChangePassword && (
                <div className="p-3">
                  <div className="mb-3">
                    <h3 className="text-slate-500 mb-2">
                      Escribe tu contraseña actual
                    </h3>
                    <input
                      value={password.currentPassword}
                      onChange={handleNewPassword}
                      name="currentPassword"
                      type="text"
                      placeholder="contraseña actual"
                      className="p-3 w-[100%] border-[1px]"
                    />
                    {errorCurrentPassword && (
                      <span className="text-red-500 text-sm">
                        *tu contraseña no coincide o has alcanzado el límite de
                        intentos (inténtalo más tarde)
                      </span>
                    )}
                  </div>
                  <div className="mb-3">
                    <h3 className="text-slate-500 mb-2">
                      Escribe tu nueva contraseña
                    </h3>
                    <div className="flex gap-5">
                      <input
                        value={password.newPassword}
                        onChange={handleNewPassword}
                        name="newPassword"
                        className="p-3 w-[100%] border-[1px]"
                        type={showPassword ? "text" : "password"}
                        placeholder="nueva contraseña"
                      />
                      <input
                        value={password.validateNewPassword}
                        onChange={handleNewPassword}
                        name="validateNewPassword"
                        className="p-3 w-[100%] outline-none border-[1px]"
                        type={showPassword ? "text" : "password"}
                        placeholder="vuelve a escribir la nueva contraseña"
                      />
                    </div>
                  </div>
                  {password.warningPassword && (
                    <span className="text-red-300 text-sm">
                      {password.warningPassword}
                    </span>
                  )}
                  <div
                    onClick={() => setShowPassword(!showPassword)}
                    className="cursor-pointer text-teal-500 capitalize text-sm"
                  >
                    {showPassword ? "ocultar contraseña" : "mostrar contraseña"}
                  </div>
                  <div className="mt-3 gap-5 flex ">
                    <button
                      onClick={() => {
                        setChangePasswordUser(!changePasswordUser),
                          cancelPassword();
                      }}
                      className=" text-red-300 font-semibold"
                    >
                      cancelar
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
                      className={`p-2  text-white capitalize rounded-sm  ${
                        agreePassword ? "bg-blue-400" : "bg-gray-200"
                      } font-semibold`}
                    >
                      aceptar
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        // colocar loader de carga para el usuario
        <p>...cargando</p>
      )}
    </>
  );
};

export default MyAccount;

// MyAccount.Auth = PrivateRouteAdmin
