import axios from './axios'
import { cabinetUsersURL, frontUsersURL } from './URLS'

export default class UsersService {
   static async addUser({ body = {} } = {}) {
      return await axios.post(cabinetUsersURL.ADD_USER, body, {
         headers: {
            'Content-Type': 'multipart/form-data',
         },
      })
   }
   static async fetchUsers(params) {
      return await axios.get(cabinetUsersURL.FETCH_USERS, {
         params,
      })
   }
   static async fetchUser({ UserId = 0 } = {}) {
      return await axios.get(cabinetUsersURL.FETCH_USER({ UserId }))
   }
   static async putUser({ UserId = 0, body = {} } = {}) {
      return await axios.put(cabinetUsersURL.PUT_USER({ UserId }), body, {
         headers: {
            'Content-Type': 'multipart/form-data',
         },
      })
   }
   static async deleteUser({ UserId = 0 } = {}) {
      return await axios.delete(cabinetUsersURL.DELETE_USER({ UserId }))
   }

   //USERS
   static async fetchFrontUser({ userId = 0 } = {}) {
      return await axios.get(frontUsersURL.FETCH_USER({ userId }))
   }
   static async fetchFrontUserEvents({ userId = 0, params = {} } = {}) {
      return await axios.get(frontUsersURL.FETCH_USER_EVENTS({ userId }), { params })
   }
   //TRAINERS
   static async fetchFrontTrainer({ trainerId = 0 } = {}) {
      return await axios.get(frontUsersURL.FETCH_TRAINER({ trainerId }))
   }
   static async fetchFrontTrainerEvents({ trainerId = 0, params = {} } = {}) {
      return await axios.get(frontUsersURL.FETCH_TRAINER_EVENTS({ trainerId }), { params })
   }
}
