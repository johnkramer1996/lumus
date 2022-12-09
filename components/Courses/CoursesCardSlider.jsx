import React from 'react'
import { declOfNum, getDeclOfArray, getURL } from 'utils'

const CourseItem = ({ image = '', name, short_desc, All_Users = 0 }) => {
   return (
      <div className='course-card'>
         <div className='course-card__img'>
            <img src={getURL.img(image)} alt='' />
         </div>
         <div className='course-card__content'>
            <div className='course-card__student'>
               {All_Users} {declOfNum(All_Users, getDeclOfArray['members'])}
            </div>
            <div className='course-card__title'>{name}</div>
            <div className='course-card__desc'>{short_desc}</div>
         </div>
      </div>
   )
}

export default CourseItem
