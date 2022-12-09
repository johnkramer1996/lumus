import { Breadcrumbs, Button, CardBg, ImgUpload, ImgUploadNew, Input, LoaderWrapper } from 'components/ui'
import { useDispatch, useNavigate, useRequest } from 'hooks'
import React, { useEffect, useLayoutEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getDate, getTime, getURL, isActiveClass, timeout, toFormData } from 'utils'
import { useForm } from 'react-hook-form'
import { eventsSelectors, systemSelectors } from 'store/selectors'
import { TIME_NAMES } from 'constants'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const validationSchema = yup.object({
   imageView: yup.string().required('Обязательное поле'),
   image: yup.mixed().imageFormatCheck().imageFileSizeCheck(5),
   //  .imageMinResolutionCheck(1280, 720)
   name: yup.string().required('Обязательное поле'),
   title: yup.string().required('Обязательное поле'),
   description: yup.string().required('Обязательное поле'),
   eventTypeId: yup.string().required('Обязательное поле'),
   edate: yup.string().required('Обязательное поле'),
   etime: yup
      .string()
      .required('Обязательное поле')
      .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/, 'Время в формате 00:00:00'),
   durationNumber: yup.number().typeError('Некорректное число').required('Обязательное поле'),
   durationName: yup.string().required('Обязательное поле'),
   text: yup.string().required('Обязательное поле'),
   videoKey: yup.string(),
})

const CabinetEventsAdd = () => {
   const { eventId } = useParams()
   const isEditPage = !!eventId
   const { toCabinetEvents, toCabinetEventsEdit } = useNavigate()
   const { fetchEvent, addEvent, putEvent, deleteEvent, resetEvents, setIsShow, setContent } = useDispatch()
   const event = useSelector(eventsSelectors.getEvent)
   const { eventTypes } = useSelector(systemSelectors.getCategories)
   const hasEvent = !(Object.keys(event).length === 0)

   const form = useForm({
      mode: 'onChange',
      resolver: yupResolver(validationSchema),
      defaultValues: {
         imageView: '',
         image: '',
         name: 'Название курса',
         title: 'Заголовок курса',
         description: 'Короткое описание',
         eventTypeId: '1',
         edate: '2022-07-08',
         etime: '12:00:00',
         durationNumber: '3',
         durationName: 'days',
         text: 'Описание события',
         videoKey: 'Видео кей',
      },
   })
   const {
      formState: { isDirty, errors },
   } = form

   useEffect(() => {
      if (eventTypes.length) form.setValue('eventTypeId', eventTypes[0].id)
   }, [eventTypes])

   useEffect(() => {
      if (hasEvent) setValues()
   }, [event])

   const fetchEventRequest = useRequest(fetchEvent, isEditPage, {
      error: () => toCabinetEvents({ replace: true }),
   })

   useEffect(() => {
      if (isEditPage) fetchEventRequest.call({ eventId })
      return () => resetEvents()
   }, [])

   const setValues = () => {
      Object.entries(form.getValues()).forEach(([_key]) => {
         let [key, value] = [_key, event[_key]]
         if (!value) return
         if (key === 'image') {
            ;[key, value] = [_key + 'View', getURL.img(event[_key])]
         }
         if (key === 'edate') {
            value = getDate(event[key])
         }
         if (key === 'etime') {
            value = getTime(event[key])
         }
         form.setValue(key, value ?? '')
      })
      form.setValue('image', '')
   }

   const addEventRequest = useRequest(addEvent, false, {
      success: (response, data) => {
         toCabinetEventsEdit({ eventId: data.id })
         setContent({ title: 'Информация о мероприятии  - добавлена' })
         form.reset(
            {},
            {
               keepValues: true,
            },
         )
      },
   })

   const putEventRequest = useRequest(putEvent, false, {
      success: (response, data) => {
         setContent({ title: 'Информация о мероприятии  - обновлена' })
         form.reset(
            {},
            {
               keepValues: true,
            },
         )
      },
   })

   const deleteEventRequest = useRequest(deleteEvent, false, {
      success: (response, data) => {
         setContent({ title: 'Мероприятие удалено' })
         toCabinetEvents({ type: 'event' })
      },
   })

   const onSave = (data) => {
      const body = toFormData(data)
      for (const item of body) console.log(item)
      hasEvent ? putEventRequest.call({ eventId, body }) : addEventRequest.call({ body })
   }

   const onDelete = (e) => {
      e.preventDefault()
      setContent({
         title: 'Вы действительно хотите удалить?',
         button: 'Удалить',
         callback: () => {
            setIsShow(false)
            deleteEventRequest.call({ eventId })
         },
      })
   }

   const disabledButtonSave = !isDirty || errors.length

   const onReset = (e) => {
      e.preventDefault()

      setValues()
      form.clearErrors()
   }

   return (
      <section className='edit-event'>
         <div className='container'>
            <form onSubmit={form.handleSubmit(onSave)} className='edit-event__inner'>
               <div className='edit-event__left'>
                  <Breadcrumbs items={[{ to: '', title: 'Мои курсы' }]} />
                  <LoaderWrapper isLoading={fetchEventRequest.isLoading}>
                     <h1 className='edit-event__title display-3'>
                        <span>{isEditPage ? 'Редактирование' : 'Добавление'} мероприятия</span>
                     </h1>
                     <CardBg>
                        <h3 className='course-edit__form-title'>Основная информация</h3>
                        <ImgUploadNew form={form} title={'Изображение'} desc={true} view={{ size: 'md', margin: true }} />
                        <div className='course-edit__form-grid'>
                           <Input form={form} name='name' label='Название' className='course-edit__form-group' />
                           <Input form={form} name='title' label='Заголовок' className='course-edit__form-group' />
                           <Input form={form} name='edate' label='Дата' className='course-edit__form-group' datepicker />
                           <Input form={form} name='etime' label='Время начала (по МСК)' className='course-edit__form-group' />
                           <Input form={form} name='eventTypeId' label='Тип' className='course-edit__form-group' options={eventTypes} />
                           <div className='course-edit__form-group form-group form-group--row'>
                              <Input form={form} name='durationNumber' label='Длительность' className='course-edit__form-group' />
                              <Input form={form} name='durationName' label='&nbsp;' className='course-edit__form-group' options={TIME_NAMES} />
                           </div>
                        </div>
                     </CardBg>
                     <CardBg>
                        <h3 className='create-about__title display-4'>Короткое описание</h3>
                        <Input form={form} name='description' className='create-about__editor create-about__editor--sm' textarea />
                     </CardBg>
                     <CardBg>
                        <h3 className='create-about__title display-4'>Описание</h3>
                        <Input form={form} name='text' className='create-about__editor' textarea />
                     </CardBg>
                     <CardBg>
                        <h3 className='edit-event__broadcast-title display-4'>Трансляция</h3>
                        <div className='edit-event__broadcast-bottom'>
                           <Input form={form} name='videoKey' label='Ключ трансляции' classNameWrapper='edit-event__broadcast-form-group' />
                           <Button className='edit-event__broadcast-btn' outline>
                              Как узнать ключ трансляции?
                           </Button>
                        </div>
                     </CardBg>
                  </LoaderWrapper>
               </div>
               <div className='edit-event__right'>
                  <div className='edit-event__nav card-bg'>
                     <div>
                        <Button className={`edit-event__save${isActiveClass(disabledButtonSave, 'btn--disabled')}`}>{isEditPage ? 'Сохранить' : 'Создать'}</Button>

                        {isEditPage && !disabledButtonSave && (
                           <Button className={`course-edit__hint-cancel`} onClick={onReset} outline>
                              Отменить
                           </Button>
                        )}

                        <div className='edit-event__hint'>Ваши изменения будут отправлены на модерацию.</div>
                     </div>
                  </div>
                  {isEditPage && (
                     <Button className='edit-event__delete' color='red' onClick={onDelete} light>
                        Удалить мероприятие
                     </Button>
                  )}
               </div>
            </form>
         </div>
      </section>
   )
}

export default CabinetEventsAdd
