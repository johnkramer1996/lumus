import { useMemo } from 'react'
import { useDispatch as useDispatchRedux } from 'react-redux'
import { allActionCreators, allActionHandlers } from 'store/reducers/action-creators'
console.log(allActionHandlers)
const useDispatch = () => {
   const dispatch = useDispatchRedux()
   return useMemo(
      () =>
         Object.keys(allActionCreators).reduce(
            (obj, item) => (
               (obj[item] = (payload) => {
                  // is async actiion?
                  if (!!allActionHandlers[item]) {
                     //async / allActionCreators[item] = asyncAction / more info in utils
                     dispatch(allActionCreators[item]({ ...allActionHandlers[item], ...payload }))
                  } else {
                     //sync
                     dispatch(allActionCreators[item](payload))
                  }
               }),
               obj
            ),
            {},
         ),
      [allActionCreators],
   )
}

export default useDispatch
