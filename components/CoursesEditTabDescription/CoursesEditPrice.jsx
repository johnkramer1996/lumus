import { Checkbox, Input } from 'components/ui'
import { useInput } from 'hooks'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { coursesSelectors } from 'store/selectors'
import { ReactComponent as DeleteSvg } from 'svg/delete.svg'
import { getError } from 'utils'

const CoursesEditPrice = ({ id, index, onRemove, name, form }) => {
   const modules = useSelector(coursesSelectors.getModules)

   const error = getError(form.formState.errors, `${name}.${index}.moduls`)

   return (
      <div className='create-price__group'>
         <div className='create-price__group-top'>
            <div className='create-price__subtitle'>Вариант участия {index + 1}</div>
            <button className='create-price__delete' onClick={() => onRemove(index)}>
               <DeleteSvg />
            </button>
         </div>
         <div className='create-price__grid'>
            <Input form={form} name={`${name}.${index}.name`} label='Название' classNameWrapper='create-price__form-group' />
            <Input form={form} name={`${name}.${index}.width`} label='Длительность обучения' classNameWrapper='create-price__form-group' />
            <Input form={form} name={`${name}.${index}.price_with_sale`} label='Стоимость без скидки (в рублях)' classNameWrapper='create-price__form-group' number />
            <Input form={form} name={`${name}.${index}.price`} label='Стоимость со скидкой (в рублях)' classNameWrapper='create-price__form-group' number />
         </div>
         <div className='create-price__checks'>
            {modules.map(({ name: label }, mIndex) => (
               <Checkbox key={mIndex} form={form} name={`${name}.${index}.moduls`} value={mIndex} label={label} className='create-price__check' />
            ))}
            <div className='input-error-text'>{error && error.message}</div>
         </div>
         <Input form={form} name={`${name}.${index}.text`} label='Описание (новый пункт через Enter)' classNameWrapper='create-price__text' textarea />
      </div>
   )
}

export default CoursesEditPrice
