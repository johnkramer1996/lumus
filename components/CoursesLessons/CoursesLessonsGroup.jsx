import React from 'react'
import { Link } from 'react-router-dom'
import { addZerro, getURL } from 'utils'
import { ReactComponent as NextSvg } from 'svg/next.svg'

const CoursesLessonsGroup = ({ id, name, lessons, currentLesson, courseId, role }) => {
   let index = 0

   return (
      <div className='lkp-course__group'>
         <div className='lkp-course__group-title'>{name}</div>
         <div className='lkp-course__items'>
            {lessons.map(({ id, name, progress }, indexLesson) => {
               index++
               return (
                  <div key={id || indexLesson}>
                     {currentLesson.id === id ? (
                        <Link to={getURL.cabinetCoursesLesson({ courseId, lessonId: id }, role)} className='lkp-course__current'>
                           <button className='lkp-course__current-btn'>
                              <NextSvg />
                           </button>
                           <div className='lkp-course__current-info'>
                              <div className='lkp-course__current-status'>Текущий урок</div>
                              <div className='lkp-course__current-title'>
                                 <span>{addZerro(index)}</span>
                                 <span>{name}</span>
                              </div>
                           </div>
                        </Link>
                     ) : progress === 'view' ? (
                        <Link to={getURL.cabinetCoursesLesson({ courseId, lessonId: id }, role)} className='lkp-course__item'>
                           <i></i>
                           <span className='lkp-course__item-num'>{addZerro(index)}</span>
                           <span className='lkp-course__item-text'>{name}</span>
                        </Link>
                     ) : (
                        <span className='lkp-course__item lkp-course__item--disabled'>
                           <i></i>
                           <span className='lkp-course__item-num'>{addZerro(index)}</span>
                           <span className='lkp-course__item-text'>{name}</span>
                        </span>
                     )}
                  </div>
               )
            })}
         </div>
      </div>
   )
}

export default CoursesLessonsGroup
