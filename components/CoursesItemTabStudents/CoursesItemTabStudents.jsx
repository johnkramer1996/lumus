import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { coursesSelectors } from 'store/selectors'
import CoursesItemTabStudentsItem from './CoursesItemTabStudentsItem'
import { ReactComponent as ArrowChangeSvg } from 'svg/arrow-change.svg'
import { declOfNum, getDeclOfArray, isActiveClass } from 'utils'

const CoursesItemTabStudents = () => {
   const course = useSelector(coursesSelectors.getCourse)
   const users = course.users || []
   const [isSort, setIsSort] = useState(false)

   const sortedUsers = isSort ? [...users].reverse() : [...users]

   return (
      <div className='students-tab'>
         <div className='students-tab__top'>
            <div className='students-tab__title'>
               {sortedUsers.length} {declOfNum(sortedUsers.length, getDeclOfArray['users'])}
            </div>
            <button className={`students-tab__btn${isActiveClass(isSort, 'students-tab__btn--active')}`} onClick={() => setIsSort(!isSort)}>
               <span>Сначала {isSort ? 'новые' : 'старые'}</span>
               <ArrowChangeSvg />
            </button>
         </div>
         <div className='students-tab__items'>
            {sortedUsers.map((props, index) => (
               <CoursesItemTabStudentsItem key={props.id} {...props} />
            ))}
         </div>
      </div>
   )
}

export default CoursesItemTabStudents
