import React, { forwardRef, useEffect, useImperativeHandle, useMemo, useRef } from 'react'
import { Checkbox, ImgUpload, ImgUploadNew, Input } from 'components/ui'
import { getDate, getURL, imageDimensionCheck, imageRatioCheck, imageWidthAndHeight, timeout, toBoolean } from 'utils'
import { useSelector } from 'react-redux'
import { useDispatch, useNavigate, useRequest } from 'hooks'
import { useLocation, useParams } from 'react-router-dom'
import { useCallback } from 'react'
import { coursesSelectors, systemSelectors } from 'store/selectors'
import { useForm, useWatch } from 'react-hook-form'
import { TIME_NAMES } from 'constants'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { imageFileSizeCheck, imageFormatCheck, imageMinResolutionCheck } from 'validations'

yup.addMethod(yup.mixed, 'imageMinResolutionCheck', imageMinResolutionCheck)
yup.addMethod(yup.mixed, 'imageFormatCheck', imageFormatCheck)
yup.addMethod(yup.mixed, 'imageFileSizeCheck', imageFileSizeCheck)

const validationSchema = yup.object({
   name: yup.string().required('Обязательное поле'),
   category_id: yup.string().required('Обязательное поле'),
   type_id: yup.string().required('Обязательное поле'),
   format_id: yup.string().required('Обязательное поле'),
   anytime: yup.boolean().required('Обязательное поле'),
   timing: yup.string().required('Обязательное поле'),
   duration_number: yup.number().typeError('Некорректное число').required('Обязательное поле'),
   duration_name: yup.string().required('Обязательное поле'),
   sale_subscribe: yup.boolean().required('Обязательное поле'),
   imageValue: yup.string().required('Обязательное поле'),
   image: yup.mixed().imageFormatCheck().imageFileSizeCheck(5).imageMinResolutionCheck(1280, 720),
})

const CoursesEditTabMain = ({ refTabs, refTab }) => {
   const { courseId } = useParams()
   const { toCabinetCoursesEdit } = useNavigate()
   const { setContent, setIsShow, addCourse, putCourse } = useDispatch()
   const { categories, types, formats } = useSelector(systemSelectors.getCategories)
   const course = useSelector(coursesSelectors.getCourse)
   const hasCourse = !(Object.keys(course).length === 0)

   const form = useForm({
      mode: 'onChange',
      resolver: yupResolver(validationSchema),
   })
   const { errors } = form.formState

   const anytime = form.watch('anytime')

   useEffect(() => {
      if (hasCourse) {
         Object.entries(form.getValues())
            .filter(([k]) => !['image'].includes(k))
            .forEach(([key]) => form.setValue(key, course[key] ?? ''))
         form.setValue('anytime', toBoolean(course['anytime']))
         form.setValue('sale_subscribe', toBoolean(course['sale_subscribe']))
         form.setValue('imageValue', getURL.img(course['image'], false) ?? '')
      }
   }, [course])

   const addCourseRequest = useRequest(addCourse, false, {
      success: (response, data) => {
         setIsShow(true)
         setContent({ title: 'Основная информация о курсе  - добавлена,', descr: 'теперь заполните Уроки' })
         toCabinetCoursesEdit({ courseId: data.course.id })
         refTabs.current.nextItems()
      },
   })
   const putCourseRequest = useRequest(putCourse, false, {
      success: (response, data) => {
         setIsShow(true)
         setContent({ title: 'Курс Обновлен' })
         form.reset(
            {},
            {
               keepValues: true,
            },
         )
      },
   })

   const onSubmit = (data) => {
      const body = new FormData()

      Object.entries(data).forEach(([key, value]) => {
         const val = typeof value === 'boolean' ? +value : value?.constructor.name === 'FileList' ? value[0] : value
         if (val === undefined || val === null) return
         body.append(key, val)
      })

      console.log(body)

      return

      hasCourse ? putCourseRequest.call({ courseId, body }) : addCourseRequest.call({ body })
   }

   useImperativeHandle(refTab, () => ({
      getForm: () => form,
   }))

   return (
      <form id='form-edit' onSubmit={form.handleSubmit(onSubmit)} className='course-edit__form'>
         <h3 className='course-edit__form-title'>Основная информация</h3>
         <div className='course-edit__form-grid'>
            <Input form={form} name='name' label='Название' className='course-edit__form-group' />
            <Input form={form} name='category_id' label='Категория' options={categories} className='course-edit__form-group' />
            <Input form={form} name='type_id' label='Тип обучения' options={types} className='course-edit__form-group' />
            <Input form={form} name='format_id' label='Формат' options={formats} className='course-edit__form-group' />
            <div className='course-edit__form-group form-group'>
               <label>Старт курса</label>
               {!anytime && <Input form={form} name='timing' placeholder='Старт курса' className='course-edit__form-group' withoutWrapper datepicker />}
               <Checkbox form={form} name='anytime' label='В любое время' className='course-edit__form-checkbox' />
            </div>
            <div className='course-edit__form-group form-group form-group--row'>
               <Input form={form} name='duration_number' label='Длительность' className='course-edit__form-group' number />
               <Input form={form} name='duration_name' label='&nbsp;' className='course-edit__form-group' options={TIME_NAMES} />
            </div>
            <Checkbox form={form} name='sale_subscribe' label='Разрешить продавать по подписке' className='course-edit__form-checkbox' />
         </div>
         <ImgUploadNew form={form} name='' title='Изображение' />
      </form>
   )
}

export default CoursesEditTabMain
