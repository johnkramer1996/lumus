import React, { useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { frontStaticSelectors, systemSelectors } from 'store/selectors'
import { ReactComponent as PhoneSvg } from 'svg/phone.svg'
import { ReactComponent as EmailSvg } from 'svg/email.svg'
import { useDispatch, useRequest } from 'hooks'
import { Button, CardBg, Input } from 'components/ui'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { ReactComponent as AddSvg } from 'svg/add.svg'
import { ReactComponent as DeleteSvg } from 'svg/delete.svg'
import { ReactComponent as DragSvg } from 'svg/drag.svg'
import { ReactComponent as LinkSvg } from 'svg/link.svg'

const validationSchema = yup.object({
   name: yup.string().required('Please enter'),
   email: yup.string().required('Please enter').email('must be a valid email address.'),
   text: yup.string().required('Please enter'),
})

const Contacts = () => {
   const { fetchFrontContacts, deleteFrontContacts, sendFrontContacts, setContent } = useDispatch()
   const { phone, email } = useSelector(systemSelectors.getContacts)
   const frontContacts = useSelector(frontStaticSelectors.getContacts)

   const form = useForm({
      mode: 'onBlur',
      resolver: yupResolver(validationSchema),
      defaultValues: {
         name: '',
         email: '',
         text: '',
      },
   })

   const fetchFrontContactsRequest = useRequest(fetchFrontContacts)
   const sendFrontContactsRequest = useRequest(sendFrontContacts, false, {
      success: () => {
         form.reset()
         setContent({ title: 'Заявка отправлена' })
         fetchFrontContactsRequest.call()
      },
   })
   const deleteFrontContactsRequest = useRequest(deleteFrontContacts, false, {
      success: () => {
         setContent({ title: 'Заявка удалена' })
      },
   })

   useEffect(() => {
      fetchFrontContactsRequest.call()
   }, [])

   const onSubmit = sendFrontContactsRequest.call

   const onRemove = (id) => {
      console.log(id)
      return
      deleteFrontContactsRequest.call({ id })
   }

   return (
      <section className='contacts'>
         <div className='container'>
            <ul className='create-module'>
               {/* {frontContacts.map(({ id, name, email, text }) => (
                  <CardBg key={id} className='create-module__item form-group'>
                     <div className='create-module__input'>
                        <button className='create-module__drag'>
                           <DragSvg />
                        </button>
                        <div className='create-module__text'>
                           <div>{name}</div>
                           <div>{email}</div>
                           <div>{text}</div>
                        </div>
                        <button className='create-module__delete' onClick={() => onRemove(id)}>
                           <DeleteSvg />
                        </button>
                     </div>
                  </CardBg>
               ))} */}
            </ul>
            <div className='contacts__inner'>
               <div className='contacts__left'>
                  <h1 className='contacts__title display-2'>{'Контакты'}</h1>
                  <div className='contacts__items'>
                     <a href={`tel:${phone}`} className='contacts__item'>
                        <PhoneSvg />
                        <span>{phone}</span>
                     </a>
                     <a href={`mailto:${email}`} className='contacts__item'>
                        <EmailSvg />
                        <span>{email}</span>
                     </a>
                  </div>
                  <form onSubmit={form.handleSubmit(onSubmit)} className='contacts__form'>
                     <h3 className='contacts__form-title display-3'>Связаться с нами</h3>
                     <div className='contacts__form-grid'>
                        <Input form={form} name='name' label='Имя' className='contacts__form-group' />
                        <Input form={form} name='email' label='E-mail' className='contacts__form-group' />
                        <Input
                           form={form}
                           name='text'
                           label='Связаться с нами'
                           placeholder='Напишите свой вопрос или опишите проблему'
                           className='contacts__form-group contacts__form-group--text'
                           textarea
                        />
                     </div>
                     <Button className='contacts__form-btn'>Отправить</Button>
                  </form>
               </div>
               <div className='contacts__right'>
                  <div className='contacts__card'>
                     <div className='contacts__card-title'>Хотите разместить свои курсы?</div>
                     <div className='contacts__card-desc'>Aliquam commodo dictum hendrerit. Lorem ipsum dolor sit amet, consectetur adipiscing elit dictum hendrerit.</div>
                     <Button className='contacts__card-btn'>Стать тренером</Button>
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}

export default Contacts
