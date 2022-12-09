import { commentsTypes } from './types'

export const CommentsActionCreators = {
   resetComments: (payload) => ({ type: commentsTypes.RESET_COMMENTS, payload }),
   setCommentsData: (payload) => ({ type: commentsTypes.SET_COMMENTS_DATA, payload }),
   setComments: (payload) => ({ type: commentsTypes.SET_COMMENTS, payload }),
   addComments: (payload) => ({ type: commentsTypes.ADD_COMMENTS, payload }),
   setCommentAdded: (payload) => ({ type: commentsTypes.SET_COMMENT_ADDED, payload }),
}
