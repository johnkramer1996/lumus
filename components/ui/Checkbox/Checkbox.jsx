import React from 'react'
import { isActiveClass, uid } from 'utils'

const Checkbox = ({ form, label = '', onChange, type = 'checkbox', className, registerOptions, ...props }) => {
   if (!form || !props['name']) return <input type='text' placeholder='Error Input' />
   const id = uid()

   const name = props['name']
   const {
      register,
      formState: { errors },
   } = form

   const error = errors[name]

   props = {
      ...register(name, { required: false, ...registerOptions }),
      ...props,
   }

   return (
      <div className={`${className} ${type}`}>
         <input type='checkbox' id={id} {...props} />
         <label htmlFor={id}>{label}</label>
      </div>
   )
}

export default Checkbox
