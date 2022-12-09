import { Button } from 'components/ui'
import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { authSelectors, coursesSelectors } from 'store/selectors'
import { getURL } from 'utils'

const CoursesLessonTest = () => {
   const { courseId, lessonId } = useParams()
   const lesson = useSelector(coursesSelectors.getLesson)
   const { has_text } = lesson

   return (
      <>
         {has_text ? (
            <div className='lesson-page__test card-bg'>
               <div className='lesson-page__test-title display-4'>Тест</div>
               <div className='lesson-page__test-desc'>Для того, чтобы открыть следующий урок необходимо пройти тест для закрепления ваших знаний.</div>
               <Button to={getURL.cabinetCoursesLessonTest({ courseId, lessonId })} className='lesson-page__test-btn' link>
                  Пройти тест
               </Button>
            </div>
         ) : (
            <div className='lesson-page__test card-bg'>
               <Button to={getURL.cabinetCoursesLessons({ courseId })} className='lesson-page__test-btn' link>
                  Вернуться к урокам
               </Button>
            </div>
         )}
      </>
   )
}

export default CoursesLessonTest
