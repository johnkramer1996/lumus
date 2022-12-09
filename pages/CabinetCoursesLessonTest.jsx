import CoursesLessonTest from 'components/CoursesLessonTest/CoursesLessonTest'
import { useDispatch, useRequest } from 'hooks'
import React, { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { authSelectors, coursesSelectors } from 'store/selectors'
import { getRequest, getURL } from 'utils'

const CabinetCoursesLessonTest = () => {
   const { courseId, lessonId } = useParams()
   const { resetCourses, fetchLesson, fetchUserLessonTest } = useDispatch()
   const role = useSelector(authSelectors.getRole)
   const { name: courseName = '' } = useSelector(coursesSelectors.getCourse)

   const roleRequest = useMemo(() => getRequest([fetchUserLessonTest, fetchLesson], role), [])
   const fetchLessonRequests = useRequest(roleRequest, true)

   useEffect(() => {
      fetchLessonRequests.call({ courseId, lessonId })
      return () => resetCourses()
   }, [])

   return (
      <section className='test-page'>
         <div className='container'>
            <div className='breadcrumbs'>
               <Link to={getURL.cabinetCourses({})} className='breadcrumbs__item'>
                  Мои курсы
               </Link>
               <Link to={getURL.cabinetCoursesItem({ courseId })} className='breadcrumbs__item'>
                  {courseName}
               </Link>
            </div>
            <h1 className='test-page__title display-3'>Выберите правильные варианты</h1>
            <CoursesLessonTest isLoading={fetchLessonRequests.isLoading} />
         </div>
      </section>
   )
}

export default CabinetCoursesLessonTest
