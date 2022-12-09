import { faqTypes } from './types'

const initialState = {
   data: {},
   faq: [],
   faqItem: {},
}

export default function faqReducer(state = initialState, action) {
   switch (action.type) {
      case faqTypes.RESET_FAQ:
         return { ...initialState }
      case faqTypes.SET_FAQ_DATA:
         return { ...state, data: action.payload }
      case faqTypes.ADD_FAQ:
         return { ...state, faq: [...state.faq, ...action.payload] }
      case faqTypes.SET_FAQ:
         return { ...state, faq: action.payload }
      case faqTypes.UPDATE_FAQ:
         return { ...state, faq: state.faq.map((i) => (i.id === action.payload.id ? { ...i, ...action.payload } : i)) }
      case faqTypes.REMOVE_FAQ:
         return { ...state, faq: state.faq.filter((i) => i.id !== action.payload.id) }
      case faqTypes.SET_FAQ_ITEM:
         return { ...state, faq: action.payload }
      default:
         return state
   }
}
