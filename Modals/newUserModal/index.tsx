import { createPortal } from "react-dom"
import styles from './newUserModal.module.css'
import { useNewUser } from "@/features/hooks/useNewUser";
import { useEffect, useState } from "react";
import { CreateUserData, UserData } from "@/features/types/types";
import { useGlobalContext } from "@/features/context/GlobalContext";
import { useForm } from "react-hook-form";
import { validateRol } from '../../utils/validateRolEmployee'


interface Props {
  userData: UserData,
  
}
const NewUserModal = ({ userData }: Props) => {

  const { getRoles, getCursos, createNewUser, getInstitution } = useNewUser()
  const { roles, allCursos, instituciones, showNewUserModal } = useGlobalContext()
  const [typeRol, setTypeRol] = useState("")
  const { showNewUserModalValue } = useNewUser()
  const [institucionData, setInstitucionData] = useState("")
  const [rolesData, setRolesData] = useState<number[]>([])
  const [cursosProfesor, setCursosProfesor] = useState<string[]>([])
  useEffect(() => {
    if (typeRol === "1") {
      getCursos(userData)
    } else {
      setCursosProfesor([])
    }
  }, [typeRol])
  useEffect(() => {
    getRoles(userData)
    getInstitution()
  }, [])
  let container;
  if (typeof window !== "undefined") {
    container = document.getElementById("portal-modal");
  }
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm()
  const handleSubmitform = handleSubmit((data: UserData) => {
    // registerNewUser(data)
    console.log('data', data)
    // if (cursosProfesor.length > 0) {
    //   createNewUser({ ...data, cursos: cursosProfesor, extensionForUsers: userData.extensionForUsers })
    // } else {
    //   createNewUser({ ...data, extensionForUsers: userData.extensionForUsers })
    // }
    instituciones?.forEach((inst: CreateUserData) => {
      console.log('inst', inst.id)

      if (inst?.id === data?.idInstitution) {
        console.log('inst-entro', inst)
        // console.log('hemos entrado a la creacion de usuario')
        // if (inst.extensionForUsers !== undefined) {
        // createNewUser({ ...data, extensionForUsers: inst.extensionForUsers })
        createNewUser({ ...data, extensionForUsers: inst.extensionForUsers, institutionName:inst.name })
        // }
        showNewUserModalValue(showNewUserModal)
      }
    })

    // console.log('data del form', { ...data, cursos: cursosProfesor, })
    reset()
    setCursosProfesor([])
    setTypeRol("")
  })

  const handleAddCursos = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setCursosProfesor([...cursosProfesor, e.target.value])
  }
  const deleteCursoProfesor = (curso: string) => {
    const rtaCursos = cursosProfesor.filter((c) => c !== curso)
    setCursosProfesor(rtaCursos)
  }
  const addCursosProfesor = (curso: string) => {
    const beFounded = cursosProfesor.find((c) => curso === c)
    if (beFounded === undefined) {
      setCursosProfesor([...cursosProfesor, curso])
    }
  }
  const rolesInstitucion = (idInstitucion: string) => {
    setRolesData([])
    if (idInstitucion) {
      instituciones.forEach((r) => {
        if (r.id === idInstitucion) {
          if (r.roles) {
            setRolesData(r.roles)
            setInstitucionData(r.name as string)
          }
        }
      })
    }
  }
  // console.log('datos usuario nuevo', data)
  return container
    ? createPortal(
      <div className={styles.containerModal}>
        <div className={styles.containerSale}>
          <div className={styles.closeModalContainer}>
            <div onClick={() => showNewUserModalValue(showNewUserModal)} className={styles.close}>cerrar</div>
          </div>
          <h3 className={styles.title}>crear nuevo usuario</h3>
          <form onSubmit={handleSubmitform} >
            <div className={styles.group}>
              <select className={styles.selectOption}
                {...register("idInstitution",
                  {
                    required: { value: true, message: "institucion es requerido" },
                    onChange(event) {
                      // setInstitucionData(event.target.value),
                        rolesInstitucion(event.target.value)
                      // setRolesData(event.target.value)
                    },
                  },

                )}
              >
                <option value="">INSTITUCIÓN</option>
                {instituciones?.map((institucion, index) => {
                  return (
                    <option className='uppercase text-slate-500' key={index} value={institucion.id}>{institucion?.name?.toLocaleUpperCase()}</option>
                  )
                })}
              </select>
              {/* <input type="text" placeholder="institucion educativa" className={styles.ttt}
                {...register("institucion",
                  {
                    required: { value: true, message: "institucion es requerido" },
                    // minLength: { value: 2, message: "nombre debe tener un minimo de 2 caracteres" },
                    // maxLength: { value: 20, message: "nombre debe tener un maximo de 20 caracteres" },
                  }
                )}
              /> */}
              {errors.institucion && <span className='text-red-400 text-sm'>{errors.institucion.message as string}</span>}
            </div>
            <div className={styles.group}>
              <input type="text" placeholder="nombre" className={styles.ttt}
                {...register("name",
                  {
                    required: { value: true, message: "nombre es requerido" },
                    minLength: { value: 2, message: "nombre debe tener un minimo de 2 caracteres" },
                    maxLength: { value: 20, message: "nombre debe tener un maximo de 20 caracteres" },
                  }
                )}
              />
              {errors.name && <span className='text-red-400 text-sm'>{errors.name.message as string}</span>}
            </div>
            <div className={styles.group}>
              <input type="text" placeholder="apellido paterno" className={styles.ttt}
                {...register("lastname",
                  {
                    required: { value: true, message: "apellido paterno es requerido" },
                    minLength: { value: 2, message: "nombre debe tener un minimo de 2 caracteres" },
                    maxLength: { value: 20, message: "nombre debe tener un maximo de 20 caracteres" },
                  }
                )}
              />
              {errors.lastname && <span className='text-red-400 text-sm'>{errors.lastname.message as string}</span>}
            </div>
            <div className={styles.group}>
              <input type="text" placeholder="apellido materno" className={styles.ttt}
                {...register("firstname",
                  {
                    required: { value: true, message: "apellido materno es requerido" },
                    minLength: { value: 2, message: "nombre debe tener un minimo de 2 caracteres" },
                    maxLength: { value: 20, message: "nombre debe tener un maximo de 20 caracteres" },
                  }
                )}
              />
              {errors.firstname && <span className='text-red-400 text-sm'>{errors.firstname.message as string}</span>}
            </div>
            <div className={styles.group}>
              <input type="number" placeholder="dni" className={styles.ttt}
                {...register("dni",
                  {
                    required: { value: true, message: "dni es requerido" },
                    minLength: { value: 8, message: "nombre debe tener un minimo de 8 caracteres" },
                    maxLength: { value: 8, message: "nombre debe tener un maximo de 8 caracteres" },
                  }
                )}
              />
              {errors.dni && <span className='text-red-400 text-sm'>{errors.dni.message as string}</span>}
            </div>
            <div className={styles.group}>
              <input type="number" placeholder="numero de celular" className={styles.ttt}
                {...register("celular",
                  {
                    required: { value: true, message: "numero de celular es requerido" },
                    minLength: { value: 9, message: "nombre debe tener un minimo de 9 caracteres" },
                    maxLength: { value: 9, message: "nombre debe tener un maximo de 9 caracteres" },
                  }
                )}
              />
              {errors.celular && <span className='text-red-400 text-sm'>{errors.celular.message as string}</span>}
            </div>
            <div className={styles.group}>
              <select className={styles.selectOption}
                {...register("rol",
                  {
                    required: { value: true, message: "rol es requerido" },
                    onChange(event) {
                      setTypeRol(event.target.value)
                    },
                  },

                )}
              >
                <option value="">ROL</option>
                {rolesData?.map((rol, index) => {
                  return (
                    <option className='uppercase text-slate-500' key={index} value={rol}>{validateRol(rol)}</option>
                  )
                })}
              </select>
              {errors.rol && <span className='text-red-400 text-sm'>{errors.rol.message as string}</span>}
            </div>
            {/* {
              typeRol === "1" ?
                <div className={styles.group}>
                  <select onChange={handleAddCursos} className={styles.selectOption}
                  >
                    <option value="">SELECCIONA CURSOS</option>
                    {allCursos?.map((curso, index) => {
                      return (
                        <option className='uppercase text-slate-500' key={index} value={curso.name}>{curso.name}</option>
                      )
                    })}
                  </select>
                  {
                    cursosProfesor.length > 0 &&
                    <div>
                      <h4 className={styles.titleCursos}>cursos agregados</h4>
                      <ul className={styles.cursosList}>
                        {
                          cursosProfesor.map((c, index) => {
                            return (
                              <li key={index} className={styles.lista}><span className={styles.labelLista}>{c}</span> <span className={styles.deleteCurso} onClick={() => deleteCursoProfesor(c)}>x</span></li>
                            )
                          })
                        }
                      </ul>
                    </div>
                  }
                </div>
                : null
            } */}
            <button className={styles.buttonSubmit}>aceptar</button>
          </form>
        </div>
      </div>,
      container
    )
    : null
}

export default NewUserModal