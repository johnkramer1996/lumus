import React from 'react'
import { useWatch } from 'react-hook-form'
import CoursesEditTabLessonLesson from './CoursesEditTabLessonLesson'

const CoursesEditTabLessonLessons = ({ form, onDeleteLesson }) => {
   const modules = useWatch({
      name: 'modules',
      control: form.control,
   })

   return (
      <>
         {modules.map((props, index) => {
            return <CoursesEditTabLessonLesson key={props.id || index} nestIndex={index} form={form} onDeleteLesson={onDeleteLesson} {...props} />
         })}
      </>
   )
}

export default CoursesEditTabLessonLessons
