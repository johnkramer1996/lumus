import FrontStaticService from 'api/FrontStaticService'
import { createHandles } from 'utils'
import { CoursesActionCreators } from '../courses/action-creators'
import { EventsActionCreators } from '../events/action-creators'
import { frontStaticTypes } from './types'

export const FrontStaticActionCreators = {
   resetFrontStatic: (payload) => ({ type: frontStaticTypes.RESET_FRONT_EVENTS, payload }),
   setFrontStaticContacts: (payload) => ({ type: frontStaticTypes.SET_FRONT_CONTACTS, payload }),
}

const defaultHandlers = createHandles(FrontStaticService)

export const frontStaticHandlers = {
   ...defaultHandlers,
   //  sendFrontContacts
   fetchFrontContacts: {
      ...defaultHandlers.fetchFrontContacts,
      success: (dispatch, response, data, prevData) => {
         dispatch(FrontStaticActionCreators.setFrontStaticContacts(Array.isArray(data) ? data : []))
      },
   },
}
