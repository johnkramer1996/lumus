import { useDispatch, useRequest } from 'hooks'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { authSelectors, eventsSelectors } from 'store/selectors'
import { EventsItem as EventsItemComponent } from 'components'

const EventsItem = () => {
   const { eventId } = useParams()
   const { resetEvents, fetchFrontEvent, fetchFrontAuthEvent } = useDispatch()
   const isAuth = useSelector(authSelectors.getIsAuth)
   const event = useSelector(eventsSelectors.getEvent)

   const authRequest = useRequest(isAuth ? fetchFrontAuthEvent : fetchFrontEvent, true)

   useEffect(() => {
      authRequest.call({ eventId })
      return () => resetEvents()
   }, [])

   return <EventsItemComponent event={event} isLoading={authRequest.isLoading} />
}

export default EventsItem
