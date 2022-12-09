import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { authSelectors, coursesSelectors } from 'store/selectors'
import { addZerro, getURL } from 'utils'

const CoursesLessonTop = () => {
   const { courseId } = useParams()
   const role = useSelector(authSelectors.getRole)
   const data = useSelector(coursesSelectors.getData)
   const lessons = useSelector(coursesSelectors.getLessons)
   const lesson = useSelector(coursesSelectors.getLesson)

   const { number, name } = lesson
   const { prev_lesson = {} } = data || {}
   const { next_lesson = {} } = data || {}

   return (
      <>
         <div className='lesson-page__top-left'>
            {prev_lesson.id && (
               <Link to={getURL.cabinetCoursesLesson({ courseId, lessonId: prev_lesson.id }, role)}>
                  <span className='lesson-page__top-link'> Предыдущий урок</span>
                  <div className='lesson-page__top-subtitle'>
                     <span>{addZerro(prev_lesson?.number + 1)}</span>
                     <strong>{prev_lesson.name}</strong>
                  </div>
               </Link>
            )}
         </div>
         <div className='lesson-page__top-center'>
            <div className='lesson-page__top-title'>{name}</div>
            <div className='lesson-page__top-num'>
               {(number || 0) + 1} из {lessons.length || 1}
            </div>
         </div>
         <div className='lesson-page__top-right'>
            {next_lesson.id && (
               <Link to={getURL.cabinetCoursesLesson({ courseId, lessonId: next_lesson.id }, role)}>
                  <span className='lesson-page__top-link'>Следующий урок</span>
                  <div className='lesson-page__top-subtitle'>
                     <span>{addZerro(next_lesson?.number + 1)}</span>
                     <strong>{next_lesson.name}</strong>
                  </div>
               </Link>
            )}
         </div>
      </>
   )
}

export default CoursesLessonTop
