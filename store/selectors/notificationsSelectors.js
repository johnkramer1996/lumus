const notificationsSelectors = {
   getData: ({ notifications }) => notifications.data,
   getNotifications: ({ notifications }) => notifications.notifications,
   getNotification: ({ notifications }) => notifications.notification,
}

export default notificationsSelectors
