import axios from './axios'
import { cabinetPostsURL, frontPostsURL } from './URLS'

export default class PostsService {
   static async addPost({ body = {} } = {}) {
      return await axios.post(cabinetPostsURL.ADD_EVENT, body, {
         headers: {
            'Content-Type': 'multipart/form-data',
         },
      })
   }
   static async fetchPostCategories() {
      return await axios.get(cabinetPostsURL.FETCH_POST_CATEGORIES)
   }
   static async fetchPosts(params) {
      return await axios.get(cabinetPostsURL.FETCH_POSTS, { params })
   }
   static async fetchPost({ postId = 0, ...params } = {}) {
      return await axios.get(cabinetPostsURL.FETCH_POST({ postId }), { params })
   }
   static async addPostComment({ postId = 0, ...body } = {}) {
      return await axios.post(cabinetPostsURL.ADD_POST_COMMENT({ postId }), body)
   }
   static async fetchPostComments({ postId = 0, ...params } = {}) {
      return await axios.get(cabinetPostsURL.FETCH_POST_COMMENTS({ postId }), { params })
   }
   static async putPost({ postId = 0, body = {} } = {}) {
      return await axios.put(cabinetPostsURL.PUT_POST({ postId }), body, {
         headers: {
            'Content-Type': 'multipart/form-data',
         },
      })
   }
   static async deletePost({ postId = 0 } = {}) {
      return await axios.delete(cabinetPostsURL.DELETE_POST({ postId }))
   }

   static async fetchFrontPostCategories() {
      return await axios.get(frontPostsURL.FETCH_POST_CATEGORIES)
   }
   static async fetchFrontPosts(params) {
      return await axios.get(frontPostsURL.FETCH_POSTS, { params })
   }
   static async fetchFrontPost({ postId = 0, ...params } = {}) {
      return await axios.get(frontPostsURL.FETCH_POST({ postId }), { params })
   }
   static async fetchFrontPostComments({ postId = 0, ...params } = {}) {
      return await axios.get(frontPostsURL.FETCH_POST_COMMENTS({ postId }), { params })
   }
   static async addFrontPostComment({ postId = 0, ...body } = {}) {
      return await axios.post(frontPostsURL.ADD_POST_COMMENT({ postId }), body)
   }
}
