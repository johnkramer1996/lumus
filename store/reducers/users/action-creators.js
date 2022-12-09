import UsersService from 'api/UsersService'
import { createHandles } from 'utils'
import { CoursesActionCreators } from '../courses/action-creators'
import { EventsActionCreators } from '../events/action-creators'
import { FrontStaticActionCreators } from '../frontStatic/action-creators'
import { ModalsActionCreators } from '../modals/action-creators'
import { usersTypes } from './types'

export const UsersActionCreators = {
   resetUsers: (payload) => ({ type: usersTypes.RESET_USERS, payload }),
   setUsersData: (payload) => ({ type: usersTypes.SET_USERS_DATA, payload }),
   setUsers: (payload) => ({ type: usersTypes.SET_USERS, payload }),
   addUsers: (payload) => ({ type: usersTypes.ADD_USERS, payload }),
   updateUser: (payload) => ({ type: usersTypes.UPDATE_USER, payload }),
   removeUser: (payload) => ({ type: usersTypes.REMOVE_USER, payload }),
   setUser: (payload) => ({ type: usersTypes.SET_USER, payload }),
}

const defaultHandlers = createHandles(UsersService)

export const usersHandlers = {
   ...defaultHandlers,
   addUser: {
      ...defaultHandlers.addUser,
      success: (dispatch, response, data, prevData) => {
         dispatch(UsersActionCreators.addUsers([typeof data === 'object' ? data : {}]))
      },
   },
   fetchUsers: {
      ...defaultHandlers.fetchUsers,
      success: (dispatch, response, data, prevData) => {
         dispatch(UsersActionCreators.setUsersData(typeof prevData === 'object' ? prevData : {}))
         dispatch(UsersActionCreators[prevData.currentUser === 1 ? 'setUsers' : 'addUsers'](Array.isArray(data) ? data : []))
      },
   },
   fetchUser: {
      ...defaultHandlers.fetchFrontUser,
      success: (dispatch, response, data, prevData) => {
         dispatch(UsersActionCreators.setUser(typeof data === 'object' ? data : {}))
      },
   },
   putUser: {
      ...defaultHandlers.putUser,
      success: (dispatch, response, data, prevData) => {
         if ('orderNumber' in data) return
         dispatch(UsersActionCreators.updateUser(typeof data === 'object' ? data : {}))
         dispatch(ModalsActionCreators.setIsShow(false))
      },
   },
   deleteUser: {
      ...defaultHandlers.deleteUser,
      success: (dispatch, response, data, prevData) => {
         dispatch(UsersActionCreators.removeUser(typeof data === 'object' ? data : {}))
         dispatch(ModalsActionCreators.setContent({ title: 'Users удален' }))
      },
   },
   //  fetchFrontUsers
   fetchFrontUser: {
      ...defaultHandlers.fetchFrontUser,
      success: (dispatch, response, data, prevData) => {
         dispatch(UsersActionCreators.setUser(typeof data === 'object' ? data : {}))
         dispatch(EventsActionCreators.setEventsData(typeof prevData.events === 'object' ? prevData.events : {}))
         dispatch(EventsActionCreators.setEvents(Array.isArray(prevData.events.data) ? prevData.events.data : []))
         dispatch(CoursesActionCreators.setCoursesData(typeof prevData.courses === 'object' ? prevData.courses : {}))
         dispatch(CoursesActionCreators.setCourses(Array.isArray(prevData.courses.data) ? prevData.courses.data : []))
      },
   },
   //  fetchFrontUserEvents
   //  fetchFrontTrainer
   //  fetchFrontTrainerEvents
}
// usersHandlers.fetchFrontUsers.success = usersHandlers.fetchUsers.success
usersHandlers.fetchFrontTrainer.success = usersHandlers.fetchFrontUser.success
