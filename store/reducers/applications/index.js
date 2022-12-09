import { applicationsTypes } from './types'

const initialState = {
   data: {},
   applications: [],
   application: {},
}

export default function ApplicationsReducer(state = initialState, action) {
   console.log(action)
   switch (action.type) {
      case applicationsTypes.RESET_APPLICATIONS:
         return { ...initialState }
      case applicationsTypes.SET_APPLICATIONS_DATA:
         return { ...state, data: action.payload }
      case applicationsTypes.SET_APPLICATIONS:
         return { ...state, applications: action.payload }
      case applicationsTypes.ADD_APPLICATIONS:
         return { ...state, applications: [...state.application, ...action.payload] }
      case applicationsTypes.UPDATE_APPLICATION:
         return { ...state, applications: state.application.map((i) => (i.id === action.payload.id ? { ...i, ...action.payload } : i)) }
      case applicationsTypes.REMOVE_APPLICATION:
         return { ...state, applications: state.application.filter((i) => i.id !== action.payload.id) }
      case applicationsTypes.SET_APPLICATION:
         return { ...state, application: action.payload }
      default:
         return state
   }
}
