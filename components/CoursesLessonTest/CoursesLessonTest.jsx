import { Button, Checkbox, Input, LoaderWrapper } from 'components/ui'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { authSelectors, coursesSelectors } from 'store/selectors'
import { getError, getURL, hasAccess } from 'utils'
import { ReactComponent as EditSvg } from 'svg/edit.svg'
import { ROLES } from 'constants'
import CoursesLessonTestQuestions from './CoursesLessonTestQuestions'
import { useDispatch, useRequest } from 'hooks'
import { modalsContentTypes } from 'store/reducers/modals/types'
import { useFieldArray, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const validationSchema = yup.object({
   questions: yup.array().of(
      yup.object().shape({
         question_id: yup.number().required('Обязательное поле'),
         ansvers: yup.array().of(yup.number()).min(1, 'Добавьте один ответ').required('Обязательное поле'),
      }),
   ),
})

const CoursesLessonTest = ({ isLoading }) => {
   const { courseId, lessonId } = useParams()
   const { sendLessonTest, setIsShow, setContent, setType } = useDispatch()
   const role = useSelector(authSelectors.getRole)
   const questions = useSelector(coursesSelectors.getLessonQuestions)

   const form = useForm({
      mode: 'onChange',
      resolver: yupResolver(validationSchema),
      defaultValues: {
         questions: [
            {
               question_id: null,
               ansvers: [],
            },
         ],
      },
   })
   const { fields } = useFieldArray({
      control: form.control,
      name: 'questions',
   })

   console.log(form.formState.errors)

   useEffect(() => {
      console.log(questions)
      form.setValue(
         'questions',
         questions.map((m) => ({
            question_id: m.id,
            ansvers: [],
         })),
      )
   }, [questions])

   const sendLessonTestRequest = useRequest(sendLessonTest, false, {
      success: ({ data }) => {
         setContent({ result: data || {} })
         setType(modalsContentTypes.TEST)
         setIsShow(true)
      },
   })

   const onSubmit = (data) => {
      const body = {
         list_ansvers: data.questions,
      }

      sendLessonTestRequest.call({ courseId, lessonId, body })
   }

   return (
      <form onSubmit={form.handleSubmit(onSubmit)} className='test-page__wrap'>
         <div className='test-page__left'>
            <LoaderWrapper isLoading={isLoading}>
               <div className='test-page__items'>
                  {questions.map((props, index) => {
                     const error = getError(form.formState.errors, `questions.${index}.ansvers`)
                     return (
                        <div key={props.id || index} className='test-page__item card-bg'>
                           <div className='test-page__item-title'>{props.question}</div>
                           <div className='test-page__item-variants'>
                              <Input form={form} name={`questions.${index}.question_id`} type='hidden' />
                              {props.answers?.map(({ id, ansver }, indexAnswer) => (
                                 //  <Checkbox key={indexAnswer} form={form} name={`${name}.${index}.moduls`} value={mIndex} label={label} className='create-price__check' />
                                 <Checkbox key={indexAnswer} form={form} name={`questions.${index}.ansvers`} value={id} label={ansver} className='course-edit__form-checkbox' />
                              ))}
                              <div className='input-error-text'>{error && error.message}</div>
                           </div>
                        </div>
                     )
                  })}
               </div>
            </LoaderWrapper>
         </div>
         <div className='test-page__right'>
            {hasAccess(role, [ROLES.TRAINER]) && (
               <div className='lesson-page__nav card-bg'>
                  <Button to={getURL.cabinetCoursesLessonEdit({ courseId, lessonId })} className='lesson-page__edit' outline link>
                     <EditSvg />
                     <span>Редактировать урок</span>
                  </Button>
                  <Button to={getURL.cabinetCoursesLesson({ courseId, lessonId })} className='lesson-page__test' link>
                     Вернуться к уроку
                  </Button>
               </div>
            )}
            {hasAccess(role, [ROLES.USER]) && (
               <div className='test-page__card card-bg'>
                  <div className='test-page__card-top'>
                     <div className='test-page__card-title display-4'>Тест</div>
                     <div className='test-page__card-num'>1 из {questions.length}</div>
                  </div>
                  <div className='test-page__card-desc'>Выберите варианты ответов во всех вопросах, чтобы завершить тест</div>
                  <Button className='test-page__card-btn'>Пройти тест</Button>
               </div>
            )}
         </div>
      </form>
   )
}

export default CoursesLessonTest
