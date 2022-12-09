import { useEffect } from 'react'

const useEvent = (listener, event = 'click', element = document.body) => {
    useEffect(() => {
        element.addEventListener(event, listener)
        return () => element.removeEventListener(event, listener)
    }, [])
}

export default useEvent
