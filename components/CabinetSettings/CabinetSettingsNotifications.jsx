import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import CabinetSettingsNotificationsItem from './CabinetSettingsNotificationsItem'
import { authSelectors, systemSelectors } from 'store/selectors'
import CabinetSettingsNotificationsTelegram from './CabinetSettingsNotificationsTelegram'

const CabinetSettingsNotifications = ({ onChange }) => {
   const user = useSelector(authSelectors.getUser)
   const { userNotifySourses, userNotifyTypes } = useSelector(systemSelectors.getUserSettings)

   const [notifications, setNotifications] = useState([])

   const createNotifications = (notifications) => {
      return new Array(userNotifyTypes.length)
         .fill(0)
         .map((_) => new Array(userNotifySourses.length).fill(0))
         .map((row, indexRow) => ({
            type: userNotifyTypes[indexRow].name,
            desc: userNotifyTypes[indexRow].description,
            sources: row.map((_, indexCol) => ({
               source: userNotifySourses[indexCol].name,
               status: !!notifications?.find(({ type, source }) => type === indexRow && source === indexCol),
            })),
         }))
   }

   useEffect(() => {
      user && setNotifications(createNotifications(user.notifications))
   }, [user, userNotifySourses, userNotifyTypes])

   return (
      <div className='account-settings__group card-bg'>
         <h3 className='account-settings__subtitle display-4'>Уведомления</h3>
         {/* <CabinetSettingsNotificationsTelegram /> */}
         {notifications.map((props, indexType) => (
            <CabinetSettingsNotificationsItem key={indexType} {...props} onChange={onChange} index={indexType} />
         ))}
      </div>
   )
}

CabinetSettingsNotifications.propTypes = {
   onChange: PropTypes.func.isRequired,
}

export default CabinetSettingsNotifications
