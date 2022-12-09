import { useEffect, useState } from 'react'
import { isFunction } from 'utils'

const useRequest = (request, loading = false, handlers) => {
   const { success, error, testDelay } = handlers || {}
   const [isLoading, setIsLoading] = useState(loading)
   let isMounted = true

   useEffect(() => () => (isMounted = false), [])

   const call = (data) => {
      const payload = {
         data,
         // handlers for component
         callbackHandler: (type, ...data) => {
            if (!isMounted) return isMounted
            switch (type) {
               case 'before':
                  loading && !isLoading && setIsLoading(true)
                  break
               case 'success':
                  isFunction(success) && success(...data)
                  break
               case 'error':
                  isFunction(error) && error(data)
                  break
               case 'finnally':
                  loading && setIsLoading(false)
                  break

               default:
                  break
            }
            return isMounted
         },
      }
      if (!isFunction(request)) return console.log('request is not function')
      //request - created useDispatch / wrapper for dispatch
      //request === (payload) => dispatch(ayncActionCreator(defaultHandlrs + actionHandlers + payload))
      //ayncActionCreator === default async funcion ({ data, callbackHandler, request, success, error } = {})
      if (testDelay) {
         loading && !isLoading && setIsLoading(true)
         setTimeout(() => request(payload), testDelay)
         return
      }
      request(payload)
   }

   return { call, isLoading }
}

export default useRequest
