import { ROLES } from 'constants'
import {
   Home,
   Contacts,
   Courses,
   CoursesItem,
   Events,
   EventsItem,
   //  News,
   //  NewsItem,
   Subscribes,
   Cabinet,
   CabinetCoursesAdd,
   Partners,
   Reviews,
   Faq,
   CabinetCoursesItem,
   Error,
   CabinetEventsAdd,
   CabinetEventsItem,
   CabinetCoursesLesson,
   CabinetCoursesLessonTest,
   CabinetCoursesLessons,
   Login,
   PagesItem,
   Post,
   PostItem,
   UsersItem,
   CabinetCoursesLessonEdit,
   CabinetNotificationsAdd,
} from 'pages/'

export const RouteNames = {
   POSTS: '/posts',
   POSTS_POPULAR: '/posts/popular',
   POSTS_NEW: '/posts/new',
   POST_ITEM: '/posts/:postId',
   CONTACTS: '/contacts',
   COURSES: '/courses',
   COURSES_ITEM: '/courses/:courseId',
   COURSES_LESSON: '/courses/:courseId/lessons/:lessonId',
   ERROR: '/error',
   FAQ: '/faq',
   EVENTS: '/events',
   EVENTS_ITEM: '/events/:eventId',
   HOME: '/',
   PARTNERS: '/partners',
   REVIEWS: '/reviews',
   SUBSCRIBES: '/subscribes',
   LOGIN: '/login',
   PAGES_ITEM: '/pages/:pageId',
   TRAINERS_ITEM: '/trainers/:trainerId',
   USERS_ITEM: '/users/:userId',

   CABINET: '/cabinet',
   CABINET_ITEM: '/cabinet/:cabinetItem',
   //  CABINET_ITEM_SUB: '/cabinet/:cabinetItem/:cabinetId',
   // COURSES
   CABINET_COURSES: '/cabinet/courses',
   CABINET_COURSES_PLANNED: '/cabinet/courses/planned',
   CABINET_COURSES_MODERATION: '/cabinet/courses/moderation',
   CABINET_COURSES_COMPLETED: '/cabinet/courses/completed',
   CABINET_COURSES_ADD: '/cabinet/courses/add',
   CABINET_COURSES_ITEM: '/cabinet/courses/:courseId',
   CABINET_COURSES_LESSONS: '/cabinet/courses/:courseId/lessons',
   CABINET_COURSES_LESSON: '/cabinet/courses/:courseId/lessons/:lessonId',
   CABINET_COURSES_LESSON_TEST: '/cabinet/courses/:courseId/lessons/:lessonId/test',
   CABINET_COURSES_EDIT: '/cabinet/courses/:courseId/edit',
   CABINET_COURSES_LESSON_EDIT: '/cabinet/courses/:courseId/lessons/:lessonId/edit',
   // EVENTS
   CABINET_EVENTS: '/cabinet/events',
   CABINET_EVENTS_ADD: '/cabinet/events/add',
   CABINET_EVENTS_ITEM: '/cabinet/events/:eventId',
   CABINET_EVENTS_EDIT: '/cabinet/events/:eventId/edit',
   // NOTIFICATIONS
   CABINET_NOTIFICATIONS: '/cabinet/notifications',
   CABINET_NOTIFICATIONS_ADD: '/cabinet/notifications/add',
   CABINET_NOTIFICATIONS_ITEM: '/cabinet/notifications/:notificationId',
   CABINET_NOTIFICATIONS_EDIT: '/cabinet/notifications/:notificationId/edit',
   // PAGES
   CABINET_PAGES: '/cabinet/pages',
   CABINET_PAGES_ADD: '/cabinet/pages/add',
   CABINET_PAGES_ITEM: '/cabinet/pages/:pageId',
   CABINET_PAGES_EDIT: '/cabinet/pages/:pageId/edit',
   // POSTS
   CABINET_POSTS: '/cabinet/posts',
   CABINET_POSTS_ADD: '/cabinet/posts/add',
   CABINET_POSTS_ITEM: '/cabinet/posts/:postId',
   CABINET_POSTS_EDIT: '/cabinet/posts/:postId/edit',
   // FRONT
   CABINET_CONTACTS: '/cabinet/contacts',
   CABINET_SUBSCRIBES: '/cabinet/subscribes',
   CABINET_FAQ: '/cabinet/faq',

   //TODO
   CABINET_STATISTICS: '/cabinet/statistics',
   CABINET_SUPPORT: '/cabinet/support',
   CABINET_COMMENTS: '/cabinet/comments',
   CABINET_SETTINGS: '/cabinet/settings',
}
export const publicRoutes = [
   { path: RouteNames.PAGES_ITEM, element: <PagesItem /> },
   { path: RouteNames.POSTS, element: <Post /> },
   { path: RouteNames.POST_ITEM, element: <PostItem /> },
   { path: RouteNames.CONTACTS, element: <Contacts /> },
   { path: RouteNames.COURSES, element: <Courses /> },
   { path: RouteNames.COURSES_ITEM, element: <CoursesItem /> },
   { path: RouteNames.COURSES_LESSON, element: <CabinetCoursesLesson /> },
   { path: RouteNames.EVENTS, element: <Events /> },
   { path: RouteNames.EVENTS_ITEM, element: <EventsItem /> },
   { path: RouteNames.FAQ, element: <Faq /> },
   { path: RouteNames.HOME, element: <Home /> },
   { path: RouteNames.PARTNERS, element: <Partners /> },
   { path: RouteNames.REVIEWS, element: <Reviews /> },
   { path: RouteNames.SUBSCRIBES, element: <Subscribes /> },
   { path: RouteNames.ERROR, element: <Error /> },
   { path: RouteNames.LOGIN, element: <Login /> },
   { path: RouteNames.TRAINERS_ITEM, element: <UsersItem /> },
   { path: RouteNames.USERS_ITEM, element: <UsersItem /> },
]
export const privateRoutes = [
   ...publicRoutes,
   { path: RouteNames.CABINET, element: <Cabinet /> },
   // ADMIN
   // USER/TRAINER
   { path: RouteNames.CABINET_ITEM, element: <Cabinet /> },
   //  { path: RouteNames.CABINET_ITEM_SUB, element: <Cabinet /> },
   // TRAINER
   // EVENTS
   { path: RouteNames.CABINET_EVENTS_ITEM, element: <CabinetEventsItem /> },
   { path: RouteNames.CABINET_EVENTS_ADD, element: <CabinetEventsAdd /> },
   { path: RouteNames.CABINET_EVENTS_EDIT, element: <CabinetEventsAdd /> },
   // NOTIFICATIONS
   //  { path: RouteNames.CABINET_NOTIFICATIONS_ITEM, element: <CabinetNotificationsItem /> },
   { path: RouteNames.CABINET_NOTIFICATIONS_ADD, element: <CabinetNotificationsAdd /> },
   { path: RouteNames.CABINET_NOTIFICATIONS_EDIT, element: <CabinetNotificationsAdd /> },
   // PAGES
   //  { path: RouteNames.CABINET_PAGES_ITEM, element: <CabinetPAGESItem /> },
   { path: RouteNames.CABINET_PAGES_ADD, element: <CabinetNotificationsAdd /> },
   { path: RouteNames.CABINET_PAGES_EDIT, element: <CabinetNotificationsAdd /> },
   // POSTS
   //  { path: RouteNames.CABINET_POSTS_ITEM, element: <CabinetPOSTSItem /> },
   { path: RouteNames.CABINET_POSTS_ADD, element: <CabinetNotificationsAdd /> },
   { path: RouteNames.CABINET_POSTS_EDIT, element: <CabinetNotificationsAdd /> },

   // COURSES
   { path: RouteNames.CABINET_COURSES_ADD, element: <CabinetCoursesAdd /> },
   { path: RouteNames.CABINET_COURSES_ITEM, element: <CabinetCoursesItem /> },
   { path: RouteNames.CABINET_COURSES_LESSONS, element: <CabinetCoursesLessons /> },
   { path: RouteNames.CABINET_COURSES_LESSON, element: <CabinetCoursesLesson /> },
   { path: RouteNames.CABINET_COURSES_LESSON_TEST, element: <CabinetCoursesLessonTest /> },
   { path: RouteNames.CABINET_COURSES_EDIT, element: <CabinetCoursesAdd /> },
   { path: RouteNames.CABINET_COURSES_LESSON_EDIT, element: <CabinetCoursesLessonEdit /> },
]

export const navLinks = [
   { title: 'Мероприятия', href: RouteNames.EVENTS },
   { title: 'Подписка', href: RouteNames.SUBSCRIBES },
   { title: 'Блог', href: RouteNames.POSTS },
   { title: 'Контакты', href: RouteNames.CONTACTS },
]

export const footerLinks = [
   [
      {
         name: 'О портале',
         items: [
            { href: RouteNames.POSTS, name: 'Блог' },
            { href: RouteNames.REVIEWS, name: 'Отзывы' },
            { href: RouteNames.FAQ, name: 'Часто задаваемые вопросы' },
            { href: RouteNames.CONTACTS, name: 'Контакты' },
         ],
      },
   ],
   [
      {
         name: 'Направления обучения',
         items: [],
      },
   ],
   [
      {
         name: 'Аккаунт',
         items: [
            { href: '/', name: 'Личный кабинет' },
            { href: '/', name: 'Рабочий кабинет' },
            { href: '/', name: 'Выйти' },
         ],
      },
      {
         name: 'Информация',
         items: [
            { href: '/', name: 'Условия пользования' },
            { href: '/', name: 'Правила конфиденциальности' },
         ],
      },
   ],
]

export const cabinetLinks = [
   //  {
   //     title: 'Мои курсы',
   //     href: RouteNames.CABINET_COURSES,
   //     number: 0,
   //     list: [
   //        { title: 'На модерации', search: 'nomoderated', hasAccess: [ROLES.USER, ROLES.TRAINER, ROLES.EMPLOYEE] },
   //        { title: 'Модерирование', search: 'moderated', hasAccess: [ROLES.USER, ROLES.TRAINER, ROLES.EMPLOYEE] },
   //        { title: 'Избранное', search: 'favorite', hasAccess: [ROLES.USER, ROLES.TRAINER] },
   //     ],
   //  },
   //  { title: 'Contacts', href: RouteNames.CABINET_CONTACTS, hasAccess: [ROLES.ADMIN] },
   //  {
   //     title: 'Мои мероприятия',
   //     href: RouteNames.CABINET_EVENTS,
   //     number: 1,
   //     list: [
   //        { title: 'Запланированные', search: 'ended=0', hasAccess: [ROLES.TRAINER] },
   //        { title: 'Закончившиеся', search: 'ended=1', hasAccess: [ROLES.TRAINER] },
   //        { title: 'На модерации', search: 'moderated=0', hasAccess: [ROLES.TRAINER, ROLES.EMPLOYEE] },
   //        { title: 'Модерирование', search: 'moderated=1', hasAccess: [ROLES.TRAINER, ROLES.EMPLOYEE] },
   //     ],
   //  },
   { title: 'Notifications', href: RouteNames.CABINET_NOTIFICATIONS, hasAccess: [ROLES.ADMIN] },
   { title: 'Faq', href: RouteNames.CABINET_FAQ, hasAccess: [ROLES.ADMIN] },
   { title: 'Subscribes', href: RouteNames.CABINET_SUBSCRIBES, hasAccess: [ROLES.ADMIN] },
   { title: 'Pages', href: RouteNames.CABINET_PAGES, hasAccess: [ROLES.ADMIN] },
   { title: 'Posts', href: RouteNames.CABINET_POSTS, hasAccess: [ROLES.ADMIN] },

   { title: 'Служба поддержки', href: RouteNames.CABINET_SUPPORT, number: 0 },
   { title: 'Комментарии', href: RouteNames.CABINET_COMMENTS, number: 0 },
   { title: 'Настройки аккаунта', href: RouteNames.CABINET_SETTINGS, number: 0 },
   //  { title: 'Статистика', href: RouteNames.CABINET_STATISTICS, number: 0 },
]

//  { path: RouteNames.CABINET_COURSES, element: <CabinetCourses /> },
//  { path: RouteNames.CABINET_COURSES_PLANNED, element: <Cabinet /> },
//  { path: RouteNames.CABINET_COURSES_MODERATION, element: <Cabinet /> },
//  { path: RouteNames.CABINET_COURSES_COMPLETED, element: <Cabinet /> },
//  { path: RouteNames.CABINET_EVENTS_PLANNED, element: <Cabinet /> },
//  { path: RouteNames.CABINET_EVENTS_MODERATION, element: <Cabinet /> },
//  { path: RouteNames.CABINET_EVENTS_COMPLETED, element: <Cabinet /> },
