import { subscribesTypes } from './types'

const initialState = {
   data: {},
   subscribes: [],
   subscribe: {},
}

export default function subscribesReducer(state = initialState, action) {
   console.log(action)
   switch (action.type) {
      case subscribesTypes.RESET_SUBSCRIBES:
         return { ...initialState }
      case subscribesTypes.SET_SUBSCRIBES_DATA:
         return { ...state, data: action.payload }
      case subscribesTypes.SET_SUBSCRIBES:
         return { ...state, subscribes: action.payload }
      case subscribesTypes.ADD_SUBSCRIBES:
         return { ...state, subscribes: [...state.subscribes, ...action.payload] }
      case subscribesTypes.UPDATE_SUBSCRIBE:
         return { ...state, subscribes: state.subscribes.map((i) => (i.id === action.payload.id ? { ...i, ...action.payload } : i)) }
      case subscribesTypes.REMOVE_SUBSCRIBE:
         return { ...state, subscribes: state.subscribes.filter((i) => i.id !== action.payload.id) }
      case subscribesTypes.SET_SUBSCRIBE:
         return { ...state, subscribe: action.payload }
      default:
         return state
   }
}
