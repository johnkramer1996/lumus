import axios from './axios'
import { cabinetFaqURL, frontFaqURL } from './URLS'

export default class FaqService {
   static async addFaq({ body = {} } = {}) {
      return await axios.post(cabinetFaqURL.ADD_FAQ, body)
   }
   static async fetchFaq(params) {
      return await axios.get(cabinetFaqURL.FETCH_FAQ, { params })
   }
   static async fetchFaqItem({ faqId = 0 } = {}) {
      return await axios.get(cabinetFaqURL.FETCH_FAQ_ITEM({ faqId }))
   }
   static async putFaq({ faqId = 0, body = {} } = {}) {
      return await axios.put(cabinetFaqURL.PUT_FAQ({ faqId }), body)
   }
   static async deleteFaq({ faqId = 0 } = {}) {
      return await axios.delete(cabinetFaqURL.DELETE_FAQ({ faqId }))
   }
   static async fetchFrontFaq() {
      return await axios.get(frontFaqURL.FETCH_FAQ)
   }
   static async fetchFrontFaqItem({ faqId = 0 } = {}) {
      return await axios.get(frontFaqURL.FETCH_FAQ_ITEM({ faqId }))
   }
}
