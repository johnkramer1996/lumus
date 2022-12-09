import { modalsTypes } from './types'

export const ModalsActionCreators = {
   setIsShow: (payload) => ({ type: modalsTypes.SET_IS_SHOW, payload }),
   setContent: (payload) => ({ type: modalsTypes.SET_CONTENT, payload }),
   setType: (payload) => ({ type: modalsTypes.SET_TYPE, payload }),
   setBack: (payload) => ({ type: modalsTypes.SET_BACK, payload }),
}
