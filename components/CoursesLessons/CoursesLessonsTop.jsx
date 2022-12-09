import React from 'react'
import { useSelector } from 'react-redux'
import { coursesSelectors } from 'store/selectors'

const CoursesLessonsTop = () => {
   const course = useSelector(coursesSelectors.getCourse)
   const lessons = useSelector(coursesSelectors.getLessons)

   const { currentLesson } = course

   return (
      <div className='lkp-course__lesson-top'>
         <h3 className='lkp-course__lesson-title display-4'>Уроки</h3>
         <div className='lkp-course__lesson-num'>
            {(lessons.indexOf(currentLesson) || 0) + 1} из {lessons.length}
         </div>
      </div>
   )
}

export default CoursesLessonsTop
