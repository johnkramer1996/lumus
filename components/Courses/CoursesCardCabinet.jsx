import { Link } from 'react-router-dom'
import React from 'react'
import { declOfNum, getDeclOfArray, getFullName, getRequest, getURL, hasAccess } from 'utils'
import { ReactComponent as BookmarkSvg } from 'svg/bookmark.svg'
import { ROLES } from 'constants'

const CoursesCardCabinet = ({ id = 1, image, name, all_users, all_new_users, trainer = {}, status, routeName = 'coursesItem', role = [0] }) => {
   return (
      <Link to={getURL[routeName]({ courseId: id })} className='course-card3'>
         <div className='course-card3__img img img--cover'>
            <img src={getURL.img(image)} alt='' />
         </div>
         <div className='course-card3__content'>
            <div className='course-card3__title'>{name}</div>
            {hasAccess(role, [ROLES.EMPLOYEE]) && (
               <div className='course-card3__user'>
                  <img src={getURL.avatar(trainer.avatar)} alt='' />
                  <span>{getFullName(trainer)}</span>
               </div>
            )}
            {status && (
               <div className='course-card3__status'>
                  <span>Новый</span>
                  <span>23 ч</span>
               </div>
            )}
            <div className='course-card3__bottom'>
               {hasAccess(role, [ROLES.USER]) && (
                  <>
                     <div className='course-card3__students'>
                        <div className='course-card3__students-name'>
                           <span>{getFullName(trainer) || 'Имя тренера'}</span>
                        </div>
                     </div>
                     <div className='course-card3__bookmark'>
                        <BookmarkSvg />
                     </div>
                  </>
               )}
               {hasAccess(role, [ROLES.TRAINER]) && (
                  <>
                     <div className='course-card3__students'>
                        <div className='course-card3__students-title'>
                           {all_users} {declOfNum(all_users, getDeclOfArray['users'])}
                        </div>
                        <div className='course-card3__students-new'>{all_new_users} новых</div>
                     </div>
                     <div className='course-card3__num'>2</div>
                  </>
               )}
            </div>
         </div>
      </Link>
   )
}

export default CoursesCardCabinet
