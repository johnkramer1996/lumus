import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Button } from 'components/ui'
import { useDispatch, useNavigate, useRequest, usePageAccess } from 'hooks/'
import { CoursesEditTabMain, CoursesEditTabLesson, CoursesEditTabDescription, Tabs } from 'components'
import { useLocation, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { authSelectors, coursesSelectors } from 'store/selectors'
import CoursesEditHint from 'components/CoursesEdit/CoursesEditHint'

const CabinetCoursesAdd = () => {
   const { courseId } = useParams()
   const { toCourses } = useNavigate()
   const isEditPage = !!courseId
   const { resetCourses, setIsShow, setContent, setCourse, setModules, fetchInfo } = useDispatch()
   const user = useSelector(authSelectors.getUser)
   const { id: user_id } = user
   const course = useSelector(coursesSelectors.getCourse)
   const modules = useSelector(coursesSelectors.getModules)
   const hasCourse = !(Object.keys(course).length === 0)
   const hasModules = !(Object.keys(modules).length === 0)
   const { user_id: page_user_id } = course

   const fetchInfoRequest = useRequest(fetchInfo, false, {
      loading: isEditPage,
   })

   usePageAccess(user_id, page_user_id, toCourses, fetchInfoRequest.isLoading)

   useEffect(() => {
      if (isEditPage) fetchInfoRequest.call({ courseId })

      return () => resetCourses()
   }, [])

   const refTabs = useRef()
   const refTabMain = useRef()
   const refTabLesson = useRef()
   const refTabDescription = useRef()
   const refsTab = useMemo(() => [refTabMain, refTabLesson, refTabDescription], [])

   const tabItems = [
      {
         title: 'Основная информация',
         component: CoursesEditTabMain,
         props: {
            refTab: refTabMain,
            refTabs: refTabs,
         },
      },
      {
         title: 'Уроки',
         component: CoursesEditTabLesson,
         props: {
            refTab: refTabLesson,
            refTabs: refTabs,
         },
      },
      {
         title: 'Страница курса',
         component: CoursesEditTabDescription,
         props: {
            refTab: refTabDescription,
            refTabs: refTabs,
         },
      },
   ]

   const isAvaibleTabIndex = (index, activeIndexStep) => {
      const form = refsTab[activeIndexStep].current.getForm()
      if (form.formState.isDirty) {
         setIsShow(true)
         setContent({ title: 'Сначала сохраните' })
         return
      }
      if (index === 0) return true
      if ((index === 1 || index === 2) && !hasCourse) {
         setIsShow(true)
         setContent({ title: 'Заполните курс' })
         return
      }
      if (index === 2 && !hasModules) {
         setIsShow(true)
         setContent({ title: 'Заполните уроки' })
         return
      }
      return true
   }

   const onCancel = () => {}

   return (
      <section className='course-edit'>
         <div className='container'>
            <div className='course-edit__inner'>
               <div className='course-edit__left'>
                  <h1 className='course-edit__title display-3'>
                     <span>{isEditPage ? 'Редактирование' : 'Добавление'} курса</span>
                  </h1>
                  <Tabs ref={refTabs} items={tabItems} classPrefix={'course-edit'} isLoading={fetchInfoRequest.isLoading} activeTabIndex={0} isAvaibleIndex={isAvaibleTabIndex}>
                     {({ activeIndexStep }) => {
                        const Component = tabItems[activeIndexStep].component
                        return <Component {...tabItems[activeIndexStep].props} />
                     }}
                  </Tabs>
               </div>
               <div className='course-edit__right'>
                  <CoursesEditHint onCancel={onCancel} isResetBtn={isEditPage && false} textBtn={isEditPage || hasCourse ? 'Сохранить' : 'Добавить'} />
               </div>
            </div>
         </div>
      </section>
   )
}

export default CabinetCoursesAdd
