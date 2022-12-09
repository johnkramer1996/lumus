import axios from './axios'
import { authURL, cabinetUserURL } from './URLS'

export default class AuthService {
   static async login(body = {}) {
      return await axios.post(authURL.LOGIN, body)
   }
   static async restore(body = {}) {
      return await axios.post(authURL.RESTORE, body)
   }
   static async checkEmail(body = {}) {
      return await axios.post(authURL.CHECK_EMAIL, body)
   }
   static async register(body = {}) {
      return await axios.post(authURL.REGISTER, body)
   }
   static async auth() {
      return await axios.get(cabinetUserURL.AUTHORIZATION)
   }
   static async settings({ body = {} } = {}) {
      return await axios.post(cabinetUserURL.SETTINGS, body, {
         headers: {
            'Content-Type': 'multipart/form-data',
         },
      })
   }
}
