import { notificationsTypes } from './types'

const initialState = {
   data: {},
   notifications: [],
   notification: {},
}

export default function notificationsReducer(state = initialState, action) {
   switch (action.type) {
      case notificationsTypes.RESET_NOTIFICATIONS:
         return { ...initialState }
      case notificationsTypes.SET_NOTIFICATIONS_DATA:
         return { ...state, data: action.payload }
      case notificationsTypes.SET_NOTIFICATIONS:
         return { ...state, notifications: action.payload }
      case notificationsTypes.ADD_NOTIFICATIONS:
         return { ...state, notifications: [...state.notifications, ...action.payload] }
      case notificationsTypes.SET_NOTIFICATION:
         return { ...state, notification: action.payload }
      case notificationsTypes.UPDATE_NOTIFICATION:
         return { ...state, notifications: state.notifications.map((i) => (i.id === action.payload.id ? { ...i, ...action.payload } : i)) }
      case notificationsTypes.REMOVE_NOTIFICATION:
         return { ...state, notifications: state.notifications.filter((i) => i.id !== action.payload.id) }
      default:
         return state
   }
}
