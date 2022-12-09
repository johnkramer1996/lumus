import { settingsTypes } from './types'

const initialState = {
   typeShow: localStorage.getItem('typeShow') || 'col',
   filter: { category: [], type: [], format: [], difficulty: [], _features: [], _ended: [], _nomoderated: [], _moderated: [] },
   page: 1,
}

export default function settingsReducer(state = initialState, action) {
   switch (action.type) {
      case settingsTypes.SET_TYPE_SHOW:
         localStorage.setItem('typeShow', action.payload)
         return { ...state, typeShow: action.payload }
      case settingsTypes.RESET_FILTER:
         return { ...state, filter: initialState.filter, page: 1 }
      case settingsTypes.SET_FILTER:
         return { ...state, filter: action.payload, page: 1 }
      case settingsTypes.SET_PAGE:
         return { ...state, page: action.payload }
      default:
         return state
   }
}
