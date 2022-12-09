import PostsService from 'api/PostsService'
import { createHandles } from 'utils'
import { CommentsActionCreators } from '../comments/action-creators'
import { ModalsActionCreators } from '../modals/action-creators'
import { postsTypes } from './types'

export const PostsActionCreators = {
   resetPosts: (payload) => ({ type: postsTypes.RESET_POSTS, payload }),
   setPostsData: (payload) => ({ type: postsTypes.SET_POSTS_DATA, payload }),
   setPosts: (payload) => ({ type: postsTypes.SET_POSTS, payload }),
   addPosts: (payload) => ({ type: postsTypes.ADD_POSTS, payload }),
   setPopularPostsData: (payload) => ({ type: postsTypes.SET_POPULAR_POSTS_DATA, payload }),
   setPopularPosts: (payload) => ({ type: postsTypes.SET_POPULAR_POSTS, payload }),
   setRecentPostsData: (payload) => ({ type: postsTypes.SET_RECENT_POSTS_DATA, payload }),
   setRecentPosts: (payload) => ({ type: postsTypes.SET_RECENT_POSTS, payload }),
   setPost: (payload) => ({ type: postsTypes.SET_POST, payload }),
   setNewPosts: (payload) => ({ type: postsTypes.SET_NEW_POSTS, payload }),
   setPostInterested: (payload) => ({ type: postsTypes.SET_INTERESTED, payload }),
}

const defaultHandlers = createHandles(PostsService)

export const postsHandlers = {
   ...defaultHandlers,
   fetchPosts: {
      ...defaultHandlers.fetchPosts,
      success: (dispatch, response, data, prevData) => {
         const { sortBy } = response.config.params
         if (sortBy && sortBy.includes('views')) {
            dispatch(PostsActionCreators.setPopularPostsData(typeof prevData === 'object' ? prevData : {}))
            dispatch(PostsActionCreators[prevData.currentPage === 1 ? 'setPopularPosts' : 'addPopularPosts'](Array.isArray(data) ? data : []))
            return
         } else if (sortBy && sortBy.includes('id')) {
            dispatch(PostsActionCreators.setRecentPostsData(typeof prevData === 'object' ? prevData : {}))
            dispatch(PostsActionCreators[prevData.currentPage === 1 ? 'setRecentPosts' : 'addRecentPosts'](Array.isArray(data) ? data : []))
            return
         }
         dispatch(PostsActionCreators.setPostsData(typeof prevData === 'object' ? prevData : {}))
         dispatch(PostsActionCreators[prevData.currentPage === 1 ? 'setPosts' : 'addPosts'](Array.isArray(data) ? data : []))
      },
   },
   fetchPost: {
      ...defaultHandlers.fetchPost,
      success: (dispatch, response, data, prevData) => {
         dispatch(PostsActionCreators.setPost(typeof data === 'object' ? data : {}))
         dispatch(PostsActionCreators.setPostInterested(Array.isArray(prevData.interested) ? prevData.interested : []))
      },
   },
   putPost: {
      ...defaultHandlers.putPost,
      success: (dispatch, response, data, prevData) => {
         dispatch(PostsActionCreators.updatePost(typeof data === 'object' ? data : {}))
         dispatch(ModalsActionCreators.setIsShow(false))
      },
   },
   deletePost: {
      ...defaultHandlers.deletePost,
      success: (dispatch, response, data, prevData) => {
         dispatch(PostsActionCreators.removePost(typeof data === 'object' ? data : {}))
         dispatch(ModalsActionCreators.setContent({ title: 'Post удален' }))
      },
   },
   fetchPostComments: {
      ...defaultHandlers.fetchPostComments,
      success: (dispatch, response, data, prevData) => {
         dispatch(CommentsActionCreators.setCommentsData(typeof prevData === 'object' ? prevData : {}))
         dispatch(CommentsActionCreators.setComments(Array.isArray(data) ? data : []))
      },
   },
   addPostComment: {
      ...defaultHandlers.addPostComment,
      success: (dispatch, response, data, prevData) => {
         dispatch(CommentsActionCreators.setCommentAdded(typeof data === 'object' ? data : {}))
      },
   },
   // fetchFrontPosts
   // fetchFrontPost
   // fetchFrontPostComments
}
postsHandlers.fetchFrontPosts.success = postsHandlers.fetchPosts.success
postsHandlers.fetchFrontPost.success = postsHandlers.fetchPost.success
postsHandlers.fetchFrontPostComments.success = postsHandlers.fetchPostComments.success
