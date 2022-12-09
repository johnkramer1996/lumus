import React from 'react'
import { Link } from 'react-router-dom'
import { declOfNum, getDeclOfArray, getFullName, getURL } from 'utils'

// cabinet user
const CoursesCardFront = ({ id = 0, image = '', name = '', allUsers = 0, width = '', trainer = {} }) => {
   return (
      <Link to={getURL.coursesItem({ courseId: id })} className='course-card2'>
         <div className='course-card2__img img img--cover'>
            <img src={getURL.img(image)} alt='' />
         </div>
         <div className='course-card2__content'>
            <div className='course-card2__title truncate'>{name}</div>
            <div className='course-card2__info'>
               <div className='course-card2__student'>
                  {allUsers} {declOfNum(allUsers, getDeclOfArray['users'])}
               </div>
               <div className='course-card2__duration'>{width}</div>
            </div>
            <div className='course-card2__teacher'>{getFullName(trainer)}</div>
         </div>
      </Link>
   )
}

export default CoursesCardFront
