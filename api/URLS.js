export const SITE_URL = 'http://localhost:8080'
export const API_URL = `${SITE_URL}/api`
export const IMG_URL = `http://localhost:3000/`
export const systemURL = {
   FETCH_CATEGORIES: '/system/categories',
   FETCH_SOC_URLS: '/system/soc-urls',
   FETCH_USER_SETTINGS: '/system/user-settings',
   FETCH_CONTACTS: '/system/contacts',
   //TODO ADD  FETCH_POST_CATEGORIES
}
export const frontStaticURL = {
   //CONTACTS
   SEND_CONTACTS: '/front/contacts',
   FETCH_CONTACTS: '/front/contacts',
}
// FAQ
export const frontFaqURL = {
   FETCH_FAQ: '/front/faq',
   FETCH_FAQ_ITEM: ({ faqId }) => `/front/faq/${faqId}`,
}
export const cabinetFaqURL = {
   ADD_FAQ: '/cabinet/faq',
   FETCH_FAQ: '/cabinet/faq',
   FETCH_FAQ_ITEM: ({ faqId }) => `/cabinet/faq/${faqId}`,
   PUT_FAQ: ({ faqId }) => `/cabinet/faq/${faqId}`,
   DELETE_FAQ: ({ faqId }) => `/cabinet/faq/${faqId}`,
}
// PAGES
export const frontPagesURL = {
   FETCH_PAGES: '/front/pages',
   FETCH_PAGE: ({ pageId }) => `/front/pages/${pageId}`,
}
export const cabinetPagesURL = {
   ADD_PAGE: '/cabinet/pages',
   FETCH_PAGES: '/cabinet/pages',
   FETCH_PAGE: ({ pageId }) => `/cabinet/pages/${pageId}`,
   PUT_PAGE: ({ pageId }) => `/cabinet/pages/${pageId}`,
   DELETE_PAGE: ({ pageId }) => `/cabinet/pages/${pageId}`,
}
// USERS
export const frontUsersURL = {
   //USER
   FETCH_USERS: '/front/users',
   FETCH_USER: ({ userId }) => `/front/users/${userId}`,
   FETCH_USER_EVENTS: ({ userId }) => `/front/users/${userId}`,
   //TRAINER
   FETCH_TRAINERS: '/front/trainers',
   FETCH_TRAINER: ({ trainerId }) => `/front/trainers/${trainerId}`,
   FETCH_TRAINER_EVENTS: ({ trainerId }) => `/front/trainers/${trainerId}`,
}
export const cabinetUsersURL = {
   ADD_USER: '/cabinet/users',
   FETCH_USERS: '/cabinet/users',
   FETCH_USER: ({ userId }) => `/cabinet/users/${userId}`,
   PUT_USER: ({ userId }) => `/cabinet/users/${userId}`,
   DELETE_USER: ({ userId }) => `/cabinet/users/${userId}`,
}
//POSTS
export const frontPostsURL = {
   FETCH_POST_CATEGORIES: '/front/posts/categories',
   FETCH_POSTS: '/front/posts',
   FETCH_POST: ({ postId }) => `/front/posts/${postId}`,
   FETCH_POST_COMMENTS: ({ postId }) => `/front/posts/${postId}/comments`,
}
export const userPostsURL = {
   FETCH_POST_COMMENTS: ({ postId }) => `/users/posts/${postId}/comments`,
   ADD_POST_COMMENT: ({ postId }) => `/users/posts/${postId}/comments`,
}
export const cabinetPostsURL = {
   FETCH_POST_CATEGORIES: '/cabinet/posts/categories',
   ADD_POST: '/cabinet/posts',
   FETCH_POSTS: '/cabinet/posts',
   FETCH_POST: ({ postId }) => `/cabinet/posts/${postId}`,
   PUT_POST: ({ postId }) => `/cabinet/posts/${postId}`,
   DELETE_POST: ({ postId }) => `/cabinet/posts/${postId}`,

   ADD_POST_COMMENT: ({ postId }) => `/cabinet/posts/${postId}/comments`,
   FETCH_POST_COMMENTS: ({ postId, commentId }) => `/cabinet/posts/${postId}/comments/${commentId}`,
   DELETE_POST_COMMENT: ({ postId, commentId }) => `/cabinet/posts/${postId}/comments/${commentId}`,
}
// SUBSCRIBES
export const frontSubscribesURL = {
   FETCH_SUBSCRIBES: '/front/subscribes',
   FETCH_SUBSCRIBE: ({ faqId }) => `/front/subscribes/${faqId}`,
}
export const cabinetSubscribesURL = {
   ADD_SUBSCRIBE: '/cabinet/subscribes',
   FETCH_SUBSCRIBES: '/cabinet/subscribes',
   FETCH_SUBSCRIBE: ({ subscribeId }) => `/cabinet/subscribes/${subscribeId}`,
   PUT_SUBSCRIBE: ({ subscribeId }) => `/cabinet/subscribes/${subscribeId}`,
   DELETE_SUBSCRIBE: ({ subscribeId }) => `/cabinet/subscribes/${subscribeId}`,
}
// NOTIFICATONS
export const frontNotificationsURL = {
   FETCH_SUBSCRIBES: '/front/notifications',
}
export const userNotificationsURL = {
   FETCH_NOTIFICATIONS: '/users/notifications',
   FETCH_NOTIFICATIONS_READ: '/users/notifications/read',
}
export const cabinetNotificationsURL = {
   ADD_NOTIFICATION: '/cabinet/notifications',
   FETCH_NOTIFICATIONS: '/cabinet/notifications',
   FETCH_NOTIFICATION: ({ notificationId }) => `/cabinet/notifications/${notificationId}`,
   PUT_NOTIFICATION: ({ notificationId }) => `/cabinet/notifications/${notificationId}`,
   DELETE_NOTIFICATION: ({ notificationId }) => `/cabinet/notifications/${notificationId}`,
}
// APPLICATIONS
export const frontApplicationsURL = {
   FETCH_APPLICATIONS: '/front/applications',
   FETCH_APPLICATION: ({ applicationId }) => `/front/applications/${applicationId}`,
}
export const cabinetApplicationsURL = {
   ADD_APPLICATION: '/cabinet/applications',
   FETCH_APPLICATIONS: '/cabinet/applications',
   FETCH_APPLICATION: ({ applicationId }) => `/cabinet/applications/${applicationId}`,
   PUT_APPLICATION: ({ applicationId }) => `/cabinet/applications/${applicationId}`,
   DELETE_APPLICATION: ({ applicationId }) => `/cabinet/applications/${applicationId}`,
}

//EVENTS
export const frontEventsURL = {
   FETCH_EVENTS: '/front/events',
   FETCH_EVENT: ({ eventId }) => `/front/events/${eventId}`,
   FETCH_AUTH_EVENTS: '/users/front/events',
   FETCH_AUTH_EVENT: ({ eventId }) => `/users/front/events/${eventId}`,
}
export const userEventsURL = {
   ADD_USER: ({ eventId }) => `/users/front/events/${eventId}/user`,
   REMOVE_USER: ({ eventId }) => `/users/front/events/${eventId}/user`,
   FETCH_EVENTS: '/users/events',
}
export const cabinetEventsURL = {
   ADD_EVENT: '/cabinet/events',
   FETCH_EVENTS: '/cabinet/events',
   FETCH_EVENT: ({ eventId }) => `/cabinet/events/${eventId}`,
   PUT_EVENT: ({ eventId }) => `/cabinet/events/${eventId}`,
   DELETE_EVENT: ({ eventId }) => `/cabinet/events/${eventId}`,
}
export const authURL = {
   RESTORE: '/auth/password-restore',
   LOGIN: '/auth/login',
   CHECK_EMAIL: '/auth/check',
   REGISTER: '/auth/register',
}
export const cabinetUserURL = {
   AUTHORIZATION: '/cabinet/user',
   SETTINGS: '/cabinet/user/settings',
}
export const adminURL = {
   ADD_USER: '/admin/users/set_role',
}

export const frontCoursesURL = {
   FETCH_COURSES: '/front/courses',
   FETCH_COURSE: ({ courseId }) => `/front/courses/${courseId}`,
   FETCH_AUTH_COURSES: '/users/front/courses',
   FETCH_AUTH_COURSE: ({ courseId }) => `/users/front/courses/${courseId}`,
}
export const userCoursesURL = {
   FETCH_COURSES: '/users/courses',
   FETCH_COURSE: ({ courseId }) => `/users/courses/${courseId}/lessons`,
   FETCH_LESSON: ({ courseId, lessonId }) => `/users/courses/${courseId}/lessons/${lessonId}`,
   FETCH_LESSON_TEST: ({ courseId, lessonId }) => `/users/courses/${courseId}/lessons/${lessonId}/test`,
   FETCH_LESSON_COMMENTS: ({ courseId, lessonId }) => `/users/courses/${courseId}/lessons/${lessonId}/comments`,
   SEND_LESSON_TEST: ({ courseId, lessonId }) => `/users/courses/${courseId}/lessons/${lessonId}/test`,
   ADD_COMMENT: ({ courseId, lessonId }) => `/users/courses/${courseId}/lessons/${lessonId}/comments`,
   ADD_LIKE: ({ courseId }) => `/users/courses/${courseId}/like`,
   ADD_FAVORITE: ({ courseId }) => `/users/courses/${courseId}/favorite`,
}
export const cabinetCoursesURL = {
   FETCH_COURSES: '/cabinet/courses',
   ADD_COURSE: '/cabinet/courses',
   FETCH_COURSE: ({ courseId }) => `/cabinet/courses/${courseId}`,
   PUT_COURSE: ({ courseId }) => `/cabinet/courses/${courseId}`,
   PATCH_COURSE: ({ courseId }) => `/cabinet/courses/${courseId}`,
   DELETE_COURSE: ({ courseId }) => `/cabinet/courses/${courseId}`,
   FETCH_INFO: ({ courseId }) => `/cabinet/courses/${courseId}/info`,
   EDIT_INFO: ({ courseId }) => `/cabinet/courses/${courseId}/info`,
   DELETE_INFO: ({ courseId }) => `/cabinet/courses/${courseId}/info/delete`,
   FETCH_USERS: ({ courseId }) => `/cabinet/courses/${courseId}/users`,
   FETCH_COMMENTS: ({ courseId }) => `/cabinet/courses/${courseId}/comments`,
   READ_COMMENTS: ({ courseId }) => `/cabinet/courses/${courseId}/comments`,
}
export const cabinetCoursesModulesURL = {
   FETCH_MODULES: ({ courseId }) => `/cabinet/courses/${courseId}/moduls`,
   ADD_MODULES_MASS: ({ courseId }) => `/cabinet/courses/${courseId}/moduls/mass`,
   ADD_MODULE: ({ courseId }) => `/cabinet/courses/${courseId}/moduls`,
   FETCH_MODULE: ({ courseId, id }) => `/cabinet/courses/${courseId}/moduls/${id}`,
   PUT_MODULE: ({ courseId, id }) => `/cabinet/courses/${courseId}/moduls/${id}`,
   PATCH_MODULE: ({ courseId, id }) => `/cabinet/courses/${courseId}/moduls/${id}`,
   DELETE_MODULE: ({ courseId, id }) => `/cabinet/courses/${courseId}/moduls/${id}`,
}
export const cabinetCoursesLessonsURL = {
   FETCH_LESSONS: ({ courseId }) => `/cabinet/courses/${courseId}/lessons`,
   DELETE_FILE: ({ courseId, lessonId }) => `/cabinet/courses/${courseId}/lessons/${lessonId}/delete_file`,
   FETCH_LESSON: ({ courseId, lessonId }) => `/cabinet/courses/${courseId}/lessons/${lessonId}`,
   DELETE_LESSON: ({ courseId, lessonId }) => `/cabinet/courses/${courseId}/lessons/${lessonId}`,
   UPLOAD_FILE: ({ courseId, lessonId }) => `/cabinet/courses/${courseId}/lessons/${lessonId}/upload_file`,
   PUT_LESSON: ({ courseId, lessonId }) => `/cabinet/courses/${courseId}/lessons/${lessonId}`,
   PATCH_LESSON: ({ courseId, lessonId }) => `/cabinet/courses/${courseId}/lessons/${lessonId}`,
}
