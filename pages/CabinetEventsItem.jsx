import { useDispatch, useNavigate, useRequest } from 'hooks'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { EventsItem } from 'components'
import { authSelectors, eventsSelectors } from 'store/selectors'

const CabinetEventsItem = () => {
   const { eventId } = useParams()
   const { toEventsItem } = useNavigate()

   const { resetEvents, fetchEvent } = useDispatch()
   const user = useSelector(authSelectors.getUser)
   const event = useSelector(eventsSelectors.getEvent)
   const { id: userId } = user
   const { userId: userPageId } = event

   const fetchEventRequest = useRequest(fetchEvent, true)

   useEffect(() => {
      fetchEventRequest.call({ eventId })
      return () => resetEvents()
   }, [])

   useEffect(() => {
      console.log(userId, event)
      return
      const isUserPage = userId === userPageId
      if (!fetchEventRequest.isLoading && !isUserPage) toEventsItem({ eventId, type: 'events' }, { replace: true })
   }, [fetchEventRequest.isLoading])

   return <EventsItem event={event} isLoading={fetchEventRequest.isLoading} />
}

export default CabinetEventsItem
