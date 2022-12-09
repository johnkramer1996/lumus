import React, { useEffect, useState } from 'react'
import HeaderNotificationItem from './HeaderNotificationItem'
import { useDispatch, useEvent, useRequest } from 'hooks'
import { isActiveClass } from 'utils'
import { ReactComponent as NotificationSvg } from 'svg/notification.svg'
import { useSelector } from 'react-redux'
import { LoaderWrapper } from 'components/ui'
import { notificationsSelectors } from 'store/selectors'

const HeaderNotification = () => {
   const { fetchUserNotifications, readUserNotifications } = useDispatch()
   const notifications = useSelector(notificationsSelectors.getNotifications)
   //  const notificationsNew = useSelector(({ courses }) => courses.notificationsNew)
   const { total } = useSelector(notificationsSelectors.getData)

   const [isActive, setIsActive] = useState(false)

   const fetchUserNotificationsRequest = useRequest(fetchUserNotifications, true)
   //  const readUserNotificationsRequest = useRequest(readUserNotifications)

   useEffect(() => {
      // !notificationsNew.length && fetchUserNotificationsRequest.call({ page: 1, _limit: 3, _all: 1, _all_new: 1 })
      // fetchUserNotificationsRequest.call()
   }, [])

   //  useEffect(() => {
   //     if (isActive) {
   //        const notification_ids = notificationsNew.filter(({ id, readed_at }) => !readed_at).map(({ id }) => id)
   //        notification_ids.length && readUserNotificationsRequest.call({ notification_ids })
   //     }
   //  }, [isActive])

   useEvent((e) => !e.target.closest('.header__notification') && setIsActive(false))

   return (
      <div className={`header__notification${isActiveClass(isActive, 'header__notification--active')}`}>
         <div className='header__notification-show' onClick={() => setIsActive(!isActive)}>
            <NotificationSvg />
            {!!total && <i>{total}</i>}
         </div>
         <div className='header__notification-dropdown'>
            <LoaderWrapper isLoading={fetchUserNotificationsRequest.isLoading}>
               <>
                  <div className='header__notification-top'>
                     <div className='header__notification-title'>{total ? 'Уведомления' : 'Нет новых уведомлений'}</div>
                     {!!total && <div className='header__notification-new'>{total} новых</div>}
                  </div>
                  {!!total && (
                     <div className='header__notification-items'>
                        {notifications
                           .filter((_, index) => index < 3)
                           .map((item, index) => (
                              <HeaderNotificationItem key={index} {...item} />
                           ))}
                     </div>
                  )}
                  <div className='header__notification-bottom'>
                     <button className='header__notification-all'>Показать все</button>
                  </div>
               </>
            </LoaderWrapper>
         </div>
      </div>
   )
}

export default HeaderNotification
