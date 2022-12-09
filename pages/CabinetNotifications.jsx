import React, { useEffect } from 'react'
import { Cabinet, CabinetItems } from 'components/'
import { useDispatch, useRequest } from 'hooks'
import { useSelector } from 'react-redux'
import { notificationsSelectors, settingsSelectors } from 'store/selectors'
import { getTotal, getURL } from 'utils'
import { LIMIT } from 'constants'

function CabinetNotifications() {
   const { resetNotifications, fetchNotifications, deleteNotification } = useDispatch()
   const page = useSelector(settingsSelectors.getPage)
   const { total, isLastPage } = useSelector(notificationsSelectors.getData)
   const items = useSelector(notificationsSelectors.getNotifications)

   const fetchNotificationsRequest = useRequest(fetchNotifications, true, { testDelay: 300 })
   const deleteNotificationRequest = useRequest(deleteNotification)

   const limit = LIMIT.CABINET_EVENT
   const sortBy = 'id.desc'

   useEffect(() => () => resetNotifications(), [])
   useEffect(() => fetchNotificationsRequest.call({ page, limit, sortBy }), [page])

   return (
      <Cabinet>
         <CabinetItems
            deleteRequest={deleteNotificationRequest}
            toAdd={getURL.cabinetNotificationsAdd}
            toEdit={getURL.cabinetNotificationsEdit}
            items={items}
            nameId={'notificationId'}
            total={getTotal(total, 'notifications')}
            title={'Уведомление'}
            textBtn={'Добавить уведомление'}
            isLoading={fetchNotificationsRequest.isLoading}
            isLastPage={isLastPage}
         />
      </Cabinet>
   )
}

export default CabinetNotifications
