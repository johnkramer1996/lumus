import React, { useEffect, useState } from 'react'
import { useDispatch, useInput } from 'hooks'
import { ReactComponent as DeleteSvg } from 'svg/delete.svg'
import { ReactComponent as AddSvg } from 'svg/add-sm.svg'
import { Button, CardBg, Input } from 'components/ui'
import { declOfNum, getDeclOfArray, uid } from 'utils'
import CoursesLessonEditTestItem from './CoursesLessonEditTestItem'
import { useSelector } from 'react-redux'
import { coursesSelectors } from 'store/selectors'
import CoursesEditArrayFields from 'components/CoursesEdit/CoursesEditArrayFields'
import CoursesLessonEditTestItemVariant from './CoursesLessonEditTestItemVariant'
import { useWatch } from 'react-hook-form'

const CoursesLessonEditTest = ({ form }) => {
   const onDelete = () => {}
   const onDeleteVariant = () => {}

   const questions = useWatch({
      control: form.control,
      name: `questions`,
   })

   const questionsNumbers = questions.map((_, index) => ({ name: index + 1, id: index + 1 }))

   return (
      <>
         <div className='lesson-test__top'>
            <h3 className='lesson-test__title display-4'>Тест</h3>
            <div className='lesson-test__num'>
               {questions.length} {declOfNum(questions.length, getDeclOfArray['questions'])}
            </div>
         </div>
         <Input form={form} name='questions_to_delete' type='hidden' />
         <Input form={form} name='ansvers_to_delete' type='hidden' />
         <CoursesEditArrayFields isNestComponent={true} name='questions' onDelete={onDelete} form={form} appendFields={{ question: '', answers: [], id: null }} btnText='Добавить модуль'>
            {({ id, index, onRemove, name, form }) => (
               <div key={id} className='create-module__item form-group'>
                  <div className='lesson-test__group'>
                     <div className='lesson-test__group-top'>
                        <div className='lesson-test__subtitle'>Вопрос {index + 1}</div>
                        <button
                           className='lesson-test__delete'
                           onClick={() => {
                              const id = questions[index].id
                              id && form.setValue('questions_to_delete', [...form.getValues('questions_to_delete'), questions[index].id])
                              onRemove(index)
                           }}
                        >
                           <DeleteSvg />
                        </button>
                     </div>
                     <div className='lesson-test__input'>
                        <Input form={form} name={`${name}.${index}.question`} placeholder='Вопрос' isErrorText={false} textarea withoutWrapper />
                        <Input form={form} name={`${name}.${index}.id`} type='hidden' withoutWrapper />
                     </div>
                     <CoursesLessonEditTestItemVariant nestIndex={index} form={form} onDelete={onDeleteVariant} />
                  </div>
               </div>
            )}
         </CoursesEditArrayFields>

         {!!questions.length && (
            <div className='lesson-test__bottom'>
               <div className='lesson-test__subtitle'>Условие прохождения</div>
               <Input form={form} name='count_answers' placeholder='Количество правильных ответов для успешного прохождения' options={questionsNumbers} />
            </div>
         )}
      </>
   )
}

export default CoursesLessonEditTest
