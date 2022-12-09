import React from 'react'
import { Link } from 'react-router-dom'
import { addZerro, declOfNum, getDeclOfArray, getURL } from 'utils'

const CoursesItemTabLessonsModulesItem = ({ index, name, lessons, courseId }) => {
   return (
      <div className='lessons-tab__module'>
         <div className='lessons-tab__module-top'>
            <div className='lessons-tab__module-title'>{name}</div>
            <div className='lessons-tab__module-num'>
               {lessons?.length} {declOfNum(lessons?.length, getDeclOfArray['lessons'])}
            </div>
         </div>
         <div className='lessons-tab__module-items'>
            {lessons.map(({ id, name, countNewComments, number }) => (
               <Link key={id} to={getURL.cabinetCoursesLesson({ courseId, lessonId: id })} className='lessons-tab__module-item'>
                  <span className='lessons-tab__module-item-num'>{addZerro(number + 1)}</span>
                  <span className='lessons-tab__module-item-title'>{name}</span>
                  {!!countNewComments && <span className='lessons-tab__module-item-notification'>{countNewComments}</span>}
               </Link>
            ))}
         </div>
      </div>
   )
}

export default CoursesItemTabLessonsModulesItem
