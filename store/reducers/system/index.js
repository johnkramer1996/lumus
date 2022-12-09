import { systemTypes } from './types'

const initialState = {
   categories: { categories: [], difficulties: [], formats: [], types: [], eventTypes: [], poctCategories: [] },
   socUrls: {},
   userSettings: { userFileTypes: [], userNotifySourses: [], userNotifyTypes: [] },
   contacts: {},
}

export default function systemsReducer(state = initialState, action) {
   switch (action.type) {
      case systemTypes.SET_CATEGORIES:
         return { ...state, categories: action.payload }
      case systemTypes.SET_SOC_URLS:
         return { ...state, socUrls: action.payload }
      case systemTypes.SET_USER_SETTINGS:
         return { ...state, userSettings: action.payload }
      case systemTypes.SET_CONTACTS:
         return { ...state, contacts: action.payload }
      default:
         return state
   }
}
