import React from 'react'
import { Link } from 'react-router-dom'
import { RouteNames } from 'routes'
import { addZerro, getDate, getFullName, getURL, isActiveClass } from 'utils'

const CommentsBoardItem = ({ id, text, user, lesson, updated_at, readed_at }) => {
   const { id: userId } = user || {}
   const { name: lessonName, number: numberLesson } = lesson || {}

   return (
      <div className={`lessons-tab__comments-item${isActiveClass(!readed_at, 'lessons-tab__comments-item--new')}`}>
         <div className='lessons-tab__comments-item-top'>
            <Link to={getURL.usersItem({ userId })} className='lessons-tab__comments-item-user'>
               <img src={getURL.avatar(user.avatar)} alt='' />
               <span>{getFullName(user)}</span>
            </Link>
            <div className='lessons-tab__comments-item-date'>{getDate(updated_at)}</div>
         </div>
         <div className='lessons-tab__comments-item-text'>{text}</div>
         <div className='lessons-tab__comments-item-title'>
            <span>{addZerro(numberLesson + 1)}</span>
            <span>{lessonName}</span>
         </div>
      </div>
   )
}

export default CommentsBoardItem
