import CoursesService from 'api/CoursesService'
import { createHandles, joinData } from 'utils'
import { coursesTypes } from './types'

export const CoursesActionCreators = {
   resetCourses: (payload) => ({ type: coursesTypes.RESET_COURSES, payload }),
   setCoursesData: (payload) => ({ type: coursesTypes.SET_COURSES_DATA, payload }),
   setCourses: (payload) => ({ type: coursesTypes.SET_COURSES, payload }),
   setCourse: (payload) => ({ type: coursesTypes.SET_COURSE, payload }),
   setCommentAdded: (payload) => ({ type: coursesTypes.SET_COMMENT_ADDED, payload }),
   setModules: (payload) => ({ type: coursesTypes.SET_MODULES, payload }),
   setDescriptions: (payload) => ({ type: coursesTypes.SET_DESCRIPTIONS, payload }),
   setWhoms: (payload) => ({ type: coursesTypes.SET_WHOMS, payload }),
   setPrices: (payload) => ({ type: coursesTypes.SET_PRICES, payload }),
   setLessons: (payload) => ({ type: coursesTypes.SET_LESSONS, payload }),
   setLesson: (payload) => ({ type: coursesTypes.SET_INTERESTES, payload }),
   setInterestes: (payload) => ({ type: coursesTypes.SET_LESSON, payload }),
   setTrainer: (payload) => ({ type: coursesTypes.SET_TRAINER, payload }),

   setLessonQuestions: (payload) => ({ type: coursesTypes.SET_LESSON_QUESTIONS, payload }),
   setLessonAnswers: (payload) => ({ type: coursesTypes.SET_LESSON_ANSWERS, payload }),
   resetLessonFiles: (payload) => ({ type: coursesTypes.RESET_LESSON_FILES, payload }),
   setLessonFiles: (payload) => ({ type: coursesTypes.SET_LESSON_FILES, payload }),
}

const defaultHandlers = createHandles(CoursesService)

export const courseHandlers = {
   ...defaultHandlers,
   fetchCourses: {
      ...defaultHandlers.fetchCourses,
      success: (dispatch, response, data, prevData) => {
         dispatch(CoursesActionCreators.setCoursesData(typeof prevData === 'object' ? prevData : {}))
         dispatch(CoursesActionCreators.setCourses(Array.isArray(data) ? data : []))
      },
   },
   fetchCourse: {
      ...defaultHandlers.fetchCourse,
      success: (dispatch, response, data, prevData) => dispatch(CoursesActionCreators.setCourse(typeof data === 'object' ? data : {})),
   },
   putCourse: {
      ...defaultHandlers.putCourse,
      success: (dispatch, response, data, prevData) => dispatch(CoursesActionCreators.setCourse(data?.course || {})),
   },
   // patchCourse
   deleteCourse: {
      ...defaultHandlers.deleteCourse,
      success: (dispatch, response, data, prevData) => dispatch(CoursesActionCreators.setCourse({})),
   },
   fetchInfo: {
      ...defaultHandlers.fetchInfo,
      success: (dispatch, response, data, prevData) => {
         joinData(data?.course.moduls, data?.course.lessons, 'id', 'modul_id', 'lessons', 'module')
         dispatch(CoursesActionCreators.setCourse(data?.course || []))
         dispatch(CoursesActionCreators.setModules(data?.course?.moduls || []))
         dispatch(CoursesActionCreators.setLessons(data?.course?.lessons || []))
         dispatch(CoursesActionCreators.setDescriptions(data?.descriptions || []))
         dispatch(CoursesActionCreators.setPrices(data?.prices || []))
         dispatch(CoursesActionCreators.setWhoms(data?.course?.whoms || []))
      },
   },
   editInfo: {
      ...defaultHandlers.editInfo,
      success: (dispatch, response, data, prevData) => {
         //TODO CHECK REQUEST
         console.log(data)
      },
   },
   deleteInfo: {
      ...defaultHandlers.deleteInfo,
   },
   // fetchUsers
   fetchComments: {
      ...defaultHandlers.fetchComments,
      success: (dispatch, response, data, prevData) => {
         dispatch(CoursesActionCreators.setCommentsData(response.data || {}))
         dispatch(CoursesActionCreators.setComments(data || []))
      },
   },
   //  readComments
   fetchModules: {
      ...defaultHandlers.fetchModules,
      success: (dispatch, response, data, prevData) => {
         dispatch(CoursesActionCreators.setModules(data || []))
      },
   },
   addModulesMass: {
      ...defaultHandlers.addModulesMass,
      success: (dispatch, response, data, prevData) => {
         //TODO CHECK REQUEST
         const newModules = data.moduls.map((m) => ({ ...m, lessons: data.lessons.filter((l) => l.modul_id === m.id) })) || {}
         console.log(newModules, 'newModules')
         dispatch(CoursesActionCreators.setModules(newModules))
      },
   },
   // addModule
   // fetchModule
   // putModule
   deleteModule: {
      ...defaultHandlers.deleteModule,
   },
   fetchLessons: {
      ...defaultHandlers.fetchLessons,
      success: (dispatch, response, data, prevData) => dispatch(CoursesActionCreators.setLessons(data || [])),
   },
   // deleteFile
   fetchLesson: {
      ...defaultHandlers.fetchLesson,
      success: (dispatch, response, data, prevData) => {
         // TODO CHECK IT
         prevData.prev_lesson = prevData.prev_lesson ? prevData.prev_lesson : {}
         prevData.next_lesson = prevData.next_lesson ? prevData.next_lesson : {}
         dispatch(CoursesActionCreators.setCoursesData(prevData || {}))
         dispatch(CoursesActionCreators.setLessonQuestions(response.data?.questions || []))
         dispatch(CoursesActionCreators.setLessonFiles(data?.files || []))
         dispatch(CoursesActionCreators.setLesson(data || {}))
      },
   },
   deleteLesson: {
      ...defaultHandlers.deleteLesson,
   },
   uploadFile: {
      ...defaultHandlers.uploadFile,
      success: (dispatch, response, data, prevData) => dispatch(CoursesActionCreators.setLessonFiles([data])),
   },
   putLesson: {
      ...defaultHandlers.putLesson,
      success: (dispatch, response, data, prevData) => {
         dispatch(CoursesActionCreators.setLesson(data?.lessons[0] || {}))
         dispatch(CoursesActionCreators.setLessonFiles(data?.lessons[0]?.files || []))
         dispatch(CoursesActionCreators.setLessonQuestions(data?.lessons[0]?.questions || []))
      },
   },
   // addUserToCourse
   fetchUserCourses: {
      ...defaultHandlers.fetchUserCourses,
      success: (dispatch, response, data, prevData) => {
         dispatch(CoursesActionCreators.setCoursesData(prevData || {}))
         dispatch(CoursesActionCreators.setCourses(data || []))
      },
   },
   fetchUserCourse: {
      ...defaultHandlers.fetchUserCourse,
      success: (dispatch, response, data, prevData) => {
         joinData(data?.course.moduls, data?.lessons, 'id', 'modul_id', 'lessons', 'module')
         dispatch(CoursesActionCreators.setCourse(data?.course || {}))
         dispatch(CoursesActionCreators.setModules(data?.course?.moduls || []))
         dispatch(CoursesActionCreators.setDescriptions(data?.descriptions || []))
         dispatch(CoursesActionCreators.setPrices(data?.prices || []))
         dispatch(CoursesActionCreators.setLessons(data?.lessons || []))
      },
   },
   fetchUserLesson: {
      ...defaultHandlers.fetchUserLesson,
      success: (dispatch, response, data, prevData) => {
         prevData.prev_lesson = prevData.prev_lesson ? prevData.prev_lesson : {}
         prevData.next_lesson = prevData.next_lesson ? prevData.next_lesson : {}
         dispatch(CoursesActionCreators.setCoursesData(prevData || {}))
         dispatch(CoursesActionCreators.setCourse(data?.course || {}))
         dispatch(CoursesActionCreators.setLessons(data?.course?.lessons || []))
         dispatch(CoursesActionCreators.setLesson(data?.lessons || {}))
         dispatch(CoursesActionCreators.setLessonFiles(data?.lessons?.files || []))
      },
   },
   fetchUserLessonTest: {
      ...defaultHandlers.fetchUserLessonTest,
      success: (dispatch, response, data, prevData) => {
         dispatch(CoursesActionCreators.setCourse(data?.course || {}))
         dispatch(CoursesActionCreators.setLesson(data?.lessons || {}))
         dispatch(CoursesActionCreators.setLessonFiles(data?.lessons?.files || []))
         dispatch(CoursesActionCreators.setLessonQuestions(data?.questions || []))
      },
   },
   fetchUserLessonComments: {
      ...defaultHandlers.fetchUserLessonComments,
      success: (dispatch, response, data, prevData) => {
         dispatch(CoursesActionCreators.setCommentsData(data?.comments || {}))
         dispatch(CoursesActionCreators.setComments(data?.comments?.data || []))
      },
   },
   // sendLessonTest
   addComment: {
      ...defaultHandlers.addComment,
      success: (dispatch, response, data, prevData) => {
         dispatch(CoursesActionCreators.setCommentAdded(data?.comments[0] || []))
      },
   },
   //  addLike
   // addFavorite

   fetchFrontCourses: {
      ...defaultHandlers.fetchFrontCourses,
      success: (dispatch, response, data, prevData) => {
         dispatch(CoursesActionCreators.setCoursesData(typeof prevData === 'object' ? prevData : {}))
         dispatch(CoursesActionCreators.setCourses(Array.isArray(data) ? data : []))
      },
   },
   fetchFrontCourse: {
      ...defaultHandlers.fetchFrontCourse,
      success: (dispatch, response, data, prevData) => {
         const { interestes = [] } = prevData || {}
         const { trainer = {}, modules = [], lessons = [], whoms = [], descriptions = [], prices = [] } = data || {}

         console.log({ trainer, modules, lessons, whoms, descriptions, prices })

         joinData(modules, lessons, 'id', 'moduleId', 'lessons', 'modules')
         dispatch(CoursesActionCreators.setCourse(typeof data === 'object' ? data : {}))
         dispatch(CoursesActionCreators.setInterestes(interestes))
         dispatch(CoursesActionCreators.setDescriptions(descriptions))
         dispatch(CoursesActionCreators.setPrices(prices))
         dispatch(CoursesActionCreators.setTrainer(trainer))
         dispatch(CoursesActionCreators.setModules(modules))
         dispatch(CoursesActionCreators.setLessons(lessons))
         dispatch(CoursesActionCreators.setWhoms(whoms))
      },
   },
   //  fetchFrontAuthCourses
   //  fetchFrontAuthCourse

   //  TODO USER STORE
   fetchUserNotifications: {
      ...defaultHandlers.fetchUserNotifications,
      success: (dispatch, response, data, prevData) => {
         dispatch(CoursesActionCreators.setNotificationsData(data || {}))
         dispatch(CoursesActionCreators.setNotifications(data?.all.data || []))
         dispatch(CoursesActionCreators.setNotificationsNew(data?.new.data || []))
      },
   },
   //  readUserNotifications
}
