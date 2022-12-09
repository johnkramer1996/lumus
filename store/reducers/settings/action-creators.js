import { settingsTypes } from './types'

export const SettingsActionCreators = {
   resetFilter: () => ({ type: settingsTypes.RESET_FILTER }),
   setTypeShow: (payload) => ({ type: settingsTypes.SET_TYPE_SHOW, payload }),
   setFilter: (payload) => ({ type: settingsTypes.SET_FILTER, payload }),
   setPage: (payload) => ({ type: settingsTypes.SET_PAGE, payload }),
}
