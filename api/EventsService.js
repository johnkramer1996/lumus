import axios from './axios'
import { cabinetEventsURL, frontEventsURL, userEventsURL } from './URLS'

export default class EventsService {
   static async addEvent({ body = {} } = {}) {
      return await axios.post(cabinetEventsURL.ADD_EVENT, body, {
         headers: {
            'Content-Type': 'multipart/form-data',
         },
      })
   }
   static async fetchEvents(params) {
      return await axios.get(cabinetEventsURL.FETCH_EVENTS, {
         params,
      })
   }
   static async fetchEvent({ eventId = 0 } = {}) {
      return await axios.get(cabinetEventsURL.FETCH_EVENT({ eventId }))
   }
   static async putEvent({ eventId = 0, body = {} } = {}) {
      return await axios.put(cabinetEventsURL.PUT_EVENT({ eventId }), body, {
         headers: {
            'Content-Type': 'multipart/form-data',
         },
      })
   }
   static async deleteEvent({ eventId = 0 } = {}) {
      return await axios.delete(cabinetEventsURL.DELETE_EVENT({ eventId }))
   }
   static async addUserToEvent({ eventId = 0 } = {}) {
      return await axios.post(userEventsURL.ADD_USER({ eventId }))
   }
   static async removeUserFromEvent({ eventId = 0 } = {}) {
      return await axios.delete(userEventsURL.REMOVE_USER({ eventId }))
   }
   static async fetchUserEvents(params) {
      return await axios.get(userEventsURL.FETCH_EVENTS, {
         params,
      })
   }

   static async fetchFrontEvents(params) {
      return await axios.get(frontEventsURL.FETCH_EVENTS, { params })
   }
   static async fetchFrontEvent({ eventId = 1 } = {}) {
      return await axios.get(frontEventsURL.FETCH_EVENT({ eventId }))
   }
   static async fetchFrontAuthEvents(params) {
      return await axios.get(frontEventsURL.FETCH_AUTH_EVENTS, { params })
   }
   static async fetchFrontAuthEvent({ eventId = 1 } = {}) {
      return await axios.get(frontEventsURL.FETCH_AUTH_EVENT({ eventId }))
   }
}
