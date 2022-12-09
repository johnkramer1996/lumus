import React from 'react'
import { Button, Input } from 'components/ui'
import { useDispatch } from 'hooks'
import { Link, Navigate, useParams } from 'react-router-dom'
import { declOfNum, getDeclOfArray, getError, getURL, uid } from 'utils'
import { useFieldArray, useWatch } from 'react-hook-form'
import { ReactComponent as AddSvg } from 'svg/add.svg'
import { ReactComponent as DeleteSvg } from 'svg/delete.svg'
import { ReactComponent as DragSvg } from 'svg/drag.svg'
import { ReactComponent as LinkSvg } from 'svg/link.svg'

const CoursesEditTabLessonLesson = ({ nestIndex, form, onDeleteLesson }) => {
   const { courseId } = useParams()
   const { setIsShow, setContent } = useDispatch()
   const { fields, remove, append } = useFieldArray({
      control: form.control,
      name: `modules.${nestIndex}.lessons`,
   })
   const lessons = form.getValues(`modules.${nestIndex}.lessons`)

   const moduleName = useWatch({
      control: form.control,
      name: `modules.${nestIndex}.name`,
   })

   const onAdd = (e) => {
      e.preventDefault()
      form.clearErrors(`modules.${nestIndex}.lessons`)
      append({
         name: '',
         number: fields.length,
         hidden_id: uid(),
      })
   }

   const onRemove = async (index, lessonId) => {
      onDeleteLesson(lessonId)
      remove(index)
   }

   const addLesson = (e) => {
      if (form.formState.isDirty) {
         e.preventDefault()
         setIsShow(true)
         setContent({ title: 'Сначала сохраните' })
      }
   }

   const error = getError(form.formState.errors, `modules.${nestIndex}.lessons`)

   return (
      <div className='create-module card-bg'>
         <div className='create-module__top'>
            <h3 className='create-module__title display-4'>{moduleName || 'Модуль ' + (nestIndex + 1)}</h3>
            <div className='create-module__num'>
               {fields.length} {declOfNum(fields.length, getDeclOfArray['lessons'])}
            </div>
         </div>
         {fields.map((item, index) => {
            const lessonId = lessons && lessons[index] && lessons[index].id
            return (
               <div key={item.id} className='create-module__item form-group'>
                  <div className='create-module__input'>
                     <button className='create-module__drag'>
                        <DragSvg />
                     </button>
                     {lessonId ? (
                        <Link to={getURL.cabinetCoursesLessonEdit({ courseId, lessonId })} className='create-module__link' onClick={addLesson}>
                           <LinkSvg />
                        </Link>
                     ) : (
                        <div className='create-module__link' onClick={addLesson}>
                           <LinkSvg />
                        </div>
                     )}
                     <Input form={form} name={`modules.${nestIndex}.lessons.${index}.name`} placeholder='Название урока' isErrorText={false} withoutWrapper />
                     <Input form={form} name={`modules.${nestIndex}.lessons.${index}.number`} type='hidden' withoutWrapper />
                     <Input form={form} name={`modules.${nestIndex}.lessons.${index}.hidden_id`} type='hidden' withoutWrapper />
                     <Input form={form} name={`modules.${nestIndex}.lessons.${index}.id`} type='hidden' withoutWrapper />
                     <button className='create-module__delete' onClick={() => onRemove(index, lessonId)}>
                        <DeleteSvg />
                     </button>
                  </div>
               </div>
            )
         })}

         <Button className='create-module__add' onClick={onAdd} outline>
            <AddSvg />
            <span>Добавить урок</span>
         </Button>
         {error && <div className='input-error-text'>{error.message || 'Обязательное поле'}</div>}
      </div>
   )
}

export default CoursesEditTabLessonLesson
