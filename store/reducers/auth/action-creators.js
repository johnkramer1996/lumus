import AuthService from 'api/AuthService'
import { createHandles } from 'utils'
import { ModalsActionCreators } from '../modals/action-creators'
import { authTypes } from './types'

export const AuthActionCreators = {
   setIsAuth: (payload) => ({ type: authTypes.SET_AUTH, payload }),
   setUser: (payload) => ({ type: authTypes.SET_USER, payload }),
   setRoleIds: (payload) => ({ type: authTypes.SET_ROLE_IDS, payload }),
   setRole: (payload) => ({ type: authTypes.SET_ROLE, payload }),
   setToken: (payload) => ({ type: authTypes.SET_TOKEN, payload }),
   setNotifications: (payload) => ({ type: authTypes.SET_NOTIFICATIONS, payload }),
   setStep: (payload) => ({ type: authTypes.SET_STEP, payload }),
   logout: () => async (dispatch) => {
      dispatch(AuthActionCreators.setIsAuth(false))
      dispatch(AuthActionCreators.setUser({}))
      dispatch(AuthActionCreators.setToken(''))
      localStorage.removeItem('token')
   },
}

const defaultHandlers = createHandles(AuthService)

export const authHandlers = {
   ...defaultHandlers,
   login: {
      ...defaultHandlers.login,
      success: (dispatch, response, data, prevData) => {
         const roleIds = Array.isArray(data.roles) ? data.roles.filter((item) => typeof item === 'object').map(({ id }) => id) : []
         dispatch(ModalsActionCreators.setIsShow(false))
         dispatch(AuthActionCreators.setIsAuth(true))
         dispatch(AuthActionCreators.setUser(typeof data === 'object' ? data : {}))
         dispatch(AuthActionCreators.setRoleIds(roleIds))
         dispatch(AuthActionCreators.setRole(roleIds.length && roleIds[roleIds.length - 1]))
         dispatch(AuthActionCreators.setToken(prevData.token))
         localStorage.setItem('token', prevData.token)
      },
      error: (dispatch, error) => dispatch(ModalsActionCreators.setContent({ title: 'Недействительные учетные данные' })),
   },
   //  checkEmail
   restore: {
      ...defaultHandlers.restore,
      success: (dispatch, response, data, prevData) => dispatch(ModalsActionCreators.setContent({ title: 'Мы отправили новый пароль на почту' })),
      error: (dispatch, error) => dispatch(ModalsActionCreators.setContent({ title: 'Недействительные учетные данные' })),
   },
   register: {
      ...defaultHandlers.register,
      success: (dispatch, response, data, prevData) => {
         dispatch(AuthActionCreators.setIsAuth(true))
         dispatch(AuthActionCreators.setUser(data || {}))
         dispatch(AuthActionCreators.setToken(prevData.token))
         localStorage.setItem('token', prevData.token)
      },
      error: (dispatch, error) => dispatch(ModalsActionCreators.setContent({ title: 'Произошла ошибка при регистрации' })),
   },
   auth: {
      ...defaultHandlers.auth,
      error: (dispatch, error) => dispatch(ModalsActionCreators.setContent({ title: 'Произошла ошибка при авторизации' })),
   },
   settings: {
      ...defaultHandlers.settings,
      success: (dispatch, response, data, prevData) => {
         const { avatar, filePassport_1, filePassport_2, fileDiplom, fileTreaty } = prevData.deleted || {}
         if (avatar) data.avatar = ''
         if (!data.docs) data.docs = {}
         if (filePassport_1) data.docs.filePassport_1 = ''
         if (filePassport_2) data.docs.filePassport_2 = ''
         if (fileDiplom) data.docs.fileDiplom = ''
         if (fileTreaty) data.docs.fileTreaty = ''
         dispatch(AuthActionCreators.setUser(data || {}))
      },
      error: (dispatch, error) => dispatch(ModalsActionCreators.setContent({ title: error })),
   },
}
authHandlers.auth.success = authHandlers.login.success
