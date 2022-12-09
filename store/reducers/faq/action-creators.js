import FaqService from 'api/FaqServes'
import { createHandles } from 'utils'
import { ModalsActionCreators } from '../modals/action-creators'
import { faqTypes } from './types'

export const FaqActionCreators = {
   resetFaq: (payload) => ({ type: faqTypes.RESET_FAQ, payload }),
   setFaqData: (payload) => ({ type: faqTypes.SET_FAQ_DATA, payload }),
   setFaq: (payload) => ({ type: faqTypes.SET_FAQ, payload }),
   addFaq: (payload) => ({ type: faqTypes.ADD_FAQ, payload }),
   setFaqItem: (payload) => ({ type: faqTypes.SET_FAQ_ITEM, payload }),
   updateFaq: (payload) => ({ type: faqTypes.UPDATE_FAQ, payload }),
   removeFaq: (payload) => ({ type: faqTypes.REMOVE_FAQ, payload }),
}

const defaultHandlers = createHandles(FaqService)

export const faqHandlers = {
   ...defaultHandlers,
   addFaq: {
      ...defaultHandlers.addFaq,
      success: (dispatch, response, data, prevData) => {
         dispatch(FaqActionCreators.addFaq([typeof data === 'object' ? data : {}]))
      },
   },
   fetchFaq: {
      ...defaultHandlers.fetchFaq,
      success: (dispatch, response, data, prevData) => {
         dispatch(FaqActionCreators.setFaqData(typeof prevData === 'object' ? prevData : {}))
         dispatch(FaqActionCreators[prevData.currentPage === 1 ? 'setFaq' : 'addFaq'](Array.isArray(data) ? data : []))
      },
   },
   //  fetchFaqItem
   putFaq: {
      ...defaultHandlers.putFaq,
      success: (dispatch, response, data, prevData) => {
         if ('orderNumber' in data) return
         dispatch(FaqActionCreators.updateFaq(typeof data === 'object' ? data : {}))
         dispatch(ModalsActionCreators.setIsShow(false))
      },
   },
   deleteFaq: {
      ...defaultHandlers.deleteFaq,
      success: (dispatch, response, data, prevData) => {
         dispatch(FaqActionCreators.removeFaq(typeof data === 'object' ? data : {}))
         dispatch(ModalsActionCreators.setContent({ title: 'Faq удален' }))
      },
   },
   //  deleteFaq
   //  fetchFrontFaq
   //  fetchFrontFaqItem
}
faqHandlers.fetchFrontFaq = faqHandlers.fetchFaq
