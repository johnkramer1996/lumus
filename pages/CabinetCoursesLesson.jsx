import { Breadcrumbs, Loader } from 'components/ui'
import { useDispatch, useRequest } from 'hooks'
import React, { useMemo } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { authSelectors, coursesSelectors } from 'store/selectors'
import { getRequest, getURL } from 'utils'
import { CoursesLesson } from 'components'
import CoursesLessonComments from 'components/CoursesLesson/CoursesLessonComments'

const CabinetCoursesLesson = () => {
   const { courseId, lessonId } = useParams()
   const { fetchLesson, resetCourses, fetchUserLesson } = useDispatch()
   const role = useSelector(authSelectors.getRole)
   const course = useSelector(coursesSelectors.getCourse)
   const lesson = useSelector(coursesSelectors.getLesson)

   const { name: courseName } = course
   const { can_comment } = lesson

   const roleRequest = useMemo(() => getRequest([fetchUserLesson, fetchLesson], role), [])
   const fetchLessonRequest = useRequest(roleRequest, true)

   useEffect(() => {
      fetchLessonRequest.call({ courseId, lessonId })
      return () => resetCourses()
   }, [courseId, lessonId])

   return (
      <section className='lesson-page'>
         <div className='container'>
            <Breadcrumbs
               items={[
                  { to: getURL.cabinetCourses(), title: 'Мои курсы' },
                  { to: getURL.cabinetCoursesItem({ courseId }), title: courseName },
               ]}
            />
            <CoursesLesson isLoading={fetchLessonRequest.isLoading} />
            {!!can_comment && <CoursesLessonComments />}
         </div>
      </section>
   )
}

export default CabinetCoursesLesson
