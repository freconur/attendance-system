import { app } from "@/firebase/firebaseConfig"
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage"
import { useGlobalContext, useGlobalContextDispatch } from "../context/GlobalContext"
import { addDoc, collection, doc, getDocs, getFirestore, onSnapshot, query, where } from "firebase/firestore"
import { currentDate, currentMonth, currentYear, monthToString } from "@/dates/date"
import { AulaVirtual } from "../types/types"
import { AttendanceRegister } from "../actions/actionAttendance"

// Tipos para las respuestas de las funciones
interface UploadFileResponse {
  success: boolean
  fileId: string
  downloadURL: string
  fileName: string
  message: string
}

interface UseUploadFilesReturn {
  uploadFiles: (data: File, grado: string, curso: string) => Promise<UploadFileResponse>
  getFilesPorFecha: (fecha: number, mes: number) => Promise<AulaVirtual[]>
  getFilesPorGrado: (fecha: number, mes: number, grado: number, idInstitucion: string) => Promise<AulaVirtual[]>
}





/**
 * Hook personalizado para manejar la subida y obtención de archivos en el aula virtual
 * 
 * @returns {UseUploadFilesReturn} Objeto con las funciones para manejar archivos
 */
export const useUploadFiles = (): UseUploadFilesReturn => {

  const storage = getStorage(app)
  const db = getFirestore(app)

  const { userData } = useGlobalContext()
  const dispatch = useGlobalContextDispatch()

  const getFilesPorGrado = async (fecha: number, mes: number, grado: number, idInstitucion: string) => {
    // Validaciones de entrada
    if (!fecha || !mes || !grado || !idInstitucion) {
      throw new Error('Todos los parámetros son requeridos')
    }

    if (fecha < 1 || fecha > 31) {
      throw new Error('La fecha debe estar entre 1 y 31')
    }

    if (mes < 1 || mes > 12) {
      throw new Error('El mes debe estar entre 1 y 12')
    }

    try {
      dispatch({ type: AttendanceRegister.LOADER_AULA_VIRTUAL, payload: true })
      
      const collectionPath = `/intituciones/${idInstitucion}/aula-virtual/${currentYear()}/${monthToString(Number(mes))}-${fecha}`
      console.log('Buscando archivos en:', collectionPath)
      
      const pathRef = collection(db, collectionPath)
      const q = query(pathRef, where("grado", "==", `${grado}`))
      
      const querySnapshot = await getDocs(q)
      const archivosSubidos: AulaVirtual[] = []
      
      if (querySnapshot.empty) {
        console.log('No se encontraron archivos para el grado:', grado)
        dispatch({ type: AttendanceRegister.ARCHIVOS_AULA_VIRTUAL, payload: [] })
        return []
      }

      querySnapshot.forEach(doc => {
        const data = doc.data()
        archivosSubidos.push({ 
          ...data, 
          id: doc.id 
        } as AulaVirtual)
      })

      console.log(`Se encontraron ${archivosSubidos.length} archivos para el grado ${grado}`)
      dispatch({ type: AttendanceRegister.ARCHIVOS_AULA_VIRTUAL, payload: archivosSubidos })
      
      return archivosSubidos

    } catch (error) {
      console.error('Error al obtener archivos por grado:', error)
      dispatch({ type: AttendanceRegister.ARCHIVOS_AULA_VIRTUAL, payload: [] })
      throw error
    } finally {
      // Asegurar que el loader se desactive siempre
      dispatch({ type: AttendanceRegister.LOADER_AULA_VIRTUAL, payload: false })
    }
  }

  const getFilesPorFecha = async (fecha: number, mes: number) => {
    // Validaciones de entrada
    if (!fecha || !mes) {
      throw new Error('La fecha y el mes son requeridos')
    }

    if (fecha < 1 || fecha > 31) {
      throw new Error('La fecha debe estar entre 1 y 31')
    }

    if (mes < 1 || mes > 12) {
      throw new Error('El mes debe estar entre 1 y 12')
    }

    if (!userData?.idInstitution || !userData?.dni) {
      throw new Error('Datos de usuario incompletos')
    }

    try {
      dispatch({ type: AttendanceRegister.LOADER_AULA_VIRTUAL, payload: true })
      
      const collectionPath = `/intituciones/${userData.idInstitution}/aula-virtual/${currentYear()}/${monthToString(Number(mes))}-${fecha}`
      console.log('Buscando archivos del profesor en:', collectionPath)
      
      const pathRef = collection(db, collectionPath)
      const q = query(pathRef, where("idProfesor", "==", `${userData.dni}`))
      
      const querySnapshot = await getDocs(q)
      const archivosSubidos: AulaVirtual[] = []
      
      if (querySnapshot.empty) {
        console.log('No se encontraron archivos para el profesor en esta fecha')
        dispatch({ type: AttendanceRegister.ARCHIVOS_AULA_VIRTUAL, payload: [] })
        return []
      }

      querySnapshot.forEach(doc => {
        const data = doc.data()
        archivosSubidos.push({ 
          ...data, 
          id: doc.id 
        } as AulaVirtual)
      })

      console.log(`Se encontraron ${archivosSubidos.length} archivos del profesor`)
      dispatch({ type: AttendanceRegister.ARCHIVOS_AULA_VIRTUAL, payload: archivosSubidos })
      
      return archivosSubidos

    } catch (error) {
      console.error('Error al obtener archivos por fecha:', error)
      dispatch({ type: AttendanceRegister.ARCHIVOS_AULA_VIRTUAL, payload: [] })
      throw error
    } finally {
      // Asegurar que el loader se desactive siempre
      dispatch({ type: AttendanceRegister.LOADER_AULA_VIRTUAL, payload: false })
    }
  }

  const uploadFiles = async (data: File, grado: string, curso: string) => {
    // Validaciones de entrada
    if (!data || !(data instanceof File)) {
      throw new Error('El archivo proporcionado no es válido')
    }

    if (!grado || !curso) {
      throw new Error('El grado y curso son requeridos')
    }

    if (!userData?.idInstitution || !userData?.dni) {
      throw new Error('Datos de usuario incompletos')
    }

    // Validar tipos de archivo permitidos
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'image/jpeg',
      'image/png',
      'image/gif',
      'video/mp4',
      'video/avi',
      'video/quicktime',
      'text/plain'
    ]

    if (!allowedTypes.includes(data.type)) {
      throw new Error(`Tipo de archivo no permitido. Tipos permitidos: ${allowedTypes.join(', ')}`)
    }

    // Validar tamaño del archivo (máximo 50MB)
    const maxSize = 50 * 1024 * 1024 // 50MB en bytes
    if (data.size > maxSize) {
      throw new Error('El archivo es demasiado grande. Tamaño máximo permitido: 50MB')
    }

    try {
      dispatch({ type: AttendanceRegister.LOADER_UPLOAD, payload: true })
      
      // Generar nombre único para evitar conflictos
      const timestamp = Date.now()
      const fileExtension = data.name.split('.').pop()
      const uniqueFileName = `${data.name.replace(/\.[^/.]+$/, '')}_${timestamp}.${fileExtension}`
      
      // Crear referencia optimizada en Firebase Storage
      const archivoRef = ref(
        storage,
        `/instituciones/${userData.idInstitution}/aula-virtual/${currentYear()}/${currentMonth()}-${currentDate()}/${grado}/${uniqueFileName}`
      )

      // Subir archivo a Firebase Storage
      const uploadResult = await uploadBytes(archivoRef, data)
      console.log('Archivo subido exitosamente:', uploadResult.metadata.name)

      // Obtener URL de descarga
      const downloadURL = await getDownloadURL(archivoRef)
      console.log('URL de descarga generada:', downloadURL)

      // Crear referencia a la colección de Firestore
      const refFilesAulaVirtual = `/intituciones/${userData.idInstitution}/aula-virtual/${currentYear()}/${currentMonth()}-${currentDate()}`
      
      // Guardar metadatos en Firestore
      const fileMetadata = {
        url: downloadURL,
        nombreCurso: curso,
        nombreArchivo: data.name,
        nombreArchivoUnico: uniqueFileName,
        idProfesor: userData.dni,
        grado: grado,
        tipoArchivo: data.type,
        tamañoArchivo: data.size,
        fechaSubida: new Date().toISOString(),
        fechaSubidaTimestamp: timestamp,
        rutaStorage: archivoRef.fullPath
      }

      const docRef = await addDoc(collection(db, refFilesAulaVirtual), fileMetadata)
      console.log('Metadatos guardados en Firestore con ID:', docRef.id)
      
      return {
        success: true,
        fileId: docRef.id,
        downloadURL,
        fileName: data.name,
        message: 'Archivo subido exitosamente'
      }

    } catch (error) {
      console.error('Error al subir archivo:', error)
      
      // Re-lanzar el error para que el componente pueda manejarlo
      throw error
    } finally {
      // Asegurar que el loader se desactive siempre, sin importar el resultado
      dispatch({ type: AttendanceRegister.LOADER_UPLOAD, payload: false })
    }
  }
  return {
    uploadFiles,
    getFilesPorFecha,
    getFilesPorGrado
  } as UseUploadFilesReturn
}