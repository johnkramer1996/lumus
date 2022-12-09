import { Button, Input } from 'components/ui'
import React from 'react'
import { useWatch } from 'react-hook-form'

const CoursesEditTabLessonTestLesson = ({ form }) => {
   const modules = useWatch({
      control: form.control,
      name: 'modules',
   })
   const lessons = modules
      .map((m) => m.lessons.map((l) => ({ name: l.name, id: l.hidden_id })))
      .flat()
      .filter(({ name }) => name !== '')
   lessons.unshift({ name: 'Без тестового урока', id: 0 })

   return (
      <>
         <div className='create-module__top'>
            <h3 className='create-module__title display-4'>Тестовый урок</h3>
         </div>
         <div className='create-module__items'>
            <Input form={form} name='test_lesson' label='Выберите тестовый урок' options={lessons} classNameWrapper='create-module__item' />
         </div>
      </>
   )
}

export default CoursesEditTabLessonTestLesson
