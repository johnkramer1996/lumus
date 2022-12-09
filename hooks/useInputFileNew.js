import { useRef } from 'react'
import { isFunction, loadImg } from 'utils'

const useInputFileNew = ({ form, onChange, onDelete, name = '' } = {}) => {
   const { register, setValue } = form
   const inputName = name ? name : 'image'
   const inputNameView = inputName + 'View'
   const inputFileRef = useRef()
   const inputFile = register(inputName, {
      onChange: async (e) => {
         const { files } = e.target
         if (!files || !files.length) return

         const img = await loadImg(files[0])
         setValue(inputNameView, img?.src)
         isFunction(onChange) && onChange(inputName, files, img?.src)
      },
   })
   const inputFileView = register(inputNameView)

   const handleOpen = (e) => inputFileRef.current.click()

   const hadnleDelete = (e) => {
      e.preventDefault()
      setValue(inputName, '')
      setValue(inputNameView, '')
      onDelete(inputName)
   }

   return { onOpen: handleOpen, onDelete: hadnleDelete, inputFileView, inputFile, inputFileRef, inputName, inputNameView }
}
export default useInputFileNew
