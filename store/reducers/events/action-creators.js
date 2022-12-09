import EventsService from 'api/EventsService'
import { createHandles } from 'utils'
import { eventsTypes } from './types'

export const EventsActionCreators = {
   resetEvents: (payload) => ({ type: eventsTypes.RESET_EVENTS, payload }),
   setEventsData: (payload) => ({ type: eventsTypes.SET_EVENTS_DATA, payload }),
   setEvents: (payload) => ({ type: eventsTypes.SET_EVENTS, payload }),
   addEvents: (payload) => ({ type: eventsTypes.ADD_EVENTS, payload }),
   setEvent: (payload) => ({ type: eventsTypes.SET_EVENT, payload }),
}

const defaultHandlers = createHandles(EventsService)

export const eventsHandlers = {
   ...defaultHandlers,
   fetchEvents: {
      ...defaultHandlers.fetchEvents,
      success: (dispatch, response, data, prevData) => {
         dispatch(EventsActionCreators.setEventsData(typeof prevData === 'object' ? prevData : {}))
         dispatch(EventsActionCreators[prevData.currentPage === 1 ? 'setEvents' : 'addEvents'](Array.isArray(data) ? data : []))
      },
   },
   addEvent: {
      ...defaultHandlers.addEvent,
      success: (dispatch, response, data, prevData) => dispatch(EventsActionCreators.setEvent(typeof data === 'object' ? data : {})),
   },
   fetchEvent: {
      ...defaultHandlers.fetchEvent,
      success: (dispatch, response, data, prevData) => dispatch(EventsActionCreators.setEvent(typeof data === 'object' ? data : {})),
   },
   putEvent: {
      ...defaultHandlers.putEvent,
      success: (dispatch, response, data, prevData) => dispatch(EventsActionCreators.setEvent(typeof data === 'object' ? data : {})),
   },
   deleteEvent: {
      ...defaultHandlers.deleteEvent,
      success: (dispatch, response, data, prevData) => dispatch(EventsActionCreators.setEvent({})),
   },
   addUser: {
      ...defaultHandlers.addUser,
   },
   //  fetchFrontEvents
   //  fetchFrontEvent
   //  fetchFrontAuthEvents
   //  fetchFrontAuthEvent
   //  fetchUserEvents
}

eventsHandlers.fetchFrontEvents.success = eventsHandlers.fetchEvents.success
eventsHandlers.fetchFrontEvent.success = eventsHandlers.fetchEvent.success
eventsHandlers.fetchFrontAuthEvents.success = eventsHandlers.fetchEvents.success
eventsHandlers.fetchFrontAuthEvent.success = eventsHandlers.fetchEvent.success
eventsHandlers.fetchUserEvents.success = eventsHandlers.fetchEvents.success
