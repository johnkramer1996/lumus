import { authStepTypes, authTypes } from './types'

const initialState = {
   isAuth: false,
   user: {},
   docs: {},
   token: '',
   roleIds: [],
   role: 0,
   notifications: [],
   step: authStepTypes.CHECK_EMAIL,
}

export default function authReducer(state = initialState, action) {
   switch (action.type) {
      case authTypes.SET_AUTH:
         return { ...state, isAuth: action.payload }
      case authTypes.SET_USER:
         return {
            ...state,
            user: { ...state.user, ...action.payload },
            docs: { ...state.docs, ...(action.payload.docs || {}) },
            notifications: action.payload.notifications || [],
         }
      case authTypes.SET_ROLE_IDS:
         return { ...state, roleIds: action.payload }
      case authTypes.SET_ROLE:
         return { ...state, role: action.payload }
      case authTypes.SET_TOKEN:
         return { ...state, token: action.payload }
      case authTypes.SET_STEP:
         return { ...state, step: action.payload }
      default:
         return state
   }
}
