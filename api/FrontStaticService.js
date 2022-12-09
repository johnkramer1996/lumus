import axios from './axios'
import { frontStaticURL } from './URLS'

export default class FrontStaticService {
   //CONTACTS
   static async fetchFrontContacts() {
      return await axios.get(frontStaticURL.FETCH_CONTACTS)
   }
   static async sendFrontContacts(body = {}) {
      return await axios.post(frontStaticURL.SEND_CONTACTS, body)
   }
   //USERS
   static async fetchFrontUser({ userId = 0 } = {}) {
      return await axios.get(frontStaticURL.FETCH_USER({ userId }))
   }
   static async fetchFrontUserEvents({ userId = 0, params = {} } = {}) {
      return await axios.get(frontStaticURL.FETCH_USER_EVENTS({ userId }), { params })
   }
   //TRAINERS
   static async fetchFrontTrainer({ trainerId = 0 } = {}) {
      return await axios.get(frontStaticURL.FETCH_TRAINER({ trainerId }))
   }
   static async fetchFrontTrainerEvents({ trainerId = 0, params = {} } = {}) {
      return await axios.get(frontStaticURL.FETCH_TRAINER_EVENTS({ trainerId }), { params })
   }
}
