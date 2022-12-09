import { postsTypes } from './types'

const initialState = {
   data: {},
   posts: [],
   popular: {
      data: {},
      posts: [],
   },
   recent: {
      data: {},
      posts: [],
   },
   post: [],
   interested: [],
}

export default function postsReducer(state = initialState, action) {
   switch (action.type) {
      case postsTypes.RESET_POSTS:
         return { ...initialState }
      case postsTypes.SET_CATEGORY:
         return { ...state, category: action.payload }
      case postsTypes.SET_POSTS_DATA:
         return { ...state, data: action.payload }
      case postsTypes.SET_POSTS:
         return { ...state, posts: action.payload }
      case postsTypes.ADD_POSTS:
         return { ...state, posts: [...state.posts, ...action.payload] }
      case postsTypes.UPDATE_POST:
         return { ...state, posts: state.posts.map((i) => (i.id === action.payload.id ? { ...i, ...action.payload } : i)) }
      case postsTypes.REMOVE_POST:
         return { ...state, posts: state.posts.filter((i) => i.id !== action.payload.id) }
      case postsTypes.SET_POPULAR_POSTS_DATA:
         return { ...state, popular: { ...state.popular, data: action.payload } }
      case postsTypes.SET_POPULAR_POSTS:
         return { ...state, popular: { ...state.popular, posts: action.payload } }
      case postsTypes.SET_RECENT_POSTS_DATA:
         return { ...state, recent: { ...state.recent, data: action.payload } }
      case postsTypes.SET_RECENT_POSTS:
         return { ...state, recent: { ...state.recent, posts: action.payload } }
      case postsTypes.SET_POST:
         return { ...state, post: action.payload }
      case postsTypes.SET_INTERESTED:
         return { ...state, interested: action.payload }
      default:
         return state
   }
}
