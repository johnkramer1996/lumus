import axios from './axios'
import { cabinetCoursesLessonsURL, cabinetCoursesModulesURL, cabinetCoursesURL, frontCoursesURL, userCoursesURL, userURL } from './URLS'

export default class CoursesService {
   static async addCourse({ body = {} } = {}) {
      return await axios.post(cabinetCoursesURL.ADD_COURSE, body, {
         headers: {
            'Content-Type': 'multipart/form-data',
         },
      })
   }
   static async fetchCourses(params = {}) {
      return await axios.get(cabinetCoursesURL.FETCH_COURSES, {
         params,
      })
   }
   static async fetchCourse({ courseId = 0 } = {}) {
      return await axios.get(cabinetCoursesURL.FETCH_COURSE({ courseId }))
   }
   static async putCourse({ courseId = 0, body = {} } = {}) {
      body.append('_method', 'PUT')
      return await axios.post(cabinetCoursesURL.PUT_COURSE({ courseId }), body, {
         headers: {
            'Content-Type': 'multipart/form-data',
         },
      })
   }
   static async deleteCourse({ courseId = 0 } = {}) {
      return await axios.delete(cabinetCoursesURL.DELETE_COURSE({ courseId }))
   }
   static async fetchInfo({ courseId = 0 } = {}) {
      return await axios.get(cabinetCoursesURL.FETCH_INFO({ courseId }))
   }
   static async editInfo({ courseId = 0, body = {} } = {}) {
      return await axios.post(cabinetCoursesURL.EDIT_INFO({ courseId }), body, {
         headers: {
            'Content-Type': 'multipart/form-data',
         },
      })
   }
   static async deleteInfo({ courseId = 0, ...body } = {}) {
      return await axios.post(cabinetCoursesURL.DELETE_INFO({ courseId }), body)
   }
   static async fetchUsers({ courseId = 0 } = {}) {
      return await axios.get(cabinetCoursesURL.FETCH_USERS({ courseId }))
   }
   static async fetchComments({ courseId = 0, ...params } = {}) {
      return await axios.get(cabinetCoursesURL.FETCH_COMMENTS({ courseId }), {
         params,
      })
   }
   static async readComments({ courseId = 0, ...body } = {}) {
      return await axios.post(cabinetCoursesURL.READ_COMMENTS({ courseId }), body)
   }
   static async addModule({ courseId = 0, body = {} } = {}) {
      return await axios.post(cabinetCoursesModulesURL.ADD_MODULE({ courseId }), body)
   }
   static async addModulesMass({ courseId = 0, body = {} } = {}) {
      return await axios.post(cabinetCoursesModulesURL.ADD_MODULES_MASS({ courseId }), body)
   }
   static async fetchModules({ courseId = 0 } = {}) {
      return await axios.get(cabinetCoursesModulesURL.FETCH_MODULES({ courseId }))
   }
   static async fetchModule({ courseId = 0, body = {} } = {}) {
      return await axios.post(cabinetCoursesModulesURL.FETCH_MODULE({ courseId }), body)
   }
   static async putModule({ courseId = 0, body = {} } = {}) {
      return await axios.put(cabinetCoursesModulesURL.PUT_MODULE({ courseId }), body)
   }
   static async deleteModule({ courseId = 0, id = 1 } = {}) {
      return await axios.delete(cabinetCoursesModulesURL.DELETE_MODULE({ courseId, id }))
   }
   static async fetchLessons({ courseId = 0 } = {}) {
      return await axios.get(cabinetCoursesLessonsURL.FETCH_LESSONS({ courseId }))
   }
   static async fetchLesson({ courseId = 0, lessonId = 0 } = {}) {
      return await axios.get(cabinetCoursesLessonsURL.FETCH_LESSON({ courseId, lessonId }))
   }
   static async deleteLesson({ courseId = 0, lessonId = 0 } = {}) {
      return await axios.delete(cabinetCoursesLessonsURL.DELETE_LESSON({ courseId, lessonId }))
   }
   static async uploadFile({ courseId = 0, lessonId = 0, body = {} } = {}) {
      return await axios.post(cabinetCoursesLessonsURL.UPLOAD_FILE({ courseId, lessonId }), body, {
         headers: {
            'Content-Type': 'multipart/form-data',
         },
      })
   }
   static async deleteFile({ courseId = 0, lessonId = 0, body = {} } = {}) {
      return await axios.post(cabinetCoursesLessonsURL.DELETE_FILE({ courseId, lessonId }), body)
   }
   static async putLesson({ courseId = 0, lessonId = 0, body = {} } = {}) {
      return await axios.put(cabinetCoursesLessonsURL.PUT_LESSON({ courseId, lessonId }), body)
   }

   // USER
   static async addUserToCourse({ body = {} } = {}) {
      return await axios.post(userCoursesURL.ADD_USER, body)
   }
   static async fetchUserCourses(params = {}) {
      return await axios.get(userCoursesURL.FETCH_COURSES, {
         params,
      })
   }
   static async fetchUserCourse({ courseId = 0 } = {}) {
      return await axios.get(userCoursesURL.FETCH_COURSE({ courseId }))
   }
   static async fetchUserLesson({ courseId = 0, lessonId = 0 } = {}) {
      return await axios.get(userCoursesURL.FETCH_LESSON({ courseId, lessonId }))
   }
   static async fetchUserLessonTest({ courseId = 0, lessonId = 0 } = {}) {
      return await axios.get(userCoursesURL.FETCH_LESSON_TEST({ courseId, lessonId }))
   }
   static async fetchUserLessonComments({ courseId = 0, lessonId = 0, ...params } = {}) {
      return await axios.get(userCoursesURL.FETCH_LESSON_COMMENTS({ courseId, lessonId }), {
         params,
      })
   }
   static async sendLessonTest({ courseId, lessonId, body = {} } = {}) {
      return await axios.post(userCoursesURL.SEND_LESSON_TEST({ courseId, lessonId }), body)
   }
   static async addComment({ courseId = 0, lessonId = 0, ...body } = {}) {
      return await axios.post(userCoursesURL.ADD_COMMENT({ courseId, lessonId }), body)
   }
   static async addLike({ courseId = 0 }) {
      return await axios.post(userCoursesURL.ADD_LIKE({ courseId }))
   }
   static async addFavorite({ courseId = 0 }) {
      return await axios.post(userCoursesURL.ADD_FAVORITE({ courseId }))
   }

   // FRONT
   static async fetchFrontCourses(params = {}) {
      return await axios.get(frontCoursesURL.FETCH_COURSES, { params })
   }
   static async fetchFrontCourse({ courseId = 1 } = {}) {
      return await axios.get(frontCoursesURL.FETCH_COURSE({ courseId }))
   }
   static async fetchFrontAuthCourses(params = {}) {
      return await axios.get(frontCoursesURL.FETCH_AUTH_COURSES, { params })
   }
   static async fetchFrontAuthCourse({ courseId = 1 } = {}) {
      return await axios.get(frontCoursesURL.FETCH_AUTH_COURSE({ courseId }))
   }
}
