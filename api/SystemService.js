import axios from './axios'
import { systemURL } from './URLS'

export default class SystemService {
   static async fetchCategoies() {
      return await axios.get(systemURL.FETCH_CATEGORIES)
   }
   static async fetchSocUrls() {
      return await axios.get(systemURL.FETCH_SOC_URLS)
   }
   static async fetchUserSettings() {
      return await axios.get(systemURL.FETCH_USER_SETTINGS)
   }
   static async fetchContacts() {
      return await axios.get(systemURL.FETCH_CONTACTS)
   }
}
