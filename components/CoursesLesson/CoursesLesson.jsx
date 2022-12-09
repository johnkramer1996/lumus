import React from 'react'
import { useSelector } from 'react-redux'
import { authSelectors } from 'store/selectors'
import { hasAccess } from 'utils'
import { ROLES } from 'constants'

import { CoursesLessonNav, CoursesLessonTest, CoursesLessonText, CoursesLessonTop, CoursesLesssonFiles } from '.'
import { LoaderWrapper } from 'components/ui'

const CoursesLesson = ({ isLoading }) => {
   const role = useSelector(authSelectors.getRole)

   return (
      <LoaderWrapper isLoading={isLoading}>
         <div className='lesson-page__top'>
            <CoursesLessonTop />
         </div>
         <div className='lesson-page__wrap'>
            <div className='lesson-page__left'>
               <CoursesLessonText />
            </div>
            <div className='lesson-page__right'>
               {hasAccess(role, [ROLES.TRAINER, ROLES.EMPLOYEE]) && <CoursesLessonNav />}
               <CoursesLesssonFiles />
               {hasAccess(role, [ROLES.USER]) && <CoursesLessonTest />}
            </div>
         </div>
      </LoaderWrapper>
   )
}

export default CoursesLesson
