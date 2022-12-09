import { frontStaticTypes } from './types'

const initialState = {
   contacts: [],
}

export default function frontStaicReducer(state = initialState, action) {
   switch (action.type) {
      case frontStaticTypes.RESET_FRONT_STATIC:
         return { ...initialState }
      case frontStaticTypes.SET_FRONT_CONTACTS:
         return { ...state, contacts: action.payload }
      default:
         return state
   }
}
