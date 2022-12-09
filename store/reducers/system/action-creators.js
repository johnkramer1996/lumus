import SystemService from 'api/SystemService'
import { createHandles } from 'utils'
import { systemTypes } from './types'

export const SystemActionCreators = {
   setCategories: (payload) => ({ type: systemTypes.SET_CATEGORIES, payload }),
   setSocUrls: (payload) => ({ type: systemTypes.SET_SOC_URLS, payload }),
   setUserSettings: (payload) => ({ type: systemTypes.SET_USER_SETTINGS, payload }),
   setContacts: (payload) => ({ type: systemTypes.SET_CONTACTS, payload }),
}

const defaultHandlers = createHandles(SystemService)

export const systemHandlers = {
   ...defaultHandlers,
   fetchCategoies: {
      ...defaultHandlers.fetchCategoies,
      success: (dispatch, response, data, prevData) => {
         const { categories = [], difficulties = [], formats = [], types = [], eventTypes = [], poctCategories = [] } = prevData

         dispatch(
            SystemActionCreators.setCategories({
               categories,
               types,
               difficulties,
               formats,
               eventTypes,
               poctCategories,
            }),
         )
      },
   },
   fetchSocUrls: {
      ...defaultHandlers.fetchSocUrls,
      success: (dispatch, response, data, prevData) => dispatch(SystemActionCreators.setSocUrls(data || [])),
   },
   fetchUserSettings: {
      ...defaultHandlers.fetchUserSettings,
      success: (dispatch, response, data, prevData) => {
         const userFileTypes = data.userFileTypes || []
         const userNotifySourses = data.userNotifySourses || []
         const userNotifyTypes = data.userNotifyTypes || []

         dispatch(
            SystemActionCreators.setUserSettings({
               ...(data || {}),
               userFileTypes,
               userNotifySourses,
               userNotifyTypes,
            }),
         )
      },
   },
   fetchContacts: {
      ...defaultHandlers.fetchContacts,
      success: (dispatch, response, data, prevData) => {
         dispatch(SystemActionCreators.setContacts(data || {}))
      },
   },
}
