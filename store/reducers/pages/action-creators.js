import PagesService from 'api/PagesService'
import { createHandles } from 'utils'
import { ModalsActionCreators } from '../modals/action-creators'
import { pagesTypes } from './types'

export const PagesActionCreators = {
   resetPages: (payload) => ({ type: pagesTypes.RESET_PAGES, payload }),
   setPagesData: (payload) => ({ type: pagesTypes.SET_PAGES_DATA, payload }),
   setPages: (payload) => ({ type: pagesTypes.SET_PAGES, payload }),
   addPages: (payload) => ({ type: pagesTypes.ADD_PAGES, payload }),
   updatePage: (payload) => ({ type: pagesTypes.UPDATE_PAGE, payload }),
   removePage: (payload) => ({ type: pagesTypes.REMOVE_PAGE, payload }),
   setPage: (payload) => ({ type: pagesTypes.SET_PAGE, payload }),
}

const defaultHandlers = createHandles(PagesService)

export const pagesHandlers = {
   ...defaultHandlers,
   addPage: {
      ...defaultHandlers.addPage,
      success: (dispatch, response, data, prevData) => {
         dispatch(PagesActionCreators.addPages([typeof data === 'object' ? data : {}]))
      },
   },
   fetchPages: {
      ...defaultHandlers.fetchPages,
      success: (dispatch, response, data, prevData) => {
         dispatch(PagesActionCreators.setPagesData(typeof prevData === 'object' ? prevData : {}))
         dispatch(PagesActionCreators[prevData.currentPage === 1 ? 'setPages' : 'addPages'](Array.isArray(data) ? data : []))
      },
   },
   fetchPage: {
      ...defaultHandlers.fetchFrontPage,
      success: (dispatch, response, data, prevData) => {
         dispatch(PagesActionCreators.setPage(typeof data === 'object' ? data : {}))
      },
   },
   putPage: {
      ...defaultHandlers.putPage,
      success: (dispatch, response, data, prevData) => {
         if ('orderNumber' in data) return
         dispatch(PagesActionCreators.updatePage(typeof data === 'object' ? data : {}))
         dispatch(ModalsActionCreators.setIsShow(false))
      },
   },
   deletePage: {
      ...defaultHandlers.deletePage,
      success: (dispatch, response, data, prevData) => {
         dispatch(PagesActionCreators.removePage(typeof data === 'object' ? data : {}))
         dispatch(ModalsActionCreators.setContent({ title: 'Pages удален' }))
      },
   },
   //  fetchFrontPages
   //  fetchFrontPage
}
pagesHandlers.fetchFrontPages.success = pagesHandlers.fetchPages.success
pagesHandlers.fetchFrontPage.success = pagesHandlers.fetchPage.success
