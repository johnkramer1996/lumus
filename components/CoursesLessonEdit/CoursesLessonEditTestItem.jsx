import React, { useState } from 'react'
import { ReactComponent as DeleteSvg } from 'svg/delete.svg'
import { ReactComponent as AddSvg } from 'svg/add-sm.svg'
import { useDispatch, useInput } from 'hooks'
import { Button, Input } from 'components/ui'
import CoursesLessonEditTestItemVariant from './CoursesLessonEditTestItemVariant'
import { useSelector } from 'react-redux'
import { coursesSelectors } from 'store/selectors'
import { uid } from 'utils'

const CoursesLessonEditTestItem = ({ id, index }) => {
   const { setLessonQuestions } = useDispatch()
   const questions = useSelector(coursesSelectors.getLessonQuestions)
   const questionsData = useSelector(coursesSelectors.getLessonQuestionsData)

   const { questions_to_delete, ansvers_to_delete, questionsInputs } = questionsData
   const { answers = [] } = questions[index]
   const question = useInput({ initialValue: questions[index].question, name: 'question' })

   questionsInputs[index] = question

   const onDeleteItem = () => {
      id && questions_to_delete.push(id)
      setLessonQuestions(questions.filter((_, i) => i !== index))
   }

   const onDelete = (id, answerIndex) => {
      const newAnswers = answers.filter((_, i) => i !== answerIndex)
      const newQuestions = questions.map((q, i) => (i === index ? { ...q, answers: newAnswers } : q))
      id && ansvers_to_delete.push(id)
      setLessonQuestions(newQuestions)
   }
   const onAdd = () => {
      const newAnswers = [...answers, { hidden_id: uid() }]
      const newQuestions = questions.map((q, i) => (i === index ? { ...q, answers: newAnswers } : q))
      setLessonQuestions(newQuestions)
   }
   //  const onChangeQuestion = (e) => (questions[index].question = e.target.value)

   return (
      <div className='lesson-test__group'>
         <div className='lesson-test__group-top'>
            <div className='lesson-test__subtitle'>Вопрос {index + 1}</div>
            <button className='lesson-test__delete' onClick={onDeleteItem}>
               <DeleteSvg />
            </button>
         </div>
         <Input className='lesson-test__form-group' input={question} label='Вопрос' textarea />
         <div className='lesson-test__variants'>
            <div className='lesson-test__variants-title'>Введите варианты ответов и выберите правильный</div>
            <div className='lesson-test__variants-items'>
               {answers.map((props, indexAnswer) => (
                  <CoursesLessonEditTestItemVariant key={props.id || props.hidden_id || index} {...props} index={indexAnswer} indexQuestion={index} onDelete={onDelete} />
               ))}
            </div>
            <Button className='lesson-test__variants-add' onClick={onAdd} light>
               <AddSvg />
               <span>Добавить вариант</span>
            </Button>
         </div>
      </div>
   )
}

export default CoursesLessonEditTestItem

{
   /* // TODO WHY? */
}
{
   /* <div className='lesson-test__form-group form-group'>
                <select>
                    <option defaultValue>Сколько правильных ответов</option>
                    <option>Один правильный вариант</option>
                </select>
            </div> */
}
