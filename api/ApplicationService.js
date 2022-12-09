import axios from './axios'
import { cabinetApplicationsURL, frontApplicationsURL } from './URLS'

export default class ApplicationService {
   static async addApplication({ body = {} } = {}) {
      return await axios.post(cabinetApplicationsURL.ADD_APPLICATION, body)
   }
   static async fetchApplications(params) {
      return await axios.get(cabinetApplicationsURL.FETCH_APPLICATIONS, { params })
   }
   static async fetchApplication({ applicationId = 0 } = {}) {
      return await axios.get(cabinetApplicationsURL.FETCH_APPLICATION({ applicationId }))
   }
   static async putApplication({ applicationId = 0, body = {} } = {}) {
      return await axios.put(cabinetApplicationsURL.PUT_APPLICATION({ applicationId }), body)
   }
   static async deleteApplication({ applicationId = 0 } = {}) {
      return await axios.delete(cabinetApplicationsURL.FETCH_APPLICATION({ applicationId }))
   }
   static async fetchFrontApplications() {
      return await axios.get(frontApplicationsURL.FETCH_APPLICATIONS)
   }
   static async fetchFrontApplication({ applicationId = 0 } = {}) {
      return await axios.get(frontApplicationsURL.FETCH_APPLICATION({ applicationId }))
   }
}
