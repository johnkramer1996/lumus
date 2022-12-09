import SubscribesService from 'api/SubscribesService'
import { createHandles } from 'utils'
import { ModalsActionCreators } from '../modals/action-creators'
import { subscribesTypes } from './types'

export const SubscribesActionCreators = {
   resetSubscribes: (payload) => ({ type: subscribesTypes.RESET_SUBSCRIBES, payload }),
   setSubscribesData: (payload) => ({ type: subscribesTypes.SET_SUBSCRIBES_DATA, payload }),
   setSubscribes: (payload) => ({ type: subscribesTypes.SET_SUBSCRIBES, payload }),
   addSubscribes: (payload) => ({ type: subscribesTypes.ADD_SUBSCRIBES, payload }),
   updateSubscribe: (payload) => ({ type: subscribesTypes.UPDATE_SUBSCRIBE, payload }),
   removeSubscribe: (payload) => ({ type: subscribesTypes.REMOVE_SUBSCRIBE, payload }),
   setSubscribe: (payload) => ({ type: subscribesTypes.SET_SUBSCRIBE, payload }),
}

const defaultHandlers = createHandles(SubscribesService)

export const subscribesHandlers = {
   ...defaultHandlers,
   addSubscribe: {
      ...defaultHandlers.addSubscribe,
      success: (dispatch, response, data, prevData) => {
         dispatch(SubscribesActionCreators.addSubscribes([typeof data === 'object' ? data : {}]))
      },
   },
   fetchSubscribes: {
      ...defaultHandlers.fetchSubscribes,
      success: (dispatch, response, data, prevData) => {
         dispatch(SubscribesActionCreators.setSubscribesData(typeof prevData === 'object' ? prevData : {}))
         dispatch(SubscribesActionCreators[prevData.currentPage === 1 ? 'setSubscribes' : 'addSubscribes'](Array.isArray(data) ? data : []))
      },
   },
   fetchSubscribe: {
      ...defaultHandlers.fetchFrontSubscribe,
      success: (dispatch, response, data, prevData) => {
         dispatch(SubscribesActionCreators.setSubscribe(typeof data === 'object' ? data : {}))
      },
   },
   putSubscribe: {
      ...defaultHandlers.putSubscribe,
      success: (dispatch, response, data, prevData) => {
         if ('orderNumber' in data) return
         dispatch(SubscribesActionCreators.updateSubscribe(typeof data === 'object' ? data : {}))
         dispatch(ModalsActionCreators.setIsShow(false))
      },
   },
   deleteSubscribe: {
      ...defaultHandlers.deleteSubscribe,
      success: (dispatch, response, data, prevData) => {
         dispatch(SubscribesActionCreators.removeSubscribe(typeof data === 'object' ? data : {}))
         dispatch(ModalsActionCreators.setContent({ title: 'Subscribes удален' }))
      },
   },
   //  fetchFrontSubscribes
   //  fetchFrontSubscribe
}
subscribesHandlers.fetchFrontSubscribes.success = subscribesHandlers.fetchSubscribes.success
subscribesHandlers.fetchFrontSubscribe.success = subscribesHandlers.fetchSubscribe.success
