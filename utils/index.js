import { SITE_URL } from 'api/URLS'
import { ROLES } from 'constants'
import { batch } from 'react-redux'
import { RouteNames } from 'routes'

export const getTotal = (total = 0, type) => {
   return `${total} ${declOfNum(total, getDeclOfArray[type])}`
}

export const declOfNum = (number, words = []) => {
   return words[number % 100 > 4 && number % 100 < 20 ? 2 : [2, 0, 1, 1, 1, 2][number % 10 < 5 ? Math.abs(number) % 10 : 5]]
}

export const getDeclOfArray = {
   courses: ['курс', 'курса', 'курсов'],
   events: ['мероприятие', 'мероприятия', 'мероприятий'],
   notifications: ['уведомление', 'уведомления', 'уведомлений'],
   questions: ['вопрос', 'вопроса', 'вопросов'],
   subscribes: ['подписка', 'подписки', 'подписки'],
   pages: ['страница', 'страницы', 'страниц'],
   posts: ['пост', 'поста', 'постов'],
   lessons: ['урок', 'урока', 'уроков'],
   users: ['ученик', 'ученика', 'учеников'],
   members: ['учасник', 'учасника', 'учасников'],
   files: ['файл', 'файла', 'файлов'],
   comments: ['комментарий', 'комментария', 'комментариев'],
   new: ['новый', 'новых', 'новых'],
   minutes: ['минута', 'минуты', 'минут'],
   hours: ['час', 'часа', 'часов'],
   days: ['день', 'дня', 'дней'],
   weeks: ['неделя', 'недели', 'недель'],
   months: ['месяц', 'месяца', 'месяцей'],
   years: ['год', 'года', 'лет'],
}

export const toFormData = (data) => {
   const body = new FormData()

   Object.entries(data)
      .filter(([k]) => !['imageView'].includes(k))
      .forEach(([key, value]) => {
         if (value instanceof FileList) {
            for (var x = 0; x < value.length; x++) body.append(key, value[x])
            return
         }
         body.append(key, value)
      })

   return body
}

// export const eventBus = {
//    on(event, callback) {
//       document.addEventListener(event, (e) => callback(e.detail))
//    },
//    dispatch(event, data) {
//       document.dispatchEvent(new CustomEvent(event, { detail: data }))
//    },
//    remove(event, callback) {
//       document.removeEventListener(event, callback)
//    },
// }

export const timeout = (func, time = 0) => new Promise((res) => setTimeout(() => res(func()), time))

export const getData = (response, prev = false) => {
   let data = response.data
   while (data.data !== undefined) {
      if (prev && !data.data?.data) return data
      data = data.data
   }
   return data
}

export const namesMonth = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря']

export const addZerro = (number) => (number <= 9 ? '0' : '') + number

export const uid = () => Date.now().toString(36) + Math.random().toString(36).substr(2)

export const isActiveClass = (condition, className) => (condition ? ` ${className}` : '')

export const toBoolean = (value) => (value === '0' ? false : !!value)

export const isCheckbox = (input) => input.type === 'radio' || input.type === 'checkbox'

export const validatePassword = (value) => value && value.length > 7

export const validateName = (value) => /^[a-zа-яёїієґ ,.'-]+$/i.test(value)

export const validatePhone = (value) => !value.includes('_')

export const validateEmail = (value) => /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(value)

export const patternNumbers = (val) => val.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1')
// TODO
//  const patternTime = (val) => val.replace(/^([01]?[0-9]|2[0-3]):[0-5][0-9]/g, '')

export const formatBytes = (bytes, decimals = 2) => {
   if (bytes === 0) return '0 Bytes'

   const k = 1024
   const dm = decimals < 0 ? 0 : decimals
   const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

   const i = Math.floor(Math.log(bytes) / Math.log(k))

   return (parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) || 'Нет данных') + ' ' + (sizes[i] || '')
}

export const hasAccess = (role = 0, availables = []) => !![...availables, ROLES.ADMIN].find((i) => role === i)

export const getRequest = (requests, role) => {
   if (requests.length < role.sort((a, b) => a - b)[role.length - 1]) return requests[requests.length - 1]
   const avaibleRequests = requests.filter((_, inx) => role.find((id) => id === inx + 1))
   return avaibleRequests[avaibleRequests.length - 1] || requests[0]
}

const parseURL = (url = '', params) => {
   params = params ? params : {}
   return Object.entries(params).reduce((prev, [key, value]) => prev.replace(`:${key}`, value), url)
}

export const getURL = {
   getURLRoles: (routeNames = [], role = [], params) => parseURL(routeNames[role[role.length - 1] - 1 || 0], params) || '/',
   img: (src, isDefault = false) => (src ? `${SITE_URL}/${src}` : isDefault ? getURL.defaultImg() : ''),
   defaultImg: () => '/assets/img/course2.jpg',
   avatar: (src, role) => (src ? `${SITE_URL}/${src}` : getURL.defaultAvatar(role)),
   defaultAvatar: (role = []) => '/assets/img/' + ['avatar-user.png', 'avatar-trainer.png', 'avatar-employee.webp', 'avatar-admin.png'][role[role.length - 1] - 1 || 0],
   courses: () => RouteNames.COURSES,
   events: () => RouteNames.EVENTS,
   coursesItem: (params) => parseURL(RouteNames.COURSES_ITEM, params),
   eventsItem: (params) => parseURL(RouteNames.EVENTS_ITEM, params),
   usersItem: (params) => parseURL(RouteNames.USERS_ITEM, params),
   trainersItem: (params) => parseURL(RouteNames.TRAINERS_ITEM, params),
   pagesItem: (params) => parseURL(RouteNames.PAGES_ITEM, params),
   posts: (params) => parseURL(RouteNames.POSTS, params),
   postItem: (params) => parseURL(RouteNames.POST_ITEM, params),

   // Cabinet
   cabinet: (params) => parseURL(RouteNames.CABINET, params),
   cabinetStatistics: (params) => parseURL(RouteNames.CABINET_STATISTICS, params),
   cabinetSupport: (params) => parseURL(RouteNames.CABINET_SUPPORT, params),
   cabinetSettings: (params) => parseURL(RouteNames.CABINET_SETTINGS, params),
   // Courses
   cabinetCourses: (params) => parseURL(RouteNames.CABINET_COURSES, params),
   cabinetCoursesItem: (params) => parseURL(RouteNames.CABINET_COURSES_ITEM, params),
   cabinetCoursesAdd: (params) => parseURL(RouteNames.CABINET_COURSES_ADD, params),
   cabinetCoursesEdit: (params) => parseURL(RouteNames.CABINET_COURSES_EDIT, params),
   cabinetCoursesLessons: (params) => parseURL(RouteNames.CABINET_COURSES_LESSONS, params),
   cabinetCoursesLesson: (params) => parseURL(RouteNames.CABINET_COURSES_LESSON, params),
   cabinetCoursesLessonTest: (params) => parseURL(RouteNames.CABINET_COURSES_LESSON_TEST, params),
   cabinetCoursesLessonEdit: (params) => parseURL(RouteNames.CABINET_COURSES_LESSON_EDIT, params),
   // Events
   cabinetEvents: (params) => parseURL(RouteNames.CABINET_EVENTS, params),
   cabinetEventsItem: (params) => parseURL(RouteNames.CABINET_EVENTS_ITEM, params),
   cabinetEventsAdd: (params) => parseURL(RouteNames.CABINET_EVENTS_ADD, params),
   cabinetEventsEdit: (params) => parseURL(RouteNames.CABINET_EVENTS_EDIT, params),
   // Notifications
   cabinetNotifications: (params) => parseURL(RouteNames.CABINET_NOTIFICATIONS, params),
   cabinetNotificationsAdd: (params) => parseURL(RouteNames.CABINET_NOTIFICATIONS_ADD, params),
   cabinetNotificationsEdit: (params) => parseURL(RouteNames.CABINET_NOTIFICATIONS_EDIT, params),
   // Pages
   cabinetPages: (params) => parseURL(RouteNames.CABINET_PAGES, params),
   cabinetPagesAdd: (params) => parseURL(RouteNames.CABINET_PAGES_ADD, params),
   cabinetPagesEdit: (params) => parseURL(RouteNames.CABINET_PAGES_EDIT, params),
   // Posts
   cabinetPosts: (params) => parseURL(RouteNames.CABINET_POSTS, params),
   cabinetPostsAdd: (params) => parseURL(RouteNames.CABINET_POSTS_ADD, params),
   cabinetPostsEdit: (params) => parseURL(RouteNames.CABINET_POSTS_EDIT, params),
}

export const joinData = (arr1, arr2, id1, id2, prop1, prop2) => {
   arr1.forEach(
      (m) =>
         (m[prop1] = arr2.filter((l) => {
            if (l[id2] === m[id1]) l[prop2] = m
            return l[id2] === m[id1]
         })),
   )
}

export const getFullName = (names) => {
   const { firstName = '', lastName = '', name = '' } = names ?? {}
   return `${firstName || name || 'No name'} ${lastName || ''}`
}

export const timer = (days = {}, hours = {}, minutes = {}, seconds = {}) => {
   const end = new Date('08/19/2022 10:1 AM')

   const _second = 1000
   const _minute = _second * 60
   const _hour = _minute * 60
   const _day = _hour * 24

   const timerId = setInterval(() => {
      const now = new Date()
      const distance = end - now
      if (distance < 0) {
         clearInterval(timerId)
         //  countdown.current.innerHTML = 'EXPIRED!'
         return
      }

      if (days.current) days.current.innerHTML = addZerro(Math.floor(distance / _day))
      if (hours.current) hours.current.innerHTML = addZerro(Math.floor((distance % _day) / _hour))
      if (minutes.current) minutes.current.innerHTML = addZerro(Math.floor((distance % _hour) / _minute))
      if (seconds.current) seconds.current.innerHTML = addZerro(Math.floor((distance % _minute) / _second))
   }, 1000)
}

export const isFunction = (func) => typeof func === 'function'

export const asyncFilter = async (arr, predicate) => Promise.all(arr.map(predicate)).then((results) => arr.filter((_v, index) => results[index]))
export const asyncFind = async (arr, predicate) => Promise.all(arr.map(predicate)).then((results) => arr.find((_v, index) => results[index]))

export function loadImg(value) {
   return new Promise((resolve) => {
      const reader = new FileReader()
      if (!['image/jpg', 'image/jpeg', 'image/png'].includes(value?.type)) {
         resolve('')
      }

      reader.readAsDataURL(value)
      reader.onload = function (value) {
         const img = new Image()
         img.src = value.target.result
         img.onload = function () {
            resolve(img)
         }
      }
   })
}

export const getError = (errors, name) => {
   const spl = name.split('.')
   return errors[name] || (spl.length > 1 && errors && spl.reduce((prev, value) => (Array.isArray(prev) || typeof prev === 'object') && prev[value], errors))
}

export const getDate = (date, { monthNames = false, isYear = true, isDayFirst = false } = {}) => {
   date = new Date(date)
   const year = isYear ? date.getFullYear() : ''
   const month = monthNames ? namesMonth[date.getMonth()] : addZerro(date.getMonth() + 1)
   const day = addZerro(date.getDate())
   return isDayFirst ? `${day}-${month}-${year}` : `${year}-${month}-${day}`
}

export const getTime = (time) => {
   const _time = new Date(time)
   if (isNaN(_time)) return time
   return `${addZerro(_time.getUTCHours())}:${addZerro(_time.getUTCMinutes())}:${addZerro(_time.getUTCSeconds())}`
}

export const getCookie = (name) => {
   if (!name) return ''
   const escape = (s) => s.replace(/([.*+?\^$(){}|\[\]\/\\])/g, '\\$1')
   var match = document.cookie.match(RegExp('(?:^|;\\s*)' + escape(name) + '=([^;]*)'))
   return match ? match[1] : null
}

const removeEmpty = (obj) => {
   return Array.isArray(obj)
      ? obj
      : typeof obj === 'object'
      ? Object.fromEntries(
           Object.entries(obj)
              .filter(([_, v]) => v != null)
              .map(([k, v]) => [k, v === Object(v) ? removeEmpty(v) : v]),
        )
      : obj
}

//useDispatch created function (payload) => dispatch(asyncActionCreator(defaultHandlers + customActionHandlers + payload)) /  async handler for redux-thunk
//data, callbackHandle === payload - from component / created useRequest
//request, success, error = defaultHandlers + customActionHandlers
export const asyncAction =
   ({ data, callbackHandler, request, success, error } = {}) =>
   async (dispatch) => {
      try {
         if (!isFunction(request)) return
         callbackHandler('before')
         const response = await request(data)

         const successArgs = [response, removeEmpty(getData(response)), removeEmpty(getData(response, true))]
         if (response.status >= 200 && response.status < 300) {
            // callbackHandler return false if is unmounted component
            // batch for optimization
            batch(() => callbackHandler('success', ...successArgs) && isFunction(success) && success(dispatch, ...successArgs))
         }
      } catch (e) {
         const errorObj = JSON.stringify(e.response?.data || {})
         console.error(e)
         batch(() => callbackHandler('error', errorObj) && isFunction(error) && error(dispatch, errorObj))
      } finally {
         callbackHandler('finnally')
      }
   }

//asyncActionCreator === asyncAction / created for each request
//useDispatch -> (payload) => dispatch(asyncActionCreator(defaultHandlers + customActionHandlers + payload))

//example
// const { fetchFrontCourses } = useDispatch() - return object actions creators === asyncAction
// (payload) => dispatch(asyncActionCreator(defaultHandlers + customActionHandlers + payload))
// const fetchFrontCoursesRequest = useRequest(fetchFrontCourses) // created payload for useDispatch function
// fetchFrontCoursesRequest.call('payload from app')//call function fetchFrontCourses(data)

export const createAsyncActionCreator = (Service) => {
   return Object.getOwnPropertyNames(Service).reduce((prev, val) => ((prev[val] = asyncAction), prev), {})
}

//defaultHandlers
export const createHandles = (Service) => {
   return Object.getOwnPropertyNames(Service).reduce((prev, val) => ((prev[val] = { ...createHandle(Service, val) }), prev), {})
}

export const createHandle = (Service, method) => ({
   request: async (data) => await Service[method](data),
   success: (response) => response,
   error: (error) => error,
})
