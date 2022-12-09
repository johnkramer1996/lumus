import { coursesTypes } from './types'

const initialState = {
   data: {},
   courses: [],
   course: {},
   descriptions: [],
   prices: [],
   whoms: [],
   modules: [],
   lessons: [],
   lesson: {},
   lessonQuestions: [],
   lessonAnswers: [],
   lessonFiles: [],
   interestes: [],
   notificationsData: {},
   notifications: [],
   notificationsNew: [],
}

export default function coursesReducer(state = initialState, action) {
   switch (action.type) {
      case coursesTypes.RESET_COURSES:
         return { ...initialState }
      case coursesTypes.RESET_LESSON_FILES:
         return { ...state, lessonFiles: [...initialState.lessonFiles] }
      case coursesTypes.SET_COURSES_DATA:
         return { ...state, data: action.payload }
      case coursesTypes.SET_COURSES:
         return { ...state, courses: action.payload }
      case coursesTypes.SET_COURSE:
         return { ...state, course: action.payload }
      case coursesTypes.SET_DESCRIPTIONS:
         return { ...state, descriptions: action.payload }
      case coursesTypes.SET_PRICES:
         return { ...state, prices: action.payload }
      case coursesTypes.SET_WHOMS:
         return { ...state, whoms: action.payload }
      case coursesTypes.SET_MODULES:
         return { ...state, modules: action.payload }
      case coursesTypes.SET_LESSONS:
         return { ...state, lessons: action.payload }
      case coursesTypes.SET_LESSON:
         return { ...state, lesson: action.payload }
      case coursesTypes.SET_LESSON_QUESTIONS:
         return { ...state, lessonQuestions: action.payload }
      case coursesTypes.SET_LESSON_ANSWERS:
         return { ...state, lessonAnswers: action.payload }
      case coursesTypes.SET_LESSON_FILES:
         return { ...state, lessonFiles: action.payload }
      case coursesTypes.SET_INTERESTES:
         return { ...state, interestes: action.payload }
      case coursesTypes.SET_TRAINER:
         return { ...state, trainer: action.payload }

      // TODO OWN STATE FOR NOTIFICATIONS
      case coursesTypes.SET_NOTIFICATIONS_DATA:
         return { ...state, notificationsData: action.payload }
      case coursesTypes.SET_NOTIFICATIONS:
         return { ...state, notifications: action.payload }
      case coursesTypes.SET_NOTIFICATIONS_NEW:
         return { ...state, notificationsNew: action.payload }
      default:
         return state
   }
}
