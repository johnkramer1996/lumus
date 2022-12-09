import { pagesTypes } from './types'

const initialState = {
   data: {},
   pages: [],
   page: {},
}

export default function pagesReducer(state = initialState, action) {
   switch (action.type) {
      case pagesTypes.RESET_PAGES:
         return { ...initialState }
      case pagesTypes.SET_PAGES_DATA:
         return { ...state, data: action.payload }
      case pagesTypes.SET_PAGES:
         return { ...state, pages: action.payload }
      case pagesTypes.ADD_PAGES:
         return { ...state, pages: [...state.pages, ...action.payload] }
      case pagesTypes.UPDATE_PAGE:
         return { ...state, pages: state.pages.map((i) => (i.id === action.payload.id ? { ...i, ...action.payload } : i)) }
      case pagesTypes.REMOVE_PAGE:
         return { ...state, pages: state.pages.filter((i) => i.id !== action.payload.id) }
      case pagesTypes.SET_PAGE:
         return { ...state, page: action.payload }
      default:
         return state
   }
}
