import axios from './axios'
import { cabinetNotificationsURL, frontNotificationsURL, userNotificationsURL } from './URLS'

export default class NotificationsService {
   static async addNotification({ body = {} } = {}) {
      return await axios.post(cabinetNotificationsURL.ADD_NOTIFICATION, body)
   }
   static async fetchNotifications(params) {
      return await axios.get(cabinetNotificationsURL.FETCH_NOTIFICATIONS, {
         params,
      })
   }
   static async fetchNotification({ notificationId = 0 } = {}) {
      return await axios.get(cabinetNotificationsURL.FETCH_NOTIFICATION({ notificationId }))
   }
   static async putNotification({ notificationId = 0, body = {} } = {}) {
      return await axios.put(cabinetNotificationsURL.PUT_NOTIFICATION({ notificationId }), body)
   }
   static async deleteNotification({ notificationId = 0 } = {}) {
      return await axios.delete(cabinetNotificationsURL.FETCH_NOTIFICATION({ notificationId }))
   }

   static async fetchUserNotifications(params) {
      return await axios.get(userNotificationsURL.FETCH_NOTIFICATIONS, {
         params,
      })
   }
   static async readUserNotifications(body = {}) {
      return await axios.post(userNotificationsURL.FETCH_NOTIFICATIONS_READ, body)
   }

   //  static async fetchFrontNotifications() {
   //     return await axios.get(frontNotificationsURL.FETCH_NOTIFICATIONS)
   //  }
   // static async fetchFrontNotification({ notificationId = 0 } = {}) {
   //    return await axios.get(frontNotificationsURL.FETCH_NOTIFICATION({ notificationId }))
   // }
}
