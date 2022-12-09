import React from 'react'
import { ReactComponent as ArrowDownSvg } from 'svg/edit.svg'
import CoursesItemTabNotificationsItem from './CoursesItemTabNotificationsItem'

const CoursesTabsNotifications = () => {
   const notification = [{}]

   return (
      <div className='notification-tab'>
         <div className='notification-tab__top'>
            <div className='notification-tab__title'>1 непрочитенное уведомление</div>
         </div>
         <div className='notification-tab__items'>
            {notification.map((props, index) => (
               <CoursesItemTabNotificationsItem key={props.id || index} {...props} />
            ))}
         </div>
         <div className='notification-tab__bottom'>
            <button className='notification-tab__more'>
               <ArrowDownSvg />
               <span>Показать больше</span>
            </button>
         </div>
      </div>
   )
}

export default CoursesTabsNotifications
