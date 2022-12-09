import axios from 'axios'
import { API_URL, authURL } from './URLS'

const $api = axios.create({ baseURL: API_URL, withCredentials: true })
//

// $api.interceptors.request.use((config) => {
//    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
//    return config
// })

// $api.interceptors.response.use(
//     (config) => {
//         return config
//     },
//     async (error) => {
//         if (error.response.status === 401 && error.config && !error.config.headers._IsRetry) {
//             error.config.headers._IsRetry = true
//             try {
//                 const response = await $api.get(`${authURL.AUTHORIZATION}`, {
//                     headers: {
//                         'Content-Type': 'application/json',
//                         Authorization: `Bearer ${localStorage.getItem('token')}`,
//                         _IsRetry: true,
//                     },
//                 })
//                 localStorage.setItem('token', response.data.token)
//                 return $api.request(error.config)
//             } catch (e) {
//                 console.log(e.response)
//             }
//         }
//         throw error
//     },
// )

export default $api
