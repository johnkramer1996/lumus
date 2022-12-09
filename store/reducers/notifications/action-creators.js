import NotificationsService from 'api/NotificationsService'
import { createHandles } from 'utils'
import { ModalsActionCreators } from '../modals/action-creators'
import { notificationsTypes } from './types'

export const NotificationsActionCreators = {
   resetNotifications: (payload) => ({ type: notificationsTypes.RESET_NOTIFICATIONS, payload }),
   setNotificationsData: (payload) => ({ type: notificationsTypes.SET_NOTIFICATIONS_DATA, payload }),
   setNotifications: (payload) => ({ type: notificationsTypes.SET_NOTIFICATIONS, payload }),
   addNotifications: (payload) => ({ type: notificationsTypes.ADD_NOTIFICATIONS, payload }),
   setNotification: (payload) => ({ type: notificationsTypes.SET_NOTIFICATION, payload }),
   updateNotification: (payload) => ({ type: notificationsTypes.UPDATE_NOTIFICATION, payload }),
   removeNotification: (payload) => ({ type: notificationsTypes.REMOVE_NOTIFICATION, payload }),
}

const defaultHandlers = createHandles(NotificationsService)

export const notificationsHandlers = {
   ...defaultHandlers,
   addNotification: {
      ...defaultHandlers.addNotification,
      success: (dispatch, response, data, prevData) => {
         dispatch(NotificationsActionCreators.addNotifications([typeof data === 'object' ? data : {}]))
      },
   },
   fetchNotifications: {
      ...defaultHandlers.fetchNotifications,
      success: (dispatch, response, data, prevData) => {
         dispatch(NotificationsActionCreators.setNotificationsData(typeof prevData === 'object' ? prevData : {}))
         dispatch(NotificationsActionCreators[prevData.currentPage === 1 ? 'setNotifications' : 'addNotifications'](Array.isArray(data) ? data : []))
      },
   },
   fetchNotification: {
      ...defaultHandlers.fetchNotification,
      success: (dispatch, response, data, prevData) => {
         dispatch(NotificationsActionCreators.setNotification(typeof data === 'object' ? data : {}))
      },
   },
   putNotification: {
      ...defaultHandlers.putNotification,
      success: (dispatch, response, data, prevData) => {
         dispatch(NotificationsActionCreators.updateNotification(typeof data === 'object' ? data : {}))
         dispatch(ModalsActionCreators.setIsShow(false))
      },
   },
   deleteNotification: {
      ...defaultHandlers.deleteNotification,
      success: (dispatch, response, data, prevData) => {
         dispatch(NotificationsActionCreators.removeNotification(typeof data === 'object' ? data : {}))
         dispatch(ModalsActionCreators.setContent({ title: 'Notification deleted' }))
      },
   },
   //  fetchFrontNotifications
   //  fetchFrontNotification
}
notificationsHandlers.fetchUserNotifications.success = notificationsHandlers.fetchNotifications.success
// notificationsHandlers.fetchFrontNotifications.success = notificationsHandlers.fetchNotifications.success
// notificationsHandlers.fetchFrontNotification.success = notificationsHandlers.fetchNotification.success
