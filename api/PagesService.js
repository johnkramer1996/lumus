import axios from './axios'
import { cabinetPagesURL, frontPagesURL } from './URLS'

export default class PagesService {
   static async addPage({ body = {} } = {}) {
      return await axios.post(cabinetPagesURL.ADD_PAGE, body, {
         headers: {
            'Content-Type': 'multipart/form-data',
         },
      })
   }
   static async fetchPages(params) {
      return await axios.get(cabinetPagesURL.FETCH_PAGES, {
         params,
      })
   }
   static async fetchPage({ pageId = 0 } = {}) {
      return await axios.get(cabinetPagesURL.FETCH_PAGE({ pageId }))
   }
   static async putPage({ pageId = 0, body = {} } = {}) {
      return await axios.put(cabinetPagesURL.PUT_PAGE({ pageId }), body, {
         headers: {
            'Content-Type': 'multipart/form-data',
         },
      })
   }
   static async deletePage({ pageId = 0 } = {}) {
      return await axios.delete(cabinetPagesURL.DELETE_PAGE({ pageId }))
   }
   static async fetchFrontPages() {
      return await axios.get(frontPagesURL.FETCH_PAGES)
   }
   static async fetchFrontPage({ pageId = 0 } = {}) {
      return await axios.get(frontPagesURL.FETCH_PAGE({ pageId }))
   }
}
