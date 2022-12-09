import React, { useEffect, useState } from 'react'
import { useDispatch, useQuery, useRequest } from 'hooks'
import { useLocation, useParams } from 'react-router-dom'
import { CoursesItemFeedback, CoursesItemInfo, CoursesItemInfo2, CoursesItemPopular, CoursesItemSeo, CoursesItemTop, CoursesItemVariants } from 'components'
import { Loader, LoaderWrapper } from 'components/ui'
import { useSelector } from 'react-redux'
import { authSelectors, coursesSelectors } from 'store/selectors'

const CoursesItem = () => {
   const { courseId } = useParams()
   const { resetCourses, fetchFrontCourse, fetchFrontAuthCourse, addUserToCourse, setIsShow, setContent } = useDispatch()
   const isAuth = useSelector(authSelectors.getIsAuth)
   const role = useSelector(authSelectors.getRole)
   const { id: user_id } = useSelector(authSelectors.getUser)
   const course = useSelector(coursesSelectors.getCourse)
   const { id } = course
   const users = course.is_user || {}

   const [isEnrolledPage, setIsEnrolledPage] = useState(false)

   useEffect(() => {
      // setIsEnrolledPage(+users.user_id === +user_id)
   }, [course])

   //  const fetchFrontCourseRequest = useRequest(isAuth ? fetchFrontAuthCourse : fetchFrontCourse, true)
   const fetchFrontCourseRequest = useRequest(fetchFrontCourse, true)
   const addUserToCourseRequest = useRequest(addUserToCourse, {
      success: () => {
         setIsShow(true)
         setContent({ title: 'Успешно добавлен' })
      },
   })

   useEffect(() => {
      fetchFrontCourseRequest.call({ courseId })
      return () => resetCourses()
   }, [])

   const onEnroll = () => {
      if (!role.length) {
         setIsShow(true)
         setContent({ title: 'Авторизируйтесь!' })
         return
      }
      if (isEnrolledPage) {
         setIsShow(true)
         setContent({ title: 'Вы уже записаны на курс' })
         return
      }
      setIsEnrolledPage(true)

      addUserToCourseRequest.call({ body: { user_id, course_id: id } })
   }

   return (
      <>
         <LoaderWrapper isLoading={fetchFrontCourseRequest.isLoading}>
            <>
               <CoursesItemTop />
               <CoursesItemInfo onEnroll={onEnroll} isEnrolledPage={isEnrolledPage} />
               <CoursesItemInfo2 onEnroll={onEnroll} isEnrolledPage={isEnrolledPage} />
               <CoursesItemPopular />
               <CoursesItemFeedback />
               <CoursesItemVariants />
               <CoursesItemSeo />
            </>
         </LoaderWrapper>
      </>
   )
}

export default CoursesItem
