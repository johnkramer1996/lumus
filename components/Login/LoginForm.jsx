import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Input } from 'components/ui'
import React, { useEffect } from 'react'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { authStepTypes } from 'store/reducers/auth/types'
import { authSelectors } from 'store/selectors'
import { requiredIfExist } from 'validations'
import * as yup from 'yup'

const validationSchema = yup
   .object({
      email: yup.string().required('Please enter'),
      password: yup.string(),
      name: yup.string(),
      phone: yup.string(),
   })
   .transform(function (current, original) {
      this.fields.password = requiredIfExist(yup.string(), original?.password)
      this.fields.name = requiredIfExist(yup.string(), original?.name)
      this.fields.phone = requiredIfExist(yup.string(), original?.phone)
      return current
   })

const LoginForm = ({ steps = {}, step }) => {
   const form = useForm({
      mode: 'onBlur',
      resolver: yupResolver(validationSchema),
      defaultValues: {
         email: 'vitaliczinoviev@gmail.com',
         password: '123456781',
      },
   })
   const inputs = useMemo(
      () => ({
         email: { name: 'email', placeholder: 'E-mail', type: 'text' },
         password: { name: 'password', placeholder: 'Пароль', type: 'password' },
         name: { name: 'name', placeholder: 'Имя Фамилия', type: 'text' },
         phone: { name: 'phone', placeholder: 'Номер телефона', type: 'text' },
      }),
      [],
   )

   const inputsForStep = {
      [authStepTypes.CHECK_EMAIL]: [inputs.email],
      [authStepTypes.LOGIN]: [inputs.email, inputs.password],
      [authStepTypes.RESTORE]: [inputs.email, inputs.password],
      [authStepTypes.REGISTER]: [inputs.email, inputs.password, inputs.name, inputs.phone],
   }

   const onSubmit = (data) => {
      steps[step].onNext(data)
   }

   useEffect(() => {
      // Object.entries(inputs).forEach(([key, value]) => {
      //    if (!inputsForStep[step].includes(value) && form.getValues(key) !== undefined) {
      //       form.unregister(key)
      //    }
      // })
   }, [step])

   return (
      <form onSubmit={form.handleSubmit(onSubmit)}>
         {inputsForStep[step].map(({ ...props }, index) => (
            <Input key={index} form={form} classNameWrapper='mb-20' {...props} />
         ))}
         <Button className='btn-max mt-20'>{steps[step].btn}</Button>
      </form>
   )
}

export default LoginForm
