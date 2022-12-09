import React from 'react'
import { isActiveClass } from 'utils'
import { ReactComponent as UploadSvg } from 'svg/upload.svg'
import { useWatch } from 'react-hook-form'
import { Button } from 'components/ui'
import { useInputFileNew } from 'hooks'

const CabinetSettingsDocsItem = ({ form, name, label, onChange }) => {
   const input = useInputFileNew({ form, name, onChange, onDelete: onChange })
   const fileView = useWatch({
      control: form.control,
      name: input.inputNameView,
   })

   return (
      <div className={`account-settings__item ${isActiveClass(fileView, 'account-settings__item--active')}`}>
         <div className='account-settings__item-top'>
            <span className='account-settings__item-title'>{label}</span>
            {fileView && (
               <Button className='img-upload-delete account-settings__item-btn' onClick={input.onDelete} outline>
                  Удалить
               </Button>
            )}
         </div>
         <div className='account-settings__item-doc' onClick={input.onOpen}>
            {fileView && <img src={fileView} alt='' />}
            <input type='hidden' {...input.inputFileView} />
         </div>
         <div className='account-settings__upload'>
            <UploadSvg />
            <div className='account-settings__upload-title'>
               <strong>Загрузите файл</strong>
               <span>или перетащите его сюда</span>
            </div>
            <div className='account-settings__upload-hint'>PNG, JPG до 5 MБ</div>
            <input
               {...input.inputFile}
               ref={(e) => {
                  input.inputFile.ref(e)
                  input.inputFileRef.current = e
               }}
               type='file'
               accept='image/*'
               className='account-settings__upload-input'
            />
         </div>
      </div>
   )
}

export default CabinetSettingsDocsItem
