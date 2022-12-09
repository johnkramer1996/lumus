import { Button, Input } from 'components/ui'
import { useEffect } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

const EditModal = ({ inputs = [], validationSchema, values, onChange }) => {
   const form = useForm({
      mode: 'onBlur',
      resolver: yupResolver(validationSchema),
   })

   useEffect(() => {
      Object.entries(form.getValues()).forEach(([key]) => form.setValue(key, values[key] ?? ''))
   }, [values])

   return (
      <>
         <form onSubmit={form.handleSubmit(onChange.bind(null, values.id))}>
            <h3 className='display-3 mb-20'>{values.id ? 'Редактировать' : 'Добавить'}</h3>
            {inputs.map((input, index) => (
               <Input key={index} form={form} {...input} classNameWrapper='mb-20' />
            ))}
            <Button className='mt-20'>Отредактировать</Button>
         </form>
      </>
   )
}

export default EditModal
