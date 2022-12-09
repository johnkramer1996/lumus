import ApplicationService from 'api/ApplicationService'
import AuthService from 'api/AuthService'
import CoursesService from 'api/CoursesService'
import EventsService from 'api/EventsService'
import FaqService from 'api/FaqServes'
import FrontStaticService from 'api/FrontStaticService'
import NotificationsService from 'api/NotificationsService'
import PagesService from 'api/PagesService'
import PostsService from 'api/PostsService'
import SubscribesService from 'api/SubscribesService'
import SystemService from 'api/SystemService'
import UsersService from 'api/UsersService'
import { createAsyncActionCreator } from 'utils'
import { ApplicationsActionCreators, ApplicationsHandlers } from './applications/action-creators'
import { AuthActionCreators, authHandlers } from './auth/action-creators'
import { CommentsActionCreators } from './comments/action-creators'
import { courseHandlers, CoursesActionCreators } from './courses/action-creators'
import { EventsActionCreators, eventsHandlers } from './events/action-creators'
import { FaqActionCreators, faqHandlers } from './faq/action-creators'
import { FrontStaticActionCreators, frontStaticHandlers } from './frontStatic/action-creators'
import { ModalsActionCreators } from './modals/action-creators'
import { NotificationsActionCreators, notificationsHandlers } from './notifications/action-creators'
import { PagesActionCreators, pagesHandlers } from './pages/action-creators'
import { PostsActionCreators, postsHandlers } from './posts/action-creators'
import { SettingsActionCreators } from './settings/action-creators'
import { SubscribesActionCreators, subscribesHandlers } from './subscribes/action-creators'
import { SystemActionCreators, systemHandlers } from './system/action-creators'
import { UsersActionCreators, usersHandlers } from './users/action-creators'

export const allActionCreators = {
   ...FrontStaticActionCreators,
   ...AuthActionCreators,
   ...SystemActionCreators,
   ...ModalsActionCreators,
   ...SettingsActionCreators,
   ...CommentsActionCreators,
   ...CoursesActionCreators,
   ...EventsActionCreators,
   ...FaqActionCreators,
   ...PostsActionCreators,
   ...PagesActionCreators,
   ...SubscribesActionCreators,
   ...NotificationsActionCreators,
   ...UsersActionCreators,
   ...ApplicationsActionCreators,
   ...createAsyncActionCreator(FrontStaticService),
   ...createAsyncActionCreator(AuthService),
   ...createAsyncActionCreator(SystemService),
   ...createAsyncActionCreator(CoursesService),
   ...createAsyncActionCreator(EventsService),
   ...createAsyncActionCreator(FaqService),
   ...createAsyncActionCreator(PostsService),
   ...createAsyncActionCreator(PagesService),
   ...createAsyncActionCreator(SubscribesService),
   ...createAsyncActionCreator(NotificationsService),
   ...createAsyncActionCreator(UsersService),
   ...createAsyncActionCreator(ApplicationService),
}

export const allActionHandlers = {
   ...frontStaticHandlers,
   ...authHandlers,
   ...systemHandlers,
   ...courseHandlers,
   ...eventsHandlers,
   ...faqHandlers,
   ...postsHandlers,
   ...pagesHandlers,
   ...subscribesHandlers,
   ...notificationsHandlers,
   ...usersHandlers,
   ...ApplicationsHandlers,
}

console.log(allActionHandlers)
