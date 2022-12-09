import { Button, CardBg, ImgUpload, ImgUploadNew, Input, LoaderWrapper } from 'components/ui'
import { useDispatch, useNavigate, useRequest } from 'hooks'
import React, { useEffect, useLayoutEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getDate, getTime, getURL, isActiveClass, timeout } from 'utils'
import { useForm } from 'react-hook-form'
import { notificationsSelectors, systemSelectors } from 'store/selectors'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const validationSchema = yup.object({
   name: yup.string().required('Обязательное поле'),
   text: yup.string().required('Обязательное поле'),
   //  categoryId: yup.number().required('Обязательное поле'),
   //  typeId: yup.number().required('Обязательное поле'),
   //  difficultyId: yup.number().required('Обязательное поле'),
   //  formatId: yup.number().required('Обязательное поле'),
})

const CabinetNotificationsAdd = () => {
   const { notificationId } = useParams()
   const isEditPage = !!notificationId
   const { toCabinetNotifications, toCabinetNotificationsEdit } = useNavigate()
   const { resetNotifications, addNotification, fetchNotification, putNotification, deleteNotification, setIsShow, setContent } = useDispatch()
   const notification = useSelector(notificationsSelectors.getNotification)
   const { categories, types, difficulties, formats, NotificationTypes } = useSelector(systemSelectors.getCategories)
   const hasNotification = !(Object.keys(notification).length === 0)

   const form = useForm({
      mode: 'onChange',
      resolver: yupResolver(validationSchema),
      defaultValues: {
         name: 'Заголовок рассылки',
         text: 'Описание рассылки',
         //  categoryId: 1,
         //  typeId: 1,
         //  difficultyId: 1,
         //  formatId: 1,
      },
   })
   const {
      formState: { isDirty, errors },
   } = form

   const fetchNotificationRequest = useRequest(fetchNotification, isEditPage, {
      error: () => toCabinetNotifications(),
   })

   useEffect(() => {
      // if (NotificationTypes.length) form.setValue('NotificationTypeId', NotificationTypes[0].id)
      // if (categories.length) form.setValue('categoryId', categories[0].id)
      // if (types.length) form.setValue('typeId', types[0].id)
      // if (difficulties.length) form.setValue('difficultyId', difficulties[0].id)
      // if (formats.length) form.setValue('formatId', formats[0].id)
   }, [])

   useEffect(() => {
      if (hasNotification) setValues()
   }, [notification])

   useEffect(() => {
      if (isEditPage) fetchNotificationRequest.call({ notificationId })
      return () => resetNotifications()
   }, [])

   const setValues = () => {
      Object.entries(form.getValues()).forEach(([_key]) => {
         const [key, value] = [_key, notification[_key]]
         if (!value) return
         form.setValue(key, value ?? '')
      })
   }

   const addNotificationRequest = useRequest(addNotification, false, {
      success: (response, data) => {
         setContent({ title: 'Уведомление добавлено' })
         toCabinetNotificationsEdit({ notificationId: data.id })
         form.reset(
            {},
            {
               keepValues: true,
            },
         )
      },
   })

   const putNotificationRequest = useRequest(putNotification, false, {
      success: (response, data) => {
         setContent({ title: 'Информация о уведомлении - обновлено' })
         form.reset(
            {},
            {
               keepValues: true,
            },
         )
      },
   })

   const deleteNotificationRequest = useRequest(deleteNotification, false, {
      success: (response, data) => {
         setContent({ title: 'Уведомление удалено' })
         toCabinetNotifications()
      },
   })

   const onSave = (body) => {
      hasNotification ? putNotificationRequest.call({ notificationId, body }) : addNotificationRequest.call({ body })
   }

   const onDelete = (e) => {
      e.preventDefault()
      setContent({
         title: 'Вы действительно хотите удалить?',
         button: 'Удалить',
         callback: () => {
            setIsShow(false)
            deleteNotificationRequest.call({ notificationId })
         },
      })
   }

   const onReset = (e) => {
      e.preventDefault()

      setValues()
      form.clearErrors()
   }

   const disabledButtonSave = !isDirty || errors.length

   return (
      <section className='course-edit mailing'>
         <div className='container'>
            <form onSubmit={form.handleSubmit(onSave)} className='edit-event__inner'>
               <div className='edit-event__left'>
                  <LoaderWrapper isLoading={fetchNotificationRequest.isLoading}>
                     <h1 className='display-3'>
                        <span>{isEditPage ? 'Редактирование' : 'Создание'} рассылки</span>
                     </h1>
                     <CardBg className={'create-price'}>
                        <h3 className='create-price__title display-4'>Параметры</h3>
                        <div className='create-price__group'>
                           <Input form={form} name='name' label='Заголовок рассылки' className='course-edit__form-group' />
                        </div>
                        {/* <div className='create-price__group'>
                           <div className='create-whom__subtitle' style={{ marginBottom: '16px' }}>
                              Участвующие курсы
                           </div>
                           <Input form={form} name='NotificationTypeId' label='Тип события' className='course-edit__form-group' options={NotificationTypes} />
                           <Input form={form} name='categoryId' label='Категория' className='course-edit__form-group' options={categories} />
                           <Input form={form} name='typeId' label='Тип обучения' className='course-edit__form-group' options={types} />
                           <Input form={form} name='difficultyId' label='Сложность' className='course-edit__form-group' options={difficulties} />
                           <Input form={form} name='formatId' label='Формат' className='course-edit__form-group' options={formats} />
                        </div> */}
                     </CardBg>
                     <CardBg>
                        <h3 className='display-4'>Описание</h3>
                        <Input form={form} name='text' className='create-about__editor' textarea />
                     </CardBg>
                  </LoaderWrapper>
               </div>
               <div className='edit-event__right'>
                  <CardBg style={{ position: 'sticky', top: 0 }}>
                     <div>
                        <Button className={`edit-event__save${isActiveClass(disabledButtonSave, 'btn--disabled')}`}>{isEditPage ? 'Сохранить' : 'Создать'}</Button>

                        {isEditPage && !disabledButtonSave && (
                           <Button className={`course-edit__hint-cancel`} onClick={onReset} outline>
                              Отменить
                           </Button>
                        )}

                        <div className='mailing__check checkbox'>
                           <input type='checkbox' className='checkbox' id='c' />
                           <label htmlFor='c'>Отправить даже если уведомления выключены в настройках у пользователя</label>
                        </div>
                     </div>
                  </CardBg>
                  {isEditPage && (
                     <Button className='edit-event__delete' color='red' onClick={onDelete} light>
                        Удалить уведомление
                     </Button>
                  )}
               </div>
            </form>
         </div>
      </section>
   )
}

export default CabinetNotificationsAdd
