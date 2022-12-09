import React, { useEffect, useImperativeHandle } from 'react'
import { Button, CardBg, Input } from 'components/ui'
import { useSelector } from 'react-redux'
import { useDispatch, useRequest } from 'hooks'
import { useParams } from 'react-router-dom'
import { ReactComponent as AddSvg } from 'svg/add.svg'
import { coursesSelectors } from 'store/selectors/'
import { useForm, useWatch } from 'react-hook-form'
import { ReactComponent as DeleteSvg } from 'svg/delete.svg'
import { useCallback } from 'react'
import CoursesEditArrayFields from '../CoursesEdit/CoursesEditArrayFields'
import CoursesEditTabLessonTestLesson from './CoursesEditTabLessonTestLesson'
import CoursesEditTabLessonLesson from './CoursesEditTabLessonLesson'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import CoursesEditTabLessonLessons from './CoursesEditTabLessonLessons'

const validationSchema = yup.object({
   short_desc: yup.string().required('Обязательное поле'),
   test_lesson: yup.string().required('Обязательное поле'),
   modules: yup
      .array()
      .min(1, 'Добавьте один модуль')
      .of(
         yup.object().shape({
            name: yup.string().required('Обязательное поле'),
            lessons: yup
               .array()
               .min(1, 'Добавьте один урок')
               .of(
                  yup.object().shape({
                     name: yup.string().required(),
                  }),
               )
               .required('Обязательное поле'),
         }),
      )
      .required('Обязательное поле'),
})

const CoursesEditTabLesson = ({ refTabs, refTab }) => {
   const { courseId } = useParams()
   const { setContent, setIsShow, setModules, deleteModule, deleteLesson, addModulesMass } = useDispatch()
   const course = useSelector(coursesSelectors.getCourse)
   const modules = useSelector(coursesSelectors.getModules)
   const descriptions = useSelector(coursesSelectors.getDescriptions)
   const prices = useSelector(coursesSelectors.getPrices)
   const whoms = useSelector(coursesSelectors.getWhoms)

   const hasCourse = !(Object.keys(course).length === 0)
   const hasModules = modules && !(Object.keys(modules).length === 0)
   const hasDescriptions = !(Object.keys(descriptions).length === 0)
   const hasWhoms = !(Object.keys(whoms).length === 0)
   const hasPrices = !(Object.keys(prices).length === 0)
   const hasInfo = hasDescriptions || hasWhoms || hasPrices

   const form = useForm({
      defaultValues: {
         short_desc: '',
         test_lesson: '',
         modules: [],
      },
      resolver: yupResolver(validationSchema),
   })
   const { errors } = form.formState

   useEffect(() => {
      Object.entries(form.getValues())
         .filter(([k]) => !['image', 'modules'].includes(k))
         .forEach(([key]) => form.setValue(key, course[key] ?? ''))
      setTimeout(() => course.test_lesson && form.setValue('test_lesson', course.test_lesson?.hidden_id || ''), 0)
   }, [course])

   useEffect(() => {
      const newModules = modules.map((m) => ({
         name: m.name,
         id: m.id,
         lessons: m.lessons.map((l) => ({ name: l.name, number: l.number, id: l.id, hidden_id: l.hidden_id })) || [],
      }))
      newModules.length && form.setValue('modules', newModules)
   }, [modules])

   const addModulesMassRequest = useRequest(addModulesMass, {
      success: (response, data) => {
         setIsShow(true)
         !hasModules && !hasInfo
            ? setContent({ title: 'Уроки добавлены,', descr: 'Заполните описание курса и его стоимость.' })
            : !hasInfo
            ? setContent({ title: 'Уроки обновлены,', descr: 'Заполните описание курса и его стоимость.' })
            : setContent({ title: 'Уроки обновлены', descr: '' })

         form.reset(
            {},
            {
               keepValues: true,
            },
         )

         !hasInfo && refTabs?.current?.nextItems()
      },
   })

   const deleteModuleRequest = useRequest(deleteModule, false, {
      success: (response, data) => {
         setContent({ title: 'Модуль удален,', descr: '' })
      },
   })
   const deleteLessonRequest = useRequest(deleteLesson, false, {
      success: (response, data) => {
         setContent({ title: 'Урок удален', descr: '' })
      },
   })

   const onDeleteModule = useCallback((id) => id && deleteModuleRequest.call({ courseId, id }), [])

   const onDeleteLesson = useCallback((lessonId) => lessonId && deleteLessonRequest.call({ courseId, lessonId }), [])

   const onSubmit = (data) => {
      const body = {
         modules: [],
         moduls: [],
         test_lesson: '',
      }

      Object.entries(data).forEach(([key, value]) => {
         const val = typeof value === 'boolean' ? +value : value?.constructor.name === 'FileList' ? value[0] : value
         if (val === undefined || val === null) return
         body[key] = val
      })

      body.moduls = body.modules.map((m) => ({ ...m, lessons: m.lessons.map((l) => ({ ...l, is_test: l.hidden_id === body.test_lesson })) }))

      delete body.modules
      delete body.test_lesson

      addModulesMassRequest.call({ courseId, body })
   }

   useImperativeHandle(refTab, () => ({
      getForm: () => form,
   }))

   return (
      <form id='form-edit' onSubmit={form.handleSubmit(onSubmit)}>
         <CardBg className='course-edit__small-desc'>
            <div className='course-edit__small-desc-title display-4'>Короткое описание</div>
            <Input form={form} name='short_desc' label='Описание' textarea />
         </CardBg>

         <CardBg className='create-module'>
            <h3 className='create-module__title display-4'>Модули</h3>
            <div className='create-module__items'>
               <CoursesEditArrayFields isNestComponent={true} name='modules' onDelete={onDeleteModule} form={form} appendFields={{ name: '', text: '', lessons: [] }} btnText='Добавить модуль'>
                  {({ id, index, onRemove, name, form }) => (
                     <div key={id} className='create-module__item form-group'>
                        <label>Название модуля {index + 1}</label>
                        <div className='create-module__input'>
                           <Input form={form} name={`${name}.${index}.name`} placeholder='Название модуля' isErrorText={false} withoutWrapper />
                           <Input form={form} name={`${name}.${index}.id`} type='hidden' withoutWrapper />
                           <button className='create-module__delete' onClick={() => onRemove(index)}>
                              <DeleteSvg />
                           </button>
                        </div>
                     </div>
                  )}
               </CoursesEditArrayFields>
            </div>
         </CardBg>

         <CoursesEditTabLessonLessons {...{ form, onDeleteLesson }} />

         <CardBg className='create-module'>
            <CoursesEditTabLessonTestLesson {...{ form }} />
         </CardBg>
      </form>
   )
}

export default CoursesEditTabLesson
