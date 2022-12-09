import React from 'react'
import { getURL } from 'utils'
import { ReactComponent as DeleteSvg } from 'svg/delete.svg'
import { ImgUploadNew, Input } from 'components/ui'

const CoursesEditBlockItem = ({ id, index, onRemove, onDeleteImg, name, form, image }) => {
   return (
      <div className='create-whom__group'>
         <div className='create-whom__group-top'>
            <div className='create-whom__subtitle'>Описание {index + 1}</div>
            <button className='create-whom__delete' onClick={() => onRemove(index)}>
               <DeleteSvg />
            </button>
         </div>
         <ImgUploadNew form={form} name={`${name}.${index}.`} size={'sm'} onDelete={onDeleteImg.bind(null, id)} imgClass={'img--md'} ratio={'1/1'} recommend={'248x248'} max={'1 МБ'} />
         <Input form={form} name={`${name}.${index}.name`} label='Заголовок' />
         <Input form={form} name={`${name}.${index}.text`} label='Описание (новый пункт через Enter)' classNameWrapper='create-price__text' textarea />
         <Input form={form} name={`${name}.${index}.id`} type='hidden' withoutWrapper />
      </div>
   )
}

export default CoursesEditBlockItem
