import ApplicationService from 'api/ApplicationService'
import { createHandles } from 'utils'
import { ModalsActionCreators } from '../modals/action-creators'
import { applicationsTypes } from './types'

export const ApplicationsActionCreators = {
   resetApplications: (payload) => ({ type: applicationsTypes.RESET_APPLICATIONS, payload }),
   setApplicationsData: (payload) => ({ type: applicationsTypes.SET_APPLICATIONS_DATA, payload }),
   setApplications: (payload) => ({ type: applicationsTypes.SET_APPLICATIONS, payload }),
   addApplications: (payload) => ({ type: applicationsTypes.ADD_APPLICATIONS, payload }),
   updateApplication: (payload) => ({ type: applicationsTypes.UPDATE_APPLICATION, payload }),
   removeApplication: (payload) => ({ type: applicationsTypes.REMOVE_APPLICATION, payload }),
   setApplication: (payload) => ({ type: applicationsTypes.SET_APPLICATION, payload }),
}

const defaultHandlers = createHandles(ApplicationService)

export const ApplicationsHandlers = {
   ...defaultHandlers,
   addApplication: {
      ...defaultHandlers.addApplication,
      success: (dispatch, response, data, prevData) => {
         dispatch(ApplicationsActionCreators.addApplications([typeof data === 'object' ? data : {}]))
      },
   },
   fetchApplications: {
      ...defaultHandlers.fetchApplications,
      success: (dispatch, response, data, prevData) => {
         dispatch(ApplicationsActionCreators.setApplicationsData(typeof prevData === 'object' ? prevData : {}))
         dispatch(ApplicationsActionCreators[prevData.currentPage === 1 ? 'setApplications' : 'addApplications'](Array.isArray(data) ? data : []))
      },
   },
   fetchApplication: {
      ...defaultHandlers.fetchFrontApplication,
      success: (dispatch, response, data, prevData) => {
         dispatch(ApplicationsActionCreators.setApplication(typeof data === 'object' ? data : {}))
      },
   },
   putApplication: {
      ...defaultHandlers.putApplication,
      success: (dispatch, response, data, prevData) => {
         if ('orderNumber' in data) return
         dispatch(ApplicationsActionCreators.updateApplication(typeof data === 'object' ? data : {}))
         dispatch(ModalsActionCreators.setIsShow(false))
      },
   },
   deleteApplication: {
      ...defaultHandlers.deleteApplication,
      success: (dispatch, response, data, prevData) => {
         dispatch(ApplicationsActionCreators.removeApplication(typeof data === 'object' ? data : {}))
         dispatch(ModalsActionCreators.setContent({ title: 'Applications удален' }))
      },
   },
   //  fetchFrontApplications
   //  fetchFrontApplication
}
ApplicationsHandlers.fetchFrontApplications.success = ApplicationsHandlers.fetchApplications.success
ApplicationsHandlers.fetchFrontApplication.success = ApplicationsHandlers.fetchApplication.success
