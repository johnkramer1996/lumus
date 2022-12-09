import { ROLES } from 'constants'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { coursesSelectors, systemSelectors } from 'store/selectors'
import { declOfNum, getDeclOfArray, getFullName, getURL } from 'utils'
import CoursesItemTopNav from './CoursesItemTopNav'

const CoursesItemTop = ({ className }) => {
   const { courseId } = useParams()
   const course = useSelector(coursesSelectors.getCourse)
   const trainer = useSelector(coursesSelectors.getTrainer)
   const { categories } = useSelector(systemSelectors.getCategories)

   const { name, category_id, allUsers } = course
   const { id: trainerId, avatar } = trainer
   const { name: categoryName } = categories[category_id] || {}

   return (
      <section className={`course-top ${className}`}>
         <div className='container'>
            <div className='course-top__title display-3'>{name}</div>
            <div className='course-top__bottom'>
               <div className='course-top__left'>
                  <Link to={getURL.trainersItem({ userId: trainerId })} className='course-top__user'>
                     <img src={getURL.avatar(avatar, ROLES.TRAINER)} alt='' />
                     <span>{getFullName(trainer)}</span>
                  </Link>
                  <div className='course-top__category'>{categoryName}</div>
                  <div className='course-top__student'>
                     {allUsers} {declOfNum(allUsers, getDeclOfArray['users'])}
                  </div>
               </div>
               <div className='course-top__right'>
                  <CoursesItemTopNav course={course} />
               </div>
            </div>
         </div>
      </section>
   )
}

export default CoursesItemTop
