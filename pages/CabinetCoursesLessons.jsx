import CoursesItemTopNav from 'components/CoursesItem/CoursesItemTopNav'
import { useDispatch, useRequest } from 'hooks'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { addZerro, getURL } from 'utils'
import { authSelectors, coursesSelectors } from 'store/selectors'
import { Breadcrumbs, Button, Loader, LoaderWrapper } from 'components/ui'
import CoursesLessonsInfo from 'components/CoursesLessons/CoursesLessonsInfo'
import CoursesLessonsTop from 'components/CoursesLessons/CoursesLessonsTop'
import CoursesLessonsGroup from 'components/CoursesLessons/CoursesLessonsGroup'

const CabinetCoursesLessons = () => {
   const { courseId } = useParams()
   const { resetCourses, fetchUserCourse } = useDispatch()
   const role = useSelector(authSelectors.getRole)
   const course = useSelector(coursesSelectors.getCourse)
   const modules = useSelector(coursesSelectors.getModules)
   const lessons = useSelector(coursesSelectors.getLessons)

   const viewLessons = lessons.filter(({ userstatus }) => userstatus)
   course.currentLesson = viewLessons[viewLessons.length - 1] || lessons[0] || []
   const { name: courseName, currentLesson } = course

   modules.reduce((_, value) => value.lessons.reduce((prev, value) => ((value.index = prev), prev++)), 0)

   const fetchUserCourseRequest = useRequest(fetchUserCourse, true)

   useEffect(() => {
      fetchUserCourseRequest.call({ courseId })
      return () => resetCourses()
   }, [])

   return (
      <section className='lkp-course'>
         <div className='container'>
            <div className='course-top lkp-course__top'>
               <Breadcrumbs items={[{ to: getURL.cabinetCourses(null, role), title: 'Мои курсы' }]} />
               <div className='course-top__bottom'>
                  <div className='course-top__left'>
                     <div className='course-top__title display-3'>{courseName}</div>
                  </div>
                  <div className='course-top__right'>
                     <CoursesItemTopNav course={course} />
                  </div>
               </div>
            </div>
            <LoaderWrapper isLoading={fetchUserCourseRequest.isLoading}>
               <div className='lkp-course__inner'>
                  <div className='lkp-course__left'>
                     <CoursesLessonsTop />
                     <div className='lkp-course__lesson card-bg'>
                        {modules.map((props, indexModule) => (
                           <CoursesLessonsGroup key={props.id || indexModule} {...props} currentLesson={currentLesson} courseId={courseId} role={role} />
                        ))}
                     </div>
                  </div>
                  <div className='lkp-course__right'>
                     <CoursesLessonsInfo />
                  </div>
               </div>
            </LoaderWrapper>
         </div>
      </section>
   )
}

export default CabinetCoursesLessons
