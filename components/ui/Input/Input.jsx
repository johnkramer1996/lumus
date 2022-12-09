import React, { useEffect } from 'react'
import { DatePicker } from '..'
import { getError, isActiveClass, isFunction } from 'utils'

const Input = ({ register, form, onBlur, onChange, label, options, classNameWrapper = '', withoutWrapper, datepicker, textarea, isErrorText = true, ...props }) => {
   const name = props.name
   const error = getError(form.formState.errors, name)
   const reg = form.register(name, {
      onBlur: (e) => isFunction(onBlur) && onBlur(e.target.name, e.target.value),
      onChange: (e) => isFunction(onChange) && onChange(e.target.name, e.target.value),
   })

   props = {
      ...reg,
      ...props,
      placeholder: props.placeholder ? props.placeholder : label,
      className: `${props.className || ''}${isActiveClass(error, 'input-error')}`,
   }

   const InputInner = () => (
      <>
         {label && <label>{label}</label>}
         {datepicker ? (
            <DatePicker form={form} props={props} />
         ) : Array.isArray(options) ? (
            <select {...props}>
               <option value='' hidden>
                  {label}
               </option>
               {options.map(({ id, name }, index) => (
                  <option key={id || index} value={id}>
                     {name}
                  </option>
               ))}
            </select>
         ) : textarea ? (
            <textarea {...props}></textarea>
         ) : (
            <input type='text' {...props} autoComplete='off' />
         )}

         {error && isErrorText && <div className='input-error-text'>{error.message || 'Обязательное поле'}</div>}
      </>
   )

   return <>{withoutWrapper ? InputInner() : <div className={`form-group ${classNameWrapper}`}>{InputInner()}</div>}</>
}

export default Input
