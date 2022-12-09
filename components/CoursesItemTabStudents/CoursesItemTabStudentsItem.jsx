import React from 'react'
import { Link } from 'react-router-dom'
import { getDate, getFullName, getURL } from 'utils'

const CoursesItemTabStudentsItem = ({ id, avatar, first_name, last_name, name, email, updated_at }) => {
   return (
      <Link to={getURL.usersItem({ userId: id })} className='students-tab__item'>
         <div className='students-tab__item-img'>
            <img src={getURL.avatar(avatar)} alt='' />
         </div>
         <div className='students-tab__item-content'>
            <div className='students-tab__item-name'>{getFullName({ first_name, last_name, name })}</div>
            <div className='students-tab__item-title'>
               {/* <span>01</span>
               <span>Название урока</span> */}
               {email}
            </div>
         </div>
         <div className='students-tab__item-date'>{getDate(updated_at)}</div>
      </Link>
   )
}

export default CoursesItemTabStudentsItem
