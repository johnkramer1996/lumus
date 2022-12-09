import { useInputFileNew } from 'hooks'
import React, { Fragment, useMemo } from 'react'
import { useWatch } from 'react-hook-form'
import { getError } from 'utils'
import { Button } from '..'

const ImgUploadNew = ({ form, onChange: _onChange, onDelete: _onDelete, name = '', title, desc = false, hasDeleteButton = false, view }) => {
   const { onOpen, onDelete, inputFileView, inputFile, inputFileRef, inputName, inputNameView } = useInputFileNew({ form, name, onChange: _onChange, onDelete: _onDelete })

   //  const { onDelete: handleDelete, onOpen, inputFileView, inputFile, inputFileRef } = useInputFileNew({ form, onChange, onDelete, name })
   const { size = '', ratio = '16:9', recommend = '1280x720', max = '5 MБ', radius = false, margin = false } = view || {}
   const descText = useMemo(() => ['Соотношение сторон: ', ratio, ' (рекомендуемое разрешение: ', recommend, <br />, 'PNG, JPG до ', max].map((s, index) => <Fragment key={index}>{s}</Fragment>), [])

   const fileView = useWatch({
      control: form.control,
      name: inputNameView,
   })

   const error = getError(form.formState.errors, inputName) || getError(form.formState.errors, inputNameView)

   const className = ['img-upload']
   !!size && className.push(`img-upload--${size}`)
   margin && className.push(`img-upload--margin`)
   const classNameImg = ['img', 'img--cover', 'img--upload', 'img-upload-img']
   error && classNameImg.push('img--error')
   radius && classNameImg.push('img-upload-img--radius')

   return (
      <div className={className.join(' ')}>
         {title && <div className='img-upload-title'>{title}</div>}
         {desc && <div className='img-upload-desc'>{descText}</div>}
         <div className='img-upload-wrap'>
            <div className={classNameImg.join(' ')} onClick={onOpen}>
               {fileView && <img src={fileView} alt='' />}
               <input type='hidden' {...inputFileView} />
            </div>
            <div className='img-upload-right'>
               <div className='img-upload-buttons'>
                  <Button className='img-upload-btn btn--uploadfile'>
                     <input
                        {...inputFile}
                        ref={(e) => {
                           inputFile.ref(e)
                           inputFileRef.current = e
                        }}
                        type='file'
                        accept='image/*'
                     />
                     Загрузить изображение
                  </Button>
                  {hasDeleteButton && fileView && (
                     <Button className='img-upload-delete' onClick={onDelete} outline>
                        Удалить
                     </Button>
                  )}
               </div>
            </div>
         </div>
         {error && <div className='input-error-text'>{error.message || 'Обязательное поле'}</div>}
      </div>
   )
}

export default ImgUploadNew
