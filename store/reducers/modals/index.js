import { modalsTypes, modalsContentTypes } from './types'

const initialState = {
   isShow: false,
   content: {},
   type: '',
   back: '',
}

export default function modalsReducer(state = initialState, action) {
   switch (action.type) {
      case modalsTypes.SET_IS_SHOW:
         return { ...initialState, isShow: action.payload }
      case modalsTypes.SET_CONTENT:
         return { ...state, isShow: true, content: action.payload }
      case modalsTypes.SET_TYPE:
         return { ...state, isShow: true, type: action.payload }
      case modalsTypes.SET_BACK:
         return { ...state, back: action.payload }
      default:
         return state
   }
}
