import axios from './axios'
import { cabinetSubscribesURL, frontSubscribesURL } from './URLS'

export default class SubscribesService {
   static async addSubscribe({ body = {} } = {}) {
      return await axios.post(cabinetSubscribesURL.ADD_SUBSCRIBE, body)
   }
   static async fetchSubscribes(params) {
      return await axios.get(cabinetSubscribesURL.FETCH_SUBSCRIBES, { params })
   }
   static async fetchSubscribe({ subscribeId = 0 } = {}) {
      return await axios.get(cabinetSubscribesURL.FETCH_SUBSCRIBE({ subscribeId }))
   }
   static async putSubscribe({ subscribeId = 0, body = {} } = {}) {
      return await axios.put(cabinetSubscribesURL.PUT_SUBSCRIBE({ subscribeId }), body)
   }
   static async deleteSubscribe({ subscribeId = 0 } = {}) {
      return await axios.delete(cabinetSubscribesURL.FETCH_SUBSCRIBE({ subscribeId }))
   }
   static async fetchFrontSubscribes() {
      return await axios.get(frontSubscribesURL.FETCH_SUBSCRIBES)
   }
   static async fetchFrontSubscribe({ subscribeId = 0 } = {}) {
      return await axios.get(frontSubscribesURL.FETCH_SUBSCRIBE({ subscribeId }))
   }
}
