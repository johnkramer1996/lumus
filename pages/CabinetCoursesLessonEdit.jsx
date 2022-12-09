import React, { useCallback, useEffect, useImperativeHandle, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch, useInput, useNavigate, useRequest } from 'hooks'
import { coursesSelectors } from 'store/selectors'
import { CardBg, Checkbox, Input, Loader, LoaderWrapper } from 'components/ui'
import { forwardRef } from 'react'
import { useForm } from 'react-hook-form'
import CoursesLessonEditTest from 'components/CoursesLessonEdit/CoursesLessonEditTest'
import CoursesLessonEditFiles from 'components/CoursesLessonEdit/CoursesLessonEditFiles'
import CoursesEditHint from 'components/CoursesEdit/CoursesEditHint'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const validationSchema = yup.object({
   name: yup.string().required('Обязательное поле'),
   description: yup.string().required('Обязательное поле'),
   can_comment: yup.boolean().required('Обязательное поле'),
   has_text: yup.boolean().required('Обязательное поле'),
   //  count_answers: yup.number().required('Обязательное поле'),
   questions: yup
      .array()
      // .min(1, 'Добавьте один вопрос')
      .of(
         yup.object().shape({
            question: yup.string().required('Обязательное поле'),
            answers: yup
               .array()
               .min(1, 'Добавьте один ответ')
               .of(
                  yup.object().shape({
                     is_true: yup.boolean().required(),
                     ansver: yup.string().required(),
                  }),
               )
               .required('Обязательное поле'),
         }),
      )
      .required('Обязательное поле'),
})

const CoursesLessonEdit = () => {
   const { courseId, lessonId } = useParams()
   const { navigate } = useNavigate()
   const { setIsShow, setContent, fetchLesson, resetCourses, putLesson } = useDispatch()
   const lesson = useSelector(coursesSelectors.getLesson)
   const questions = useSelector(coursesSelectors.getLessonQuestions)

   const form = useForm({
      resolver: yupResolver(validationSchema),
      defaultValues: {
         questions_to_delete: [],
         ansvers_to_delete: [],
         questions: [{ id: null, answers: [] }],
      },
   })
   const { isDirty, errors } = form.formState

   console.log(errors)

   useEffect(() => {
      form.setValue('name', lesson.name ?? '')
      form.setValue('description', lesson.description ?? '')
      form.setValue('can_comment', lesson.can_comment ?? false)
      form.setValue('has_text', lesson.has_text ?? false)
      form.setValue('count_answers', lesson.count_answers ?? '')
      form.setValue('questions', questions ?? [])
   }, [lesson, questions])

   const fetchLessonRequest = useRequest(fetchLesson, true)
   const putLessonRequest = useRequest(putLesson, false, {
      success: () => {
         navigate(-1)
         setIsShow(true)
         setContent({ title: 'Урок обновлен' })
      },
   })
   useEffect(() => {
      fetchLessonRequest.call({ courseId, lessonId })
      return () => resetCourses()
   }, [])

   const onSubmit = (data) => {
      const inputs = Object.entries(data).reduce((prev, [key, value]) => ((prev[key] = value), prev), {})

      const body = {
         ...inputs,
         count_answers: +inputs.count_answers,
         questions: inputs.questions.map(
            (q, i) => (
               !q.id && delete q.id,
               {
                  ...q,
                  amount_answers: q.answers.reduce((p, v) => p + +v.is_true, 0),
                  ansvers: q.answers.map(
                     (a, i) => (
                        !a.id && delete a.id,
                        {
                           ...a,
                        }
                     ),
                  ),
               }
            ),
         ),
      }

      putLessonRequest.call({ courseId, lessonId, body })
   }

   const onCancel = () => {}

   return (
      <section className='course-edit'>
         <div className='container'>
            <form id='form-edit' onSubmit={form.handleSubmit(onSubmit)} className='course-edit__inner'>
               <LoaderWrapper isLoading={fetchLessonRequest.isLoading}>
                  <div className='course-edit__left'>
                     <CardBg className='create-about'>
                        <h3 className='lesson-edit__info-title display-4'>Основная информация</h3>
                        <Input form={form} name='name' label='Название' />
                        <Checkbox form={form} name='can_comment' label='Комментарии' type='switch' className='lesson-edit__switch' />
                        <Checkbox form={form} name='has_text' label='Тест' type='switch' className='lesson-edit__switch' />
                     </CardBg>
                     <CardBg className='create-about'>
                        <h3 className='create-about__title display-4'>Урок</h3>
                        <div className='create-about__editor'>
                           <Input form={form} name='description' textarea />
                        </div>
                     </CardBg>
                     <CardBg className='lesson-edit__files'>
                        <CoursesLessonEditFiles form={form} />
                     </CardBg>
                     <CardBg className='create-module'>
                        <CoursesLessonEditTest form={form} />
                     </CardBg>
                  </div>
                  <div className='course-edit__right'>
                     <CoursesEditHint onCancel={onCancel} isResetBtn={false} />
                  </div>
               </LoaderWrapper>
            </form>
         </div>
      </section>
   )
}

export default forwardRef(CoursesLessonEdit)
