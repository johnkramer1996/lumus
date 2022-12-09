import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { coursesSelectors } from 'store/selectors'
import CoursesItemTabLessonsModulesItem from './CoursesItemTabLessonsModulesItem'

const CoursesItemTabLessonsModules = () => {
   const { courseId } = useParams()
   const modules = useSelector(coursesSelectors.getModules)
   const commentsData = useSelector(coursesSelectors.getCommentsData)

   const lesson_new = commentsData.lesson_new || []
   modules.forEach(({ lessons }) => lessons.forEach((lesson) => (lesson.countNewComments = lesson_new.find(({ course_lesson_id }) => course_lesson_id === lesson.id)?.new_count || 0)))

   return (
      <>
         {modules.map((props, index) => (
            <CoursesItemTabLessonsModulesItem key={props.id || index} {...props} courseId={courseId} />
         ))}
      </>
   )
}

export default CoursesItemTabLessonsModules
