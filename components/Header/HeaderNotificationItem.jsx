import React from 'react'
import { getDate, getTime } from 'utils'
import { ReactComponent as NotificationType0Svg } from 'svg/notification-type-0.svg'
import { ReactComponent as NotificationType1Svg } from 'svg/notification-type-1.svg'

const HeaderNotificationItem = ({ type, name, text, updatedAt }) => {
   const icon = [<NotificationType0Svg />, <NotificationType1Svg />][type ?? 0]

   return (
      <div className='header__notification-item'>
         <i className='header__notification-item-icon'>{icon}</i>
         <div className='header__notification-item-content'>
            <div className='header__notification-item-name'>{name}</div>
            <div className='header__notification-item-text'>{text}</div>
            <div className='header__notification-item-date'>
               {getDate(updatedAt)} {getTime(updatedAt)}
            </div>
         </div>
      </div>
   )
}

HeaderNotificationItem.propDefault = {}

export default HeaderNotificationItem
