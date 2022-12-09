import { commentsTypes } from './types'

const initialState = {
   commentsData: {},
   comments: [],
}

export default function commentsReducer(state = initialState, action) {
   switch (action.type) {
      case commentsTypes.RESET_COMMENTS:
         return { ...state, commentsData: {}, comments: [] }
      case commentsTypes.SET_COMMENTS_DATA:
         return { ...state, commentsData: action.payload }
      case commentsTypes.SET_COMMENTS: {
         return { ...state, comments: [...state.comments, ...action.payload] }
      }
      case commentsTypes.SET_COMMENT_ADDED: {
         return { ...state, comments: [action.payload, ...state.comments], commentsData: { ...state.commentsData, total: ++state.commentsData.total } }
      }

      default:
         return state
   }
}
