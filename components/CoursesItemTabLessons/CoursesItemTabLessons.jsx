import React from 'react'
import CoursesItemTabLessonsComments from './CoursesItemTabLessonsComments'
import CoursesItemTabLessonsModules from './CoursesItemTabLessonsModules'

const CoursesTabsLessons = () => {
   return (
      <div className='lessons-tab'>
         <div className='lessons-tab__left'>
            <CoursesItemTabLessonsModules />
         </div>
         <div className='lessons-tab__right'>
            <CoursesItemTabLessonsComments />
         </div>
      </div>
   )
}

export default CoursesTabsLessons
