import { usersTypes } from './types'

const initialState = {
   data: {},
   users: [],
   user: {},
}

export default function usersReducer(state = initialState, action) {
   switch (action.type) {
      case usersTypes.RESET_USERS:
         return { ...initialState }
      case usersTypes.SET_USERS_DATA:
         return { ...state, data: action.payload }
      case usersTypes.SET_USERS:
         return { ...state, users: action.payload }
      case usersTypes.ADD_USERS:
         return { ...state, users: [...state.users, ...action.payload] }
      case usersTypes.UPDATE_USER:
         return { ...state, users: state.users.map((i) => (i.id === action.payload.id ? { ...i, ...action.payload } : i)) }
      case usersTypes.REMOVE_USER:
         return { ...state, users: state.users.filter((i) => i.id !== action.payload.id) }
      case usersTypes.SET_USER:
         return { ...state, user: action.payload }
      default:
         return state
   }
}
