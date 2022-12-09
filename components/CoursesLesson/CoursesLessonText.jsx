import React from 'react'
import { useSelector } from 'react-redux'
import { coursesSelectors } from 'store/selectors'

const CoursesLessonText = () => {
   const lesson = useSelector(coursesSelectors.getLesson)

   const { description } = lesson

   return (
      <div className='blog-page__text'>
         <p className='blog-page__text-desc'>{description}</p>
      </div>
   )
}

export default CoursesLessonText
